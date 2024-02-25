FROM node:20
WORKDIR /usr/src/todo-prisma/app
COPY ./package.json .
COPY ./vite.config.ts .
RUN npm install --omit=dev
COPY ./ ./
EXPOSE 3000
CMD npm run dev
