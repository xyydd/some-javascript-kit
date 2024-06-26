# Version 1.0.0
# docker image build -t xxx-image-name:[版本号] .
FROM nginx:stable-alpine
#ENV RUN_USER nginx
#ENV RUN_GROUP nginx
ENV DATA_DIR /usr/share/nginx/html

RUN mkdir -p /usr/share/nginx/html/dist
RUN mkdir -p /etc/nginx/conf.d/ssl/bgzs

COPY ./dist/ /usr/share/nginx/html/dist
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl/bgzs/ /etc/nginx/conf.d/ssl/bgzs/

RUN chown -R nginx. /usr/share/nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
