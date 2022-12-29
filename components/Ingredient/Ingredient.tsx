import { ingredientFormat } from "@/utils/number";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import InfoIcon from "../Icon/InfoIcon";
import Input, { INPUT_TYPE } from "../Input/Input";

type IngredientProps = {
  ingredientList: any;
};

const INFO_ICON = "1rem";

const Ingredient = ({ ingredientList }: IngredientProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <div className="flex items-center justify-between">
        <h3>ส่วนผสม</h3>
        <div className="flex items-center gap-2">
          <div className="text-secondary w-full">จำนวนเสิร์ฟ</div>
          <Input
            id="serving"
            type={INPUT_TYPE.NUMBER}
            defaultValue={1}
            min={1}
            max={10}
            step={1}
          />
        </div>
      </div>
      <div>
        {ingredientList.map((ingredient: any, index: number) => (
          <div
            key={`ingredient__${ingredient.slug}--${index}`}
            className={ingredientList.length === index + 1 ? "mt-3" : "my-3"}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {ingredient.emoji} {ingredient.name}{" "}
                <InfoIcon
                  iconWidth={INFO_ICON}
                  color={themeContext.lightGrayColor}
                  className="pt-1"
                />
              </div>
              <div>
                <span className="mr-2">
                  {ingredientFormat(ingredient.amount)}
                </span>
                <span className="text-secondary">{ingredient.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Ingredient;
