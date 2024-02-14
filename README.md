
# To do List

É uma lista de tarefas onde pode-se criar uma tarefa, marcar como concluida, em progresso ou cancelada e filtrar atráves da tarefa ou status.


## Ferramentas

### Frontend

![Static Badge](https://img.shields.io/badge/vite-purple?logo=vite&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/typescript-darkblue?logo=typescript&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/jest-darkred?logo=jest&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/axios-purple?logo=axios&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/eslint-black?logo=eslint&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/docker-blue?logo=docker&logoColor=ffffff)


### Backend

![Static Badge](https://img.shields.io/badge/node-339933?logo=node.js&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/express-212121?logo=express&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/typescript-darkblue?logo=typescript&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/prisma-212121?logo=prisma&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/jest-darkred?logo=jest&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/axios-purple?logo=axios&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/mongo-darkgreen?logo=mongodb&logoColor=000000)
![Static Badge](https://img.shields.io/badge/eslint-black?logo=eslint&logoColor=ffffff)
![Static Badge](https://img.shields.io/badge/docker-blue?logo=docker&logoColor=ffffff)


## Rodando localmente

### Backend 

**Observação**: Para que o **frontend** funcione corretamente, o **backend** precisa ser inicializado.

Clone o projeto

```bash
  git clone git@github.com:raugusto96/todo-prisma.git
```

Entre na pasta `/api`

```bash
  cd api
```

Instale as dependencias

```bash
  npm install
```

Inicie a aplicação

```bash
  npm run dev
```

Acesse via

```http
  localhost:5050
```

### Frontend

Clone o projeto

```bash
  git clone git@github.com:raugusto96/todo-prisma.git
```

Entre na pasta `/app`

```bash
  cd app
```

Instale as dependencias

```bash
  npm install
```

Inicie a aplicação

```bash
  npm run dev
```

Acesse via

```http
  localhost:3000
```


## Variáveis de Ambiente

### Backend

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

**Obs**: O docker-compose já inicia uma container com mongo, exemplo de link: `mongodb://HOST:PORT/db?authSource=ROOTUSERNAME&directConnection=true`

`DATABASE_URL` 

`PORT` - **Opcional**

`JWT_SECRET`

### Frontend

À definir


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run jest
```


## Documentação da API

#### Retorna todos os itens

```http
  GET /api/task
```
#### Parametros via query

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Opcional**. Parametro de busca para filtrar as tarefas |
| `status` | `string` | **Opcional**. Parametro de busca para filtrar as tarefas |

#### Retorna um item

```http
  GET /api/task/${taskId}
```

#### Parametros via url

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `taskId`      | `string` | **Obrigatório**. O ID da tarefa que você quer |

#### Adiciona uma tarefa

```http
  POST /api/task
```

#### Parametros via body

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `message`      | `string` | **Obrigatório**. A mensagem para criar a tarefa |

#### Adiciona uma tarefa

```http
  PUT /api/task/{taskId}
```

#### Parametros via url

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `taskId`      | `string` | **Obrigatório**. O ID da tarefa que você quer editar |

#### Parametros via body

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `message`      | `string` | **Obrigatório**. A mensagem para atualizar a tarefa |
| `status`      | `string` | **Obrigatório**. O status para atualizar a tarefa |

#### Adiciona uma tarefa

```http
  DELETE /api/task/{taskId}
```

#### Parametros via url

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `taskId`      | `string` | **Obrigatório**. O ID da tarefa que você quer editar |

## Roadmap

### Backend

- Adicionar middleware de autenticação

[] - Finalizado

- Adicionar filtragens no endpoint
```http
GET /api/task
```

[] - Finalizado


### Frontend

- Iniciar o app (WIP)

[] - Finalizado



## Autores

- [Rodrigo Augusto](https://www.github.com/raugusto96)


## 🔗 Links

[![Static Badge](https://img.shields.io/badge/linkedin-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/roh-augusto96/)


## Suporte

Para suporte, abra um [issue](https://github.com/raugusto96/todo-prisma/issues).

