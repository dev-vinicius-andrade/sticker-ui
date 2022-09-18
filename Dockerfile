FROM node as src
WORKDIR /src
COPY  . .
RUN npm install


FROM node as debug
EXPOSE 80
EXPOSE 443
EXPOSE 9229
VOLUME [ "/src/client" ]
VOLUME [ "/src/server" ]
WORKDIR /src
RUN npm install -g nodemon
RUN echo "#!/bin/sh" | tee -a /src/run.sh > /dev/null && \
    echo "echo starting..." | tee -a /src/run.sh > /dev/null && \
    echo "nodemon --inspect=0.0.0.0:9229 --signal SIGINT --nolazy /src/server/server.js &   \\" | tee -a /src/run.sh > /dev/null && \
    echo "npm run serve" | tee -a /src/run.sh > /dev/null
RUN chmod +x /src/run.sh
WORKDIR /src/client
ENTRYPOINT ["/src/run.sh" ]

FROM src as build 
RUN npm run build


FROM node as release
EXPOSE 80
EXPOSE 443
VOLUME [ "/app" ]
WORKDIR /app/client
COPY --from=build /src/dist .
WORKDIR /app/server
COPY --from=build /src/server .
ENTRYPOINT [ "node", "server.js" ]


# FROM nginx:stable-alpine as release
# WORKDIR /app
# RUN rm -rf /usr/share/nginx/html && \
#     ln -s /app /usr/share/nginx/html
# COPY --from=build /src/dist .
# COPY --from=src /src/nginx.conf /etc/nginx/conf.d
# VOLUME [ "/etc/nginx/conf.d/nginx.conf" ]

# ENTRYPOINT ["nginx", "-g", "daemon off;"]


