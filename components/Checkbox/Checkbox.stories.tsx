import { Meta, Story } from "@storybook/react";
import Checkbox, { CheckboxProps } from "./Checkbox";
import Link from "next/link";

export default {
  title: "App/Checkbox",
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const AcceptPolicyCheckbox = Template.bind({});

AcceptPolicyCheckbox.args = {
  id: "policy-accept",
  name: "is_consent",
  children: <>ฉันอ่านและยอมรับ</>,
};
