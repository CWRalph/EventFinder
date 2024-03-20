FROM node

WORKDIR /usr/src/app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/src ./src

WORKDIR /usr/src/app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/dist ./dist

EXPOSE 3000

WORKDIR /usr/src/app/backend
CMD ["npm", "start"]