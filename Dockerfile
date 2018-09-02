FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    git \
    && npm install \
    && apk del .gyp

# Bundle app source
COPY . .

# install lang files for zira
RUN git submodule init
RUN git submodule update

# EXPOSE 8080
CMD [ "npm", "start" ]