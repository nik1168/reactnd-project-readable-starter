import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import serializeForm from 'form-serialize'
import * as comments from '../actions/comments'
import Button from 'react-bootstrap/lib/Button';

class AddComment extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const {post} = this.props;
    values.id = ""+Math.floor((Math.random() * 100000000) + 1);
    values.timestamp = ""+Date.now();
    values.parentId = post.id;
    this.props.addCommentToPostRequest(values);
  };
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input required type='text' name='author' placeholder='Author'/>
            <br/>
            <textarea required type='text' name='body' placeholder='Body'/>
            <br/>
            <Button bsStyle="success" type='submit'>Add Comment</Button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  return {
    post : ownProps.post,
    history : ownProps.history
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators(comments, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AddComment)
