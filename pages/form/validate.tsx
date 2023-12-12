/**
 * カスタムバリデーション関数
 */

/* lastName, firstName 文字数制限 */
// const maxNameLimit = 10;

/* 数字の登録を禁止 */
export const validateNoNum = (value) => {
  if (/\d/.test(value)) {
    return "数字は登録できません";
  }
  return true; // 登録
};

/* 10文字以上の登録を禁止 */
export const validateLimitCharacter = (value, maxNum) => {
  if (value.length > maxNum) {
    return `${maxNum}文字以上は登録できません`;
  }
  return true; // 登録
};

/* 全角カタカナのみ許可 */
export const validateFullKatakana = (value) => {
  if (!/^[\u30A0-\u30FFー]+$/.test(value)) {
    return "全角カタカナで登録してください";
  }
  return true;
};

/* メールアドレス正規表現 */
export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "有効なメールアドレスを入力してください";
  }
  return true;
};
