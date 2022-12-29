import React from "react";
import { Meta, Story } from "@storybook/react";

import Button, { ButtonProps, BUTTON_TYPE } from "./Button";

export default {
  title: "App/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  type: BUTTON_TYPE.PRIMARY,
  label: "Button",
};

export const SecondaryOutline = Template.bind({});

SecondaryOutline.args = {
  type: BUTTON_TYPE.SECONDARY_OUTLINE,
  label: "All",
  icon: "🗺️",
  isActive: false,
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: "Button",
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
// };
