import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";

export type RecipeData = {
  id: number;
  username: string;
  profile_img: string;
  name: string;
  name_en: string;
  slug: string;
  description: string;
  thumbnail_img?: string;
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
};

export type RecipeResponse = {
  status: number;
  data: RecipeData;
};

export type RecipeRequest = {
  id: number;
};

const getRecipe = async (
  request: RecipeRequest
): Promise<RecipeResponse | null | undefined> => {
  try {
    const result = await makeProtectedRequest(
      `/food/recipe/${request.id}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getRecipe;
