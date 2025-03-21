import React, { useContext, useEffect } from "react";
import { ThreadContext } from "../context/ThreadContext";
import ThreadList from "../components/ThreadList";
import "./HomePage.css";

const HomePage = () => {
  const { threads, loading, error, fetchThreads } = useContext(ThreadContext);

  useEffect(() => {
    fetchThreads();
  }, []);

  if (loading) return <div className="loading">Laddar trådar...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-page">
      <h1>Diskussionstrådar</h1>
      <ThreadList threads={threads} />
    </div>
  );
};

export default HomePage;
