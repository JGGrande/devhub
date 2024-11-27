import { Container } from "inversify";

import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { PrismaNivelRepository } from "../database/prisma-nivel.repository";

import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { PrismaDesenvolvedorRepository } from "@modules/desenvolvedores/infra/database/prisma-desenvolvedor.repository";

const nivelContainer = new Container();

nivelContainer.bind<INivelRepository>("NivelRepository").to(PrismaNivelRepository);
nivelContainer.bind<IDesenvolvedorRepository>("DesenvolvedorRepository").to(PrismaDesenvolvedorRepository);

export { nivelContainer }