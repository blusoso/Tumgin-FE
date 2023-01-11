import { ErrorResponse } from "@/services/type/globalServiceType";
import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";

export type IngredientData = {
  id?: number;
  name: string;
  emoji?: string;
  is_allergy?: boolean;
  is_active?: boolean;
};

export type IngredientResponse = {
  status: number;
  data: IngredientData;
};

export type IngredientRequest = {} & IngredientData;

const createIngredient = async (
  request: IngredientRequest
): Promise<IngredientResponse | ErrorResponse | null> => {
  try {
    const result = await makeProtectedRequest(
      `/food/ingredient`,
      METHOD.POST,
      request
    );

    return result;
  } catch (error: any) {
    return {
      status: error.response.status,
      statusText: error.response.statusText,
      detail: error.response.data.detail,
    };
  }
};

export default createIngredient;
