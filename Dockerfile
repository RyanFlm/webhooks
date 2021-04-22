FROM node:14-alpine

WORKDIR /usr/app

COPY . .
RUN npm ci
RUN npm run build

EXPOSE 18030

CMD ["npm", "start"]
