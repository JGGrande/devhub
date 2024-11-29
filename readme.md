# DevHub

DevHub é uma plataforma completa para gerenciar desenvolvedores e seus níveis, com back-end em Node.js e TypeScript e front-end em React. O projeto segue uma arquitetura de monólito modular, garantindo escalabilidade e manutenibilidade. Além disso, utiliza injeção e inversão de dependências para melhor organização do código.

Acesse a versão online: [https://devhub.bytework.app.br/](https://devhub.bytework.app.br/)
Acesso o swagger das rotas: [https://devhub-api.infra.bytework.app.br/api-docs](https://devhub-api.infra.bytework.app.br/api-docs)

---

## Tecnologias Utilizadas

- **Back-end**: Node.js com TypeScript, estrutura modular com inversão de dependências.
- **Front-end**: React com ChakraUI para estilização.
- **Infraestrutura**:
  - **Cloudflare**: Registro DNS.
  - **CapRover**: Orquestração de containers.
  - **Contabo**: VPS para hospedagem.

---

## Executando o Projeto Localmente

### Pré-requisitos

- Docker e Docker Compose instalados e em execução.

### Passo a Passo

1. Certifique-se de que o Docker está instalado e rodando em sua máquina.
2. Navegue até a pasta `backend`, duplique o arquivo `.env.example` e renomeie para `.env`.
3. Acesse a pasta `frontend`, duplique o arquivo `.env.example` e renomeie para `.env`.
4. Na raiz do projeto, execute o comando:

   ```bash
   docker compose up
5. Pronto! Agora a aplicação está disponível em [http://localhost](http://localhost)

## Executando os Testes Unitários

O projeto conta com testes unitários para validar os casos de uso. Para executá-los, siga os passos abaixo:

### Pré-requisitos

- Node.js e npm instalados no sistema.

### Passo a Passo

1. Navegue até a pasta `backend`:
   - **Windows**:
     ```bash
     cd backend
     ```
   - **Linux/Mac**:
     ```bash
     cd backend
     ```
2. Instale as dependências caso ainda não tenha feito:
   ```bash
   npm install

3. Execute os testes:
  ```bash
  npm test

