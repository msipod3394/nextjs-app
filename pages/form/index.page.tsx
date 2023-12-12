import React from "react";
import {
  Box,
  HStack,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Layout from "../layouts/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Form() {
  yupResolver;

  /**
   * React-Hook-Form 初期化
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  /**
   * カスタムバリデーション関数
   */
  /* lastName, firstName 文字数制限 */
  const maxNameLimit = 10;

  /* 数字の登録を禁止 */
  const validateNoNum = (value) => {
    if (/\d/.test(value)) {
      return "数字は登録できません";
    }
    return true; // 登録
  };

  /* 10文字以上の登録を禁止 */
  const validateLimitCharacter = (value, maxNum) => {
    if (value.length > maxNum) {
      return `${maxNum}文字以上は登録できません`;
    }
    return true; // 登録
  };

  /* 全角カタカナのみ許可 */
  const validateFullKatakana = (value) => {
    if (!/^[\u30A0-\u30FFー]+$/.test(value)) {
      return "全角カタカナで登録してください";
    }
    return true;
  };

  /* メールアドレス正規表現 */
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "有効なメールアドレスを入力してください";
    }
    return true;
  };

  const onSubmit = (data) => {
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
              {/* lastName */}
              <FormControl w="50%" isRequired>
                <FormLabel htmlFor="lastName" fontWeight="bold">
                  姓
                </FormLabel>
                <Input
                  type="text"
                  id="lastName"
                  background="white"
                  {...register("lastName", {
                    required: "姓は必須です",
                    validate: {
                      validateNoNum,
                      validateLimitCharacter: (value) =>
                        validateLimitCharacter(value, maxNameLimit),
                    },
                  })}
                />
                <Box color="red" fontSize="sm" pt="2" fontWeight="500">
                  {errors.lastName && errors.lastName.message}
                </Box>
              </FormControl>
              {/* firstName */}
              <FormControl w="50%" isRequired>
                <FormLabel htmlFor="firstName" fontWeight="bold">
                  名
                </FormLabel>
                <Input
                  type="text"
                  id="firstName"
                  background="white"
                  {...register("firstName", {
                    required: "名は必須です",
                    validate: {
                      validateNoNum,
                      validateLimitCharacter: (value) =>
                        validateLimitCharacter(value, maxNameLimit),
                    },
                  })}
                />
                <Box color="red" fontSize="sm" fontWeight="500">
                  {errors.firstName && errors.firstName.message}
                </Box>
              </FormControl>
            </HStack>
            {/* Name（カナ） */}
            <HStack w="100%" spacing="4" alignItems="flex-start">
              {/* lastName */}
              <FormControl w="50%" isRequired>
                <FormLabel htmlFor="lastNameKana" fontWeight="bold">
                  セイ
                </FormLabel>
                <Input
                  type="text"
                  id="lastNameKana"
                  background="white"
                  {...register("lastNameKana", {
                    required: "セイは必須です",
                    validate: {
                      validateNoNum,
                      validateLimitCharacter: (value) =>
                        validateLimitCharacter(value, maxNameLimit),
                      validateFullKatakana,
                      // validateFullCharacter
                    },
                  })}
                />
                <Box color="red" fontSize="sm" pt="2" fontWeight="500">
                  {errors.lastNameKana && errors.lastNameKana.message}
                </Box>
              </FormControl>
              {/* firstNameKana */}
              <FormControl w="50%" isRequired>
                <FormLabel htmlFor="firstNameKana" fontWeight="bold">
                  メイ
                </FormLabel>
                <Input
                  type="text"
                  id="firstNameKana"
                  background="white"
                  {...register("firstNameKana", {
                    required: "メイは必須です",
                    validate: {
                      validateNoNum,
                      validateLimitCharacter: (value) =>
                        validateLimitCharacter(value, maxNameLimit),
                      validateFullKatakana,
                      // validateFullCharacter
                    },
                  })}
                />
                <Box color="red" fontSize="sm" fontWeight="500">
                  {errors.firstNameKana && errors.firstNameKana.message}
                </Box>
              </FormControl>
            </HStack>
            {/* メールアドレス */}
            <FormControl isRequired>
              <FormLabel htmlFor="email" fontWeight="bold">
                メールアドレス
              </FormLabel>
              <Input
                type="text"
                id="email"
                background="white"
                {...register("email", {
                  required: "メールアドレスは必須です",
                  validate: { validateEmail },
                })}
              />
              <Box color="red" fontSize="sm" pt="2" fontWeight="500">
                {errors.email && errors.email.message}
              </Box>
            </FormControl>

            {/* 送信 */}
            <Button
              onClick={handleSubmit(onSubmit)}
              colorScheme="blue"
              width="20%"
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
