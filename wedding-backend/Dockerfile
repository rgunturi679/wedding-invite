FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Remove any existing node_modules before installing fresh ones
RUN rm -rf node_modules

# Install dependencies cleanly
RUN npm ci --production

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]
