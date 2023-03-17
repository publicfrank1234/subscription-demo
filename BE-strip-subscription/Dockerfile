FROM node:16

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/

RUN npm install
COPY . .
COPY .env_prd .env 
EXPOSE 4242

ENV ENV="dev"
ENV NODE_ENV="PAY"
ENV HOST="prd"
ENV SERVICE_NAME="pay-strip"
CMD ["npm",  "start"]
