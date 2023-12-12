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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../layouts/layout";

function Form() {
  const styles = `
/* フォームのコンテナ */
.form-container {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

/* タイトル */
h1 {
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

/* フォーム要素のスタイリング */
label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 15px;
  box-sizing: border-box;
}

/* エラーメッセージ */
.error {
  color: #e3342f;
  margin: 0 0 15px;
  font-size: 12px;
}

/* 送信ボタン */
button {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  font-weight: bold;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px !important;
}

button:hover {
  background-color: #2779bd;
}

  `;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Layout>
      <style>{styles}</style>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h1>フォーム</h1>
        <label htmlFor="name">名前</label>
        <input
          id="name"
          type="text"
          {...(register("name"), { required: "名前は必須です", })}
        />
        <p>{errors.name?.message as React.ReactNode}</p>
        <br />
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          {...(register("email"), { required: true })}
        />
        <br />
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          {...(register("password"), { required: true })}
        />
        <br />
        <button type="submit">送信</button>
      </form>
    </Layout>
  );
}

export default Form;
