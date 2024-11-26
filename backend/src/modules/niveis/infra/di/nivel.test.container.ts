import { Container } from "inversify";

import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { InMemoryNivelRepository } from "../database/in-memory-nivel.repository";

const nivelTestContainer = new Container();

nivelTestContainer.bind<INivelRepository>("NivelRepository").to(InMemoryNivelRepository);

export { nivelTestContainer };