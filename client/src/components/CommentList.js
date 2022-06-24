export default function CommentList({ comments }) {
  const renderdComments = comments.map((comment) => {
    let content;

    if (comment.status === "approved") content = comment.content;
    else if (comment.status === "rejected")
      content = <i>This comment has been rejected</i>;
    else if (comment.status === "pending")
      content = <i>This comment is awaiting moderation</i>;

    return <li key={comment.id}>{content}</li>;
  });

  return <div>{renderdComments}</div>;
}
