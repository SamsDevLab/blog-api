async function fetchAllPublicPosts(token) {
  const response = await fetch("http://localhost:3000/posts/published", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

async function fetchPostById(postId, token) {
  const response = await fetch(`http://localhost:3000/posts/${postId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

async function addCommentToPost(postId, token, comment) {
  const response = await fetch(
    `http://localhost:3000/posts/${postId}/comments`,
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

async function deleteCommentFromPost(comment, token) {
  const response = await fetch(`http://localhost:3000/comments/${comment.id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  });

  return response;
}

export {
  fetchAllPublicPosts,
  fetchPostById,
  addCommentToPost,
  deleteCommentFromPost,
};
