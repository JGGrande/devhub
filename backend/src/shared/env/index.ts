import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["stage", "production", "dev", "test"]),
  SERVER_PORT: z.coerce.number(),
  DATABASE_URL: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error("Variáveis de ambiente inválidas");
}

export const env = _env.data;
