import * as CategoryApi from '../utils/CategoriesAPI'
import * as PostApi from '../utils/PostAPI'
import * as CommentsAPI from '../utils/CommentsAPI'
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const ADD_POST = 'ADD_POST';
export const GET_POST = 'GET_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COUNT_COMMENTS = 'GET_COUNT_COMMENTS';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_COMMENT = 'GET_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const CHANGE_SORT = 'CHANGE_SORT';

//Categories
export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch =>
  (
  CategoryApi
    .getAll()
    .then(categories => dispatch(getCategories(categories)))
  );
///////////////////////////////////////////////
//Posts
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
        dispatch(getPost(post))
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
        console.log("RESPONSE DELETEPOST");
        console.log(response);
        dispatch(deletePost(id));
        if(cb){
          cb(response);
        }
      })
  )};
////////////////////////////////////////////////////
//Comments
export const getCommentsForSinglePost = (comments,postId) => ({
  type: GET_COMMENTS,
  comments,
  postId
});
export const getCountCommentsForSinglePost = comments => ({
  type: GET_COUNT_COMMENTS,
  comments
});
export const fetchCommentsForASinglePost = (id) => dispatch =>
  (
    CommentsAPI
      .getCommentForASinglePost(id)
      .then(comments => {
        dispatch(getCommentsForSinglePost(comments,id))
      })
  );
export const getComment = comment => ({
  type: GET_COMMENT,
  comment
});
export const fetchComment = (id,cb) => dispatch =>
  (
    CommentsAPI
      .getCommentById(id)
      .then(comment => {
        dispatch(getComment(comment))
        if(cb){
          cb(comment);
        }
      })
  );
export const addCommentToPost = (response) => ({
  type: ADD_COMMENT,
  response,
});
export const addCommentToPostRequest = (data,cb) => dispatch =>{
  (
    CommentsAPI
      .addCommentToPost(data)
      .then(response => {
        dispatch(addCommentToPost(response));
        if(cb){
          cb(response);
        }
      })
  )};

export const voteOnComment = (comment) => ({
  type: VOTE_COMMENT,
  comment
});
export const voteOnCommentRequest = (comment,vote) => dispatch =>
  (
    CommentsAPI
      .voteOnComment({option:vote},comment)
      .then(posts => dispatch(voteOnComment(posts)))
  );
export const updateComment = (response) => ({
  type: UPDATE_COMMENT,
  response,
});
export const updateCommentRequest = (data,id,cb) => dispatch =>{
  (
    CommentsAPI
      .editComment(data,id)
      .then(response => {
        dispatch(updateComment(response));
        if(cb){
          cb(response);
        }
      })
  )};
export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id,
});
export const deleteCommentRequest = (id,cb) => dispatch =>{
  (
    CommentsAPI
      .deleteComment(id)
      .then(response => {
        dispatch(deleteComment(id));
        if(cb){
          cb(response);
        }
      })
  )};
//SORT
export const changeSort = (sort) => ({
  type: CHANGE_SORT,
  sort
});

