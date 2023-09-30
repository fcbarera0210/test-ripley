FROM node:18.18.0-alpine AS base
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx
COPY --from=base /app/dist/prueba-ripley-front/ /usr/share/nginx/html

