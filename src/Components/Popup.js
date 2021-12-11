import { useEffect } from "react";
import { checkWin } from "../Helpers/helper";

function Popup({ wrongLetters, correctLetters, selectedWord, setPlayable }) {
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;

  if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
    finalMessage = "Congrats You Won! 🥳";
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
    finalMessage = "Unfortunately You Lost! 😔";
    finalMessageRevealWord = `... the word was : ${selectedWord}`;
    playable = false;
  }

  useEffect(() => setPlayable(playable));
  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord} </h3>
        <button> Play Again</button>
      </div>
    </div>
  );
}

export default Popup;
