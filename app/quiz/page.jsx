"use client";

import { useState } from "react";
import { quiz } from "../data";

useState;

const QuizPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];
  // select and check answer
  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };
  // calculate score and  increment to next question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };
  return (
    <>
      <div>
        <div className="p-6 shadow-sm">
          <h1 className="text-xl md:text-3xl text-center font-semibold italic underline">
            Knock-Knock&#33; Quiz Is Here
          </h1>
          <div className="flex text-xl md:text-3xl font-medium font-serif text-fuchsia-600 items-center justify-center p-8">
            <h2>Questions : {activeQuestion + 1}</h2>
            <span>/{questions.length}</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {!showResult ? (
            <div className="m-7 p-4 md:m-10 md:p-7 bg-slate-100 md:h-[600px] md:w-1/2 rounded-xl shadow-sm">
              <h3 className="text-xl md:text-3xl font-medium text-center">
                {questions[activeQuestion].question}{" "}
              </h3>
              {answers.map((answer, idx) => (
                <ul className="list-none" key={idx}>
                  <li
                    onClick={() => onAnswerSelected(answer, idx)}
                    className={
                      selectedAnswerIndex === idx
                        ? "outline outline-slate-500 rounded m-7 p-4 text-[1.2rem] active:bg-fuchsia-400 active:text-white"
                        : "outline outline-slate-500 rounded m-7 p-4 text-[1.2rem]"
                    }
                  >
                    <span> {answer}</span>
                  </li>
                </ul>
              ))}
              <div className="flex items-center justify-center">
                {checked ? (
                  <button
                    onClick={nextQuestion}
                    className="bg-green-400 p-2 text-xl font-bold rounded-md cursor-pointer"
                  >
                    {activeQuestion === question.length - 1 ? "Finish" : "Next"}
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    disabled
                    className="bg-gray-500 p-2 text-gray-300 text-xl font-bold rounded-md cursor-not-allowed"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="m-7 p-4 md:m-7 md:p-4 flex items-center justify-center bg-slate-100 md:h-[600px] md:w-1/2 rounded-xl shadow-sm">
              <div className="space-y-3 md:space-y-5 text-center">
                <h3 className="text-center text-3xl font-bold">Results</h3>
                <h3 className="text-center text-xl font-medium">
                  Overall {(result.score / 25) * 100}&#37;
                </h3>
                <p>
                  Total Questions: <span>{question.length}</span>
                </p>
                <p>
                  Total Score: <span>{result.score}</span>
                </p>
                <p>
                  Correct Answers: <span>{result.correctAnswers}</span>
                </p>
                <p>
                  Wrong Answers: <span>{result.wrongAnswers}</span>
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-yellow-300 p-1 md:p-3 text-xl m-4 rounded-md"
                >
                  Restart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;
