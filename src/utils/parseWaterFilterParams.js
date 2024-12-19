const parseNumber = (number) => {
  if (typeof number !== 'string') return;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(number)) return;

  return parsedNumber;
};

export const parseWaterFilterParams = (month, year) => {
  const parsedYear = parseNumber(year);
  const parsedMonth = parseNumber(month);

  return {
    parsedYear: parsedYear,
    parsedMonth: parsedMonth,
  };
};
