import express from "express";
import authRoutes from "./auth.routes";
import itemRoutes from "./item.routes";
import salesRoutes from "./sales.routes";

const rootRouter = express.Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/item", itemRoutes);
rootRouter.use("/sales", salesRoutes);

export default rootRouter;
