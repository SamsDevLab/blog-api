async function addNewPost(token, newPostContent) {
  const response = await fetch("http://localhost:3000/posts/addPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPostContent }),
  });

  return response;
}

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

async function togglePublishedStatus(post, token) {
  const response = await fetch(
    `http://localhost:3000/posts/${post.id}/publish`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post }),
    },
  );

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

async function deleteCommentFromPost(postId, token, comment) {
  const response = await fetch(
    `http://localhost:3000/comments/delete/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment, isAdmin: true }),
    },
  );

  return response;
}

export {
  addNewPost,
  getPostsByAuthor,
  togglePublishedStatus,
  fetchPostById,
  fetchCommentsByPost,
  editCommentInPost,
  deleteCommentFromPost,
};
