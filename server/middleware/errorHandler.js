function handleAuthenticationError(err, req, res, next) {
  if (err.statusCode === 400) {
    const statusCode = err.statusCode || 500;
    const errorMessages = err.errors;
    res.status(statusCode).json({
      success: false,
      error: {
        status: statusCode,
        messages: errorMessages || "Internal Server Error",
      },
    });
  } else next(err);
}

function genericHandler(err, req, res, next) {
  return res.status(500).json({
    success: false,
    message: "Something went wrong on our end!",
  });
}

module.exports = [handleAuthenticationError, genericHandler];
