import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { ReviewData } from "./getReviewList";

export type CreateReviewResponse = {
  status: number;
  data: ReviewData[];
};

export type CreateReviewRequest = {
  user_id: number;
  recipe_id: number;
  rating?: number;
  comment: string;
};

const CreateReview = async (
  request: CreateReviewRequest
): Promise<CreateReviewResponse | null | undefined> => {
  try {
    const result = await makeProtectedRequest(
      `/food/review`,
      METHOD.POST,
      request
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default CreateReview;
