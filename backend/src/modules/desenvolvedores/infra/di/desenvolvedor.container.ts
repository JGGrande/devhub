import { Container } from "inversify";

import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { PrismaDesenvolvedorRepository } from "../database/prisma-desenvolvedor.repository";

import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { PrismaNivelRepository } from "@modules/niveis/infra/database/prisma-nivel.repository";

const desenvolvedorContainer = new Container();

desenvolvedorContainer.bind<IDesenvolvedorRepository>("DesenvolvedorRepository").to(PrismaDesenvolvedorRepository);
desenvolvedorContainer.bind<INivelRepository>("NivelRepository").to(PrismaNivelRepository);

export { desenvolvedorContainer };