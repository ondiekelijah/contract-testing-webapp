# Use NodeJS base image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies for users_api
WORKDIR /usr/src/app/users_api
COPY users_api/package*.json ./
RUN npm install

# Bundle app source for users_api
COPY users_api/ .

# Install app dependencies for users_frontend
WORKDIR /usr/src/app/users_frontend
COPY users_frontend/package*.json ./
RUN npm install

# Bundle app source for users_frontend
COPY users_frontend/ .

# Switch back to users_api for the CMD instruction
WORKDIR /usr/src/app/users_api

# Expose port
EXPOSE 5000

# Start the service
CMD [ "node", "providerService.js" ]
