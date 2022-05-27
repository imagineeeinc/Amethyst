FROM node:16

WORKDIR /

COPY index.js ./

RUN apt install gcc

RUN npm install

CMD ["npm", "start"]