import { useRef, useState, useEffect } from "react";

export function useSectionSnap() {

  const [startY, setStartY] = useState(null);

  const sectionInViewRef = useRef(0);
  const nextRef = useRef(1);
  const prevRef = useRef(null);
  
  // ------------------- HELPER FUCTION ----------------------- //
  
  const scrollToSection = (direction) => {
    const sections = document.querySelectorAll("[data-section]");
    if (!sections.length) return;

    if (direction === "up") {
      if (nextRef.current > sections.length - 1) return;
      sections[nextRef.current]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (direction === "down") {
      if (prevRef.current < 0) return;
      sections[prevRef.current]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  // ------------------- OBSERVER ----------------------- //
  
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    // console.log(sections);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.section);
            sectionInViewRef.current = id;
            nextRef.current = id + 1;
            prevRef.current = id - 1;
            // console.log(`Section ${parseInt(sectionInViewRef.current)} is in view`);
          }
        });
      },
      {
        root: null,
        threshold: 0.98,
      }
    );
    
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });
    
    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  
  // ------------------- KEY DOWN SNAPPING ----------------------- //
  
  useEffect(() => {
    function handleKeydown(event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        scrollToSection("up"); // ArrowDown = scroll down = "up" to next section
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        scrollToSection("down"); // ArrowUp = scroll up = "down" to previous section
      }
    }
    
    window.addEventListener("keydown", handleKeydown);
    
    return () => window.removeEventListener("keydown", handleKeydown);
  });
  
  // ------------------- MOUSE WHEEL SNAPPING ----------------------- //
  
  useEffect(() => {
    function handleMouseWheel(event) {
      if (event.deltaY > 0) scrollToSection("up");
      else if (event.deltaY < 0) scrollToSection("down");
    }
    
    window.addEventListener("wheel", handleMouseWheel);
    
    return () => window.removeEventListener("wheel", handleMouseWheel);
  });
  
  // ------------------- VERTICAL SWIPE SNAPPING ----------------------- //
  
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  }; 
  
  const handleTouchEnd = (e) => {
    if (startY === null) return;
    
    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY;
    
    if (deltaY > 100) scrollToSection("down"); // swipe down
    else if (deltaY < -100) scrollToSection("up"); // swipe up
    
    setStartY(null);
  };

  return { handleTouchStart, handleTouchEnd };
}
