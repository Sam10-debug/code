import Head from "next/head";
import styles from "../styles/Home.module.css";
import HomePage from "./homepage";
import axios from "axios";
import { useRef, useEffect } from "react";
import { useData } from "../context/DataContext";

export default function Home({ data }) {
  const { updateData } = useData();
  // console.log(data);
  const updated = useRef(false);

  useEffect(() => {
    if (updated.current === false) {
      updated.current = true;
      updateData(data);
    }
  }, [updateData, data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>musica app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const popular = await axios.get(
      "https://musica-api.up.railway.app/popular"
    );
    const newMusic = await axios.get("https://musica-api.up.railway.app/new");

    const data = {
      popular: popular.data,
      newMusic: newMusic.data,
    };

    return {
      props: { data },
      revalidate: 10, //ISR - incremental static regeneration
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};