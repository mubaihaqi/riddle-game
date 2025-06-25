# Stage 1: Build the Astro application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy pnpm-related files first to leverage Docker cache
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install pnpm globally and then install dependencies
RUN corepack enable && pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the Astro project
RUN pnpm build

# Stage 2: Serve the built application
# Use a lightweight Node.js image to serve the static files
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./

# Expose the port Astro's preview server runs on (default is 4321)
EXPOSE 4321

# Command to run the Astro preview server
CMD ["pnpm", "preview"]