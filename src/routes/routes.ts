import type { Router } from "express";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import UserRouter from "./user.routes";
import AuthRouter from "./auth.routes";
import AuthController from "../controllers/auth.controller";
import AuthService from "../services/auth.service";

interface RouteConfig {
	path: string;
	router: Router;
}

export const routes: RouteConfig[] = [
	{
		path: "/users",
		router: new UserRouter(new UserController(new UserService())).router,
	},
	{
	  path: '/auth',
	  router: new AuthRouter(new AuthController(new AuthService())).router,
	}
];
