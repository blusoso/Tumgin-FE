import React, { useEffect, useState } from "react";

export enum MQ {
  SS = "ss",
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

export enum MQ_SIZE {
  SS = 320,
  XS = 480,
  SM = 768,
  MD = 1024,
  LG = 1440,
}

export enum WINDOW_DEVICE {
  MOBILE = "mobile",
  TABLET = "tablet",
  DESKTOP = "desktop",
}

export type WindowSize = {
  width: number;
  height: number;
  mq: MQ;
  device: WINDOW_DEVICE;
};

export const getMQ = (width: number) => {
  let mq: MQ = MQ.SS;
  let device: WINDOW_DEVICE = WINDOW_DEVICE.MOBILE;

  if (width >= MQ_SIZE.SS && width < MQ_SIZE.XS) {
    mq = MQ.XS;
    device = WINDOW_DEVICE.MOBILE;
  }
  if (width >= MQ_SIZE.XS && width < MQ_SIZE.SM) {
    mq = MQ.SM;
    device = WINDOW_DEVICE.MOBILE;
  }
  if (width >= MQ_SIZE.SM && width < MQ_SIZE.MD) {
    mq = MQ.MD;
    device = WINDOW_DEVICE.TABLET;
  }
  if (width >= MQ_SIZE.MD && width < MQ_SIZE.LG) {
    mq = MQ.LG;
    device = WINDOW_DEVICE.DESKTOP;
  }
  if (width >= MQ_SIZE.LG) {
    mq = MQ.XL;
    device = WINDOW_DEVICE.DESKTOP;
  }

  return { mq, device };
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    mq: MQ.SS,
    device: WINDOW_DEVICE.MOBILE,
  });

  const handler = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      mq: getMQ(window.innerWidth).mq,
      device: getMQ(window.innerWidth).device,
    });
  };

  useEffect(() => {
    handler();
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
