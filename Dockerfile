# # Use the base image
FROM gcr.io/educative-exec-env/educative:latest

# Create a directory for the web application, called webapp
RUN mkdir -p /usr/local/educative/webapp

## Copying the contents of ct-app (our original code) to the folder we created in the above command
COPY ct-app /usr/local/educative/webapp

# Install npm dependencies
RUN cd /usr/local/educative/webapp && \
    npm install && \
    cd consumer && \ 
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