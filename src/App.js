import React, { useState, useEffect } from "react";
import "./App.css";
import Figure from "./Components/Figure";
import Header from "./Components/Header";
import WrongLetters from "./Components/WrongLetters";
import Word from "./Components/Word";
import Popup from "./Components/Popup";
import Notification from "./Components/Notification";
import { showNotification as show } from "./Helpers/helper";

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "programmable",
  "support",
  "circuit",
  "robot",
  "root",
  "gaming",
  "keyboard",
  "mouse",
  "cat",
  "dog",
  "bird",
  "react",
  "javascript",
  "dotnet",
  "television",
  "car",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter))
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          else show(setShowNotification);
        } else if (!wrongLetters.includes(letter))
          setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
        else show(setShowNotification);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);
    //empty arrays
    setCorrectLetters([]);
    setWrongLetters([]);
    //set new random word
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }
  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        wrongLetters={wrongLetters}
        correctLetters={correctLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
