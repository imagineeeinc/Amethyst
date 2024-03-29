FROM node:16

WORKDIR /

COPY ./ ./

RUN apt update
RUN apt install gcc -y
RUN apt install ffmpeg -y

RUN npm install
RUN npm install ytdl-core@latest

CMD ["npm", "start"]
