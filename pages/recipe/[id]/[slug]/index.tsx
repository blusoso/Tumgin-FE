import React, { useContext, useEffect, useState } from "react";
import { APP_NAME, IMAGE_PATH } from "@/utils/constant";
import BaseNavbar from "@/components/Navbar/BaseNavbar/BaseNavbar";
import BaseAvatar from "@/components/Avatar/BaseAvatar/BaseAvatar";
import styled, { ThemeContext } from "styled-components";
import RecipeInfo from "@/components/RecipeDetail/RecipeInfo/RecipeInfo";
import RecipeReactionButton from "@/components/RecipeDetail/RecipeReactionButton/RecipeReactionButton";
import ReadMore from "@/components/ReadMore/ReadMore";
import Ingredient from "@/components/Ingredient/Ingredient";
import DirectionList from "@/components/DirectionList/DirectionList";
import HorizonLine from "@/components/HorizonLine/HorizonLine";
import Button, { BUTTON_TYPE } from "@/components/Button/Button";
import BulbIcon from "@/components/Icon/BulbIcon";
import ButtonFooter from "@/components/ButtonFooter/ButtonFooter";
import RecipeComment from "@/components/RecipeDetail/RecipeComment/RecipeComment";
import RecipeFeedback from "@/components/RecipeDetail/RecipeFeedback/RecipeFeedback";
import RecipeFeedbackList from "@/components/RecipeDetail/RecipeFeedbackList/RecipeFeedbackList";
import TopicHeader from "@/components/TopicHeader/TopicHeader";
import RecipeCardList from "@/components/RecipeCardList/RecipeCardList";
import Router, { useRouter } from "next/router";
import HomeNavbar from "@/components/Navbar/HomeNavbar/HomeNavbar";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";
import { BackgroundFadeToTop, HideScrollBar } from "@/components/Mixin/Mixin";
import { STATUS_CODE } from "@/services/http/httpStatusCode";
import getRecipe, {
  RecipeData,
  RecipeRequest,
  RecipeResponse,
} from "@/services/recipe/getRecipe";
import { DEFAULT_THUMBNAIL_IMG } from "@/components/Card/RecipeCard";
import getRecipeIngredientList, {
  RecipeIngredientData,
  RecipeIngredientListResponse,
} from "@/services/recipe/getRecipeIngredientList";
import useCurrentUser from "@/utils/auth/useCurrentUser";
import likeRecipe, { LikeRecipeRequest } from "@/services/recipe/likeRecipe";

const recipeImg = `${IMAGE_PATH}/example-recipe.jpg`;
const avatarImg = `${IMAGE_PATH}/avatar.png`;

export enum DIFFICULT_LEVEL {
  EASY = "easy",
  MID = "mid",
  HIGH = "high",
}

