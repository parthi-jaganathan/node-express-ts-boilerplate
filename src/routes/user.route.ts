import { Router } from "express";
import UserController from "../controller/user.controller";
import IRoute from "../interfaces/route.interface";

class UserRoute implements IRoute {
    path: string;

    public router = Router();

    public userController = new UserController();

    constructor(path: string) {
        this.path = path;
        this.initializeRoutes();
    }

    /**
     *         // path => /user/Info
     */
    private initializeRoutes() {
        this.router.get(`${this.path}/info`, this.userController.getUserInfo);
    }
}

export default UserRoute;
