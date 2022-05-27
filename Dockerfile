FROM node:16

WORKDIR /

COPY ./ ./

RUN apt install gcc

RUN npm install

CMD ["npm", "start"]