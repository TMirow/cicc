# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY . .

# Umgebung für Docker einsetzen
RUN cp src/environments/environment.docker.ts src/environments/environment.ts

RUN npm install && npm run build -- --configuration production

# Production stage
FROM nginx:1.25-alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
