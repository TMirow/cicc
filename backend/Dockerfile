FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

RUN apt-get update && apt-get install -y netcat-openbsd

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

CMD ["node", "dist/main"]
EXPOSE 3000