import React from "react";
import ChevronIcon from "../Icon/ChevronIcon";
import { SavedReminderCard } from "./SavedReminder.styled";

export type SavedReminderProps = {
  savedTryAmount: number;
};

const SavedReminder = ({ savedTryAmount }: SavedReminderProps) => {
  const onCardClick = () => {
    console.log("xxx");
  };

  return (
    <SavedReminderCard onClick={onCardClick}>
      <div className="text-4xl">🥗</div>
      <div>
        คุณมีอีก <span className="font-normal	">{savedTryAmount}</span>{" "}
        สูตรอาหารที่บันทึกไว้
        <br /> แต่ยังไม่ได้ลอง ลองเลย!
      </div>
      <div className="ml-auto">
        <ChevronIcon iconWidth="2rem" />
      </div>
    </SavedReminderCard>
  );
};

export default SavedReminder;
