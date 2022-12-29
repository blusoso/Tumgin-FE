import React, { useState } from "react";
import { searchState } from "@/recoils/index";
import { useRecoilValue } from "recoil";
import SelectSlider from "../SelectSlider";

export const IngredientSelector = () => {
  const { ingredientList } = useRecoilValue(searchState);
  const [activeIndexIngredientList, setActiveIndexIngredientList] = useState<
    number[]
  >([]);

  const onSelectIngredient = (selectedIndex: number) => {
    if (activeIndexIngredientList.includes(selectedIndex)) {
      setActiveIndexIngredientList(
        activeIndexIngredientList.filter(
          (activeIndex) => activeIndex !== selectedIndex
        )
      );
    } else {
      setActiveIndexIngredientList([
        ...activeIndexIngredientList,
        selectedIndex,
      ]);
    }
  };

  return (
    <div className="my-3">
      <SelectSlider
        id="ingredient"
        className="mt-2"
        selectorList={ingredientList}
        activeIndexList={activeIndexIngredientList}
        onClick={onSelectIngredient}
      />
    </div>
  );
};
