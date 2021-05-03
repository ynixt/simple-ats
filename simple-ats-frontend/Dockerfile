FROM node:14-alpine as builder

WORKDIR /frontend
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM node:14-alpine
WORKDIR /shared
COPY --from=builder /frontend/dist/simple-ats-frontend .