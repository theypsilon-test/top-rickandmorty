FROM node:16.16-alpine3.16 as build-step
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm ci
ADD . /app
RUN npm test && npm run build

FROM node:16.16-alpine3.16 as run-step
WORKDIR /dist
COPY --from=build-step /app/.next/standalone .
COPY --from=build-step /app/.next/static .next/static
COPY --from=build-step /app/public public
CMD ["node", "server.js"]
