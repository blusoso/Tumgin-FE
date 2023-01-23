import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { RecipeData } from "./getRecipe";

export type RecipeListData = {
  total_recipes: number;
  recipes: RecipeData[];
};

export type RecipeListResponse = {
  status: number;
  data: RecipeListData;
};

export type RecipeListRequest = {
  user_id?: number;
  skip?: number;
  limit?: number;
};

const getRecipeList = async (
  request: RecipeListRequest
): Promise<RecipeListResponse | null | undefined> => {
  try {
    const { user_id, skip, limit } = request;
    const userRequest = user_id ? `?user_id=${user_id}` : "";
    const skipRequest = skip ? `&skip=${skip}` : "";
    const limitRequest = limit ? `&limit=${limit}` : "";

    const result = await makeProtectedRequest(
      `/food/recipe${userRequest}${skipRequest}${limitRequest}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getRecipeList;
