FROM node:16.15.1

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 3000

CMD ["node", "server"]

