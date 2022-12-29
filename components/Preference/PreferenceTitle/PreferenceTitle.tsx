import React from "react";

type PreferenceTitleProps = {
  title: string;
  subTitle?: string;
};

const PreferenceTitle = ({ title, subTitle }: PreferenceTitleProps) => {
  return (
    <div className="my-3">
      <h2 className="mb-1">{title}</h2>
      <p className="text-secondary">{subTitle}</p>
    </div>
  );
};

export default PreferenceTitle;
