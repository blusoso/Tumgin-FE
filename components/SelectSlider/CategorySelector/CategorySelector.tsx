import React, { useState } from "react";
import TopicHeader from "@/components/TopicHeader/TopicHeader";

import SelectSlider from "../SelectSlider";

const MOCK_CATEGORY_LIST = [
  { emoji: "☀️", name: "ทั้งหมด" },
  { emoji: "🌾", name: "โอ๊ต" },
  { emoji: "🍰", name: "เค้ก" },
  { emoji: "🍅", name: "สลัด" },
  { emoji: "🥔", name: "มันฝรั่ง" },
  { emoji: "🍆", name: "มะเขือยาว" },
  { emoji: "🍅", name: "มะเขือเทศ" },
];

type CategorySelectorProps = {
  titleColor?: string;
};

export const CategorySelector = ({ titleColor }: CategorySelectorProps) => {
  const [activeIndexCategory, setActiveIndexCategory] = useState<number[]>([0]);

  const onSelectCategory = (selectedIndex: number) => {
    setActiveIndexCategory([selectedIndex]);
  };

  return (
    <>
      <TopicHeader
        title="🥠 ค้นหาจากหมวดหมู่"
        titleColor={titleColor}
        paddingIconTop="3px"
      />
      <SelectSlider
        id="category"
        className="mt-2"
        selectorList={MOCK_CATEGORY_LIST}
        activeIndexList={activeIndexCategory}
        onClick={onSelectCategory}
      />
    </>
  );
};
