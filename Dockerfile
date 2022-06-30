FROM node:alpine
WORKDIR /Task15_Bot1
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "start"]