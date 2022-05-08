FROM node:12.22.10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copying source files
COPY . .

# Declaring all arg to use for env in build time
ARG NEXT_PUBLIC_API_URL
# Declaring env from the arg value
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Building app
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]
