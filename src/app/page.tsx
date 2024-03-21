"use client";

import quran from "quran-json";
import { useEffect, useState } from "react";

export default function Home() {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [fromQuranList, setFromQuranList] = useState(quran);
  const [toQuranList, setToQuranList] = useState(quran);

  useEffect(() => {
    console.log("from", from);
    console.log("to", to);
  }, [to, from]);
  return (
    <div className="div" id="app">
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
            <select value={to} onChange={(e) => setTo(Number(e.target.value))}>
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
        <button className="start-but">ابدأ</button>
      </div>
    </div>
  );
}
