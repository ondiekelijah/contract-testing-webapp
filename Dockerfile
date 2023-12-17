# Use the base image
FROM gcr.io/educative-exec-env/educative:latest

# Create a directory for the user service
RUN mkdir -p /usr/local/educative/user-service

## Copying the contents of users_api to the folder we created in the above command
COPY users_api /usr/local/educative/user-service

# Install npm dependencies
RUN cd /usr/local/educative/user-service && \
    npm install 

## Installing Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

## Fixing etc/hosts
RUN echo "127.0.0.1       localhost" >> /etc/hosts && \
    echo "::1     localhost ip6-localhost ip6-loopback" >> /etc/hosts  && \
    echo "fe00::0 ip6-localnet" >> /etc/hosts && \
    echo "ff00::0 ip6-mcastprefix" >> /etc/hosts && \
    echo "ff02::1 ip6-allnodes" >> /etc/hosts && \
    echo "ff02::2 ip6-allrouters" >> /etc/hosts && \
    echo "172.17.0.3      e2d7ddabb2c5" >> /etc/hosts

## Installing Tmux
RUN  apt-get -y install tmux

