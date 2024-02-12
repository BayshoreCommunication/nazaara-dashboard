import { useState, useRef, useEffect } from "react";

function useToggle() {
  const [toggle, setToggle] = useState(false);
  const node = useRef(null);

  const clickOutside = (e: any) => {
    if ((node as any)?.current?.contains(e.target)) {
      return;
    }
    setToggle(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return { toggle, setToggle, node };
}

export default useToggle;
