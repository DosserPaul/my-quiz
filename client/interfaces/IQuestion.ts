import {IAnswer} from "@/interfaces/IAnswer";

export interface IQuestion {
  id: string;
  text: string;
  quizId: string;
  answers: IAnswer[];
}
