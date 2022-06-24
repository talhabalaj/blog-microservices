import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";

export default function PostList() {
  const [posts, setPosts] = useState({});
  const [err, setErr] = useState(undefined);

  const fetchPosts = async () => {
    try {
      const { data: posts } = await axios.get("http://blog.k8s.local/posts");

      setPosts(posts);
    } catch (e) {
      setErr(e.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts)?.map((post, idx) => (
    <Post key={idx} post={post} />
  ));

  return (
    <div>
      {err && <span style={{ color: "red" }}>{err}</span>}
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
      </div>
    </div>
  );
}
