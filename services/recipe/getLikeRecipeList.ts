import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { RecipeData } from "./getRecipe";
import { UserResponse } from "../auth/createUser";

export type LikeRecipeListData = {
  id: number;
  Recipe: RecipeData;
  User: UserResponse;
};

export type LikeRecipeListResponse = {
  status: number;
  data: LikeRecipeListData[];
};

export type LikeRecipeListRequest = {
  user_id: number;
};

const getLikeRecipeList = async (
  request: LikeRecipeListRequest
): Promise<LikeRecipeListResponse | null | undefined> => {
  try {
    const result = await makeProtectedRequest(
      `/food/like/${request.user_id}`,
      METHOD.GET,
      request
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getLikeRecipeList;
