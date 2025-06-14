import express, { Application } from "express";
import { AppDataSource } from "./data-source";
import { routes } from "./routes/routes";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import errorHandler from "errorhandler";
import compression from "compression";
import logger from "./utils/logger";
export default class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.setupMiddleware(); 
		this.setupRoutes();
		this.setupDatabase();
	}

	private setupMiddleware(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(compression({
			level: 6,
			threshold: 100*100
		}))
		this.app.use(loggerMiddleware)
		this.app.use(errorHandler())
	}

	private async setupDatabase(): Promise<void> {
		try {
			AppDataSource.initialize();
			logger.info("Database connected successfully");
		} catch (error) {
			logger.error("Database connection error:", error);
		}
	}

	private setupRoutes(): void {
		for (const { path, router } of routes) {
			this.app.use(path, router);
		}
	}
}
