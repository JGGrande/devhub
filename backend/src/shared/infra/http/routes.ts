import { Router, Request, Response } from "express";

const Routes = Router();

Routes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Hello World" });
});

export { Routes };