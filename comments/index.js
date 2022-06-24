const express = require("express");
const app = express();
const cors = require("cors");
const { default: axios } = require("axios");

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];

  return res.json(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "content is required" });
  }

  const commentId = Math.random().toString(36).substring(7);
  commentsByPostId[id] = commentsByPostId[id] || [];

  const comment = {
    id: commentId,
    content,
    status: "pending",
  };

  commentsByPostId[id].push(comment);

  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        postId: id,
        ...comment,
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return res
    .status(201)
    .json(commentsByPostId[id][commentsByPostId[id].length - 1]);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  console.log(`RECV ${type}`);

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comment = commentsByPostId[postId].find(
      (comment) => comment.id === id
    );

    comment.status = status;

    axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        postId,
        id,
        status,
        content,
      },
    });
  }

  res.end();
});

app.listen(4001, () => {
  console.log("http://localhost:4001");
});
