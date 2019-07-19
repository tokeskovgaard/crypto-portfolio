FROM node:9-slim as builder

WORKDIR /usr/src/app

COPY . .
RUN npm run setup
RUN npm run build

CMD ["npm", "start"]
