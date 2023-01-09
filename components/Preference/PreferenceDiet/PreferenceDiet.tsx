import React, { useState } from "react";
import PreferenceTitle from "../PreferenceTitle/PreferenceTitle";
import Button, { BUTTON_TYPE } from "@/components/Button/Button";
import { DietTypeData } from "@/services/preference/getDietType";

type PreferenceDietProps = {
  dietTypeList: DietTypeData[];
  selectedDietList: DietTypeData[];
  handleSelectedDiet: (selected: DietTypeData) => void;
};

const PreferenceDiet = ({
  dietTypeList,
  selectedDietList,
  handleSelectedDiet,
}: PreferenceDietProps) => {
  return (
    <div>
      <PreferenceTitle
        title="คุณต้องการไดเอตมั้ย?"
        subTitle="กรุณาเลือกประเภทไดเอตที่คุณต้องการ"
      />

      <div className="flex flex-wrap">
        {dietTypeList.map((diet, key) => (
          <React.Fragment key={`diet__${diet.name}--${key}`}>
            <Button
              className="mr-2 mb-3"
              padding="0.6rem 1.2rem"
              type={
                selectedDietList.some((selected) => selected.id === diet.id)
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