const AUTHOR = { img: avatarImg, name: APP_NAME };
const RECIPE_DETAIL = {
  id: 1,
  thumbnail: recipeImg,
  name: "ข้าวไข่ข้นลูกชิ้นอกไก่",
  name_en: "Scramble Egg Rice Chicken",
  slug: "scramble-egg-rice-chicken",
  difficult_level: DIFFICULT_LEVEL.MID,
  rating_avg: 4.9,
  cal: 365,
  time: 30,
  serving: 1,
  protein: 25,
  protein_percent: 10,
  fat: 40,
  fat_percent: 20,
  carb: 120,
  carb_percent: 60,
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  ingredients: [
    {
      id: 1,
      emoji: "🍞",
      name: "ขนมปัง",
      name_en: "bread",
      slug: "bread",
      amount: 1,
      unit: "แผ่น",
    },
    {
      id: 2,
      emoji: "🐔",
      name: "เนื้อไก่",
      name_en: "chicken",
      slug: "chicken",
      amount: 200,
      unit: "กรัม",
    },
    {
      id: 3,
      emoji: "🌶️",
      name: "พริก",
      name_en: "chilli",
      slug: "chilli",
      amount: 0.5,
      unit: "กรัม",
    },
  ],

  directions: [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    "It was popularised in the 1960s with the release of Letraset sheets containing",
  ],

  comments: [
    {
      id: 1,
      user: "miso miso",
      avatar: avatarImg,
      message: "สอบถามค่า มะนาวช่วยเรื่องอะไรเหรอคะ 😊",
      rating: 0,
      img: [],
      comments: [
        {
          id: 5,
          user: "Tumgin",
          avatar: avatarImg,
          message: "ช่วยเรื่องสีคะ ทำให้สีเข้มดูน่ารับประทานมากยิ่งขึ้นค่ะ",
          rating: 0,
          img: [],
          created_at: "3 วันที่แล้ว",
        },
        {
          id: 6,
          user: "miso miso",
          avatar: avatarImg,
          message: "ขอบคุณค่ะ",
          rating: 0,
          img: [],
          created_at: "2 วันที่แล้ว",
        },
      ],
      created_at: "29-12-2022 19:12",
    },
    {
      id: 2,
      user: "Dissa",
      avatar: avatarImg,
      message: "น่าทานมากเลยค่ะไว้จะลองทำดูโดยปกติเวลาทำแล้วเละตลอดเลยค่ะ 😂",
      rating: 0,
      img: [],
      comments: [],
      created_at: "29-12-2022 19:12",
    },
    {
      id: 3,
      user: "miso miso",
      avatar: avatarImg,
      message:
        "สอบถามค่า มะนาวช่วยเรื่องอะไรเหรอ สอบถามค่า มะนาวช่วยเรื่องอะไรเหรอ สอบถามค่า มะนาวช่วยเรื่องอะไรเหรอ สอบถามค่า มะนาวช่วยเรื่องอะไรเหรอ สอบถามค่า มะนาวช่วยเรื่องอะไรเหรอ",
      rating: 4,
      img: [],
      comments: [],
      created_at: "29-12-2022 19:12",
    },
    {
      id: 4,
      user: "miso miso",
      avatar: avatarImg,
      message: "สอบถามค่า มะนาวช่วยเรื่องอะไรเหรอคะ 😊",
      rating: 0,
      img: [],
      comments: [],
      created_at: "29-12-2022 19:12",
    },
  ],
  isStaffPick: true,
  created_at: "1 วันที่แล้ว",
};

export const StartCookSectionWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  width: 100%;
  background-image: linear-gradient(
    to top,
    rgba(255, 255, 255, 1),
    rgba(255, 0, 0, 0)
  );
`;

export const StartCookButtonWrapper = styled.div`
  margin: 1.6rem auto;
  width: fit-content;
`;

export const RecipeReactionFixed = styled.div`
  position: fixed;
  bottom: 4%;
  right: 3%;
  z-index: 3;

  display: flex;
  flex-direction: column-reverse;
`;

export const IngredientSection = styled(HideScrollBar)`
  position: fixed;
  top: 7rem;
  right: 3%;
  width: 20rem;

  border: 1px solid ${({ theme }) => theme.lightGrayColor};
  border-radius: ${({ theme }) => theme.borderRadiusLg};
  padding: 1rem 1.8rem;
  max-height: 25rem;
  overflow: scroll;
