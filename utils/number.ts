export const zeroPad = (num: number, size: number = 2) => {
  let number: string = String(num);
  while (number.length < size) number = "0" + number;

  return number;
};

export const ingredientFormat = (amount: number) => {
  let formattedNumber: string;

  switch (amount) {
    case 0.3:
      formattedNumber = "⅓";
      break;
    case 0.5:
      formattedNumber = "½";
      break;
    case 0.6:
      formattedNumber = "⅔";
      break;
    case 0.7:
      formattedNumber = "¾";
      break;
    default:
      formattedNumber = amount.toString();
      break;
  }

  return formattedNumber;
};
