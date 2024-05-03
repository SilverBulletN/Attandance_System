# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

# Copy nginx-config into the build directory
COPY nginx-config /app/nginx-config

RUN yarn build

# Stage 2: Serve app with nginx
FROM nginx:alpine

# Copy nginx-config into nginx
COPY --from=build /app/nginx-config/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build directory from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
