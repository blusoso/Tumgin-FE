import HomeNavbar from "@/components/Navbar/HomeNavbar/HomeNavbar";
import SearchRecipe from "@/components/Search/SearchRecipe/SearchRecipe";
import SavedReminder from "@/components/SavedRemider/SavedReminder";
import { CategorySelector } from "@/components/SelectSlider/CategorySelector/CategorySelector";
import TopicHeader from "@/components/TopicHeader/TopicHeader";
import RecipeCardList from "@/components/RecipeCardList/RecipeCardList";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import TabMenu from "@/components/TabMenu/TabMenu";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";

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

export default function Home() {
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();

  const renderRecipeDesktop = (
    <div className="mt-5">
      <TabMenu tabMenuList={TAB_MENU_LIST} />
      <RecipeCardList scrollable={false} />
    </div>
  );

  const renderRecipeMobile = (
    <>
      <div className="mt-5">
        <TopicHeader
          title="🔥 เมนูยอดนิยม"
          linkLabel="ดูทั้งหมด"
          link="/"
          paddingIconTop="3px"
        />
        <RecipeCardList scrollable={true} />
      </div>
      <div className="mt-5">
        <TopicHeader title="💖 แนะนำสำหรับคุณ" />
        <RecipeCardList scrollable={false} />
      </div>
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
}
