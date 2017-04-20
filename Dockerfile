# You are free to change the contents of this file
FROM nginx

# Variables
ARG STAGE=dev

# Configure for angular fallback routes
COPY ./nginx/nginx.${STAGE}.conf /etc/nginx/nginx.conf

# Copy built app to wwwroot
COPY dist /usr/share/nginx/html