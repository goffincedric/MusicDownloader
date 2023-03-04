FROM node:18

# Setup git SSH
ARG PORTAINER_SSH_KEY
RUN mkdir /root/.ssh/ && \
    echo $PORTAINER_SSH_KEY | base64 --decode >> /root/.ssh/docker_key && \
    chmod 400 /root/.ssh/docker_key && \
    touch /root/.ssh/known_hosts && \
    ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN git config --global user.email "temp@temp.com" && git config --global user.name "Portainer"

# Setup app space
RUN mkdir /app
WORKDIR /app
EXPOSE 8083

# Clone bot from Github
RUN eval $(ssh-agent) && ssh-add /root/.ssh/docker_key && git clone git@github.com:goffincedric/MusicDownloader.git
WORKDIR MusicDownloader
RUN yarn install
WORKDIR bin

# Run bot
CMD ./update.sh && ./serve.sh