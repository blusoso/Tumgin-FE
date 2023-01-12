import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

import Allergy from "@/components/Preference/Allergy/Allergy";
import ButtonFooter from "@/components/ButtonFooter/ButtonFooter";
import Button, { BUTTON_TYPE } from "@/components/Button/Button";
import { renderChevronIcon } from "@/components/CookingProcessLayout/CookingProcessLayout";
import PreferenceDiet from "@/components/Preference/PreferenceDiet/PreferenceDiet";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";
import { COOKIE_AGE, COOKIE_NAME } from "@/utils/cookies";
import HomeNavbar from "@/components/Navbar/HomeNavbar/HomeNavbar";
import getAllergy, {
  AllergyData,
  AllergyResponse,
} from "@/services/preference/getAllergy";
import { STATUS_CODE } from "@/services/http/httpStatusCode";
import getDietType, {
  DietTypeData,
  DietTypeResponse,
} from "@/services/preference/getDietType";
import useCurrentUser from "@/utils/auth/useCurrentUser";
import createUserDietType, {
  UserDietTypeData,
  UserDietTypeRequest,
} from "@/services/preference/createUserDietType";
import getOwnDietType, {
  OwnDietTypeResponse,
} from "@/services/preference/getOwnDietType";
import createUserAllergy, {
  UserAllergyData,
  UserAllergyRequest,
} from "@/services/preference/createUserAllergy";
import getOwnAllergy, {
  OwnAllergyResponse,
} from "@/services/preference/getOwnAllergy";
import createIngredient, {
  IngredientData,
  IngredientResponse,
} from "@/services/auth/ingredient/createIngredient";
import { ErrorResponse } from "@/services/type/globalServiceType";
import { UserResponse } from "@/services/auth/createUser";
import deleteUserAllergy from "@/services/preference/deleteUserAllergy";
import deleteUserDietType from "@/services/preference/deleteUserDietType";

type ButtonWrapperProps = {
  isDesktop?: boolean;
};

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  ${({ isDesktop }) =>
    !isDesktop && "position: absolute;left: 0;bottom: 1.6rem;"}
  width: 100%;

  .button__icon--end {
    ${({ isDesktop }) =>
      !isDesktop && "position: absolute;left: 0;bottom: 1.6rem;"}
    margin-top: -0.35rem;
  }
