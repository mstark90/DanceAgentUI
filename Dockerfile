# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.
FROM nginx:alpine

COPY dist/danceagent-ui/* /usr/share/nginx/html/
COPY nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
