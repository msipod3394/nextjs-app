import * as yup from "yup";

/**
 * バリデーション（yup）
 */


export const schema = yup.object().shape({
  lastName: yup
    .string()
    .required("姓は必須です")
    .max(10, "10文字以上は登録できません")
    .matches(/^[^\d]+$/, "数字は登録できません"),
  firstName: yup
    .string()
    .required("名は必須です")
    .max(10, "10文字以上は登録できません")
    .matches(/^[^\d]+$/, "数字は登録できません"),
  lastNameKana: yup
    .string()
    .required("セイは必須です")
    .max(10, "10文字以上は登録できません")
    .matches(/^[\u30A0-\u30FFー]+$/, "全角カタカナで登録してください"),
  firstNameKana: yup
    .string()
    .required("メイは必須です")
    .max(10, "10文字以上は登録できません")
    .matches(/^[\u30A0-\u30FFー]+$/, "全角カタカナで登録してください"),
  email: yup
    .string()
    .required("メールアドレスは必須です")
    .email("有効なメールアドレスを入力してください"),
  postcode: yup.string().required("郵便番号は必須です"),
  prefectures: yup.string().required("都道府県は必須です"),
  city: yup.string().required("市区町村は必須です"),
  town: yup.string().required("町名は必須です"),
  birthYear: yup.string().required("年を選択してください"),
  birthMonth: yup.string().required("月を選択してください"),
  birthDate: yup.string().required("日を選択してください"),
  gender: yup.string().required("性別を選択してください"),
  food: yup.array().min(1, "好きな食べ物を1つ以上選択してください"),
});
