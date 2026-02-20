# Multi-stage build for Next.js application
# Build stage
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install dumb-init for proper signal handling (optional but recommended)
RUN apk add --no-cache dumb-init

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies (including devDependencies) for the build
# Retry mechanism to handle network issues
RUN npm set progress=false && \
    npm config set audit false && \
    npm config set fund false && \
    for i in 1 2 3; do npm ci && break || sleep 15; done

# Copy the rest of the application code
COPY . .
# Build arguments
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_YOUTUBE_API_KEY
ARG CLOUDINARY_CLOUD_NAME


# Make available during build
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_YOUTUBE_API_KEY=$NEXT_PUBLIC_YOUTUBE_API_KEY
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME


# Build the Next.js application
RUN npm run build

# Production stage - Use a smaller base image
FROM node:20-alpine AS production

# Install dumb-init
RUN apk add --no-cache dumb-init

# Set the working directory
WORKDIR /app

# Copy package files and install production dependencies only
COPY --from=builder /app/package*.json ./
RUN npm set progress=false && \
    npm config set audit false && \
    npm config set fund false && \
    npm ci --only=production && \
    npm cache clean --force

# Copy the built application from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Switch to non-root user for security
USER node

# Expose port 8030 (as per the start script in package.json)
EXPOSE 8030

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0

# Define the command to run the application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
