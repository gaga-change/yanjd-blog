FROM node:10-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json .
RUN npm --registry https://registry.npm.taobao.org install
COPY . .
EXPOSE 80
RUN npm run build
CMD npm start
