import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


export default class UserRouter {
	public router: Router;

	constructor(userController: UserController) {
		this.router = Router();
		this.setupRoutes(userController);
	}

	private setupRoutes(userController: UserController): void {
		this.router.get("/", authMiddleware,userController.findAll.bind(userController));
		this.router.post("/email",authMiddleware,userController.findByEmail.bind(userController));
		// this.router.post('/', userController.create.bind(userController));
		// this.router.put('/:id', userController.update.bind(userController));
		// this.router.delete('/:id', userController.delete.bind(userController));
	}
}
