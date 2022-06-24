const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { default: axios } = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const posts = {};

app.get("/posts", (req, res) => {
  return res.json(posts);
});

app.post("/posts/create", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  const id = Math.random().toString(36).substring(7);

  posts[id] = { id, title };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: { id, title },
  }).catch((error) => {
    console.log(error)
  });

  return res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
  console.log(`RECV ${req.body.type}`)

  res.end()
});

app.listen(4000, () => {
  console.log("v55");
  console.log("http://localhost:4000");
});
