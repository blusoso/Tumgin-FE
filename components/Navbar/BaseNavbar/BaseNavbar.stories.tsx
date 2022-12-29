import { Meta, Story } from "@storybook/react";
import { APP_NAME } from "../../../utils/constant";
import Hamburger from "../../Hamburger/Hamburger";
import BaseNavbar, { BaseNavbarProps } from "./BaseNavbar";

export default {
  title: "App/Navbar",
  component: BaseNavbar,
} as Meta;

const Template: Story<BaseNavbarProps> = (args) => <BaseNavbar {...args} />;

export const HomeNav = Template.bind({});

HomeNav.args = {
  left: <Hamburger />,
  center: (
    <>
      <div>{APP_NAME} ยินดีต้อนรับ 👋</div>
      <h2>Username</h2>
    </>
  ),
  right: <>Me</>,
};
