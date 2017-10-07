#
# Node.js runtime Dockerfile
#
# https://github.com/dockerfile/nodejs-runtime
#

# Pull base image.
FROM node

# Set instructions on build.
RUN npm install -g gulp bower node-sass
RUN npm cache clean

# Define working directory.
WORKDIR /app
ADD ./package.json /app/package.json
RUN npm install

WORKDIR /
ADD . ./app

WORKDIR /app
RUN bower install --allow-root
ADD run.sh /run.sh
RUN chmod -R 777 /run.sh
RUN chmod +x /run.sh

# Expose ports.
EXPOSE 80

WORKDIR /app
ENTRYPOINT ["/run.sh"]
