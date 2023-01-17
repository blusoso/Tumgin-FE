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
import useCurrentUser from "@/utils/auth/useCurrentUser";
import likeRecipe, { LikeRecipeRequest } from "@/services/recipe/likeRecipe";
import getReviewList, {
  ReviewData,
  ReviewListRequest,
  ReviewListResponse,
} from "@/services/recipe/getReviewList";
import LoadMoreButton from "@/components/Button/LoadMoreButton/LoadMoreButton";
import CreateReview, {
  CreateReviewRequest,
  CreateReviewResponse,
} from "@/services/recipe/createReview";
import { useRecoilState } from "recoil";
import { reviewInputState } from "@/recoils/index";
import SlideModal from "@/components/Modal/SlideModal/SlideModal";
import BaseModal from "@/components/Modal/BaseModal/BaseModal";
import { formatTime } from "@/utils/time";
import Link from "next/link";

const recipeImg = `${IMAGE_PATH}/example-recipe.jpg`;
const avatarImg = `${IMAGE_PATH}/avatar.png`;

export enum DIFFICULT_LEVEL {
  EASY = "easy",
  MID = "mid",
  HIGH = "high",
}

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

export const GuestCommentReview = styled.div`
  background: ${({ theme }) => theme.lightGreenColor};
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadiusLg};

  padding: 1.2rem;
  margin-top: 1rem;
`;

export type ReviewInput = {
  message: string;
  rating: number;
};

const COOKING_ICON_WIDTH = "1.5rem";
const DEFAULT_REVIEW_LIMIT = 5;

const RecipeDetail = () => {
  const themeContext = useContext(ThemeContext);
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();
  const { user } = useCurrentUser();

  const router = useRouter();
  const { id } = router.query;

  const [reviewInput, setReviewInput] = useRecoilState(reviewInputState);

  const [recipe, setRecipe] = useState<RecipeData | undefined>();
  const [isLikedActive, setIsLikedActive] = useState(false);
  const [reviewList, setReviewList] = useState<ReviewData[] | undefined>();
  const [addedReviewList, setAddedReviewList] = useState<ReviewData[] | []>([]);
  const [skipReview, setSkipReview] = useState<number>(0);
  const [showLoadMoreReviewButton, setShowLoadMoreReviewButton] =
    useState(false);

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

      const recipeResponse: RecipeResponse | null | undefined = await getRecipe(
        recipeRequest
      );

      if (recipeResponse && recipeResponse.status === STATUS_CODE.OK) {
        setRecipe(recipeResponse.data);
        if (recipeResponse.data.is_like) {
          setIsLikedActive(recipeResponse.data.is_like);
        }
      }
    }
  };

  const fetchReview = async (skip?: number, limit?: number) => {
    if (recipe) {
      const reviewRequest: ReviewListRequest = {
        recipe_id: recipe.id,
        skip: skip || 0,
        limit: limit || DEFAULT_REVIEW_LIMIT,
      };

      const reviewResponse: ReviewListResponse | null | undefined =
        await getReviewList(reviewRequest);

      if (reviewResponse && reviewResponse.status === STATUS_CODE.OK) {
        if (!reviewList) {
          setReviewList(reviewResponse.data);
        } else {
          setReviewList([...reviewList, ...reviewResponse.data]);
        }
      }
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id, user]);

  useEffect(() => {
    fetchReview();
  }, [recipe]);

  useEffect(() => {
    if (reviewList && recipe) {
      if (recipe.review_amount <= reviewList.length + addedReviewList.length) {
        setShowLoadMoreReviewButton(false);
      } else if (recipe.review_amount > DEFAULT_REVIEW_LIMIT) {
        setShowLoadMoreReviewButton(true);
      }
    }
  }, [reviewList]);

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
    if (recipe) {
      const recipeCookingLink = `/recipe/${recipe.id}/${recipe.slug}/cooking`;
      Router.push(recipeCookingLink);
    }
  };

  const renderRecipeReactionButton = () => {
    if (recipe) {
      const sharedUrl = `${process.env.NEXT_PUBLIC_HOST}/recipe/${recipe.id}/${recipe.slug}`;
      const sharedTitle = `ミ${APP_NAME}ミ ${recipe.name} | 🔥 ${
        recipe.calory
      } Kcal | 🕒 ใช้เวลาในการทำ ${formatTime(
        recipe.minute || 0
      )} | 🥗 อาหารเพื่อสุขภาพสุดแสนอร่อย`;

      return (
        <RecipeReactionButton
          isLiked={isLikedActive}
          isUserLoggedIn={!!user}
          sharedUrl={sharedUrl}
          sharedTitle={sharedTitle}
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

  const handleLoadMoreReview = async () => {
    if (recipe) {
      if (skipReview < recipe.review_amount - 1) {
        const nextReview = skipReview + DEFAULT_REVIEW_LIMIT;

        setSkipReview(nextReview);
        await fetchReview(nextReview);
      }
    }
  };

  const handleStarRating = (newRating: number) => {
    setReviewInput({ ...reviewInput, rating: newRating });
  };

  const handleReviewMessageChange = (e: any) => {
    setReviewInput({ ...reviewInput, message: e.target.value });
  };

  const handleReviewRecipe = async () => {
    if (user && recipe) {
      const createReviewRequest: CreateReviewRequest = {
        user_id: user.id,
        recipe_id: recipe.id,
        rating: reviewInput.rating,
        comment: reviewInput.message,
      };

      const createReviewResponse: CreateReviewResponse | null | undefined =
        await CreateReview(createReviewRequest);

      if (
        createReviewResponse &&
        createReviewResponse.status === STATUS_CODE.OK
      ) {
        if (reviewList) {
          setAddedReviewList([
            // @ts-ignore
            ...[createReviewResponse.data],
            // @ts-ignore
            ...addedReviewList,
          ]);
        }
      }
    }
  };

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

          <h3>
            <span>ความคิดเห็น </span>
            {recipe.review_amount > 0 && (
              <span className="text-secondary">({recipe.review_amount})</span>
            )}
          </h3>

          {user ? (
            <div className={marginBetweenSection}>
              <RecipeComment
                profileImg={user.profile_img || ""}
                reviewAmount={recipe.review_amount}
                onStarRating={handleStarRating}
                onReviewMessageChange={handleReviewMessageChange}
                onSubmit={handleReviewRecipe}
              />
            </div>
          ) : (
            <>
              <GuestCommentReview>
                <h4>
                  <Link href="/session/new" className="link--underline">
                    เข้าสู่ระบบ
                  </Link>
                </h4>
                <p>เพื่อแชร์ความคิดเห็นของคุณ</p>
              </GuestCommentReview>
            </>
          )}

          {reviewList && reviewList.length > 0 && (
            <>
              <HorizonLine />

              <div className={marginBetweenSection}>
                {addedReviewList && addedReviewList.length > 0 && (
                  <RecipeFeedbackList reviewList={addedReviewList} />
                )}

                <RecipeFeedbackList reviewList={reviewList} />
              </div>

              {showLoadMoreReviewButton && (
                <LoadMoreButton onLoadMoreClick={handleLoadMoreReview} />
              )}
            </>
          )}
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
