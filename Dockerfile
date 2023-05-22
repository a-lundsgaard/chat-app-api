# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install project dependencies using yarn
RUN yarn install

# Copy the TypeScript source files to the container
COPY . .

## remove development files before building
RUN rm -rf watcher.tsx codegen.ts

# Build the TypeScript files and output them to the dist folder
RUN yarn run build

# Copy the SQL files to the dist folder and create the tables in the database
RUN yarn run mac:copy:sql
RUN yarn run create-tables

# Remove the TypeScript source files and other unnecessary files
RUN rm -rf src tsconfig.json

# Expose port 4000 for the Apollo Server
EXPOSE 4000

# Start the Apollo Server when the container starts
CMD ["npm", "start"]
