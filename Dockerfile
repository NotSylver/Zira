FROM node

WORKDIR /usr/src/app

RUN git clone https://github.com/NotSylver/Zira.git . \
    && git submodule init \
    && git submodule update

COPY package*.json ./

RUN npm install

# EXPOSE 8080
CMD [ "npm", "start" ]