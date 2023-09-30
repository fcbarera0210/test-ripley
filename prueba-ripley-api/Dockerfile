FROM node:18.18.0-alpine AS base
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18.18.0-alpine
WORKDIR /app
RUN adduser -h /tmp -s /sbin/nologin -D -H -u 1001 app && \
  chown -R app:app /app
COPY --chown=app:app --from=base /app/dist /app/dist
COPY package.json /app
COPY package-lock.json /app
RUN chown -R app:app /app
USER app
RUN npm install --omit=dev
CMD ["npm", "run", "start:prod"]
