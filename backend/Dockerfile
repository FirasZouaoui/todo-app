FROM node:18

WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install --global npm-force-resolutions


RUN npx npm-force-resolutions && npm install


COPY . .

EXPOSE 8000

CMD ["node", "server.js"]
