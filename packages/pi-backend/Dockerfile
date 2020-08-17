FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
# COPY .env ./
RUN echo APP_PORT=4000 >> .env
RUN echo TYPEORM_CONNECTION="postgres" >> .env
RUN echo TYPEORM_HOST="db" >> .env
RUN echo TYPEORM_USERNAME="postgres" >> .env
RUN echo TYPEORM_PASSWORD="root" >> .env
RUN echo TYPEORM_DATABASE="pi_db" >> .env
RUN echo TYPEORM_PORT=5432 >> .env
RUN echo TYPEORM_SYNCHRONIZE=true >> .env
RUN echo TYPEORM_ENTITIES="dist/entity/*.*" >> .env

RUN cat .env
RUN npm install
RUN npm run build

EXPOSE 4000
CMD [ "npm", "start" ]