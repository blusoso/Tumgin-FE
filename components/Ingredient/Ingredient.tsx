import { ingredientFormat } from "@/utils/number";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import InfoIcon from "../Icon/InfoIcon";
import Input, { INPUT_TYPE } from "../Input/Input";
import { RecipeIngredientData } from "@/services/recipe/getRecipeIngredientList";

type IngredientProps = {
  recipeIngredientList: RecipeIngredientData[];
};

const INFO_ICON = "1rem";

const Ingredient = ({ recipeIngredientList }: IngredientProps) => {
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
        {recipeIngredientList &&
          recipeIngredientList.length > 0 &&
          recipeIngredientList.map(
            (recipeIngredient: RecipeIngredientData, index: number) => (
              <div
                key={`recipe-ingredient__${recipeIngredient.ingredient.id}--${recipeIngredient.id}`}
                className={
                  recipeIngredientList.length === index + 1 ? "mt-3" : "my-3"
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex w-4/5 items-center gap-2">
                    {recipeIngredient.ingredient.emoji}{" "}
                    {recipeIngredient.ingredient.name}{" "}
                    {recipeIngredient.ingredient.description && (
                      <InfoIcon
                        iconWidth={INFO_ICON}
                        color={themeContext.lightGrayColor}
                      />
                    )}
                  </div>
                  <div className="flex w-1/5 items-center justify-end text-right">
                    <span className="w-1/3 mr-2">
                      {ingredientFormat(recipeIngredient.quantity)}
                    </span>
                    <span className="w-2/3 text-secondary">
                      {recipeIngredient.unit}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
};

export default Ingredient;
