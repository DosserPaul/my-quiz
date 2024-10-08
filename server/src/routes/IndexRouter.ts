import {Router} from "express";
import IndexController from "../controllers/IndexController";
import QuizRouter from "./QuizRouter";

class IndexRouter {
    public router: Router;
    public path: string;
    public indexController: IndexController = new IndexController();

    constructor() {
        this.router = Router();
        this.path = "/api";

        this.routes();
    }

    private routes(): void {
        // Quiz
        this.router.use("/quiz", QuizRouter);

        // Default route
        this.router.get("/", this.indexController.index);
        this.router.get("*", this.indexController.notFound);
    }
}

export default new IndexRouter().router;
