# Use NodeJS base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies for users_api
WORKDIR /usr/src/app/users_api
COPY ./package*.json ./
RUN npm install

# Bundle app source for users_api
COPY ./ .

# Switch back to users_api for the CMD instruction
WORKDIR /usr/src/app/users_api

# Expose port
EXPOSE 5000

# Start the service
CMD [ "node", "index.js" ]