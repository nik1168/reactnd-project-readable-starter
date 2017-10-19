import * as CommentsAPI from '../utils/CommentsAPI'
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COUNT_COMMENTS = 'GET_COUNT_COMMENTS';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_COMMENT = 'GET_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
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
        console.log("id");
        console.log(id);
        console.log("REPONSE GET COMMENTS");
        console.log(comments);
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
