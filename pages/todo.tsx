import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Todo } from "./components/Todo/Todo";

export default function Home() {
  return (
    <>
      <Todo />
    </>
  );
}
