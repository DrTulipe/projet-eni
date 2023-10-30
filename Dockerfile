FROM nginx
COPY ./dist/ /usr/share/nginx/html
COPY ./front.conf /etc/nginx/sites-available/default
EXPOSE 80