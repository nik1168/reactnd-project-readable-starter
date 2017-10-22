import {combineReducers} from 'redux'
import {posts,selectedPost} from './posts'
import {comments,countComments,selectedComment} from './comments'
import {categories} from './categories'
import {
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