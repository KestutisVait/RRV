// "use client";
// import { createContext, useContext, useState } from "react";

// const IntroContext = createContext();

// export function IntroProvider({ children }) {
//   // Lazy initialize from sessionStorage to avoid flicker
//   const [introPlayed, setIntroPlayed] = useState(() => {
//     if (typeof window === "undefined") return false;
//     return sessionStorage.getItem("introPlayed") === "true";
//   });

//   const markPlayed = () => {
//     if (typeof window !== "undefined") {
//       sessionStorage.setItem("introPlayed", "true");
//     }
//     setIntroPlayed(true);
//   };

//   return (
//     <IntroContext.Provider value={{ introPlayed, markPlayed }}>
//       {children}
//     </IntroContext.Provider>
//   );
// }

// export function useIntro() {
//   return useContext(IntroContext);
// }
