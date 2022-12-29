import { Meta, Story } from "@storybook/react";
import TopicHeader, { TopicHeaderProps } from "./TopicHeader";

export default {
  title: "App/TopicHeader",
  component: TopicHeader,
} as Meta;

const Template: Story<TopicHeaderProps> = (args) => <TopicHeader {...args} />;

export const PopularRecipeHeader = Template.bind({});

PopularRecipeHeader.args = {
  title: "🔥 เมนูยอดนิยม",
  linkLabel: "ดูทั้งหมด",
  link: "/",
};
