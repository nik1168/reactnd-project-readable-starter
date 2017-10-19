import * as PostApi from '../utils/PostAPI'
export const GET_POSTS = 'GET_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const ADD_POST = 'ADD_POST';
export const GET_POST = 'GET_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const getPosts = posts => ({
  type: GET_POSTS,
  posts
});
export const fetchPosts = (category) => dispatch =>
  (
    !category?
      PostApi
        .getAll()
        .then(posts => dispatch(getPosts(posts))):
      PostApi
        .getPostByCategory(category)
        .then(posts => dispatch(getPosts(posts)))

  );
export const getPost = post => ({
  type: GET_POST,
  post
});
export const fetchPost = (id,cb) => dispatch =>
  (
    PostApi
      .getPostById(id)
      .then(post => {
        dispatch(getPost(post));
        if(cb){
          cb(post);
        }
      })
  );
export const voteOnPost = (post) => ({
  type: VOTE_POST,
  post
});
export const votePost = (post,vote) => dispatch =>
  (
    PostApi
      .voteOnPost({option:vote},post)
      .then(posts => dispatch(voteOnPost(posts)))
  );
export const addPost = (response) => ({
  type: ADD_POST,
  response,
});
export const addPostRequest = (data,cb) => dispatch =>{
  (
    PostApi
      .createPost(data)
      .then(response => {
        dispatch(addPost(response));
        if(cb){
          cb(response);
        }
      })
  )};
export const updatePost = (response) => ({
  type: UPDATE_POST,
  response,
});
export const updatePostRequest = (data,id,cb) => dispatch =>{
  (
    PostApi
      .editPost(data,id)
      .then(response => {
        dispatch(updatePost(response));
        if(cb){
          cb(response);
        }
      })
  )};
export const deletePost = (id) => ({
  type: DELETE_POST,
  id,
});
export const deletePostRequest = (id,cb) => dispatch =>{
  (
    PostApi
      .deletePost(id)
      .then(response => {
        dispatch(deletePost(id));
        if(cb){
          cb(response);
        }
      })
  )};