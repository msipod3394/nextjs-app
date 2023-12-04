import Head from "next/head";
import styles from "../styles/Home.module.css";
import { APITest } from "./components/APITest/APITest";

export default function Home() {
  return (
    <>
      <APITest />
    </>
  );
}
