FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG KINOPOISK_API_KEY
ARG KINOPOISK_API_URL=/api/kinopoisk

ENV KINOPOISK_API_KEY=$KINOPOISK_API_KEY
ENV KINOPOISK_API_URL=$KINOPOISK_API_URL

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
