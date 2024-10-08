import {NextFunction, Request, Response} from 'express';

import BaseController from "../BaseController";
import {errorMessage} from "../../utils/errorMessage";
import QuizServices from "../../services/QuizServices";

class CreateController extends BaseController {
  private data: any;
  private services: QuizServices = new QuizServices();

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public static handle(req: Request, res: Response, next: NextFunction) {
    const controller = new CreateController(req, res, next);
    controller.execute().catch(next);
  }

  protected async execute(): Promise<void | any> {
    try {
      await this.validate();
      await this.process();
      await this.respond();
    } catch (error) {
      await this.error();
    }
  }

  protected async validate(): Promise<void | any> {
    const {id} = this.req.params;

    if (!id) {
      return errorMessage(this.res, 400, 'Invalid request data');
    }
  }

  protected async process(): Promise<void | any> {
    const {id} = this.req.params;

    this.data = await this.services.getQuiz(id);
  }

  protected async respond(): Promise<void | any> {
    if (!this.data || this.data.status === 'error') {
      return errorMessage(this.res, 400, this.data ? this.data.error : 'Invalid request data');
    }

    this.res.status(200).json({
      quiz: this.data.payload
    });
  }

  protected async error(): Promise<void | any> {
    errorMessage(this.res, 500, "Something went wrong");
  }
}

export default CreateController;
