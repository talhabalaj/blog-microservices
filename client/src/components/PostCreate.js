import React, { useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");

  const postSubmitHandler = async event => {
    event.preventDefault();

    await axios.post("http://blog.k8s.local/posts/create", {
      title
    })

    setTitle("");
  }


  return <div>
    <form onSubmit={postSubmitHandler}>
      <div className="form-group mb-2">
        <label className="form-label">Title</label>
        <input className="form-control" value={title} onChange={ev => setTitle(ev.target.value)} type="text" placeholder="Title" />
      </div>
      <button className="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
}