#
# Node.js runtime Dockerfile
#
# https://github.com/dockerfile/nodejs-runtime
#

# Pull base image.
FROM dockerfile/nodejs

# Set instructions on build.
ONBUILD ADD package.json /app/
ONBUILD ADD package.json /
ONBUILD RUN npm install
ONBUILD ADD . /app

# Define working directory.
WORKDIR /app

# Define default command.
CMD ["echo", "$(ls)"]
CMD ["npm", "start"]

# Expose ports.
EXPOSE 8080