# You are free to change the contents of this file
FROM nginx

# NGINX configurations
COPY ./nginx/conf.d /etc/nginx/conf.d

# SSL Certs
COPY ./nginx/keys /etc/nginx/keys

# Copy built app to wwwroot
COPY dist /usr/share/nginx/html