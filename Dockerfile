FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["./node_modules/.bin/next", "dev", "-H", "0.0.0.0"]
