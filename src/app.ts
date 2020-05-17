
import express, {
  Response, NextFunction, Request, Application,
} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import flash from "express-flash";
import lusca from "lusca";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import Routes from "./interfaces/route.interface";
import logger from "./utils/logger";
// import loggerMiddlware from "./middleware/logger.middleware";
// import AxiosRequestInterceptor from "./interceptors/request.interceptor";
// import AxiosResponseInterceptor from "./interceptors/response.interceptor";
import UserRoute from "./routes/user.route";


class App {
    public app: express.Application;

    /**
     * All auth Routes
     */
    private routes: Routes[] = [
      new UserRoute("/user"),
    ];

    public port: (string | number);

    public env: boolean;

    constructor() {
      dotenv.config({ path: ".env" });

      this.app = express();
      this.port = process.env.PORT || 3030;
      this.initializeMiddlewares();
      this.initializeRoutes(this.routes);
      this.initializeErrorHandling();
    }

    public async listen(): Promise<void> {
      this.app.listen(this.port, () => {
        logger.info(`🚀 App listening on the port ${this.port}`);
      });
    }

    public getApp(): Application {
      return this.app;
    }

    private initializeMiddlewares(): void {
      this.app.use(compression());
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use(cookieParser());
      this.app.use(flash());
      this.app.use(lusca.xframe("SAMEORIGIN"));
      this.app.use(lusca.xssProtection(true));
      this.app.use(
        express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }),
      );
    }


    private initializeRoutes(routes: Routes[]): void {
      routes.forEach((route) => {
        this.app.use("/", route.router);
      });
    }

    private initializeErrorHandling(): void {
      // this.app.use(errorMiddleware);
      this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json({ status: 500, message: "Something went wrong" });
        next(err);
      });
    }
}

export default App;
