import {FC} from "react";
import {IQuiz} from "@/interfaces/IQuiz";
import Link from "next/link";

interface QuizItem {
  quiz: IQuiz;
}

const SelectQuizItem: FC<QuizItem> = ({quiz}) => {
  return (
    <Link href={`/quiz/${quiz.id}`}>
      <div
        className="w-full py-2 px-4 rounded-md cursor-pointer text-gray-200 text-lg hover:bg-black bg-black bg-opacity-40 hover:text-white transition-colors hover:bg-opacity-80">
        {quiz.title}
      </div>
    </Link>
  )
}

export default SelectQuizItem;
