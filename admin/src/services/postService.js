async function getPostsByAuthor(token) {
  const response = await fetch("http://localhost:3000/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

async function togglePublishedStatus(postId, reversePublishedStatus) {
  const response = await fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ published: reversePublishedStatus }),
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
  getPostsByAuthor,
  togglePublishedStatus,
  fetchPostById,
  deleteCommentFromPost,
};
