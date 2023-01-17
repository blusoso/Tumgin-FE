import { atom } from "recoil";
import { KEYS } from "../keys";

type ReviewInputState = {
  message: string;
  rating: number;
};

const reviewInputState = atom<ReviewInputState>({
  key: KEYS.REVIEW_INPUT,
  default: {
    message: "",
    rating: 0,
  },
});

export default reviewInputState;
