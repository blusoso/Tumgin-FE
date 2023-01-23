import { RECIPE_IMG_TYPE } from "./getRecipeImg";
import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { UserResponse } from "../auth/createUser";
import { RecipeIngredientData } from "./getRecipeIngredientList";
import { LikeRecipeData } from "./likeRecipe";
import { ReviewData } from "./getReviewList";

export type ImageData = {
  id: number;
  img: string;
  img_format?: string;
  img_size?: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type DirectionData = {
  id: number;
  recipe_id: number;
  step_number: number;
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type RecipeImageData = {
  id: number;
  recipe_id: number;
  image_id: number;
  type: RECIPE_IMG_TYPE;
  created_at: Date;
  deleted_at?: Date;
  updated_at?: Date;
  image: ImageData;
};

export type RecipeData = {
  id: number;
  name: string;
  name_en: string;
  slug: string;
  description: string;
  thumbnail_img?: string;
  recipe_images: RecipeImageData[];
  difficult_level?: number;
  calory?: number;
  minute?: number;
  serving?: number;
  protein_gram?: number;
  protein_percent?: number;
  fat_gram?: number;
  fat_percent?: number;
  carb_gram?: number;
  carb_percent?: number;
  is_staff_pick: boolean;
  created_at: Date;
  user: UserResponse;
  recipe_ingredients?: RecipeIngredientData[];
  directions?: DirectionData[];
  user_like_recipes?: LikeRecipeData[];
  is_like?: boolean;
  reviews?: ReviewData[];
  review_amount: number;
  review_avg: number;
  total_recipe?: number;
};

export type RecipeResponse = {
  status: number;
  data: RecipeData;
};

export type RecipeRequest = {
  recipe_id: number;
  user_id?: number;
};

const getRecipe = async (
  request: RecipeRequest
): Promise<RecipeResponse | null | undefined> => {
  try {
    const { user_id } = request;
    const userRequest = user_id ? `?user_id=${user_id}` : "";

    const result = await makeProtectedRequest(
      `/food/recipe/${request.recipe_id}${userRequest}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getRecipe;
