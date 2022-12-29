import { Meta, Story } from "@storybook/react";
import RecipeCard, { RecipeCardProps } from "./RecipeCard";
import { IMAGE_PATH } from "../../utils/constant";

export default {
  title: "App/RecipeCard",
  component: RecipeCard,
} as Meta;

const Template: Story<RecipeCardProps> = (args) => <RecipeCard {...args} />;

export const RecipeCardPrimary = Template.bind({});

const avatarImg = `${IMAGE_PATH}/avatar.png`;
const recipeImg = `${IMAGE_PATH}/example-recipe.jpg`;

RecipeCardPrimary.args = {
  author: { img: avatarImg, name: "Tumgin" },
  recipe: {
    thumbnail: recipeImg,
    name: "ข้าวไข่ข้นลูกชิ้นอกไก่",
    cal: 365,
    time: 30,
    serving: 1,
    created_at: "1 วันที่แล้ว",
  },
  isLiked: false,
};
