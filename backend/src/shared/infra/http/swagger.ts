import { env } from "@shared/env";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      description: 'API de',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${env.SERVER_PORT}`,
        description: 'Servidor local',
      }
    ]
  },

  apis: ['./src/modules/**/*.ts']
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);