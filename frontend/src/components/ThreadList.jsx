
import React from "react";
import { Link } from "react-router-dom";
import "./ThreadList.css";

const ThreadList = ({ threads }) => {
  if (!threads.length) {
    return <p>Inga trådar hittades.</p>;
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <div key={thread.id} className="thread-item">
          <Link to={`/threads/${thread.id}`}>
            <h2>{thread.title}</h2>
          </Link>
          <p className="thread-preview">
            {thread.content.substring(0, 150)}
            {thread.content.length > 150 ? "..." : ""}
          </p>
          <p className="thread-date">
            Skapad: {new Date(thread.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
