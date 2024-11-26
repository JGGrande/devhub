import { Container } from "inversify";

import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { PrismaNivelRepository } from "../database/prisma-nivel.repository";

const nivelContainer = new Container();

nivelContainer.bind<INivelRepository>("NivelRepository").to(PrismaNivelRepository)

export { nivelContainer }