cat > Dockerfile << 'EOF'
FROM nginx:alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy application files
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY src /usr/share/nginx/html/src/

# Change ownership to nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html

# Switch to non-root user
USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF