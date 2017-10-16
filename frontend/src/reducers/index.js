import {combineReducers} from 'redux'
import {
  GET_CATEGORIES,
  GET_POSTS,
  VOTE_POST,
  ADD_POST,
  GET_POST,
  UPDATE_POST,
  DELETE_POST,
  GET_COMMENTS,
  GET_COMMENT,
  VOTE_COMMENT,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  CHANGE_SORT
} from '../actions'

function sort(state={},action) {
  const {sort} = action;
  switch (action.type){
    case CHANGE_SORT:
      return {
        ...state,
        ['sort'] : sort
      };
    default:
      return state;
  }
}

function categories(state=[],action) {
  const {categories} = action;
  switch (action.type){
    case GET_CATEGORIES:
      return {...state, categories: categories};
    default:
      return state;
  }
}

function comments(state=[],action) {
  const {comments,comment,id} = action;
  const newComment = action.response;
  switch (action.type){
    case GET_COMMENTS:
      return {...state, comments: comments};
    case VOTE_COMMENT:
      let i=0;
      state.comments.map((value,index)=>{
        if(value.id===comment.id){
          i=index;
        }
      });
      let a = {
        ...state,
        ['comments']:[
          ...state['comments']
        ]
      };
      a['comments'][i] = comment;
      return a;
    case ADD_COMMENT:
      let copy = {
        ...state,
        ['comments'] : [...state.comments]
      };
      copy.comments.push(newComment);
      return copy;
    case UPDATE_COMMENT:
      return state;
    case DELETE_COMMENT:
      let j=0;
      state.comments.map((value,index)=>{
        if(value.id===id){
          j=index;
        }
      });
      let b = {
        ...state,
        ['comments']:[
          ...state['comments']
        ]
      };
      b['comments'][j].deleted = true;
      return b;
    default:
      return state;
  }
}

function selectedPost(state={},action) {
  const {post} = action;
  switch (action.type){
    case GET_POST:
      return {...state, selectedPost: post};
    case VOTE_POST:
      return {
        ...state,
        ['selectedPost'] : post
      };
    default:
      return state;
  }
}

function selectedComment(state={},action) {
  const {comment} = action;
  switch (action.type){
    case GET_COMMENT:
      return {...state, selectedComment: comment};
    default:
      return state;
  }
}
function countComments(state=[],action) {
  const {comments,postId} = action;
  const newComment = action.response;
  switch (action.type){
    case GET_COMMENTS:
      return {
        ...state,
        ['countComments'] : {
          ...state['countComments'],
          [postId] : comments
        }
      };
    case ADD_COMMENT:
      let copy = {
        ...state,
      };
      copy['countComments'][newComment.parentId].push(newComment);
      return copy;
    default:
      return state
  }
}
function posts(state=[],action){
  const {posts,post,id} = action;
  switch (action.type){
    case GET_POSTS:
      return {...state, posts: posts};
    case VOTE_POST:
      let i = 0;
      if(state.posts){
        state.posts.map((value,index)=>{
          if(value.id===post.id){
            i=index;
          }
        });
        let a = {
          ...state,
          ['posts']:[
            ...state['posts']
          ]
        };
        a['posts'][i] = post;
        return a
      }
      else{
        return state
      }
    case ADD_POST:
      return state;
    case UPDATE_POST:
      return state;
    case DELETE_POST:
      let j=0;
      state.posts.map((value,index)=>{
        if(value.id===id){
          j=index;
        }
      });
      let b = {
        ...state,
        ['posts']:[
          ...state['posts']
        ]
      };
      b['posts'][j].deleted = true;
      return b;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
  comments,
  selectedPost,
  selectedComment,
  countComments,
  sort
});

export default rootReducer;