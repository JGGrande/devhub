FROM node:20.13.0

RUN apt-get update -y
RUN apt-get install -y build-essential libpq-dev
RUN apt-get install -y openssl

WORKDIR /home/root/app

COPY ./backend .

RUN npm install --force

RUN if [ -d "build" ]; then rm -r build; fi

CMD if [ "$NODE_ENV" = "stage" ] || [ "$NODE_ENV" = "production" ]; then \
  npm start ; \
  else \
  npm run start:dev ; \
  fi