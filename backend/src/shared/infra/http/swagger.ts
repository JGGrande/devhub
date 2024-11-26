import { env } from "@shared/env";
import swaggerJSDoc from "swagger-jsdoc";

import { CreateNivelRequestSchema, NivelSchema, UpdateNivelRequestSchema } from "@modules/niveis/infra/swagger/nivel.schema";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API DevHub',
      description: 'API do DevHub',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${env.SERVER_PORT}/api`,
        description: 'Servidor local',
      }
    ],
    components: {
      schemas: {
        CreateNivelRequestSchema,
        UpdateNivelRequestSchema,
        NivelSchema,
      }
    }
  },

  apis: ['./src/modules/**/*.ts']
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);