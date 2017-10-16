import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import {fetchComment} from '../actions/index'
import {updateCommentRequest} from "../actions/index";
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';

class EditComment extends React.Component{
  state = {
    body: '',
    author : ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let id = this.props.match.params.id;
    const values = serializeForm(e.target, { hash: true });
    values.timestamp = Date.now();
    const {selectedPost} = this.props;
    this.props.updateCommentRequest(values,id,()=>{
      this.props.history.push('/'+selectedPost.category+'/'+selectedPost.id+'')
    });
  };
  componentDidMount(){
    let id = this.props.match.params.id;
    this.props.fetchComment(id,(comment)=>{
      this.setState({body: comment.body,author:comment.author})
    });
  }
  handleChangeBody = (e) => {
    this.setState({body: e.target.value});
  };
  handleChangeAuthor = (e) => {
    this.setState({author: e.target.value});
  };
  render(){
    const {selectedComment} = this.props;
    return(
      <div>
        {
          selectedComment &&(
            <form onSubmit={this.handleSubmit}>
              <div>
                <div>
                  <Col componentClass={ControlLabel}>
                    <h4>Author</h4>
                  </Col>
                  <Col>
                    <input required type='text' name='author' value={this.state.author} onChange={this.handleChangeAuthor} placeholder='author'/>
                  </Col>
                </div>
                <div>
                  <Col componentClass={ControlLabel}>
                    <h4>Body</h4>
                  </Col>
                  <Col>
                    <textarea required type='text' name='body' value={this.state.body} onChange={this.handleChangeBody} placeholder='Body'/>
                  </Col>
                </div>
                <div>
                  <Col componentClass={ControlLabel}>
                    <Button bsStyle="success" type='submit'>Edit Comment</Button>
                  </Col>
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
    selectedComment : state.selectedComment.selectedComment,
    selectedPost : state.selectedPost.selectedPost,
    posts : state.posts.posts,
    match : ownProps.match,
    history : ownProps.history
  }
}

export default connect(mapStateToProps,{updateCommentRequest,fetchComment})(EditComment)
