import React, { useState } from "react";
import "./ThreadForm.css";

const ThreadForm = ({ onThreadCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validering
    if (!title.trim() || !content.trim()) {
      setError("Både titel och innehåll krävs");
      return;
    }

    onThreadCreated({ title, content });

    // Återställ formuläret
    setTitle("");
    setContent("");
    setError("");
  };

  return (
    <form className="thread-form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Titel</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ange en beskrivande titel"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Innehåll</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Beskriv din fråga eller diskussion"
          rows="6"
        ></textarea>
      </div>

      <button type="submit" className="btn-submit">
        Skapa tråd
      </button>
    </form>
  );
};

export default ThreadForm;
