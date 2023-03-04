#!/bin/bash
cd ../
eval $(ssh-agent) && ssh-add /root/.ssh/docker_key && git fetch --all && git reset --hard origin/main
# Install dependencies and build
yarn install
yarn build