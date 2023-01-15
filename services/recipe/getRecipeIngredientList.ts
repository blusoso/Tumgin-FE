import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";

export type Ingredient = {
  id: number;
  name: string;
  name_en: string;
  slug: string;
  emoji?: string;
  description?: string;
  is_allergy: boolean;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type RecipeIngredientData = {
  id: number;
  recipe_id: number;
  quantity: number;
  unit: string;
  is_optional: boolean;
  is_active: boolean;
  ingredient: Ingredient;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type RecipeIngredientListResponse = {
  status: number;
  data: RecipeIngredientData[];
};

export type RecipeIngredientListRequest = {
  recipe_id: number;
};

const getRecipeIngredientList = async (
  request: RecipeIngredientListRequest
): Promise<RecipeIngredientListResponse | null | undefined> => {
  try {
    const result = await makeProtectedRequest(
      `/food/recipe-ingredient/${request.recipe_id}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getRecipeIngredientList;
