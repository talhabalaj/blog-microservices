import React, { useState } from "react";
import axios from "axios";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const commentSubmitHandler = async event => {
    event.preventDefault();

    await axios.post(`http://blog.k8s.local/posts/${postId}/comments`, {
      content: content
    })

    setContent("");
  }


  return <div>
    <form onSubmit={commentSubmitHandler}>
      <div className="form-group mb-2">
        <label className="form-label">New Comment</label>
        <input className="form-control" value={content} onChange={ev => setContent(ev.target.value)} type="text" placeholder="Content" />
      </div>
      <button className="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
}