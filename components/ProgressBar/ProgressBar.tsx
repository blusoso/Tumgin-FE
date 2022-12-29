import React, { useEffect, useState } from "react";
import {
  ProgressBarStyle,
  ProgressBarWrapperStyle,
} from "./ProgressBar.styled";

type ProgressBarProps = {
  current: number;
  total: number;
  isDone?: boolean;
};

const ProgressBar = ({ current, total, isDone }: ProgressBarProps) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calPercentage = (current / (total + 1)) * 100;
    setPercentage(calPercentage);
  }, [current]);

  useEffect(() => {
    if (isDone) {
      setPercentage(100);
    }
  }, [isDone]);

  return (
    <>
      <ProgressBarWrapperStyle>
        <ProgressBarStyle width={`${percentage}%`} />
      </ProgressBarWrapperStyle>
    </>
  );
};

export default ProgressBar;
