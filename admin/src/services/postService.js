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

async function fetchCommentsByPost(postId, token) {
  const response = await fetch(`http://localhost:3000/comments/${postId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

async function editCommentInPost(commentId, editedComment, token) {
  const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ editedComment }),
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
    body: JSON.stringify({ comment, isAdmin: true }),
  });

  return response;
}

export {
  getPostsByAuthor,
  togglePublishedStatus,
  fetchPostById,
  fetchCommentsByPost,
  editCommentInPost,
  deleteCommentFromPost,
};
