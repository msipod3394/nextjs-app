export const selectBirthYear = () => {
  return Array.from(
    { length: 100 },
    (_, index) => new Date().getFullYear() - index
  ).map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));
};

export const selectBirthMonth = () => {
  return Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
    <option key={month} value={month}>
      {month}
    </option>
  ));
};

export const selectBirthDate = () => {
  return Array.from({ length: 31 }, (_, index) => index + 1).map((date) => (
    <option key={date} value={date}>
      {date}
    </option>
  ));
};
