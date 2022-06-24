import CommentCreate from './CommentCreate'
import CommentList from './CommentList';

export default function Post({ post }) {
  return (
    <div className="card" style={{ width: "30%", marginBottom: "20px" }}>
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  );
}
