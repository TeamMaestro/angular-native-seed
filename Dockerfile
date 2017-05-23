# You are free to change the contents of this file
FROM nginx

# NGINX configurations
COPY ./nginx/conf.d /etc/nginx/conf.d

# Copy built app to wwwroot
COPY dist /usr/share/nginx/html