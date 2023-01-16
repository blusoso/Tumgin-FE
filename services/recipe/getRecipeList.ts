import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { RecipeData } from "./getRecipe";

export type RecipeListResponse = {
  status: number;
  data: RecipeData[];
};

export type RecipeListRequest = {
  user_id?: number;
};

const getRecipeList = async (
  request: RecipeListRequest
): Promise<RecipeListResponse | null | undefined> => {
  try {
    const result = await makeProtectedRequest(
      `/food/recipe?user_id=${request.user_id}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getRecipeList;
