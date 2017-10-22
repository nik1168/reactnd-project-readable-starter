import {
  GET_COMMENTS,
  GET_COMMENT,
  VOTE_COMMENT,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from '../actions/comments'
export function comments(state=[],action) {
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
export function selectedComment(state={},action) {
  const {comment} = action;
  switch (action.type){
    case GET_COMMENT:
      return {...state, selectedComment: comment};
    default:
      return state;
  }
}
export function countComments(state=[],action) {
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