import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";

export type LikeRecipeData = {
  id: number;
  user_id: number;
  recipe_id: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type LikeRecipeResponse = {
  status: number;
  data: LikeRecipeData;
};

export type LikeRecipeRequest = {
  user_id: number;
  recipe_id: number;
};

const likeRecipe = async (
  request: LikeRecipeRequest
): Promise<LikeRecipeResponse | null | undefined> => {
  try {
    const result = await makeProtectedRequest(
      `/food/like`,
      METHOD.PUT,
      request
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default likeRecipe;
