FROM httpd
COPY ./dist/ /usr/local/apache2/htdocs/
COPY ./front.conf /etc/apache2/sites-available/front.conf
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y apache2 curl
RUN a2ensite front.conf
RUN a2dissite 000-default.conf
RUN a2enmod proxy
RUN a2enmod proxy_http
RUN apache2ctl configtest
EXPOSE 80