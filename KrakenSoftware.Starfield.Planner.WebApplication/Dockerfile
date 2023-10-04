### STAGE 1: Build ###
FROM node:lts-alpine3.16 AS build
ARG MAX_OLD_SPACE_SIZE=4096
ENV NODE_OPTIONS=--max_old_space_size=${MAX_OLD_SPACE_SIZE}
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV GENERATE_SOURCEMAP false
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.23.1-alpine
EXPOSE 80
EXPOSE 443
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/krakensoftware-starfield-planner-webapplication /usr/share/nginx/html

### STAGE 2.1: TAKE CARE OF HTTPS CERT ###



#RUN apk add --update openssl

#RUN mkdir /etc/nginx/certificate
#RUN cd /etc/nginx/certificate
#RUN openssl req -x509 -nodes -days 365 -sha256 -subj '/CN=preview.krakensoftware.eu/O=KrakenSoftware/C=NL' -newkey rsa:4096 -out nginx-certificate.crt -keyout nginx.key

