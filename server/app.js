const express = require("express");
const app = express();
const path = require("node:path");
const passport = require("passport");
const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.json({ message: "API is online and working perfectly!" }),
);

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
