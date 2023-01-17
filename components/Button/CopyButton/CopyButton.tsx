import LinkIcon from "@/components/Icon/LinkIcon";
import React, { useState } from "react";
import { CopyButtonStyle } from "./CopyButton.styled";

type CopyButtonProps = {
  size?: string;
  padding?: string;
  onClickCopyButton: () => void;
};

const CopyButton = ({
  size,
  padding = "0.6em",
  onClickCopyButton,
}: CopyButtonProps) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      onClickCopyButton();
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <CopyButtonStyle size={size} padding={padding} onClick={handleCopyLink}>
      <LinkIcon />
    </CopyButtonStyle>
  );
};

export default CopyButton;
