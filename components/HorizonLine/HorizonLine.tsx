import React from "react";

type HorizonLineProps = {
  isFit?: boolean;
};

const HorizonLine = ({ isFit = false }: HorizonLineProps) => {
  return (
    <>
      <hr className={`mt-5 mb-4 ${!isFit ? "-ml-5 -mr-5" : ""}`} />
    </>
  );
};

export default HorizonLine;
