import { Meta, Story } from "@storybook/react";
import BaseModal, {
  BUTTON_ALIGN,
  BaseModalProps,
  ALIGN_ITEM,
} from "./BaseModal";

export default {
  title: "App/Modal",
  component: BaseModal,
} as Meta;

const Template: Story<BaseModalProps> = (args) => <BaseModal {...args} />;

export const CookieModal = Template.bind({});

CookieModal.args = {
  isOverlay: false,
  isOpen: true,
  hasClose: false,
  title: "🍪 เว็บไซต์นี้มีการใช้คุกกี้",
  children: (
    <>
      เราใช้คุกกี้เพื่อเพิ่มประสบการณ์ที่ดีให้กับคุณ
      และช่วยให้เราเข้าใจผู้ใช้ที่มีต่อเว็บไซต์เราเพิ่มมากขึ้น
      โดยใช้เพื่อการวิเคราะห์และจุดประสงค์อื่นๆที่คุณสามารถดูเพิ่มเติมได้ที่{" "}
      <a className="link--underline">Cookie Policy</a>
    </>
  ),
  buttonAlign: BUTTON_ALIGN.RIGHT,
  buttonPrimaryText: "ยอมรับทั้งหมด",
  buttonSecondaryText: "ปรับแต่งคุกกี้",
  width: "90%",
  alignItem: ALIGN_ITEM.BOTTOM,
  bottom: "3%",
};
