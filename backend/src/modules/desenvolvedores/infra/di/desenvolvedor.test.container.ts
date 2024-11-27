import { Container } from "inversify";

import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { InMemoryDesenvolvedorRepository } from "../database/in-memory-desenvolvedor.repository";

import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { InMemoryNivelRepository } from "@modules/niveis/infra/database/in-memory-nivel.repository";

const desenvolvedorTestContainer = new Container();

desenvolvedorTestContainer.bind<IDesenvolvedorRepository>("DesenvolvedorRepository").to(InMemoryDesenvolvedorRepository);
desenvolvedorTestContainer.bind<INivelRepository>("NivelRepository").to(InMemoryNivelRepository);

export { desenvolvedorTestContainer };