#!/bin/bash
set -euo pipefail
# This is a script that is run every time you call "vagrant-spk dev".
# It is intended to do platform-and-repository-specific build steps.  You
# might customize it to do any of the following, or more:
# - for Python, prepare a virtualenv and pip install -r requirements.txt
# - for PHP, call composer to retrieve additional packages
# - for JS/CSS/SASS/LESS, compile, minify, or otherwise do asset pipeline work.
# This particular script does nothing at present, but you should adapt it
# sensibly for your package.

# Set up nginx conf
# unlink /etc/nginx/sites-enabled/default

#sudo chmod 777 /etc/nginx/sites-available/sandstorm-static
#sudo cat > /etc/nginx/sites-available/sandstorm-static <<EOF
#map \$http_upgrade \$connection_upgrade {
  #default upgrade;
  #''      close;
#}

#server {
  #listen 8000 default_server;
  #access_log /var/log/nginx/example.com.log;
  #server_name localhost;

  #location / {
      #proxy_http_version 1.1;
      #proxy_set_header Upgrade \$http_upgrade;
      #proxy_set_header Connection \$connection_upgrade;
      #proxy_set_header HOST \$http_host;

      #proxy_pass http://127.0.0.1:9000;
  #}
#}
#EOF
#sudo rm /etc/nginx/sites-enabled/sandstorm-static
#sudo ln -s /etc/nginx/sites-available/sandstorm-static /etc/nginx/sites-enabled/sandstorm-static

cd /opt/app
npm run build
exit 0
