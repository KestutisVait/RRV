"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductsContext = createContext();

export function ProductProvider({ children }) {
  const [dataProducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ activeCardIndex, setActiveCardIndex ] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/data/produktai.json`)
        const data = res.data;  
        
        setDataProducts(data);
      } catch (err) {
        console.error("Failed to fetch sections:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ dataProducts, loading, activeCardIndex, setActiveCardIndex }}>
      {children}
    </ProductsContext.Provider>
  );
}

// Custom hook for cleaner usage
export function useProducts() {
  return useContext(ProductsContext);
}
