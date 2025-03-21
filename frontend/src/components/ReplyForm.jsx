import React, { useState, useContext } from "react";
import { ThreadContext } from "../context/ThreadContext";
import "./ReplyForm.css";

const ReplyForm = ({ threadId, onReplyAdded }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { createReply } = useContext(ThreadContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validering
    if (!content.trim()) {
      setError("Innehåll krävs"); //Skrivs ut vid error
      return;
    }

    const newReply = await createReply(threadId, { content });

    if (newReply) {
      onReplyAdded(newReply);
      setContent("");
      setError("");
    }
  };

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Skriv ditt svar här..."
          rows="4"
        ></textarea>
      </div>

      <button type="submit" className="btn-submit"> 
        Skicka svar
      </button>
    </form>
  );
};

export default ReplyForm;
