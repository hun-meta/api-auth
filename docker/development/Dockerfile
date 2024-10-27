# development branch
# Use the Docker Hub Node.js image as a base image
FROM node:18-slim AS base

FROM base AS deps
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm install; \
  else echo "Lockfile not found." && exit 1; \
  fi


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Get Rest of the Codes From Context
COPY . .

# not build it cause it's for development

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/. .

EXPOSE 3000
ENV PORT=3000

# Command to run development application
CMD ["npm", "run", "start:dev"]