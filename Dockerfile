FROM andreysenov/node-gyp

WORKDIR /

COPY ./ ./

RUN apt update
RUN apt install ffmpeg

RUN npm install

CMD ["npm", "start"]
