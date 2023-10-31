FROM nginx
COPY ./dist/ /usr/share/nginx/html
COPY ./front.conf /etc/nginx/conf.d/default.conf
EXPOSE 80