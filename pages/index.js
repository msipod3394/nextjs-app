import Head from 'next/head';
import styles from '../styles/Home.module.css';
// import { Login } from './components/login';
import { Popup } from './components/Popup';

export default function Home() {
  return (
    <>
      {/* <Login /> */}
      <Popup />
    </>
  );
}
