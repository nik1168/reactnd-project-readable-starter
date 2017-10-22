import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as categoriesActions from '../actions/categories'
import '../App.css';
import ListPosts from './ListPosts'
import AddPost from './AddPost'
import EditPost from './EditPost'
import EditComment from './EditComment'
import Post from './Post'
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import AddIcon from 'react-icons/lib/md/add'
import PropTypes from 'prop-types'
import {
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {

  componentDidMount(){
    this.props.fetchCategories();
  }

  render() {
    const {categories} = this.props;

    return (
      <div className="App">
        <h1 style={{textAlign : 'center'}}>Readable</h1>
        <div style={{ display: 'flex' }}>
          <div style={{
            padding: '8px',
            width: '9%'
          }}>
            <ButtonGroup vertical>
              {
                categories && categories.map((value,index)=>(
                    <LinkContainer key={index} to={'/'+value.path}>
                      <Button bsSize="large">{value.name}</Button>
                    </LinkContainer>
                ))
              }
            </ButtonGroup>
            <br/>
            <br/>
            <LinkContainer to="/addPost">
              <Button><AddIcon size={15}></AddIcon> New Post</Button>
            </LinkContainer>
          </div>
          <div style={{ flex: 1, padding: '10px' }}>
            <Switch>
              <Route exact path="/" render={({history,match}) => (
                <ListPosts></ListPosts>
              )} />
              {
                categories && categories.map((value,index)=>(
                  <Route exact key={index} path={'/'+value.path} render={({history,match}) => (
                    <ListPosts category={value.name}></ListPosts>
                  )} />
                ))
              }
              <Route path="/addPost" render={({history}) => (
                <AddPost history={history}></AddPost>
              )} />
              <Route path="/editPost/:id" render={({history,match}) => (
                <EditPost history={history} match={match}></EditPost>
              )} />
              <Route path="/editComment/:id" render={({history,match}) => (
                <EditComment history={history} match={match}></EditComment>
              )} />
              {
                categories && categories.map((value,index)=>(
                  <Route key={index} exact path={'/'+value.name+'/:id'} render={({history,match}) => (
                    <Post history={history} match={match}></Post>
                  )} />
                ))
              }
              <Route component={NoMatch}/>
            </Switch>

          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    categories: state.categories.categories,
    posts : state.posts.posts
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators(categoriesActions, dispatch)
}
const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

export default connect(mapStateToProps,mapDispatchToProps)(App)
