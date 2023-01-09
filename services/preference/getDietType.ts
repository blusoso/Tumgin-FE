import axios from "axios";
import { STATUS_CODE } from "../http/httpStatusCode";
import { ErrorResponse } from "../type/globalServiceType";

export type DietTypeData = {
  id: number;
  name: string;
  emoji?: string;
  description?: string;
  foods_allowed?: string[];
  foods_restricted?: string[];
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type DietTypeResponse = {
  status: number;
  data: DietTypeData[] | null;
};

const getDietType = async (): Promise<
  DietTypeResponse | ErrorResponse | undefined | null
> => {
  try {
    const result: DietTypeResponse | null = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/preference/diet`
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

export default getDietType;
