async function submitLogin(userData) {
  const response = await fetch(
    "https://blog-api-fc47.onrender.com/auth/admin/login",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    },
  );

  return response;
}

export { submitLogin };
