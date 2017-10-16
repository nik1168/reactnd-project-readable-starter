import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostDetail from './PostDetail'
import CommentDetail from './CommentDetail'
import AddComment from './AddComment'
import {votePost} from "../actions/index";
import {voteOnCommentRequest} from "../actions/index"
import {changeSort} from '../actions/index'
import {fetchPost} from '../actions/index'
import {fetchCommentsForASinglePost} from '../actions/index'
import {deleteCommentRequest} from '../actions/index'
import {deletePost} from '../actions/index'
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
    this.props.deletePost(id);
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
          selectedPost && !selectedPost.deleted && (
            <PostDetail post={selectedPost} votePost={this.voteOnPost} deletePost={this.deletePost} countComments={countComments}/>
          )
        }
        {
          comments && comments.length > 0 &&(
            <div>
              <ButtonGroup>
                <Button bsSize="small" active={sort==='-voteScore'} onClick={()=>{this.changeSort('-voteScore')}}>voteScore</Button>
                <Button bsSize="small" active={sort==='-timestamp'} onClick={()=>{this.changeSort('-timestamp')}}>Recently Added</Button>
              </ButtonGroup>
            </div>
          )

        }
        {
          comments&& comments.filter((value)=>(!value.deleted)).map((value,index)=>(
              <CommentDetail key={index} comment={value} voteOnComment={this.voteOnComment} deleteComment={this.deleteComment}/>
          ))
        }
        <br/>
        <div>
          {
            selectedPost && (
              <AddComment post={selectedPost} history={history}/>
            )
          }

        </div>
        {comments && comments.length === 0 &&
        <p>
          No comments found for this post
        </p>
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
const changeSortDis = (data) => dispatch=>(dispatch(changeSort(data)));
export default connect(mapStateToProps,{fetchPost,votePost,voteOnCommentRequest,fetchCommentsForASinglePost,deleteCommentRequest,deletePost,changeSortDis})(Post)
