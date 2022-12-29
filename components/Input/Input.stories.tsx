import { Meta, Story } from "@storybook/react";
import { ReactSVG } from "react-svg";
import Input, { InputProps } from "./Input";

export default {
  title: "App/Input",
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Search = Template.bind({});

const searchIcon = <ReactSVG src="/assets/icons/search-outline.svg" />;

Search.args = {
  id: "search-recipe",
  placeholder: "ค้นหาสูตรอาหาร",
  startIcon: searchIcon,
};
