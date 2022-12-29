import { Meta, Story } from "@storybook/react";
import Hamburger, { HamburgerProps } from "./Hamburger";

export default {
  title: "App/Hamburger",
  component: Hamburger,
} as Meta;

const Template: Story<HamburgerProps> = (args) => <Hamburger {...args} />;

export const MainHamburger = Template.bind({});

MainHamburger.args = {};
