FROM nginx
COPY ./dist/ /var/www/html
COPY ./front.conf /etc/nginx/sites-enabled/front.conf
EXPOSE 80