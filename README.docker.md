# Instruções para Docker

Este documento fornece instruções para executar o seu site utilizando Docker e Docker Compose.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Executando o Aplicativo

### Usando Docker Compose (Recomendado)

1. No diretório raiz do projeto, execute:

```bash
docker-compose up -d
```

2. Acesse o aplicativo em seu navegador:

```
http://localhost:8080
```

3. Para parar o aplicativo:

```bash
docker-compose down
```

### Usando Docker Diretamente

1. Construa a imagem:

```bash
docker build -t meu-site .
```

2. Execute o contêiner:

```bash
docker run -d -p 8080:80 --name meu-site-container meu-site
```

3. Acesse o aplicativo em seu navegador:

```
http://localhost:8080
```

4. Para parar o contêiner:

```bash
docker stop meu-site-container
docker rm meu-site-container
```

## Estrutura Docker

- **Dockerfile**: Define um processo de build multi-estágio que:
  - Utiliza Node.js para compilar a aplicação React/Vite
  - Utiliza Nginx para servir a aplicação em produção

- **nginx.conf**: Configuração otimizada do Nginx para aplicações SPA (Single Page Application)

- **docker-compose.yml**: Configura o serviço de maneira declarativa

## Desenvolvimento com Docker

Para desenvolvimento com hot-reload, você pode:

1. Descomente as linhas de volumes no `docker-compose.yml`
2. Execute o build normal com `npm run dev` localmente
3. O container Docker servirá os arquivos gerados localmente

## Solução de Problemas

- **Erro de permissão**: Se encontrar erros de permissão, execute o Docker com `sudo` ou adicione seu usuário ao grupo Docker.
- **Portas em uso**: Se a porta 8080 estiver em uso, altere a porta no arquivo `docker-compose.yml` (ex: `"8081:80"`).
- **Problemas de cache**: Se encontrar problemas após alterações, tente reconstruir sem cache:

```bash
docker-compose build --no-cache
docker-compose up -d
``` 