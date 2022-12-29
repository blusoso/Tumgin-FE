import { Meta, Story } from "@storybook/react";
import SelectModal, { SelectModalProps } from "./SelectModal";

export default {
  title: "App/Select",
  component: SelectModal,
} as Meta;

const Template: Story<SelectModalProps> = (args) => <SelectModal {...args} />;

export const SearchSelect = Template.bind({});

SearchSelect.args = {
  isOpen: true,
  children: <p>example of search selection</p>,
};
