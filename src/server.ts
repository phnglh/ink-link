import "dotenv/config";
import App from "./app";
import logger from "./utils/logger";

async function bootstrap() {
	const app = new App();
	const port = 3056;

	app.app.listen(port, () => {
		logger.info(`Server is running on port ${port}`);
	});
}

bootstrap().catch((error) => logger.error("Server startup error:", error));
