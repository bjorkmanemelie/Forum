import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThreadContext } from "../context/ThreadContext";
import ReplyList from "../components/ReplyList";
import ReplyForm from "../components/ReplyForm";
import "./ThreadPage.css";

const ThreadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchThread, loading, error } = useContext(ThreadContext);
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const getThread = async () => {
      const data = await fetchThread(id);
      if (data) {
        setThread(data.thread);
        setReplies(data.replies);
      } else {
        // Om tråden inte hittades, navigera tillbaka till startsidan
        navigate("/");
      }
    };

    getThread();
  }, [id]);

  const handleReplyAdded = (newReply) => {
    setReplies([...replies, newReply]);
  };

  if (loading) return <div className="loading">Laddar tråd...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!thread) return null;

  return (
    <div className="thread-page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Tillbaka
      </button>
      <div className="thread-container">
        <h1>{thread.title}</h1>
        <div className="thread-content">{thread.content}</div>
        <div className="thread-date">
          Skapad: {new Date(thread.created_at).toLocaleString()}
        </div>
      </div>

      <h2>Svar</h2>
      {replies.length > 0 ? (
        <ReplyList replies={replies} />
      ) : (
        <p>Inga svar än. Var den första med att svara!</p>
      )}

      <h2>Lämna ett svar</h2>
      <ReplyForm threadId={id} onReplyAdded={handleReplyAdded} />
    </div>
  );
};

export default ThreadPage;
