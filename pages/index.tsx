import { useEffect, useState } from "react";

import useDetectTablet from "@/utils/detectDevice/useDetectTablet";
import useCurrentUser from "@/utils/auth/useCurrentUser";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";

import HomeNavbar from "@/components/Navbar/HomeNavbar/HomeNavbar";
import SearchRecipe from "@/components/Search/SearchRecipe/SearchRecipe";
import SavedReminder from "@/components/SavedRemider/SavedReminder";
import { CategorySelector } from "@/components/SelectSlider/CategorySelector/CategorySelector";
import TopicHeader from "@/components/TopicHeader/TopicHeader";
import RecipeCardList from "@/components/RecipeCardList/RecipeCardList";
import TabMenu from "@/components/TabMenu/TabMenu";

import { RecipeData } from "@/services/recipe/getRecipe";
import getRecipeList, {
  RecipeListResponse,
} from "@/services/recipe/getRecipeList";
import { STATUS_CODE } from "@/services/http/httpStatusCode";

const TAB_MENU_LIST = [
  {
    emoji: "🔥",
    name: "เมนูยอดนิยม",
  },
  {
    emoji: "💖",
    name: "แนะนำสำหรับคุณ",
  },
];

const Home = () => {
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();
  const { user } = useCurrentUser();

  const [recipeList, setRecipeList] = useState<RecipeData[] | undefined>();

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

  const renderRecipeDesktop = (
    <div className="mt-5">
      <TabMenu tabMenuList={TAB_MENU_LIST} />
      <RecipeCardList scrollable={false} recipeList={recipeList} />
    </div>
  );

  const renderRecipeMobile = (
    <>
      {recipeList && (
        <>
          <div className="mt-5">
            <TopicHeader
              title="🔥 เมนูยอดนิยม"
              linkLabel="ดูทั้งหมด"
              link="/"
              paddingIconTop="3px"
            />
            <RecipeCardList scrollable={true} recipeList={recipeList} />
          </div>
          <div className="mt-5">
            <TopicHeader title="💖 แนะนำสำหรับคุณ" />
            <RecipeCardList scrollable={false} recipeList={recipeList} />
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <HomeNavbar showNavMobile={true} />
      {(isMobile || isTablet) && (
        <>
          <h2 className="my-2.5 text-center -ml-5">💭 วันนี้ทำอะไรกินดีน้า?</h2>
          <SearchRecipe />
        </>
      )}
      <div className="my-5">
        <CategorySelector />
      </div>
      {isMobile && <SavedReminder savedTryAmount={12} />}
      {isMobile ? renderRecipeMobile : renderRecipeDesktop}
    </>
  );
};

export default Home;
