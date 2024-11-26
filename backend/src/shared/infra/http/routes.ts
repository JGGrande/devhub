import { Router } from "express";

import { nivelRoutes } from "@modules/niveis/infra/http/routes/nivel.route";

const Routes = Router();

Routes.use("/niveis", nivelRoutes);

export { Routes };