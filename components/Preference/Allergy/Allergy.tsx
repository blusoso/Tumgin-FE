import Button, { BUTTON_TYPE } from "@/components/Button/Button";
import PlusIcon from "@/components/Icon/PlusIcon";
import Input from "@/components/Input/Input";
import React, { useState } from "react";
import PreferenceTitle from "../PreferenceTitle/PreferenceTitle";
import { AllergyCustomizeSection, AllergyList } from "./Allergy.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";
import { AllergyData } from "@/services/preference/getAllergy";

type AllergyProps = {
  allergyList?: AllergyData[];
  selectedAllergyList: AllergyData[];
  handleAllergyAdded: (customAllergyValue: AllergyData) => void;
  handleSelectedAllergy: (selected: AllergyData) => void;
};

const Allergy = ({
  allergyList,
  selectedAllergyList,
  handleAllergyAdded,
  handleSelectedAllergy,
}: AllergyProps) => {
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();

  const [customAllergyValue, setCustomAllergyValue] = useState<string>("");

  const clearAllergyInputValue = () => {
    setCustomAllergyValue("");
  };

  const addCustomAllergy = () => {
    if (customAllergyValue) {
      const addedAllergy = {
        name: customAllergyValue,
      };

      handleAllergyAdded(addedAllergy);
    }

    clearAllergyInputValue();
  };

  const onAllergyInputChange = (inputValue: string) => {
    setCustomAllergyValue(inputValue);
  };

  return (
    <>
      <PreferenceTitle
        title="คุณแพ้อาหารอะไรมั้ย?"
        subTitle="เลือกอาหารที่คุณแพ้หรือไม่ชอบ แล้วเราจะคัดสรรแต่สิ่งที่คุณชอบและทานได้มาให้คุณ"
      />
      <AllergyList
        className={`flex flex-wrap ${isMobile || isTablet ? "" : "mb-4"}`}
      >
        {allergyList &&
          allergyList.map((allergy, key) => (
            <React.Fragment key={`allergy__${allergy.name}--${key}`}>
              <Button
                className="mr-2 mb-3"
                padding="0.6rem 1.2rem"
                type={
                  selectedAllergyList.some(
                    (selected) => selected.id === allergy.id
                  )
                    ? BUTTON_TYPE.PRIMARY
                    : BUTTON_TYPE.SECONDARY_OUTLINE
                }
                onClick={() => handleSelectedAllergy(allergy)}
              >
                <span>
                  {allergy.emoji} {allergy.name}
                </span>
              </Button>
            </React.Fragment>
          ))}
      </AllergyList>

      <AllergyCustomizeSection
        className={`${isMobile || isTablet ? "container" : ""}`}
        isDesktop={!(isMobile || isTablet)}
      >
        <PreferenceTitle
          title="ไม่มีอาหารที่คุณแพ้ในรายการใช่มั้ย?"
          subTitle="เพิ่มเข้าไปในรายการด้านบน"
        />
        <div className="flex gap-2 h-full my-3">
          <Input
            id="input__allergy-item"
            placeholder="อาหารที่คุณแพ้"
            value={customAllergyValue}
            onChange={onAllergyInputChange}
          />
          <Button type={BUTTON_TYPE.PRIMARY_OUTLINE} onClick={addCustomAllergy}>
            <div className="flex items-center gap-1">
              <PlusIcon iconWidth="18px" />
              <div>เพิ่ม</div>
            </div>
          </Button>
        </div>
      </AllergyCustomizeSection>
    </>
  );
};

export default Allergy;
