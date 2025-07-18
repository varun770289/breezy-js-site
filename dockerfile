FROM node:latest

WORKDIR /app


COPY package*.json ./


RUN npm install


copy . .


EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host" ]

