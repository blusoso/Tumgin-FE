import { STATUS_CODE } from "../http/httpStatusCode";
import { ErrorResponse } from "../type/globalServiceType";
import axios from "axios";

export type AllergyData = {
  id?: number;
  name: string;
  emoji?: string;
  is_allergy?: boolean;
  is_active?: boolean;
};

export type AllergyResponse = {
  status: number;
  data: AllergyData[] | null;
};

const getAllergy = async (): Promise<
  AllergyResponse | ErrorResponse | undefined | null
> => {
  try {
    const result: AllergyResponse | null = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/preference/allergy`
    );

    if (result) {
      return { status: STATUS_CODE.OK, data: result.data };
    }

    return { status: STATUS_CODE.NOT_FOUND, data: null };
  } catch (error: any) {
    return {
      status: error.response.status,
      statusText: error.response.statusText,
      detail: error.response.data.detail,
    };
  }
};

export default getAllergy;
