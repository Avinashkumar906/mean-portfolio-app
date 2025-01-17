# platform defination
FROM node:10.9.0-alpine AS prod   

# defining the working directory
WORKDIR /app

# copying resources from dev to working directory
COPY package.json package-lock.json  ./
COPY .  .

# repos install/build/cleanup commands
RUN npm install && npm run build --prod && rm -rf ./node_modules/

# Installing serve package globally to serve static files.
RUN npm i -g serve

# exposing internal ports
EXPOSE 3000

# Application serve command 
CMD [ "serve","-s", "dist/browser/" ]