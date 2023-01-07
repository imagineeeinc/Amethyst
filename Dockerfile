FROM node:16-alpine

WORKDIR /

COPY ./ ./

pk update
RUN apk add
RUN apk add ffmpeg
RUN apk add gcc

RUN npm install

CMD ["npm", "start"]
