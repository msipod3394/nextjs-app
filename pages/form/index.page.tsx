import React, { useEffect, useState } from "react";
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
  Select,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../layouts/layout";
import { ErrorMessage } from "@hookform/error-message";
import { schema } from "./schema";
import { onFetchAddress } from "./onFetchAddress";
import { Inputs } from "./type";
import {
  selectBirthDate,
  selectBirthMonth,
  selectBirthYear,
} from "./selectBirth";
import ConfirmPage from "./confirm.page";

function Form() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ページ遷移のstate管理
  const [isConfirm, setIsConfirm] = useState(false);

  // 戻るボタンが押されたときに確認ページから元のフォームに戻る
  const handleBack = () => {
    setIsConfirm(false);
  };

  // 完了画面で戻るボタンが押されたとき、未入力のフォームに戻る
  const handleReset = () => {
    setIsConfirm(false);
    reset();
  };

  // API通信で取得した住所のstate管理
  const [address, setAddress] = useState(null);

  // API通信ハンドラ
  const handleFetchAddress = () => {
    onFetchAddress(getValues, setAddress, setValue);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (Object.keys(errors).length !== 0) {
      console.log("=============== エラーがあります =============== ");
      console.log("エラー:", errors);
      return;
    }

    console.log("=============== 成功！ =============== ");
    console.log("フォームデータ:", data);

    // 問題なければ、確認ページに遷移
    setIsConfirm(true);
  };

  return (
    <Layout>
      <Center>
        <Box w="100%" maxW="500px">
          {isConfirm ? (
            // 確認ページを表示
            <ConfirmPage
              formData={getValues()}
              onBack={handleBack}
              onReset={handleReset}
              onSubmit={handleSubmit(onSubmit)}
            />
          ) : (
            // フォーム
            <VStack spacing="4">
              {/* Name */}
              <HStack w="100%" spacing="4" alignItems="flex-start">
                {/* 姓 / lastName */}
                <FormControl w="50%" isRequired>
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
                <FormControl w="50%" isRequired>
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
                <FormControl w="50%" isRequired>
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
                <FormControl w="50%" isRequired>
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
              <FormControl isRequired>
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
              <FormControl isRequired>
                <FormLabel htmlFor="postcode" fontWeight="bold">
                  郵便番号
                </FormLabel>
                <HStack>
                  <Controller
                    name="postcode"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                  <Button onClick={handleFetchAddress} colorScheme="teal">
                    住所取得
                  </Button>
                </HStack>
              </FormControl>
              {/* 取得した住所情報を表示 */}
              <HStack w="100%" spacing="4" alignItems="flex-start">
                {/* 都道府県 / prefectures */}
                <FormControl w="50%" isRequired>
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
                <FormControl w="50%" isRequired>
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
                <FormControl w="50%" isRequired>
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
              {/* 生年月日 */}
              <HStack w="100%" spacing="4" alignItems="flex-end">
                <FormControl w="50%" isRequired>
                  <FormLabel htmlFor="birthYear" fontWeight="bold">
                    生年月日
                  </FormLabel>
                  <Controller
                    name="birthYear"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} placeholder="-">
                        {selectBirthYear()}
                      </Select>
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="birthYear"
                    render={({ message }) => (
                      <Text color="red" fontSize="sm">
                        {message}
                      </Text>
                    )}
                  />
                </FormControl>
                <FormControl w="50%" isRequired>
                  <Controller
                    name="birthMonth"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} placeholder="-">
                        {selectBirthMonth()}
                      </Select>
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="birthMonth"
                    render={({ message }) => (
                      <Text color="red" fontSize="sm">
                        {message}
                      </Text>
                    )}
                  />
                </FormControl>
                <FormControl w="50%" isRequired>
                  <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} placeholder="-">
                        {selectBirthDate()}
                      </Select>
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="birthDate"
                    render={({ message }) => (
                      <Text color="red" fontSize="sm">
                        {message}
                      </Text>
                    )}
                  />
                </FormControl>
              </HStack>
              {/* 性別 */}
              <HStack w="100%" spacing="4" alignItems="flex-start">
                <FormControl w="100%" isRequired>
                  <FormLabel htmlFor="gender" fontWeight="bold">
                    性別
                  </FormLabel>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        onChange={(value) => setValue("gender", value)}
                        value={field.value}
                      >
                        <HStack spacing={8}>
                          <Radio {...field} value="male">
                            男性
                          </Radio>
                          <Radio {...field} value="female">
                            女性
                          </Radio>
                          <Radio {...field} value="other">
                            その他
                          </Radio>
                        </HStack>
                      </RadioGroup>
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="gender"
                    render={({ message }) => (
                      <Text color="red" fontSize="sm">
                        {message}
                      </Text>
                    )}
                  />
                </FormControl>
              </HStack>
              {/* 好きな食べ物 / food */}
              <HStack w="100%" spacing="4" alignItems="flex-start">
                <FormControl isRequired>
                  <FormLabel fontWeight="bold">好きな食べ物</FormLabel>
                  <CheckboxGroup colorScheme="teal" defaultValue={[]}>
                    <HStack spacing={8}>
                      <Checkbox
                        value="sushi"
                        onChange={(e) =>
                          setValue("food", e.target.checked ? ["寿司"] : [])
                        }
                      >
                        寿司🍣
                      </Checkbox>
                      <Checkbox
                        value="ramen"
                        onChange={(e) =>
                          setValue("food", e.target.checked ? ["ラーメン"] : [])
                        }
                      >
                        ラーメン🍜
                      </Checkbox>
                      <Checkbox
                        value="焼肉"
                        onChange={(e) =>
                          setValue("food", e.target.checked ? ["焼肉"] : [])
                        }
                      >
                        焼肉🍖
                      </Checkbox>
                    </HStack>
                  </CheckboxGroup>
                  <ErrorMessage
                    errors={errors}
                    name="food"
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
                colorScheme="blue"
                onClick={handleSubmit(onSubmit)}
                mt={10}
              >
                送信
              </Button>
            </VStack>
          )}
        </Box>
      </Center>
    </Layout>
  );
}

export default Form;
