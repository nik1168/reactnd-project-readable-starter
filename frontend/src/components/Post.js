import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../actions/posts'
import * as commentsActions from '../actions/comments'
import * as indexActions from '../actions/index'
import PostDetail from './PostDetail'
import CommentDetail from './CommentDetail'
import AddComment from './AddComment'
import {changeSort} from '../actions/index'
import sortBy from 'sort-by'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

class Post extends React.Component{

  // static propTypes= {
  //   books : PropTypes.array.isRequired,
  //   updateShelf : PropTypes.func.isRequired
  // };
  voteOnPost = (post,vote)=>{
    this.props.votePost(post,vote);
  };
  deletePost = (id)=>{
    this.props.deletePostRequest(id);
    const {selectedPost} = this.props;
    this.props.history.push('/'+selectedPost.category);
  };
  deleteComment = (id)=>{
    this.props.deleteCommentRequest(id);
  };
  voteOnComment = (comment,vote)=>{
    this.props.voteOnCommentRequest(comment,vote);
  };
  changeSort = (sort)=>{
    this.props.changeSortDis(sort);
  };
  componentDidMount(){
    let id = this.props.match.params.id;
    this.props.fetchPost(id,()=>{
      this.props.fetchCommentsForASinglePost(id);
      this.props.changeSortDis('-voteScore');
    });
  }
  render(){
    const {comments,selectedPost,history,sort} = this.props;
    let countComments = comments && comments.length && comments.length>0?comments.length:0;
    if(comments){
      comments.sort(sortBy(sort));
    }
    return(
      <div>
        {
          selectedPost && !selectedPost.deleted && Object.keys(selectedPost).length > 0 && !selectedPost.error && (
            <PostDetail match={this.props.match} history={this.props.history} post={selectedPost} votePost={this.voteOnPost} deletePost={this.deletePost} countComments={countComments}/>
          )
        }
        {
          selectedPost && !selectedPost.deleted && Object.keys(selectedPost).length > 0 && !selectedPost.error && comments && comments.length > 0 &&(
            <div>
              <ButtonGroup>
                <Button bsSize="small" active={sort==='-voteScore'} onClick={()=>{this.changeSort('-voteScore')}}>voteScore</Button>
                <Button bsSize="small" active={sort==='-timestamp'} onClick={()=>{this.changeSort('-timestamp')}}>Recently Added</Button>
              </ButtonGroup>
            </div>
          )

        }
        {
          selectedPost && !selectedPost.deleted && Object.keys(selectedPost).length > 0 && !selectedPost.error && comments&& comments.filter((value)=>(!value.deleted)).map((value,index)=>(
              <CommentDetail key={index} comment={value} voteOnComment={this.voteOnComment} deleteComment={this.deleteComment}/>
          ))
        }
        <br/>
        <div>
          {
            selectedPost && Object.keys(selectedPost).length > 0 && !selectedPost.deleted && !selectedPost.error && (
              <AddComment post={selectedPost} history={history}/>
            )
          }

        </div>
        {selectedPost && !selectedPost.deleted && Object.keys(selectedPost).length > 0 && !selectedPost.error && comments && comments.length === 0 &&
        <p>
          No comments found for this post
        </p>
        }
        {
          selectedPost && (selectedPost.error || Object.keys(selectedPost).length === 0) && (
            <h3>Post not found</h3>
          )
        }
        {
          !selectedPost && (
            <h3>Post not found</h3>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  return {
    comments : state.comments.comments || state.comments,
    posts : state.posts.posts,
    selectedPost : state.selectedPost.selectedPost,
    match : ownProps.match,
    history : ownProps.history,
    sort : state.sort.sort
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({...postActions,...indexActions,...commentsActions}, dispatch)
}
const changeSortDis = (data) => dispatch=>(dispatch(changeSort(data)));
export default connect(mapStateToProps,mapDispatchToProps)(Post)
