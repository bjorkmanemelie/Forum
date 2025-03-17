//Importerar filerna och kopplar dom med varandra
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThreadContext } from "../context/ThreadContext";
import ThreadForm from "../components/ThreadForm";
import "./CreateThreadPage.css";

const CreateThreadPage = () => {
  const navigate = useNavigate();
  const { createThread } = useContext(ThreadContext);

  const handleThreadCreated = async (threadData) => {
    const newThread = await createThread(threadData);
    if (newThread) {
      navigate(`/threads/${newThread.id}`);
    }
  };

  return (
    <div className="create-thread-page">
      <h1>Skapa ny diskussionstråd</h1>
      <ThreadForm onThreadCreated={handleThreadCreated} />
    </div>
  );
};

export default CreateThreadPage;
