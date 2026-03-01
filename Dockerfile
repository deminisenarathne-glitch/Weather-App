FROM nginx:alpine

# Remove default config
RUN rm -rf /usr/share/nginx/html/*

# Copy only required files
COPY index.html /usr/share/nginx/html
COPY style.css /usr/share/nginx/html
COPY script.js /usr/share/nginx/html
COPY src /usr/share/nginx/html/src

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]