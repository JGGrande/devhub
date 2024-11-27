import { Container } from "inversify";

import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { InMemoryNivelRepository } from "../database/in-memory-nivel.repository";

import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { InMemoryDesenvolvedorRepository } from "@modules/desenvolvedores/infra/database/in-memory-desenvolvedor.repository";

const nivelTestContainer = new Container();

nivelTestContainer.bind<INivelRepository>("NivelRepository").to(InMemoryNivelRepository);
nivelTestContainer.bind<IDesenvolvedorRepository>("DesenvolvedorRepository").to(InMemoryDesenvolvedorRepository);

export { nivelTestContainer };