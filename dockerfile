FROM node:20-alpine3.22
#FROM node:20-slim
WORKDIR /app
RUN addgroup -S appuser && adduser -S appuser -G appuser
COPY package*.json ./
RUN rm -rf node_modules package-lock.json && \
    npm install --omit=dev
COPY . .
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
CMD ["node", "server.js"]