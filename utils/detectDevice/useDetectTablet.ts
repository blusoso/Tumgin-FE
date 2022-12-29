import { useEffect, useState } from "react";
import { MQ_SIZE } from "./useWindowSize";

const useDetectTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIfTablet = () => {
      if (window.innerWidth >= MQ_SIZE.XS && window.innerWidth < MQ_SIZE.MD) {
        setIsTablet(true);
      } else {
        setIsTablet(false);
      }
    };

    checkIfTablet();
    window.addEventListener("resize", checkIfTablet);

    return () => {
      window.removeEventListener("resize", checkIfTablet);
    };
  }, []);

  return isTablet;
};

export default useDetectTablet;
