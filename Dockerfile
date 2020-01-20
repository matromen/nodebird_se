FROM node:10

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i -g pm2 cross-env sequelize-cli

RUN chmod +x docker-entrypoint.sh  
ENTRYPOINT ./docker-entrypoint.sh

EXPOSE 80

CMD ["npm", "run", "dev"]