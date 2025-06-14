import { Router } from "express";
import AuthController from "../controllers/auth.controller";

export default class AuthRouter {
	public router: Router;

	constructor(authController: AuthController) {
		this.router = Router();
		this.setupRoutes(authController);
	}

	private setupRoutes(authController: AuthController): void {
		this.router.post("/register", authController.register.bind(authController));
		this.router.post("/login", authController.login.bind(authController));
	}
}
