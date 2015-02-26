FROM node:latest

# Add source
COPY ./src/ /src
# Install  dependencies
RUN cd /src && npm install

EXPOSE  8080
CMD ["node","/src/index.js"]
