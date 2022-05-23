import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [shortenURL, setShortenURL] = useState("");

  const getShortenURL = async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/url", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          realURL: input,
        }),
      });
      const data = await response.json();
      setShortenURL(data.shortenURL);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={getShortenURL}>Get</button>
      <a>{shortenURL}</a>
    </div>
  );
};

export default Home;
