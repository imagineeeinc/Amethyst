FROM node:16

WORKDIR /

COPY ./ ./

RUN apt install gcc

RUN npm install

RUN npm i ffmpeg-static

CMD ["npm", "start"]
