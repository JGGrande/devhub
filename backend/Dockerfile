FROM node:20.13.0

RUN apt-get update -y
RUN apt-get install -y build-essential libpq-dev
RUN apt-get install -y openssl

WORKDIR /home/root/app

COPY . .

RUN npm install --force

RUN if [ -d "dist" ]; then rm -r dist; fi

RUN npm run build

CMD if [ "$NODE_ENV" = "stage" ] || [ "$NODE_ENV" = "production" ]; then \
  npm start ; \
  else \
  npm run start:dev ; \
  fi