import Link from "next/link";
import React from "react";
import { APP_NAME } from "../../utils/constant";

type LogoProps = {
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link href="/">
      <h1 className={`text-center cursor-pointer ${className}`}>{APP_NAME}</h1>
    </Link>
  );
};

export default Logo;
