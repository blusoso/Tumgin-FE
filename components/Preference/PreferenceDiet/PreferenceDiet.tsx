import React, { useState } from "react";
import PreferenceTitle from "../PreferenceTitle/PreferenceTitle";
import Button, { BUTTON_TYPE } from "@/components/Button/Button";

type DietType = {
  emoji?: string;
  name: string;
};

const DIET_LIST: DietType[] = [
  { emoji: "🍞", name: "Low-carb" },
  { emoji: "🥩", name: "Low-fat" },
  { emoji: "🍄", name: "Low-calorie" },
  { emoji: "🍝", name: "Balanced diet" },
  { emoji: "🥖", name: "Gluten free" },
  { emoji: "🥗", name: "วีแกน" },
  { emoji: "🍖", name: "คีโต" },
  { emoji: "🌊", name: "เมดิเตอร์เรเนียน" },
];

const PreferenceDiet = () => {
  const [dietList, setDietList] = useState<DietType[]>(DIET_LIST);
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);

  const handleSelectedDiet = (selected: DietType) => {
    if (selectedDiet.includes(selected.name)) {
      const updatedArray = selectedDiet.filter(
        (allergyName: string) => allergyName !== selected.name
      );

      setSelectedDiet(updatedArray);
    } else {
      setSelectedDiet([...selectedDiet, selected.name]);
    }
  };

  return (
    <div>
      <PreferenceTitle
        title="คุณต้องการไดเอตมั้ย?"
        subTitle="กรุณาเลือกประเภทไดเอตที่คุณต้องการ"
      />

      <div className="flex flex-wrap">
        {dietList.map((diet, key) => (
          <React.Fragment key={`diet__${diet.name}--${key}`}>
            <Button
              className="mr-2 mb-3"
              padding="0.6rem 1.2rem"
              type={
                selectedDiet.includes(diet.name)
                  ? BUTTON_TYPE.PRIMARY
                  : BUTTON_TYPE.SECONDARY_OUTLINE
              }
              onClick={() => handleSelectedDiet(diet)}
            >
              <span>
                {diet.emoji} {diet.name}
              </span>
            </Button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PreferenceDiet;
