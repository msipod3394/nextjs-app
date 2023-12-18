import React, { useState } from "react";
import { Box, Text, Button, VStack, Center } from "@chakra-ui/react";


type Props = {
  formData: any;
  onBack: () => void;
  onReset: (canRest: boolean) => void;
  onSubmit: () => void;
};


export default function Confirm({ formData, onBack, onReset, onSubmit }:Props) {
  // ページ遷移のstate管理
  const [isComplete, setIsComplete] = useState(false);

  // 問題なければ、完了ページに遷移
  const onComplete = () => {
    setIsComplete(true);
  };

  return (
    <Center>
      <Box w="100%" maxW="500px">
        {isComplete ? (
          // 送信完了（onCompleteがtrue）
          <VStack>
            <Text fontWeight="bold" fontSize="xl">
              完了しました！お疲れさまです！
            </Text>
            <Button colorScheme="teal" onClick={()=>{onReset(false)}} mt={20}>
              戻る
            </Button>
          </VStack>
        ) : (
          // 確認画面（onCompleteがfalse）
          <VStack spacing="4">
            <Text fontWeight="bold" fontSize="xl">
              確認
            </Text>
            {/* フォームから受け取ったデータを表示 */}
            <VStack align="start" spacing="2">
              <Text>{`姓: ${formData.lastName}`}</Text>
              <Text>{`名: ${formData.firstName}`}</Text>
              <Text>{`セイ: ${formData.lastNameKana}`}</Text>
              <Text>{`メイ: ${formData.firstNameKana}`}</Text>
              <Text>{`メールアドレス: ${formData.email}`}</Text>
              <Text>{`郵便番号: ${formData.postcode}`}</Text>
              <Text>{`都道府県: ${formData.prefectures}`}</Text>
              <Text>{`市区町村: ${formData.city}`}</Text>
              <Text>{`町名: ${formData.town}`}</Text>
              <Text>{`生年月日: ${formData.birthYear}年${formData.birthMonth}月${formData.birthDate}日`}</Text>
              <Text>{`性別: ${
                formData.gender === "male"
                  ? "男性"
                  : formData.gender === "female"
                  ? "女性"
                  : "その他"
              }`}</Text>
              <Text>{`好きな食べ物: ${formData.food.join(", ")}`}</Text>
            </VStack>
            {/* 戻るボタン */}
            <Button colorScheme="teal" onClick={onBack}>
              戻る
            </Button>
            {/* 送信ボタン */}
            <Button colorScheme="blue" onClick={onComplete}>
              送信
            </Button>
          </VStack>
        )}
      </Box>
    </Center>
  );
}
