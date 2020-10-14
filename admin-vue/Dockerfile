FROM node:10-alpine as yanjd-blog-admin-vue
WORKDIR /usr/src/app
COPY ["package.json", ".npmrc", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.15-alpine
COPY --from=yanjd-blog-admin-vue /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]