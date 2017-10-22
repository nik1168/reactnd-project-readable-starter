import {
  GET_POSTS,
  VOTE_POST,
  ADD_POST,
  GET_POST,
  UPDATE_POST,
  DELETE_POST
} from '../actions/posts'

export function selectedPost(state={},action) {
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

export function posts(state=[],action){
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
      state.posts && state.posts.map((value,index)=>{
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