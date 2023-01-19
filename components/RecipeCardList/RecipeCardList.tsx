import { APP_NAME, IMAGE_PATH } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import RecipeCard from "../Card/RecipeCard";
import {
  RecipeCardListContainer,
  RecipeCardListScroll,
} from "./RecipeCarfList.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";
import { RecipeListResponse } from "@/services/recipe/getRecipeList";
import { STATUS_CODE } from "@/services/http/httpStatusCode";
import { RecipeData } from "@/services/recipe/getRecipe";
import getRecipeList from "@/services/recipe/getRecipeList";
import useCurrentUser from "@/utils/auth/useCurrentUser";

const avatarImg = `${IMAGE_PATH}/avatar.png`;
const recipeImg = `${IMAGE_PATH}/example-recipe.jpg`;

type RecipeCardListProps = {
  scrollable?: boolean;
  recipeList?: RecipeData[];
};

type RenderRecipeListType = {
  scrollable?: boolean;
  recipeList?: RecipeData[];
};

const DEFAULT_RECIPE_CARD_WIDTH = "170px";

const RecipeCardList = ({ scrollable = false }: RecipeCardListProps) => {
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();
  const { user } = useCurrentUser();

  const [recipeList, setRecipeList] = useState<RecipeData[] | undefined>();

  let grid: number;
  let imgHeight: string;

  if (isMobile) {
    grid = 2;
    imgHeight = "9.6rem";
  } else if (isTablet) {
    grid = 3;
    imgHeight = "13rem";
  } else {
    grid = 5;
    imgHeight = "14rem";
  }

  const fetchRecipeList = async () => {
    const recipeListResponse: RecipeListResponse | null | undefined =
      await getRecipeList({ user_id: user?.id });

    if (recipeListResponse && recipeListResponse.status === STATUS_CODE.OK) {
      setRecipeList(recipeListResponse.data);
    }
  };

  useEffect(() => {
    fetchRecipeList();
  }, [user]);

  const renderRecipeList = ({
    scrollable,
    recipeList,
  }: RenderRecipeListType) => {
    return (
      recipeList &&
      recipeList.length > 0 &&
      recipeList.map((recipe, index) => {
        const lastCard = index === recipeList.length - 1 ? "mr-4" : "";

        return (
          <React.Fragment key={`recipe-card--${index}`}>
            <RecipeCard
              className={scrollable ? lastCard : ""}
              imgHeight={imgHeight}
              width={scrollable ? DEFAULT_RECIPE_CARD_WIDTH : ""}
              recipe={recipe}
              user={recipe.user}
              auth={user}
              isLiked={recipe.is_like || false}
            />
          </React.Fragment>
        );
      })
    );
  };

  return (
    <div className="my-4">
      {scrollable ? (
        <RecipeCardListScroll className="-mr-5">
          <RecipeCardListContainer scrollable={scrollable}>
            {renderRecipeList({ scrollable: true, recipeList: recipeList })}
          </RecipeCardListContainer>
        </RecipeCardListScroll>
      ) : (
        <RecipeCardListContainer scrollable={scrollable} grid={grid}>
          {renderRecipeList({ scrollable: false, recipeList: recipeList })}
        </RecipeCardListContainer>
      )}
    </div>
  );
};

export default RecipeCardList;
