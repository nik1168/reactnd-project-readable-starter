import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchCommentsForASinglePost} from '../actions/index'
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import CommentIcon from 'react-icons/lib/md/comment'
import LikeIcon from 'react-icons/lib/md/thumb-up'
import DislikeIcon from 'react-icons/lib/md/thumb-down'
import EditIcon from 'react-icons/lib/md/mode-edit'
import DeleteIcon from 'react-icons/lib/md/delete'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

class PostDetail extends React.Component{

  voteOnPost = (post,vote)=>{
    this.props.votePost(post,vote);
  };
  deletePost = (id)=>{
    this.props.deletePost(id);
  };
  goBack = ()=>{
    this.props.history.push('/')
  };
  componentDidMount(){
    const {post} = this.props;
    this.props.fetchCommentsForASinglePost(post.id);
  }

  render(){
    const {post,isList,comments,countComments,history} = this.props;
    const BUTTON_GROUP_ICON_SIZE = 16;
    return(
      <div>
        <div className="thumbnail" style={{width: '100rem'}}>
          <div className="caption">
            {
              isList && (
                <h2 className="card-title"><Link to={'/'+post.category+'/'+post.id}>{post.title}</Link></h2>
              )
            }
            {
              !isList && (
                <h2 className="card-title">{post.title}</h2>
              )
            }
            <h4 className="card-subtitle mb-2 text-muted">{post.author}</h4>
            <p className="card-text">{post.body}</p>
            <p className="card-text"><strong> VoteScore</strong>: {post.voteScore}</p>
            <p className="card-text"><CommentIcon size={30}/> {countComments && countComments[post.id] && countComments[post.id].filter((value)=>!value.deleted).length}
            </p>
            <ButtonGroup>
              <Button onClick={() => this.voteOnPost(post.id,'upVote')}><LikeIcon size={BUTTON_GROUP_ICON_SIZE}/> VoteUp</Button>
              <Button onClick={() => this.voteOnPost(post.id,'downVote')}><DislikeIcon size={BUTTON_GROUP_ICON_SIZE}/> VoteDown</Button>
              <LinkContainer to={'/editPost/'+post.id+''}>
                <Button><EditIcon size={BUTTON_GROUP_ICON_SIZE}/> Edit</Button>
              </LinkContainer>
              <Button bsStyle="danger" onClick={() => this.deletePost(post.id)}><DeleteIcon size={BUTTON_GROUP_ICON_SIZE}/> Delete</Button>
            </ButtonGroup>
            {
              history && (
                <Button onClick={this.goBack}>Go Back</Button>
              )
            }

          </div>
        </div>
        </div>
    )
  }
}
function mapStateToProps(state,ownProps){
  return {
    comments : state.comments.comments,
    countComments : state.countComments.countComments,
    post : ownProps.post,
    isList : ownProps.isList,
    votePost : ownProps.votePost,
    deletePost : ownProps.deletePost,
    history : ownProps.history
  }
}

export default connect(mapStateToProps,{fetchCommentsForASinglePost})(PostDetail)
