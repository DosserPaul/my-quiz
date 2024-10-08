import {PrismaClient} from "@prisma/client";

import * as dotenv from "dotenv";
import {IAPIResponse} from "../interfaces/IAPIResponse";

dotenv.config();

interface UserPayload {
  email: string;
  password: string;
  username: string;
}

class QuizServices {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createQuiz(title: string): Promise<IAPIResponse> {
    try {
      const quiz = await this.prisma.quiz.create({
        data: {
          title: title,
        },
      });

      return {
        status: true,
        payload: {
          message: "Quiz created successfully",
        },
      };
    } catch (error) {
      return {
        status: false,
        payload: error,
      };
    }
  }

  async addQuestion(quizId: string, text: string): Promise<IAPIResponse> {
    try {
      const question = await this.prisma.question.create({
        data: {
          text,
          quiz: {connect: {id: quizId}}, // Use UUID here
        },
      });

      return {
        status: true,
        payload: {
          message: "Question added successfully",
        },
      };
    } catch (error) {
      return {
        status: false,
        payload: error,
      };
    }
  }

  async addAnswer(questionId: string, text: string, isCorrect: boolean): Promise<IAPIResponse> {
    console.log(questionId);
    try {
      const answer = await this.prisma.answer.create({
        data: {
          text,
          isCorrect,
          question: {connect: {id: questionId}}, // Use UUID here
        },
      });

      return {
        status: true,
        payload: {
          message: "Answer added successfully",
        },
      };
    } catch (error) {
      return {
        status: false,
        payload: error,
      };
    }
  }

  async getQuizzes(): Promise<IAPIResponse> {
    try {
      const quizzes = await this.prisma.quiz.findMany({
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });

      return {
        status: true,
        payload: quizzes,
      };
    } catch (error) {
      return {
        status: false,
        payload: error,
      };
    }
  }

  async getQuiz(quizId: string): Promise<IAPIResponse> {
    try {
      const quiz = await this.prisma.quiz.findUnique({
        where: {
          id: quizId,
        },
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });

      return {
        status: true,
        payload: quiz,
      };
    } catch (error) {
      return {
        status: false,
        payload: error,
      };
    }
  }
}

export default QuizServices;
