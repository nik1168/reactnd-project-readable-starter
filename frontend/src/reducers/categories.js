import {GET_CATEGORIES} from '../actions/categories'
export function categories(state=[],action) {
  const {categories} = action;
  switch (action.type){
    case GET_CATEGORIES:
      return {...state, categories: categories};
    default:
      return state;
  }
}