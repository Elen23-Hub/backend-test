#FROM node:20-alpine
FROM node:16-alpine3.15
WORKDIR /app
RUN addgroup -S appuser && adduser -S appuser -G appuser
COPY package*.json ./
RUN npm install -g nodemon@3.0.0 &&\ 
    apk add --no-cache curl=8.5.0-r0
COPY . .
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
CMD ["node", "server.js"]