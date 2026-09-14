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

export { getPostsByAuthor, togglePublishedStatus };
