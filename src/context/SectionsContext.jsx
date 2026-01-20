"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SectionsContext = createContext();

export function SectionsProvider({ children }) {
  const [dataSections, setDataSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSections() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/data/nav.json`);
        const data = res.data;  

        setDataSections(data);
      } catch (err) {
        console.error("Failed to fetch sections:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSections();
  }, []);

  return (
    <SectionsContext.Provider value={{ dataSections, loading }}>
      {children}
    </SectionsContext.Provider>
  );
}

// Custom hook for cleaner usage
export function useSections() {
  return useContext(SectionsContext);
}
