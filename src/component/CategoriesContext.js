import React, { createContext, useContext } from "react";

// CATEGORIES 데이터
export const CATEGORIES = [
  { name: "technology", color: "#3b82ff" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#197316" },
  { name: "news", color: "#8b5cf6" },
];

// Context 생성
const CategoriesContext = createContext();

// Context Provider 컴포넌트
export const CategoriesProvider = ({ children }) => {
  return (
    <CategoriesContext.Provider value={CATEGORIES}>
      {children}
    </CategoriesContext.Provider>
  );
};

// useCategories 커스텀 훅 (Context 값을 사용할 때마다 호출)
export const useCategories = () => {
  return useContext(CategoriesContext);
};
