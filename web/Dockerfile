FROM node:12.22.5


ARG API_URL

# set working directory
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH



# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent

COPY ./src ./src
COPY ./public ./public

EXPOSE 3000

CMD ["yarn", "run", "start"]
