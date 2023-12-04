import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Login } from "./components/Login/Login";

export default function Home() {
  return (
    <>
      <Login />
    </>
  );
}
