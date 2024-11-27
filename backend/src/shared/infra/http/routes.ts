import { Router } from "express";

import { nivelRoutes } from "@modules/niveis/infra/http/routes/nivel.route";
import { desenvolvedorRoutes } from "@modules/desenvolvedores/infra/http/routes/desenvolvedor.route";

const Routes = Router();

Routes.use("/niveis", nivelRoutes);
Routes.use("/desenvolvedores", desenvolvedorRoutes);

export { Routes };