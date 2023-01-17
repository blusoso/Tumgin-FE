import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { RecipeData } from "./getRecipe";

export type RecipeListResponse = {
  status: number;
  data: RecipeData[];
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

    const result = await makeProtectedRequest(
      `/food/recipe${userRequest}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getRecipeList;
