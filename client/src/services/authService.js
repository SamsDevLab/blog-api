async function submitLogin(userData) {
  const response = await fetch(
    "https://blog-api-fc47.onrender.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    },
  );

  return response;
}

async function submitSignUp(userData) {
  const response = await fetch(
    "https://blog-api-fc47.onrender.com/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    },
  );

  return response;
}

export { submitLogin, submitSignUp };
