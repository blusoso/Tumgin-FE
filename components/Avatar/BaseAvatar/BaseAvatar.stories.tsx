import { Meta, Story } from "@storybook/react";
import BaseAvatar, { BaseAvatarProps } from "./BaseAvatar";

export default {
  title: "App/BaseAvatar",
  component: BaseAvatar,
} as Meta;

const Template: Story<BaseAvatarProps> = (args) => <BaseAvatar {...args} />;

export const UserAvatar = Template.bind({});

UserAvatar.args = {
  img: "/assets/images/avatar.png",
};