`;

const COOKING_ICON_WIDTH = "1.5rem";

const RecipeDetail = () => {
  const themeContext = useContext(ThemeContext);
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();
  const { user } = useCurrentUser();

  const router = useRouter();
  const { id } = router.query;

  const [recipe, setRecipe] = useState<RecipeData | undefined>();
  const [isLikedActive, setIsLikedActive] = useState(false);

  let marginBetweenSection: string = "";

  if (isMobile) {
    marginBetweenSection = "my-4";
  } else {
    marginBetweenSection = "my-6";
  }

  const fetchRecipe = async () => {
    if (id && typeof id === "string") {
      let recipeRequest: RecipeRequest;

      if (user) {
        recipeRequest = {
          recipe_id: parseInt(id),
          user_id: user.id,
        };
      } else {
        recipeRequest = {
          recipe_id: parseInt(id),
        };
      }

      console.log(recipeRequest);

      const recipeResponse: RecipeResponse | null | undefined = await getRecipe(
        recipeRequest
      );

      if (recipeResponse && recipeResponse.status === STATUS_CODE.OK) {
        setRecipe(recipeResponse.data);
        setIsLikedActive(recipeResponse.data.is_like);
        console.log(recipeResponse.data);
      }
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id, user]);

  const handleToggleLikeRecipe = async () => {
    if (user && recipe) {
      const likeRecipeRequest: LikeRecipeRequest = {
        user_id: user.id,
        recipe_id: recipe.id,
      };

      await likeRecipe(likeRecipeRequest);
      setIsLikedActive(!isLikedActive);
    }
  };

  const recipeAuthor = (
    <div className="ml-2">
      <BaseAvatar
        img={recipe?.user.profile_img || DEFAULT_THUMBNAIL_IMG}
        size="36px"
        borderRadius={themeContext.borderRadiusSm}
      />
    </div>
  );

  const renderCookingIcon = (
    <BulbIcon color="#fff" iconWidth={COOKING_ICON_WIDTH} className="mr-1" />
  );

  const startCooking = () => {
    const recipeCookingLink = `/recipe/${RECIPE_DETAIL.id}/${RECIPE_DETAIL.slug}/cooking`;
    Router.push(recipeCookingLink);
  };

  const renderRecipeReactionButton = () => {
    if (recipe) {
      return (
        <RecipeReactionButton
          isLiked={isLikedActive}
          isUserLoggedIn={!!user}
          onToggleLikeRecipe={handleToggleLikeRecipe}
        />
      );
    }
  };

  const renderRecipeDetailHeader = (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <BaseNavbar left={recipeAuthor} isBack />
        <h3>{recipe?.user.username}</h3>
      </div>
      <div className="flex items-center gap-3">
        {isMobile && renderRecipeReactionButton()}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <HomeNavbar />

      {recipe && (
        <div
          className={`relative ${isTablet ? "px-20" : !isMobile && "px-72"}`}
        >
          <RecipeReactionFixed>
            {!isMobile && renderRecipeReactionButton()}
          </RecipeReactionFixed>

          {renderRecipeDetailHeader}

          <RecipeInfo recipe={recipe} />

          <div className={marginBetweenSection}>
            <ReadMore>{recipe.description}</ReadMore>
          </div>

          {recipe.recipe_ingredients && recipe.recipe_ingredients.length > 0 && (
            <div className={marginBetweenSection}>
              <Ingredient recipeIngredientList={recipe.recipe_ingredients} />
            </div>
          )}

          {recipe.directions && recipe.directions.length > 0 && (
            <div className={marginBetweenSection}>
              <DirectionList directionList={recipe.directions} />
            </div>
          )}

          <div className={marginBetweenSection}>
            <RecipeComment commentList={RECIPE_DETAIL.comments} />
          </div>

          <HorizonLine />

          <div className={marginBetweenSection}>
            <RecipeFeedbackList commentList={RECIPE_DETAIL.comments} />
          </div>
        </div>
      )}

      <div className={`mb-12 ${!isMobile ? "px-10" : ""}`}>
        <HorizonLine />

        <TopicHeader title="🍻 สูตรอาหารที่คล้ายกัน" />
        <RecipeCardList scrollable={true} />

        <div className="mt-5">
          <TopicHeader title="🥨 สูตรอาหารที่คุณอาจจะชอบ" />
          <RecipeCardList scrollable={true} />
        </div>
      </div>

      {/* <ButtonFooter iconStart={renderCookingIcon} onClick={startCooking}>
        เริ่มทำอาหาร
      </ButtonFooter> */}
    </div>
  );
};

export default RecipeDetail;
