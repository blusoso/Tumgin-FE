import CookingProcessLayout from "@/components/CookingProcessLayout/CookingProcessLayout";
import { RecipeImgs } from "@/components/RecipeDetail/RecipeInfo/RecipeInfo.styled";
import { APP_NAME, IMAGE_PATH } from "@/utils/constant";
import React from "react";

const recipeImg = `${IMAGE_PATH}/example-recipe.jpg`;
const avatarImg = `${IMAGE_PATH}/avatar.png`;

export enum DIFFICULT_LEVEL {
  EASY = "easy",
  MID = "mid",
  HIGH = "high",
}

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
          user: APP_NAME,
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

const Cooking = () => {
  return (
    <div>
      <CookingProcessLayout recipe={RECIPE_DETAIL} topic="เตรียมส่วนผสม" />
    </div>
  );
};

export default Cooking;
