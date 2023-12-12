import React, { useState } from "react";
import {
  Box,
  HStack,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../layouts/layout";
import { ErrorMessage } from "@hookform/error-message";

/**
 * 型定義
 */
type Inputs = {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  postcode: string;
  prefectures: string;
  city: string;
  town: string;
};

/**
 * バリデーション（yup）
 */
const schema = yup.object().shape({
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
});

/**
 * zipcloudから住所情報を取得する
 */
const zipcloudURL = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=";

function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // API通信で取得した住所
  const [address, setAddress] = useState(null);

  const onFetchAddress = () => {
    // ポストコードを取得
    const postcode = getValues("postcode");

    // 存在チェック
    if (!postcode) {
      console.log("ポストコードが空なので処理終了！");
      return;
    }

    // - があれば除去
    const formattedZipcode = String(postcode).replace(/-/g, "");

    // API通信するURLを作成
    const url = `${zipcloudURL}${formattedZipcode}`;

    // API通信
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("取得した情報:", data.results);

        // 取得した住所を設定
        setAddress(data.results);

        // フォームの値を更新
        setValue("prefectures", data.results[0].address1);
        setValue("city", data.results[0].address2);
        setValue("town", data.results[0].address3);
      })
      .catch((error) => {
        console.error("Error fetching address information:", error);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("onSubmit");

    if (Object.keys(errors).length !== 0) {
      console.log("=============== エラーがあります =============== ");
      console.log("エラー:", errors);
      return;
    }

    console.log("=============== 成功！ =============== ");
    console.log("フォームデータ:", data);
  };

  return (
    <Layout>
      <Center>
        <Box w="100%" maxW="500px">
          <VStack spacing="4">
            {/* Name */}
            <HStack w="100%" spacing="4" alignItems="flex-start">
              {/* 姓 / lastName */}
              <FormControl w="50%" isInvalid={errors.lastName}>
                <FormLabel htmlFor="lastName" fontWeight="bold">
                  姓
                </FormLabel>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage
                  errors={errors}
                  name="lastName"
                  render={({ message }) => (
                    <Text color="red" fontSize="sm">
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
              {/* 名 / firstName */}
              <FormControl w="50%" isInvalid={errors.firstName}>
                <FormLabel htmlFor="firstName" fontWeight="bold">
                  名
                </FormLabel>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message }) => (
                    <Text color="red" fontSize="sm">
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
            </HStack>
            {/* Name（カナ） */}
            <HStack w="100%" spacing="4" alignItems="flex-start">
              {/* セイ / lastNameKana */}
              <FormControl w="50%" isInvalid={errors.lastNameKana}>
                <FormLabel htmlFor="lastNameKana" fontWeight="bold">
                  セイ
                </FormLabel>
                <Controller
                  name="lastNameKana"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage
                  errors={errors}
                  name="lastNameKana"
                  render={({ message }) => (
                    <Text color="red" fontSize="sm">
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
              {/* メイ / firstNameKana */}
              <FormControl w="50%" isInvalid={errors.firstNameKana}>
                <FormLabel htmlFor="firstNameKana" fontWeight="bold">
                  メイ
                </FormLabel>
                <Controller
                  name="firstNameKana"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage
                  errors={errors}
                  name="firstNameKana"
                  render={({ message }) => (
                    <Text color="red" fontSize="sm">
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
            </HStack>
            {/* メールアドレス / email */}
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email" fontWeight="bold">
                メールアドレス
              </FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <Text color="red" fontSize="sm">
                    {message}
                  </Text>
                )}
              />
            </FormControl>
            {/* 郵便番号 / postcode */}
            <FormControl>
              <FormLabel htmlFor="postcode" fontWeight="bold">
                郵便番号
              </FormLabel>
              <HStack>
                <Controller
                  name="postcode"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                <Button onClick={onFetchAddress} colorScheme="teal">
                  住所取得
                </Button>
              </HStack>
            </FormControl>
            {/* <HStack w="100%" spacing="4" alignItems="flex-start">
              {address &&
                address.map((val, index) => (
                  <Box key={index}>
                    <Text>郵便番号: {val.zipcode}</Text>
                    <Text>都道府県: {val.address1}</Text>
                    <Text>市区町村: {val.address2}</Text>
                    <Text>町名: {val.address3}</Text>
                  </Box>
                ))}
            </HStack> */}

            {/* 取得した住所情報を表示 */}
            <HStack w="100%" spacing="4" alignItems="flex-start">
              {/* 都道府県 / prefectures */}
              <FormControl w="50%" isInvalid={errors.prefectures}>
                <FormLabel htmlFor="prefectures" fontWeight="bold">
                  都道府県
                </FormLabel>
                <Controller
                  name="prefectures"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage
                  errors={errors}
                  name="prefectures"
                  render={({ message }) => (
                    <Text color="red" fontSize="sm">
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
            </HStack>
            <HStack w="100%" spacing="4" alignItems="flex-start">
              {/* 市区町村 / city */}
              <FormControl w="50%" isInvalid={errors.city}>
                <FormLabel htmlFor="city" fontWeight="bold">
                  市区町村
                </FormLabel>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage
                  errors={errors}
                  name="city"
                  render={({ message }) => (
                    <Text color="red" fontSize="sm">
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
              {/* 町名 / town */}
              <FormControl w="50%" isInvalid={errors.town}>
                <FormLabel htmlFor="town" fontWeight="bold">
                  町名
                </FormLabel>
                <Controller
                  name="town"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage
                  errors={errors}
                  name="town"
                  render={({ message }) => (
                    <Text color="red" fontSize="sm">
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
            </HStack>

            {/* 送信 */}
            <Button
              width="20%"
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
            >
              送信
            </Button>
          </VStack>
        </Box>
      </Center>
    </Layout>
  );
}

export default Form;
