-- CreateTable
CREATE TABLE "desenvolvedores" (
    "id" SERIAL NOT NULL,
    "nivel_id" INTEGER NOT NULL,
    "nome" VARCHAR NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "hobby" VARCHAR NOT NULL,

    CONSTRAINT "desenvolvedores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "desenvolvedores" ADD CONSTRAINT "desenvolvedores_nivel_id_fkey" FOREIGN KEY ("nivel_id") REFERENCES "niveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
