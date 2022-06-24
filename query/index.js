const express = require("express");
const app = express();
const cors = require("cors");
const axios = require('axios')

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (event) => {
  switch (event.type) {
    case "PostCreated": {
      posts[event.data.id] = { ...event.data, comments: [] };

      console.log(posts[event.data.id]);
      break;
    }
    case "CommentCreated": {
      posts[event.data.postId].comments.push({
        id: event.data.id,
        content: event.data.content,
        status: event.data.status,
      });

      break;
    }
    case "CommentUpdated": {
      const { postId, id, status, content } = event.data;
      const comment = posts[event.data.postId].comments.find(
        (comment) => comment.id === id
      );

      comment.status = status;
      comment.content = content;

      break;
    }
    default:
      break;
  }
};

app.post("/events", (req, res) => {
  const event = req.body;
  handleEvent(event)
  
  console.log(`RECV ${event.type}`);
  res.end();
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.listen(4002, async () => {
  const res = await axios.get('http://event-bus-srv:4005/events').catch((err) => {
    console.error()
  })

  if (!res) return

  for (let event of res.data) {
    console.log("Processing event:", event.type)
    handleEvent(event)
  }
});
