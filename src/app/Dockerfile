# Dockerfile para o frontend

# Use uma imagem base do Node.js
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o contêiner
COPY . .

# Construa o aplicativo frontend
RUN npm run build

# Exponha a porta em que o front-end está sendo executado
EXPOSE 3000

# Comando para iniciar o servidor de frontend (opcional, dependendo do seu aplicativo frontend)
CMD ["npm", "start"]
