import { Router } from "express";
import { NivelController } from "../controllers/nivel.controller";

const nivelRoutes = Router();
const nivelController = new NivelController()

nivelRoutes.post("/", nivelController.create);

export { nivelRoutes };