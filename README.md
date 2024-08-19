<h1 align="center">Desafio Backend NestJS - Mycareforce</h1>
<p align="center">Desafio de desenvolvimento de login de usuários.</p>

Conteúdos da aplicação
=================

# 💡 Features solicitada

- ✅ Registro em plataforma contendo nome, email e password.
- ✅ Login contendo email e password para validação.
- ✅ Sessão persistente.
- ✅ Autenticação sem bibliotecas de autenticação (como Keycloak).
- ✅ Possibilidade de banir users / invalidar token

## 💡 Features adicionais
- ✅ Criado CRUD de usuários.
- ✅ Criado refresh token automático enquanto usuário está logado.
- ✅ Desenvolvido lógica usando Redis para armazenamento de sessões.
- ✅ Testes unitários implementados no CRUD de usuários.
- ❌ Deploy: não consegui achar uma forma de fazer deploy onde eu conseguisse manipular o Redis tão bem quanto local.

<br>

# 📋 Fluxo da aplicação
- Acessar [localhost:9091](http://localhost:9091/)
- O login de admin é necessário para executar ações:
  - email: admin@mycareforce.com
  - senha: 12345
- Tive um problema pra implementar o carregamento da tela inicial, aparentemente o hook de usuário que fiz não está conseguindo fazer uma requisição ao backend em tempo de execução. <i>Sendo assim é necessário recarregar a página.</i>
- Irá aparecer a opção de criar um novo usuário e também uma lista de usuários com a opção de <b>Ban</b> que fará o banimento de um usuário da plataforma.
<br>
<br>

- Em tela recomendo testar da seguinte forma:
  - Logar como admin em um navegador. (recarregue a página)
  - Crie um usuário de teste.
  - Logue com esse usuário em uma aba anônima.
  - Faça o banimento do usuário.
  - O usuário banido irá perder a sessão e ser redirecionado ao login.
  - Enquanto nada acontecer o refresh token ficará rodando em segundo plano.

<br>

# ❗ Pré-requisitos para rodar o projeto

- [Docker](https://www.docker.com/products/docker-desktop) e [Docker Compose](https://docs.docker.com/compose) devidamente configurado.
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) (versão 22+)
- [Yarn](https://yarnpkg.com)

Para os testes manuais das rotas é uma opção utilizar o [Imsomnia](https://insomnia.rest/download) ou o [Postman](https://www.postman.com).
Deixei um arquivo chamado <b>mycareforce-insomnia.json</b> para testes manuais do backend.

<br>

# 💻 Rodando o projeto

```bash
# Clone este repositório
$ git clone <https://github.com/ianchagas/desafio-mycareforce>

# Acesse a pasta do projeto no terminal/cmd
$ cd desafio-mycareforce

# Rode o script previamente configurado para criar banco, redis e rodar o projeto
$ sh run.sh

```
- O script irá fazer todo o processo de criação da imagem do banco de dados e rodará as migrations para criar a tabela e usuário admin padrão. Também criará um Redis configurado para as sessões e por último irá instalar e rodar o backend e o frontend.

<br>
  
# 📝 Testes Unitários
```bash
# Para rodar os testes unitários vá até a pasta /server e use o comando
$ yarn test
```

<br>

# ⚡ Técnologias Utilizadas
  
- TypeScript
- Node.JS
- NestJS
- Postgres
- Redis
- Docker
- TypeORM
- Jest
- React
