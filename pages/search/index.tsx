import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import BaseNavbar from "@/components/Navbar/BaseNavbar/BaseNavbar";
import SearchRecipe from "@/components/Search/SearchRecipe/SearchRecipe";
import { CategorySelector } from "@/components/SelectSlider/CategorySelector/CategorySelector";
import HorizonLine from "@/components/HorizonLine/HorizonLine";
import ChevronIcon from "@/components/Icon/ChevronIcon";
import HistorySearch from "@/components/HistorySearch/HistorySearch";
import Trend from "@/components/Trend/Trend";
import StaffPickList from "@/components/StaffPickList/StaffPickList";
import RecipeFeedback from "@/components/RecipeDetail/RecipeComment/RecipeComment";

const Search = () => {
  const themeContext = useContext(ThemeContext);

  const showMoreLinkLabel = "แสดงเพิ่ม";

  return (
    <div>
      <BaseNavbar center={<h2>Search</h2>} isBack />
      <div className="my-3">
        <SearchRecipe />
      </div>
      <HorizonLine />
      <div className="my-3">
        <CategorySelector titleColor={themeContext.blackColor} />
      </div>
      <HorizonLine />
      <HistorySearch linkLabel={showMoreLinkLabel} />
      <HorizonLine />
      <Trend linkLabel={showMoreLinkLabel} />
      <HorizonLine />
      <div className="mb-6">
        <StaffPickList />
      </div>
    </div>
  );
};

export default Search;
