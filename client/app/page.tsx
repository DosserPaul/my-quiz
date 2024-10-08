"use client";

import {useEffect, useState} from "react";
import SelectQuizItem from "@/components/SelectQuizItem";
import {IQuiz} from "@/interfaces/IQuiz";
import axiosInstance from "@/lib/axios";

export default function Home() {
  const [quiz, setQuiz] = useState<IQuiz[] | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axiosInstance.get("/quiz");
      setQuiz(response.data.quiz);
    }

    if (!quiz) {
      fetchQuiz();
    }
  }, [quiz]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-2.5">
        <h1 className="text-4xl font-bold color text-center text-gray-200">Welcome to Quiz App 👋</h1>
        <p className="text-lg color text-center text-gray-400">Please select a quiz to start</p>
      </div>

      <div className="flex flex-col gap-2.5 mt-4">
        {quiz && quiz.map((quiz, index) => (
          <SelectQuizItem key={index} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
