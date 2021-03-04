FROM node:10-alpine
WORKDIR /usr/src/app
COPY ["package.json", ".npmrc", "./"]
RUN npm install
COPY . .
EXPOSE 8712
ENV STRAPI_URL https://www.yanjd.top
RUN npm run build
CMD npm start
