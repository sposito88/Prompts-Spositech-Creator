# Estágio de build
FROM node:20-alpine AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração do projeto
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar o código-fonte
COPY . .

# Argumentos para variáveis de ambiente durante o build
ARG VITE_WEBHOOK_URL
ENV VITE_WEBHOOK_URL=${VITE_WEBHOOK_URL:-https://n8n.spositech.com.br/webhook/creator-prompt}

# Construir o aplicativo
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Remover a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nossa configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos de build
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"] 