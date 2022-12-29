import { atom } from "recoil";
import { KEYS } from "../keys";

export enum SEARCH_MODE {
  KEYWORD = "keyword",
  INGREDIENT = "ingredient",
}

const MOCK_INGREDIENT_LIST = [
  { emoji: "🍅", name: "มะเขือเทศ" },
  { emoji: "🍫", name: "ช็อกโกแลต" },
  { emoji: "🎃", name: "ฟักทอง" },
  { emoji: "🥔", name: "มันฝรั่ง" },
  { emoji: "🌾", name: "โอ๊ต" },
  { emoji: "🍠", name: "มันหวาน" },
];

type Ingredient = {
  emoji: string;
  name: string;
};

type SearchState = {
  searchMode: SEARCH_MODE;
  ingredientList: Ingredient[];
};

const searchState = atom<SearchState>({
  key: KEYS.SEARCH,
  default: {
    searchMode: SEARCH_MODE.KEYWORD,
    ingredientList: MOCK_INGREDIENT_LIST,
  },
});

export default searchState;
