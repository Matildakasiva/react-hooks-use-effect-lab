import React, { useState, useEffect} from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  //"decrements the timer by 1 every second"
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000)
  
    return () => clearInterval(timer);
  }, [])

  //"calls onAnswered after 10 seconds"
  useEffect(() => {
    if (timeRemaining === 0) {
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered])

  //"clears the timeout after unmount"
  useEffect (() => {
    const timeoutId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime -1)
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
