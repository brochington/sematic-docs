# ========= BUILD =========
FROM node:18-alpine3.15 as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npm run build

# ========= RUN =========
FROM caddy:2-alpine

EXPOSE 80 443

COPY ./config/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/build /usr/share/caddy/html