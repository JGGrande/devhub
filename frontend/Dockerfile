FROM node:20-alpine as build

WORKDIR /app

COPY ./frontend /app/

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]