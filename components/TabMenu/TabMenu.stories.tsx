import { Meta, Story } from "@storybook/react";
import TabMenu, { TabMenuProps } from "./TabMenu";

export default {
  title: "App/TabMenu",
  component: TabMenu,
} as Meta;

const Template: Story<TabMenuProps> = (args) => <TabMenu {...args} />;

export const ForYouTabMenu = Template.bind({});

ForYouTabMenu.args = {
  tabMenuList: [
    {
      emoji: "🔥",
      name: "เมนูยอดนิยม",
    },
    {
      emoji: "💖",
      name: "แนะนำสำหรับคุณ",
    },
  ],
};
