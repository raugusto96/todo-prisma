# Dockerfile para o backend

# Use uma imagem base do Node.js
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /api

# Copie o package.json e o package-lock.json para o contêiner
COPY ./package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o contêiner
COPY . .

# Exponha a porta em que o servidor backend está sendo executado
EXPOSE 5050

# Comando para iniciar o servidor backend
CMD ["npm", "start"]
