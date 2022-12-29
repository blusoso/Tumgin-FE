import React from "react";
import { BUTTON_TYPE } from "../Button/Button";
import ButtonFooter from "../ButtonFooter/ButtonFooter";
import ChevronIcon from "../Icon/ChevronIcon";
import BaseNavbar from "../Navbar/BaseNavbar/BaseNavbar";
import RecipeImagePreview from "../RecipeDetail/RecipeImagePreview/RecipeImagePreview";
import RecipeInfoList from "../RecipeDetail/RecipeInfoList/RecipeInfoList";

type CookingProcessLayoutProps = {
  recipe: any;
  topic: string | React.ReactNode;
  children: JSX.Element;
  onBack: () => void;
  onNext: () => void;
};

export const renderChevronIcon = (rotation: string) => (
  <ChevronIcon
    color="#fff"
    iconWidth="24px"
    className="mt-1.5"
    rotation={rotation}
  />
);

const CookingProcessLayout = ({
  recipe,
  topic,
  children,
  onBack,
  onNext,
}: CookingProcessLayoutProps) => {
  return (
    <div>
      <BaseNavbar center={<h2>{recipe.name}</h2>} isBack isNext />
      <div className="my-4">
        <RecipeImagePreview recipe={recipe} />
      </div>
      <RecipeInfoList recipe={recipe} />
      <h3 className="text-center">{topic}</h3>
      {children}
      <ButtonFooter
        leftButtonLabel="ย้อนกลับ"
        leftButtonType={BUTTON_TYPE.SECONDARY}
        leftButtonIconStart={renderChevronIcon("left")}
        rightButtonLabel="ต่อไป"
        rightButtonIconEnd={renderChevronIcon("right")}
        onLeftClick={onBack}
        onRightClick={onNext}
      />
    </div>
  );
};

export default CookingProcessLayout;
