import React, { useState } from "react";
import "../App.css";

const WORD_LIST = ["apple", "grape", "mango", "peach", "berry"];
const TARGET_WORD = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
const MAX_ATTEMPTS = 6;

const Wordle = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    if (e.target.value.length <= 5) {
      setCurrentGuess(e.target.value.toLowerCase());
    }
  };

  const handleSubmit = () => {
    if (currentGuess.length !== 5 || !WORD_LIST.includes(currentGuess)) {
      setMessage("Invalid word! Please try again.");
      return;
    }
    
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === TARGET_WORD) {
      setMessage("🎉 Congratulations! You guessed the word! 🎉");
      setGameOver(true);
      return;
    }

    if (newGuesses.length === MAX_ATTEMPTS) {
      setMessage(`❌ Game Over! The word was ${TARGET_WORD}`);
      setGameOver(true);
    }

    setCurrentGuess("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !gameOver) {
      handleSubmit();
    }
  };

  const getFeedback = (guess) => {
    return guess.split("").map((char, index) => {
      if (char === TARGET_WORD[index]) return "green";
      if (TARGET_WORD.includes(char)) return "yellow";
      return "gray";
    });
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <h1 className="title">Wordle Clone</h1>
      <div className="grid">
        {guesses.map((guess, i) => (
          <div key={i} className="word-row">
            {guess.split("").map((char, j) => (
              <span key={j} className={`letter ${getFeedback(guess)[j]}`}>
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
      {!gameOver && (
        <div className="input-container">
          <input
            type="text"
            value={currentGuess}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            maxLength={5}
            className="input-box"
            placeholder="Enter a word"
          />
          <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
      )}
      <p className="message">{message}</p>
      {gameOver && <button onClick={handleRestart} className="restart-button">New Game</button>}
    </div>
  );
};

export default Wordle;
