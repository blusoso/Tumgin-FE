import Button, { BUTTON_TYPE } from "@/components/Button/Button";
import PlusIcon from "@/components/Icon/PlusIcon";
import Input from "@/components/Input/Input";
import React, { useState } from "react";
import PreferenceTitle from "../PreferenceTitle/PreferenceTitle";
import { AllergyCustomizeSection, AllergyList } from "./Allergy.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";

type AllergyType = {
  id: number;
  emoji?: string;
  name: string;
};

//TODO: id equal to ingredient or in ingredient table has a column is_allergy
const ALLERGIES_LIST: AllergyType[] = [
  { id: 1, emoji: "🥛", name: "นม" },
  { id: 2, emoji: "🥚", name: "ไข่" },
  { id: 3, emoji: "🐿️", name: "ถั่วเปลือกแข็ง" },
  { id: 4, emoji: "🟡", name: "ถั่วเหลือง" },
  { id: 5, emoji: "🥜", name: "ตระกูลถั่ว" },
  { id: 6, emoji: "🦐", name: "กุ้ง/ล็อบสเตอร์" },
  { id: 7, emoji: "🐟", name: "ปลา" },
  { id: 8, emoji: "🌾", name: "ข้าว" },
  { id: 9, emoji: "🌽", name: "ข้าวโพด" },
  { id: 10, emoji: "🧅", name: "หัวหอม" },
  { id: 11, emoji: "🧄", name: "กระเทียม" },
];

const Allergy = () => {
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();

  const [allergyList, setAllergyList] = useState<AllergyType[]>(ALLERGIES_LIST);
  const [selectedAllergyList, setSelectedAllergyList] = useState<string[]>([]);
  const [customAllergyValue, setCustomAllergyValue] = useState<string>("");

  const handleSelectedAllergy = (selected: AllergyType) => {
    if (selectedAllergyList.includes(selected.name)) {
      const updatedArray = selectedAllergyList.filter(
        (allergyName: string) => allergyName !== selected.name
      );

      setSelectedAllergyList(updatedArray);
    } else {
      setSelectedAllergyList([...selectedAllergyList, selected.name]);
    }
  };

  const clearAllergyInputValue = () => {
    setCustomAllergyValue("");
  };

  const addCustomAllergy = () => {
    if (customAllergyValue) {
      const addedAllergy = {
        id: allergyList.length + 1,
        name: customAllergyValue,
      };

      setAllergyList([...allergyList, addedAllergy]);
      setSelectedAllergyList([...selectedAllergyList, customAllergyValue]);
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
        {allergyList.map((allergy, key) => (
          <React.Fragment key={`allergy__${allergy.name}--${key}`}>
            <Button
              className="mr-2 mb-3"
              padding="0.6rem 1.2rem"
              type={
                selectedAllergyList.includes(allergy.name)
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
