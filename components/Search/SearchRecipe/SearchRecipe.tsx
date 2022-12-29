import React, { useContext, useState } from "react";
import { ReactSVG } from "react-svg";
import { ThemeContext } from "styled-components";
import { useRecoilState } from "recoil";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import { ICON_PATH } from "@/utils/constant";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";
import searchState, { SEARCH_MODE } from "@/recoils/modules/search";

import OptionIcon from "@/components/Icon/OptionIcon";
import Input from "@/components/Input/Input";
import Button, { BUTTON_TYPE } from "@/components/Button/Button";
import SelectModal from "@/components/Select/SelectModal/SelectModal";
import { IngredientSelector } from "@/components/SelectSlider/IngredientSelector/IngredientSelector";
import {
  LinkHover,
  RecommendSearchStyle,
  SearchInputWrapper,
  SearchSelectWrapper,
} from "./SearchRecipe.styled";
import HistorySearch from "@/components/HistorySearch/HistorySearch";
import HorizonLine from "@/components/HorizonLine/HorizonLine";
import Trend from "@/components/Trend/Trend";
import StaffPickList from "@/components/StaffPickList/StaffPickList";

const SEARCH_KEYWORD_PLACEHOLDER = "ค้นหาสูตรอาหาร";
const SEARCH_INGREDIENT_PLACEHOLDER = "ค้นหาจากส่วนผสม";

const SEARCH_MODAL_PADDING = "0.6rem 0";
export const DEFAULT_PADDING_SEARCH_SELECT_MODAL = "0.4rem 1.6rem";

// TODO: suggest 5 of the most relation
const SEARCH_RESULT_MOCKUP = [
  { id: 12, name: "โอ๊ตมีล", slug: "oat-meal" },
  { id: 59, name: "Over Night โอ๊ต", slug: "oat-overnight" },
  { id: 129, name: "โอ๊ตกล้วย", slug: "oat-banana" },
  { id: 23, name: "โอ๊ตช็อกโกแลต", slug: "oat-chocolate" },
  { id: 1, name: "โอ๊ตเนยถั่ว", slug: "oat-peanut-butter" },
];

type SearchRecipeProps = {};

const SearchRecipe = ({}: SearchRecipeProps) => {
  const router = useRouter();
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();
  const themeContext = useContext(ThemeContext);

  const [search, setSearch] = useRecoilState(searchState);
  const { searchMode } = search;
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const searchIcon = <ReactSVG src={`${ICON_PATH}/search-outline.svg`} />;
  const swapIcon = <ReactSVG src={`${ICON_PATH}/swap-outline.svg`} />;

  const switchSearch = () => {
    if (searchMode === SEARCH_MODE.KEYWORD) {
      setSearch({ ...search, searchMode: SEARCH_MODE.INGREDIENT });
    } else {
      setSearch({ ...search, searchMode: SEARCH_MODE.KEYWORD });
    }
  };

  const onClickSearchInput = () => {
    if (isMobile || isTablet) {
      router.push("/search");
    } else {
      setIsOpenSearch(true);
    }
  };

  const handleSearchResultClick = (result: any) => {
    Router.push(`/recipe/${result.id}/${result.slug}`);
    setIsOpenSearch(false);
  };

  const renderRecommendSearch = () => (
    <div>
      <HistorySearch topicPadding={DEFAULT_PADDING_SEARCH_SELECT_MODAL} />
      <HorizonLine isFit />
      <div className="mb-2">
        <Trend topicPadding={DEFAULT_PADDING_SEARCH_SELECT_MODAL} />
      </div>
      {/* <HorizonLine />
      <div className="mb-6">
        <StaffPickList />
      </div> */}
    </div>
  );

  const renderSearchResultList = () => (
    <>
      {SEARCH_RESULT_MOCKUP &&
        SEARCH_RESULT_MOCKUP.map((result) => (
          <LinkHover
            key={`search-result__${result.slug}--${result.id}`}
            onClick={() => handleSearchResultClick(result)}
          >
            {result.name}
          </LinkHover>
        ))}
    </>
  );

  const onChangeSearchInput = (value: string) => {
    setSearchInputValue(value);
  };

  return (
    <>
      <div className="relative flex justify-between gap-2">
        {!isMobile && !isTablet && (
          <SearchSelectWrapper>
            <SelectModal
              isOpen={isOpenSearch}
              position="absolute"
              padding={SEARCH_MODAL_PADDING}
            >
              <>
                {searchInputValue
                  ? renderSearchResultList()
                  : renderRecommendSearch()}
              </>
            </SelectModal>
          </SearchSelectWrapper>
        )}

        <SearchInputWrapper className="w-full">
          <Input
            id="search-recipe"
            placeholder={
              searchMode === SEARCH_MODE.KEYWORD
                ? SEARCH_KEYWORD_PLACEHOLDER
                : SEARCH_INGREDIENT_PLACEHOLDER
            }
            startIcon={searchIcon}
            endIcon={swapIcon}
            endIconClassName={
              searchMode === SEARCH_MODE.INGREDIENT
                ? "switch-icon--ingredient"
                : "switch-icon--keyword"
            }
            onEndIconClick={switchSearch}
            onClick={onClickSearchInput}
            onChange={onChangeSearchInput}
          />
        </SearchInputWrapper>

        <div>
          <Button
            type={BUTTON_TYPE.SECONDARY}
            className="h-full	"
            padding="0 0.8rem"
            onClick={() => console.log("xx")}
          >
            <OptionIcon color={themeContext.blackColor} />
          </Button>
        </div>
      </div>
      {searchMode === SEARCH_MODE.INGREDIENT && isMobile && (
        <IngredientSelector />
      )}
    </>
  );
};

export default SearchRecipe;
