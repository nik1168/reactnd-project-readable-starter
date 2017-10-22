import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchPosts} from '../actions/posts';
import {changeSort} from '../actions/index';
import {votePost} from '../actions/posts';
import PostDetail from './PostDetail'
import {deletePostRequest} from "../actions/posts";
import sortBy from 'sort-by'
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

class ListPosts extends React.Component{

  voteOnPost = (post,vote)=>{
    this.props.votePost(post,vote);
  };
  deletePost = (id)=>{
    this.props.deletePostRequest(id);
  };
  changeSort = (sort)=>{
    this.props.changeSortDis(sort);
  };
  componentDidMount(){
    let {category} = this.props;
    this.props.fetchPosts(category);
    this.props.changeSortDis('-voteScore');
  }
  render(){
    const {posts,sort} = this.props;
    if(posts){
      posts.sort(sortBy(sort));
    }
    return(
      <div>
        <div>
          <div>
            {
              posts && posts.length > 0 && posts.filter((val)=>!val.deleted).length >0 &&(
                <div>
                  <ButtonGroup>
                    <Button active={sort==='-voteScore'} onClick={()=>{this.changeSort('-voteScore')}}>voteScore</Button>
                    <Button active={sort==='-timestamp'} onClick={()=>{this.changeSort('-timestamp')}}>Recently Added</Button>
                  </ButtonGroup>
                </div>
              )

            }
            <br/>

            {
              posts && posts.filter((value)=>!value.deleted).map((value,index)=>(
                <PostDetail match={this.props.match} history={this.props.history} key={index} post={value} isList='true' votePost={this.voteOnPost} deletePost={this.deletePost}/>
              ))
            }
          </div>
          {posts && (posts.length === 0 || posts.filter((val)=>!val.deleted).length === 0) &&
          <p>
            No posts found for this category
          </p>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  return {
    posts : state.posts.posts,
    category : ownProps.category,
    sort : state.sort.sort,
    history : ownProps.history,
    match : ownProps.match
  }
}
const changeSortDis = (data) => dispatch=>(dispatch(changeSort(data)));

export default connect(mapStateToProps,{fetchPosts,votePost,deletePostRequest,changeSortDis})(ListPosts)
