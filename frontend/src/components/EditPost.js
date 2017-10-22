import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import {fetchPost} from '../actions/posts'
import {updatePostRequest} from '../actions/posts'
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Button from 'react-bootstrap/lib/Button'

class EditPost extends React.Component{
  state = {
    body: '',
    author : ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const {selectedPost} = this.props;
    this.props.updatePostRequest(values,selectedPost.id,()=>{
      this.props.history.push('/'+selectedPost.category+'/'+selectedPost.id+'')
    });
  };
  componentDidMount(){
    let id = this.props.match.params.id;
    this.props.fetchPost(id,(post)=>{
      this.setState({body: post.body,author:post.author})
    });
  }
  handleChangeBody = (e) => {
    this.setState({body: e.target.value});
  };
  handleChangeAuthor = (e) => {
    this.setState({author: e.target.value});
  };
  render(){
    const {selectedPost} = this.props;
    return(
      <div>
        {
          selectedPost &&(
            <form onSubmit={this.handleSubmit}>
              <div>
                <div>
                  <div>
                    <Col componentClass={ControlLabel}>
                      <h4>Title</h4>
                    </Col>
                    <Col>
                      <input readOnly type='text' name='title' value={selectedPost.title} placeholder='Title'/>
                    </Col>
                  </div>
                  <div>
                    <Col componentClass={ControlLabel}>
                      <h4>Author</h4>
                    </Col>
                    <Col>
                      <input type='text' name='author' value={this.state.author} onChange={this.handleChangeAuthor} placeholder='Author'/>
                    </Col>
                  </div>
                  <div>
                    <Col componentClass={ControlLabel}>
                      <h4>Body</h4>
                    </Col>
                    <Col>
                      <textarea type='text' name='body' value={this.state.body} onChange={this.handleChangeBody} placeholder='Body'/>
                    </Col>
                  </div>
                  <div>
                    <Col componentClass={ControlLabel}>
                      <Button bsStyle="success" type='submit'>Edit Post</Button>
                    </Col>
                  </div>
                </div>
              </div>
            </form>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  return {
    selectedPost : state.selectedPost.selectedPost,
    match : ownProps.match,
    history : ownProps.history
  }
}

export default connect(mapStateToProps,{updatePostRequest,fetchPost})(EditPost)
