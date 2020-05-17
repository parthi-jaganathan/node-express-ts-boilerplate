import { Request, Response, NextFunction } from "express";
import { OK } from "http-status-codes";
import logger from "../utils/logger";
import UserService from "../services/user.service";


class UserController {
    public getUserInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userService = new UserService();
        try {
            logger.info("Getting userInfo ", { url: req.url });
            const user = userService.getUserInfo();
            res.status(OK).json(user);
        } catch (err) {
            next(err);
        }
    }
}

export default UserController;
