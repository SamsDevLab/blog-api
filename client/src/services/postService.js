async function fetchAllPublicPosts(token) {
  const response = await fetch(
    "https://blog-api-fc47.onrender.com/posts/published",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
}

async function fetchPostById(postId, token) {
  const response = await fetch(
    `https://blog-api-fc47.onrender.com/posts/${postId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
}

async function fetchCommentsByPost(postId, token) {
  const response = await fetch(
    `https://blog-api-fc47.onrender.com/comments/${postId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
}

async function addCommentToPost(postId, token, comment) {
  const response = await fetch(
    `https://blog-api-fc47.onrender.com/comments/add/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    },
  );

  return response;
}

async function deleteCommentFromPost(postId, token, comment) {
  const response = await fetch(
    `https://blog-api-fc47.onrender.com/comments/delete/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment, isAdmin: false }),
    },
  );

  return response;
}

export {
  fetchAllPublicPosts,
  fetchPostById,
  fetchCommentsByPost,
  addCommentToPost,
  deleteCommentFromPost,
};
