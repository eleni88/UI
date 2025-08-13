FROM node:alpine
WORKDIR /app
RUN npm install -g http-server
COPY . ./
EXPOSE 80
CMD ["http-server", ".", "-p", "80"]