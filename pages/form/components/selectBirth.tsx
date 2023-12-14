/**
 * 生年月日セレクター
 */
export const selectBirth = (type, length = 31) => {
  return Array.from({ length: length }, (_, index) => {
    const value =
      type === "year" ? new Date().getFullYear() - index : index + 1;
    return (
      <option key={value} value={value}>
        {value}
      </option>
    );
  });
};

// export const selectBirthYear = () => {
//   return Array.from(
//     { length: 100 },
//     (_, index) => new Date().getFullYear() - index
//   ).map((year) => (
//     <option key={year} value={year}>
//       {year}
//     </option>
//   ));
// };

// export const selectBirth = (length) => {
//   return Array.from({ length: length }, (_, index) => index + 1).map((val) => (
//     <option key={val} value={val}>
//       {val}
//     </option>
//   ));
// };
