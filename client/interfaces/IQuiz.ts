import {IQuestion} from "@/interfaces/IQuestion";

export interface IQuiz {
  id: string;
  title: string;
  questions: IQuestion[];
}
