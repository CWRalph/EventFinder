FROM node

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY src ./src

EXPOSE 4000

WORKDIR /usr/src/app
CMD ["npm", "start"]