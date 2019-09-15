FROM node:10 as react
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

FROM kyma/docker-nginx
COPY --from=react /app/build/ /var/www

CMD 'nginx'