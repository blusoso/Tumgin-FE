import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";

export type SearchRecipeData = {
  id: number;
  name: string;
  name_en?: string;
  slug: string;
};

export type SearchRecipeResponse = {
  status: number;
  data: SearchRecipeData[];
};

export type SearchRecipeRequest = {
  q: string;
  skip?: number;
  limit?: number;
};

const getSearchRecipe = async (
  request: SearchRecipeRequest
): Promise<SearchRecipeResponse | null | undefined> => {
  try {
    const { q, skip, limit } = request;
    const qRequest = q ? `?q=${q}` : "";
    const skipRequest = skip ? `&skip=${skip}` : "";
    const limitRequest = limit ? `&limit=${limit}` : "";

    const result = await makeProtectedRequest(
      `/food/search${qRequest}${skipRequest}${limitRequest}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getSearchRecipe;
