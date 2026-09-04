async function fetchPublicPosts(token) {
  const response = await fetch("http://localhost:3000/posts/published", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export { fetchPublicPosts };
