import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { RecipeData } from "./getRecipe";

export type RecipeListResponse = {
  status: number;
  data: RecipeData[];
};

const getRecipeList = async (): Promise<
  RecipeListResponse | null | undefined
> => {
  try {
    const result = await makeProtectedRequest(`/food/recipe`, METHOD.GET);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getRecipeList;
