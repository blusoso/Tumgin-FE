import { Meta, Story } from "@storybook/react";
import SavedReminder, { SavedReminderProps } from "./SavedReminder";

export default {
  title: "App/SavedReminder",
  component: SavedReminder,
} as Meta;

const Template: Story<SavedReminderProps> = (args) => (
  <SavedReminder {...args} />
);

export const SavedReminderBase = Template.bind({});

SavedReminderBase.args = {
  savedTryAmount: 12,
};
