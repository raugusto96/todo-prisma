FROM node:20
WORKDIR /usr/src/todo-prisma/api
COPY ./package.json .
RUN npm install --omit=dev
COPY ./prisma ./prisma
COPY ./dist ./dist
EXPOSE 5050
CMD ["npm", "start"]