# ===============================================
# Dependencies
# ===============================================

FROM node:24-alpine3.23 AS deps

ARG APP_NAME

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock*.json ./

RUN npm install

COPY . .

RUN npm run build -- ${APP_NAME}

CMD ["node", "dist/apps/${APP_NAME}/main.js"]