`;

const TOTAL_STEP = 2;
const LAST_STEP = TOTAL_STEP;

type PreferenceProps = {
  allergyData: AllergyData[];
  dietTypeData: DietTypeData[];
};

const Preference = ({ allergyData, dietTypeData }: PreferenceProps) => {
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();
  const { user } = useCurrentUser();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isDone, setIsDone] = useState(false);

  const [newAllergyList, setNewAllergyList] =
    useState<AllergyData[] | undefined>(allergyData);
  const [selectedAllergyList, setSelectedAllergyList] = useState<AllergyData[]>(
    []
  );
  const [defaultAllergy, setDefaultAllergy] = useState<AllergyData[]>([]);
  const [userAllergy, setUserAllergy] = useState<UserAllergyData[]>([]);

  const [selectedDietList, setSelectedDietList] = useState<DietTypeData[]>([]);
  const [defaultDietType, setDefaultDietType] = useState<DietTypeData[]>([]);
  const [userDietType, setUserDietType] = useState<UserDietTypeData[]>([]);

  const fetchDefaultAllergy = async (userId: number) => {
    const defaultAllergyResponse: OwnAllergyResponse | null | undefined =
      await getOwnAllergy(userId);

    if (
      defaultAllergyResponse &&
      defaultAllergyResponse.status === STATUS_CODE.OK
    ) {
      const defaultAllergy: AllergyData[] = defaultAllergyResponse.data.map(
        (data) => data.ingredient
      );

      const customAllergyList = defaultAllergy.filter((da) => !da.is_allergy);

      customAllergyList.forEach(async (customAllergy) => {
        setNewAllergyList([
          ...(newAllergyList as AllergyData[]),
          customAllergy,
        ]);
      });

      setUserAllergy(defaultAllergyResponse.data);

      setSelectedAllergyList(defaultAllergy);
      setDefaultAllergy(defaultAllergy);
    }
  };

  const fetchDefaultDietType = async (userId: number) => {
    const defaultDietTypeResponse: OwnDietTypeResponse | null | undefined =
      await getOwnDietType(userId);

    if (
      defaultDietTypeResponse &&
      defaultDietTypeResponse.status === STATUS_CODE.OK
    ) {
      const defaultDietType = defaultDietTypeResponse.data.map(
        (data) => data.diet_type
      );

      setUserDietType(defaultDietTypeResponse.data);

      setSelectedDietList(defaultDietType);
      setDefaultDietType(defaultDietType);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDefaultAllergy(user.id);
      fetchDefaultDietType(user.id);
    }
  }, [user]);

  const handleAllergyAdded = (addedAllergy: AllergyData) => {
    setNewAllergyList([...(newAllergyList as AllergyData[]), addedAllergy]);
    setSelectedAllergyList([...selectedAllergyList, addedAllergy]);
  };

  const handleSelectedAllergy = (selected: AllergyData) => {
    const hasSelected = selectedAllergyList.some(
      (allergy) => allergy.name === selected.name
    );

    if (hasSelected) {
      const updatedArray = selectedAllergyList.filter(
        (allergy: AllergyData) => allergy.name !== selected.name
      );
      setSelectedAllergyList(updatedArray);
    } else {
      setSelectedAllergyList([...selectedAllergyList, selected]);
    }
  };

  const handleSelectedDiet = (selected: DietTypeData) => {
    const hasSelected = selectedDietList.some(
      (diet) => diet.id === selected.id
    );

    if (hasSelected) {
      const updatedArray = selectedDietList.filter(
        (diet: DietTypeData) => diet.id !== selected.id
      );
      setSelectedDietList(updatedArray);
    } else {
      setSelectedDietList([...selectedDietList, selected]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Allergy
            allergyList={newAllergyList}
            selectedAllergyList={selectedAllergyList}
            handleAllergyAdded={handleAllergyAdded}
            handleSelectedAllergy={handleSelectedAllergy}
          />
        );
      case LAST_STEP:
        return (
          <PreferenceDiet
            dietTypeList={dietTypeData}
            selectedDietList={selectedDietList}
            handleSelectedDiet={handleSelectedDiet}
          />
        );
      default:
        break;
    }
  };

  const onBack = () => {
    setStep(step - 1);
  };

  const storeUserDietType = async () => {
    selectedDietList.forEach(async (selectedDiet) => {
      const userDietTypeRequest: UserDietTypeRequest = {
        user_id: (user as UserResponse).id,
        diet_type_id: selectedDiet.id,
      };

      await createUserDietType(userDietTypeRequest);
    });
  };

  const removeUserDietType = async () => {
    const deletedDietTypeList = defaultDietType.filter(
      (d) => !selectedDietList.includes(d)
    );

    if (deletedDietTypeList.length > 0) {
      deletedDietTypeList.forEach(async (deletedDietType) => {
        if (deletedDietType.id) {
          const userDietTypeDeleted = userDietType.find(
            (ud) => ud.diet_type.id === deletedDietType.id
          );

          if (userDietTypeDeleted) {
            await deleteUserDietType({ id: userDietTypeDeleted.id });
          }
        }
      });
    }
  };

  const submitUserDietType = async () => {
    if (user && selectedDietList && selectedDietList.length > 0) {
      await storeUserDietType();
      await removeUserDietType();
    }
  };

  const createIngredientAndGetId = async (ingredientName: string) => {
    const ingredientAddedRequest = {
      name: ingredientName,
    };

    const ingredientAddedResponse: IngredientResponse | ErrorResponse | null =
      await createIngredient(ingredientAddedRequest);

    if (
      ingredientAddedResponse &&
      ingredientAddedResponse.status === STATUS_CODE.OK
    ) {
      return (ingredientAddedResponse as IngredientResponse).data.id;
    }

    return console.error(ingredientAddedResponse);
  };

  const storeUserAllergy = async () => {
    selectedAllergyList.forEach(async (selectedAllergy) => {
      let ingredientAddedId: any;

      if (!selectedAllergy.id) {
        ingredientAddedId = await createIngredientAndGetId(
          selectedAllergy.name
        );
      } else {
        ingredientAddedId = selectedAllergy.id;
      }

      const userAllergyRequest: UserAllergyRequest = {
        user_id: (user as UserResponse).id,
        ingredient_id: ingredientAddedId,
      };

      await createUserAllergy(userAllergyRequest);
    });
  };

  const removeUserAllergy = async () => {
    const deletedAllergyList = defaultAllergy.filter(
      (d) => !selectedAllergyList.includes(d)
    );

    if (deletedAllergyList.length > 0) {
      deletedAllergyList.forEach(async (deletedAllergy) => {
        if (deletedAllergy.id) {
          const userAllergyDeleted = userAllergy.find(
            (ua) => ua.ingredient.id === deletedAllergy.id
          );

          if (userAllergyDeleted) {
            await deleteUserAllergy({ id: userAllergyDeleted.id });
          }
        }
      });
    }
  };

  const submitUserAllergy = async () => {
    if (user && selectedAllergyList && selectedAllergyList.length > 0) {
      await storeUserAllergy();
      await removeUserAllergy();
    }
  };

  const onNext = async () => {
    if (step != LAST_STEP) {
      setStep(step + 1);
      setIsDone(false);
    } else if (step == LAST_STEP) {
      setIsDone(true);
      setCookie(COOKIE_NAME.SET_USER_PREFERENCE, true, {
        maxAge: COOKIE_AGE.SET_USER_PREFERENCE,
      });

      await submitUserAllergy();
      await submitUserDietType();

      router.back();
    }
  };

  return (
    <>
      <HomeNavbar showNavMobile={false} showCenter={false} />
      <div className={`${isMobile || isTablet ? "h-screen -mb-8" : "px-96"}`}>
        <div
          className={`text-center font-normal ${
            isMobile || isTablet ? "text-lg" : "text-xl"
          }`}
        >
          อาหารที่เหมาะกับคุณ
        </div>

        <div className={`${isMobile || isTablet ? "my-4" : "my-6"}`}>
          <ProgressBar current={step} total={TOTAL_STEP} isDone={isDone} />
        </div>

        {renderStep()}

        {step === 1 ? (
          <ButtonWrapper
            className={`${isMobile || isTablet ? "container" : "my-12"}`}
            isDesktop={!(isMobile || isTablet)}
          >
            <Button
              type={BUTTON_TYPE.PRIMARY}
              className={`${isMobile || isTablet ? "w-full" : "ml-auto"}`}
              padding={`${isMobile || isTablet ? "0.9rem" : "0.9rem 5rem"}`}
              fontSize="16px"
              iconEnd={renderChevronIcon("right")}
              onClick={onNext}
            >
              <span>ต่อไป</span>
            </Button>
          </ButtonWrapper>
        ) : (
          <ButtonFooter
            className={`${isMobile || isTablet ? "container" : "my-12"}`}
            isFixed={isMobile || isTablet ? true : false}
            leftButtonLabel="ย้อนกลับ"
            leftButtonType={BUTTON_TYPE.SECONDARY}
            leftButtonIconStart={renderChevronIcon("left")}
            rightButtonLabel={step === LAST_STEP ? "เสร็จสิ้น" : "ต่อไป"}
            rightButtonIconEnd={renderChevronIcon("right")}
            width={isMobile || isTablet ? "100%" : "30%"}
            onLeftClick={onBack}
            onRightClick={onNext}
          />
        )}
      </div>
    </>
  );
};

export default Preference;

export async function getServerSideProps() {
  const allergyResponse = await getAllergy();
  const dietTypeResponse = await getDietType();

  let allergyData: AllergyData[] | null = null;
  let dietTypeData: DietTypeData[] | null = null;

  if (allergyResponse && allergyResponse.status === STATUS_CODE.OK) {
    allergyData = (allergyResponse as AllergyResponse).data;
  }

  if (dietTypeResponse && dietTypeResponse.status === STATUS_CODE.OK) {
    dietTypeData = (dietTypeResponse as DietTypeResponse).data;
  }

  return {
    props: {
      allergyData,
      dietTypeData,
    },
  };
}
