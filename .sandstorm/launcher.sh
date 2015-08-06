#!/bin/bash
set -euo pipefail

mkdir -p /var/lib/nginx
mkdir -p /var/log/nginx
# Wipe /var/run, since pidfiles and socket files from previous launches should go away
# TODO someday: I'd prefer a tmpfs for these.
rm -rf /var/run
mkdir -p /var/run

# Start nginx.
cd /opt/app
/usr/sbin/nginx
rethinkdb --bind 127.0.0.1 --daemon -d /var/rethinkdb_data
npm start
