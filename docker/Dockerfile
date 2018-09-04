FROM node:10

RUN apt-get update -qqy \
  && apt-get -qqy install \
    sudo \
    telnet \
    bc \
    vim \
    git \
    wget \
    bzip2 \
    curl \
    unzip \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app

ADD ./*.json /app/
RUN npm install
ADD ./*.js /app/

CMD ["npm", "run", "make"]

