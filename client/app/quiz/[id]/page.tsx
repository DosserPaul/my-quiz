"use client";

import React, {useEffect, useState} from "react";
import {IQuiz} from "@/interfaces/IQuiz";
import axiosInstance from "@/lib/axios";
import QuizItem from "@/components/QuizItem";
import {IAnswer} from "@/interfaces/IAnswer";

export default function QuizPage({params}: { params: { id: string } }) {
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | null>(null);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { id } = params;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axiosInstance.get(`/quiz/${id}`);
        setQuiz(response.data.quiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    if (!quiz) {
      fetchQuiz();
    }
  }, [id, quiz]);

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1 && selectedAnswer) {
      setAnswers([...answers, selectedAnswer]);
      setSelectedAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    if (quiz && currentQuestionIndex === quiz.questions.length - 1) {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    console.log("Finish quiz");
    console.log(answers);
    setShowResults(true);
    // Here you can add logic to submit the answers to your backend
    // or navigate to a results page
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleNextQuestion]);

  if (!quiz) {
    return <div className="text-center text-gray-200">Loading quiz...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center text-gray-200">{quiz.title}</h1>
        {!showResults && currentQuestion && (
          <>
            <p className="text-xl text-[#3CCFD9]">
              <span className="text-[#E7AA32]">{currentQuestionIndex + 1}. </span>
              {currentQuestion.text}
            </p>

            {currentQuestion.answers.map((answer) => (
              <QuizItem key={answer.id} answer={answer} selectedAnswer={selectedAnswer}
                        setSelectedAnswer={setSelectedAnswer}/>
            ))}

            <div className="flex gap-3.5 items-center">
              <p className="text-gray-300">Press <span
                className="text-sm text-gray-200 italic uppercase font-semibold">Enter</span></p>
              <button className="rounded-full bg-[#3CCFD9] text-black px-4 py-2 font-semibold text-sm uppercase"
                      onClick={handleNextQuestion}>
                Next
              </button>
            </div>
          </>
        )}

        {showResults && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-[#3CCFD9]">Results</h2>
            <div className="flex flex-col gap-2">
              {answers.map((answer, index) => (
                <div key={answer.id} className="flex gap-2 items-center">
                  <p className="text-gray-300">{index + 1}. {answer.text}</p>
                  <span className="text-[#3CCFD9]">{answer.isCorrect ? '✅' : '❌'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
