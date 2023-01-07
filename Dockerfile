FROM node:16

WORKDIR /

COPY ./ ./

RUN apt update
RUN apt install ffmpeg
RUN apt install gcc

RUN npm install

CMD ["npm", "start"]
