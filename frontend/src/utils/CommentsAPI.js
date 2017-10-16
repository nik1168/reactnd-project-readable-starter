const api = "http://localhost:3001";


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};
export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getCommentForASinglePost = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

export const addCommentToPost = (data) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const getCommentById = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const voteOnComment = (data,id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const editComment = (data,id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })


