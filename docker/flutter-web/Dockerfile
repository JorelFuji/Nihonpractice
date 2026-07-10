# NihongoQuest Flutter Web - Multi-stage Dockerfile
# Stage 1: Build Flutter web app
FROM ghcr.io/cirruslabs/flutter:3.24.0 AS build

# Set working directory
WORKDIR /app

# Copy pubspec files first (for caching)
COPY nihon_quest_mobile/pubspec.yaml nihon_quest_mobile/pubspec.lock ./

# Get dependencies
RUN flutter pub get

# Copy entire source
COPY nihon_quest_mobile/ ./

# Build for web (release mode with canvaskit)
RUN flutter build web --release \
    --web-renderer canvaskit \
    --base-href="/" \
    --no-tree-shake-icons

# Stage 2: Serve with nginx
FROM nginx:1.25-alpine

# Install curl for healthchecks
RUN apk add --no-cache curl

# Copy built web app
COPY --from=build /app/build/web /usr/share/nginx/html

# Copy nginx configuration
COPY docker/flutter-web/nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
