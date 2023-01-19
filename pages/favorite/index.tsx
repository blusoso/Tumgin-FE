import React, { useEffect, useState } from "react";
import HomeNavbar from "@/components/Navbar/HomeNavbar/HomeNavbar";
import TopicHeader from "@/components/TopicHeader/TopicHeader";
import RecipeCardList from "@/components/RecipeCardList/RecipeCardList";
import useCurrentUser from "@/utils/auth/useCurrentUser";
import getLikeRecipeList, {
  LikeRecipeListData,
  LikeRecipeListResponse,
} from "@/services/recipe/getLikeRecipeList";
import { STATUS_CODE } from "@/services/http/httpStatusCode";
import { RecipeCardListContainer } from "@/components/RecipeCardList/RecipeCarfList.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";
import RecipeCard from "@/components/Card/RecipeCard";
import Link from "next/link";

const Favorite = () => {
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();
  const { user } = useCurrentUser();
  const [likedRecipeList, setLikedRecipeList] =
    useState<LikeRecipeListData[] | undefined>();

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

  const fetchLikeRecipeList = async () => {
    if (user) {
      const likeRecipeListResponse: LikeRecipeListResponse | null | undefined =
        await getLikeRecipeList({ user_id: user.id });

      if (
        likeRecipeListResponse &&
        likeRecipeListResponse.status === STATUS_CODE.OK
      ) {
        setLikedRecipeList(likeRecipeListResponse.data);
      }
    }
  };

  useEffect(() => {
    fetchLikeRecipeList();
  }, [user]);

  const renderRecipeList = (likedRecipeList: LikeRecipeListData[]) => {
    return (
      likedRecipeList &&
      likedRecipeList.length > 0 &&
      likedRecipeList.map((likedRecipe, index) => {
        const lastCard = index === likedRecipeList.length - 1 ? "mr-4" : "";

        return (
          <React.Fragment key={`recipe-card--${index}`}>
            <RecipeCard
              imgHeight={imgHeight}
              recipe={likedRecipe.Recipe}
              user={likedRecipe.User}
              auth={user}
              isLiked={true}
            />
          </React.Fragment>
        );
      })
    );
  };

  return (
    <div className="relative">
      <HomeNavbar showNavMobile={true} />

      <TopicHeader title="💖 เมนูที่ชอบ" paddingIconTop="3px" />

      <div className="my-5">
        {likedRecipeList && likedRecipeList.length > 0 ? (
          <RecipeCardListContainer scrollable={false} grid={grid}>
            {renderRecipeList(likedRecipeList)}
          </RecipeCardListContainer>
        ) : (
          <div className="text-center bg-green--light rounded-xl py-7">
            <h2 className="mb-2">ยังไม่มีเมนูที่ชอบ</h2>
            <p>
              เพิ่มเมนูโปรดของคุณ จากการค้นหาใน <br />
              <Link href="/" className="link--underline">
                หน้าแรก
              </Link>{" "}
              ได้เลย!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
