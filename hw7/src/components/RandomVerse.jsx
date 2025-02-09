import { useState } from "react";
import "./VerseCard.css";

const RandomVerse = () => {
  const [verse, setVerse] = useState("");

  const fetchRandomVerse = async () => {
    try {
      const response = await fetch("https://labs.bible.org/api/?passage=random&type=json");
      const data = await response.json();
      if (data.length > 0) {
        setVerse(`${data[0].bookname} ${data[0].chapter}:${data[0].verse} - "${data[0].text}"`);
      }
    } catch (error) {
      console.error("Error fetching random verse:", error);
    }
  };

  return (
    <div className="verse-card">
      <h2>Random Bible Verse</h2>
      <p className="verse-text">{verse || "Click the button to get a random verse"}</p>
      <button className="fetch-button" onClick={fetchRandomVerse}>Get Random Verse</button>
    </div>
  );
};

export default RandomVerse;
