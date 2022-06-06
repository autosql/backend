FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 

COPY . .

ENV PORT=3000
ENV JWT_SECRET=djvnksdlvmkacnmmkadlvnskalvmak

EXPOSE 3000
CMD ["npm", "start"]
