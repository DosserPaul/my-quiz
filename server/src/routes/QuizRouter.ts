import BaseRouter from "./BaseRouter";
import CreateController from "../controllers/Quiz/CreateController";
import CreateQuestionController from "../controllers/Quiz/CreateQuestionController";
import CreateAnswerController from "../controllers/Quiz/CreateAnswerController";
import GetController from "../controllers/Quiz/GetController";
import GetByIdController from "../controllers/Quiz/GetByIdController";

class QuizRouter extends BaseRouter {
  constructor() {
    super();
    this.routes();
  }

  protected routes(): void {
    this.router.post("/create", CreateController.handle);
    this.router.post("/:quizId/question", CreateQuestionController.handle);
    this.router.post("/:questionId/answer", CreateAnswerController.handle);
    this.router.get("/", GetController.handle);
    this.router.get("/:id", GetByIdController.handle);
  }
}

export default new QuizRouter().router;
