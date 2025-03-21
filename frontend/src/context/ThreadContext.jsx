import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ThreadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3000/api";

  // Hämta alla trådar
  const fetchThreads = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/threads`);
      setThreads(response.data);
      setError(null);
    } catch (err) {
      setError("Kunde inte hämta trådar");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Hämta en specifik tråd med dess svar
  const fetchThread = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/threads/${id}`);
      return response.data;
    } catch (err) {
      setError("Kunde inte hämta tråden");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Skapa en ny tråd
  const createThread = async (threadData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/threads`, threadData);
      setThreads([response.data, ...threads]);
      return response.data;
    } catch (err) {
      setError("Kunde inte skapa tråden");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Skapa ett svar på en tråd
  const createReply = async (threadId, replyData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/threads/${threadId}/replies`,
        replyData
      );
      return response.data;
    } catch (err) {
      setError("Kunde inte skapa svaret");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <ThreadContext.Provider
      value={{
        threads,
        loading,
        error,
        fetchThreads,
        fetchThread,
        createThread,
        createReply,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
};
