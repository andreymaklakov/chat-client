import { useEffect, useRef, useState } from "react";

export const useOutside = (initialIsVisible) => {
  const [isShown, setIsShown] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsShown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isShown, setIsShown };
};
