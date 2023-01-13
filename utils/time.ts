export const convertMinsToSeconds = (minutes: number) => {
  return minutes * 60;
};

export const convertDaysToSeconds = (days: number) => {
  return days * 24 * 60 * 60;
};

export const formatTime = (timeInMinutes: number) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  if (timeInMinutes > 60) {
    return `${hours}:${minutes} ${hours > 1 ? "ชม." : "น."}`;
  }

  return `${timeInMinutes} น.`;
};
