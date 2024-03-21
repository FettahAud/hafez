"use client";

import quran from "quran-json/dist/quran.json";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [start, setStart] = useState(false);
  const [verse, setVerse] = useState("");
  const [verses, setVerses] = useState();

  const startQuiz = () => {
    if (from === 0 || to === 0) {
      return alert("الرجاء اختيار السور");
    } else if (from > to) {
      return alert("الرجاء اختيار السور بشكل صحيح");
    }
    setStart(true);
    setVerses(
      // @ts-ignore
      [
        ...quran
          .slice(from - 1, to)
          .map((surah) =>
            surah.verses.map((verse) => ({ ...verse, sura: surah }))
          )
          .flat(),
      ]
    );
  };

  const pickRandomVerse = () => {
    const random = Math.floor(Math.random() * verses.length);
    setVerse(verses[random]);
  };

  const hintVerse = () => {
    alert(quran[verse.sura.id - 1].verses[verse.id]);
  };

  useEffect(() => {
    if (!verses) return;
    pickRandomVerse();
  }, [verses]);

  return (
    <div className="div" id="app">
      {!start && (
        <div className="wrapper">
          <div className="selects">
            <div className="select-wrapper from">
              <select
                value={from}
                onChange={(e) => setFrom(Number(e.target.value))}
              >
                <option value={0} disabled>
                  من
                </option>
                {quran.map((surah, index) => (
                  <option key={index} value={index + 1}>
                    {surah.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-wrapper to">
              <select
                value={to}
                onChange={(e) => setTo(Number(e.target.value))}
              >
                <option value={0} disabled>
                  إلى
                </option>
                {quran.map((surah, index) => (
                  <option
                    key={index}
                    value={index + 1}
                    disabled={index + 1 < from}
                  >
                    {surah.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="start-but" onClick={() => startQuiz()}>
            ابدأ
          </button>
        </div>
      )}
      {start && (
        <div className="quiz-wrapper">
          <h3 className="header">
            من سورة {quran[from - 1].name} الى سورة {quran[to - 1].name}
          </h3>
          <div className="quiz">ماهي الايه اللتي تلي</div>
          <div className="verse">{verse.text}</div>
          <div className="buttons">
            <button className="but next-but" onClick={() => pickRandomVerse()}>
              التالي
            </button>
            <button className="but back-but" onClick={() => setStart(false)}>
              رجوع
            </button>
          </div>
          <button className="but hint-but" onClick={() => hintVerse()}>
            الق نظره
          </button>
        </div>
      )}
    </div>
  );
}
