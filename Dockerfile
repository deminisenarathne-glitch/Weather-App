FROM nginx:alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy application files
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY src /usr/share/nginx/html/src/

# Change ownership to nginx user (optional, but keeps files owned by nginx)
RUN chown -R nginx:nginx /usr/share/nginx/html

# Do NOT switch user – let nginx run as root (it will spawn worker processes as nginx)

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]