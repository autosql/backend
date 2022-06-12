FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .

ARG mysql_host
ARG mysql_password
ENV MYSQL_HOST=$mysql_host
ENV MYSQL_PASSWORD=$mysql_password

EXPOSE 3000
CMD ["npm", "start"]
