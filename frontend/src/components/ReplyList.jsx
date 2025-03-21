import React from "react";
import "./ReplyList.css";

const ReplyList = ({ replies }) => {
  return (
    <div className="reply-list">
      {replies.map((reply) => (
        <div key={reply.id} className="reply-item">
          <div className="reply-content">{reply.content}</div>
          <div className="reply-date">
            Skapad: {new Date(reply.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyList;
