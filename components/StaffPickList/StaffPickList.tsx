import React from "react";
import RecipeCardList from "../RecipeCardList/RecipeCardList";
import TopicHeader from "../TopicHeader/TopicHeader";

const StaffPickList = () => {
  return (
    <>
      <TopicHeader title="♨️ การันตีโดยทีมงาน Tumgin" />
      <RecipeCardList scrollable={true} />
    </>
  );
};

export default StaffPickList;
