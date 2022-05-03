FROM node:16
WORKDIR /app
COPY package.json ./
RUN npm install
COPY src/ ./src
COPY public/ ./public
COPY jsconfig.json ./
CMD ["npm", "start"]
