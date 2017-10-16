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

export const getPostByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const createPost = (data) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const getPostById = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const voteOnPost = (data,id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const editPost = (data,id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {...headers,
      'Content-Type': 'application/json'}
  })


