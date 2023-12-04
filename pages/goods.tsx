import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Goods } from "./components/Goods/Goods";

export default function Home() {
  return (
    <>
      <Goods />
    </>
  );
}
