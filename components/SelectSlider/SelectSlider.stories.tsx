import { Meta, Story } from "@storybook/react";
import SelectSlider, { SelectSliderProps } from "./SelectSlider";

export default {
  title: "App/SelectSlider",
  component: SelectSlider,
} as Meta;

const Template: Story<SelectSliderProps> = (args) => <SelectSlider {...args} />;

export const CategorySelectSlider = Template.bind({});

const MOCK_CATEGORY_LIST = [
  { emoji: "🌾", name: "โอ๊ต", isActive: true },
  { emoji: "🍰", name: "เค้ก", isActive: false },
  { emoji: "🍅", name: "สลัด", isActive: false },
  { emoji: "🥔", name: "มันฝรั่ง", isActive: false },
  { emoji: "🍆", name: "มะเขือยาว", isActive: false },
  { emoji: "🍅", name: "มะเขือเทศ", isActive: false },
];

CategorySelectSlider.args = {
  id: "category",
  selectorList: MOCK_CATEGORY_LIST,
  onClick: () => console.log("select category"),
};
