FROM node:20-alpine as build

WORKDIR /app

COPY ./frontend /app/

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]