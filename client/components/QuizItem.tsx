import {FC} from "react";
import {IAnswer} from "@/interfaces/IAnswer";
import {cn} from "@/lib/utils";

interface QuizItem {
  answer: IAnswer;
  selectedAnswer: IAnswer | null;
  setSelectedAnswer: (answer: IAnswer) => void;
}

const SelectQuizItem: FC<QuizItem> = ({answer, selectedAnswer, setSelectedAnswer}) => {
  const handleSelectAnswer = () => {
    setSelectedAnswer(answer);
  }

  return (
    <div
      className="w-full px-4 rounded-xl cursor-pointer text-gray-200 text-lg hover:bg-black bg-black bg-opacity-40 hover:text-white transition-colors hover:bg-opacity-80 flex gap-3.5 items-center py-3" onClick={handleSelectAnswer}>
      <div className={cn(
        "h-5 w-5 rounded-full",
        selectedAnswer?.id === answer.id ? "bg-[#3CCFD9]" : "bg-gray-700"
      )}>
      </div>
      {answer.text}
    </div>
  )
}

export default SelectQuizItem;
