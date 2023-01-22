import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";

export enum RECIPE_IMG_TYPE {
  THUMBNAIL = "thumbnail",
  GENERAL = "general",
}

export type RecipeImgData = {
  id: number;
  recipe_id: number;
  type: RECIPE_IMG_TYPE;
  img: string;
};

export type RecipeImgResponse = {
  status: number;
  data: RecipeImgData[] | RecipeImgData;
};

export type RecipeImgRequest = {
  recipe_id: number;
  is_thumbnail: boolean;
};

const getRecipeImg = async (
  request: RecipeImgRequest
): Promise<RecipeImgResponse | null | undefined> => {
  try {
    const { recipe_id, is_thumbnail } = request;

    const result = await makeProtectedRequest(
      `/food/recipe-img/${recipe_id}?is_thumbnail=${is_thumbnail}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getRecipeImg;
