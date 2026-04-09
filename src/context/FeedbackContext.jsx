"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const [dataFeedback, setDataFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/data/feedback.json`);
        const data = res.data;  
        // console.log(data);
        
        setDataFeedback(data);
      } catch (err) {
        console.error("Failed to fetch feedback:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();
  }, []);

  return (
    <FeedbackContext.Provider value={{ dataFeedback, loading }}>
      {children}
    </FeedbackContext.Provider>
  );
}

// Custom hook for cleaner usage
export function useFeedback() {
  return useContext(FeedbackContext);
}
