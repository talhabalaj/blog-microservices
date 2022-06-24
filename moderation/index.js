const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log(`RECV ${event.type}`);

  switch (event.type) {
    case "CommentCreated": {
      const {
        data: { content },
      } = event;

      await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          ...event.data,
          status: content.includes("orange") ? "rejected" : "approved",
        },
      });

      break;
    }
    default:
      break;
  }

  res.end();
});

app.listen(4003);
