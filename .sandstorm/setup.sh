#!/bin/bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

# Add Node.js to packages
curl -sL https://deb.nodesource.com/setup | sudo bash -
# Add RethinkDB to pakcages
echo "deb http://download.rethinkdb.com/apt `lsb_release -cs` main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
wget -qO- http://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -

apt-get update
apt-get install -y nginx
# Set up nginx conf
unlink /etc/nginx/sites-enabled/default
cat > /etc/nginx/sites-available/sandstorm-static <<EOF
map \$http_upgrade \$connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 8000 default_server;
  access_log /var/log/nginx/example.com.log;
  server_name localhost;

  location / {
      proxy_http_version 1.1;
      proxy_set_header Upgrade \$http_upgrade;
      proxy_set_header Connection \$connection_upgrade;
      proxy_set_header HOST \$http_host;

      proxy_pass http://127.0.0.1:9000;
  }
}
EOF
ln -s /etc/nginx/sites-available/sandstorm-static /etc/nginx/sites-enabled/sandstorm-static
# patch nginx conf to not bother trying to setuid, since we're not root
# also patch errors to go to stderr, and logs nowhere.
sed --in-place='' \
        --expression 's/^user www-data/#user www-data/' \
        --expression 's#^pid /run/nginx.pid#pid /var/run/nginx.pid#' \
        --expression 's/^\s*error_log.*/error_log stderr;/' \
        --expression 's/^\s*access_log.*/access_log off;/' \
        /etc/nginx/nginx.conf
service nginx stop
systemctl disable nginx
sudo apt-get install -y rethinkdb
sudo apt-get install -y iojs

