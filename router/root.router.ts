import { Router } from "express";
import authRouter from "./auth.router";

const rootRouter = Router();

rootRouter.use("/", authRouter);

export default rootRouter;
