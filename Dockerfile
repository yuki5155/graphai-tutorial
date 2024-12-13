# Use Node.js slim image
FROM node:20-slim

# Create app directory
WORKDIR /app

# Install essential packages and clean up
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    && rm -rf /var/lib/apt/lists/*
    
RUN apt-get install ca-certificates

# Install GraphAI CLI
RUN npm install -g @receptron/graphai_cli

COPY ./ ./

# Set environment variable
ENV NODE_ENV=production
