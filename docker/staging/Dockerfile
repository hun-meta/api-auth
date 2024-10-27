# production branch
# Use the Docker Hub Node.js image as a base image
FROM node:18-slim AS base

FROM base AS deps
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./
# Install dependencies with only production dependencies
RUN \
  if [ -f package-lock.json ]; then npm ci --only=production; \
  else echo "Lockfile not found." && exit 1; \
  fi


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Get Rest of the Codes From Context
COPY . .

# Build the application
RUN npm run build

# Use alpine for production for lighter image
FROM base AS runner
WORKDIR /app

# Copy only necessary files for production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# for staging & production
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/.env.development ./.env.development
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/config/keys/private_key.pem ./config/keys/private_key.pem
COPY --from=builder /app/config/keys/public_key.pem ./config/keys/public_key.pem

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=development

# Command to run production application
CMD ["npm", "run", "start:prod"]
