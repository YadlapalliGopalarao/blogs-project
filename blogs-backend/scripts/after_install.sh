#!/bin/bash
set -e

APP_DIR="/var/www/laravel"

cd "$APP_DIR"

if [ ! -f artisan ] || [ ! -d vendor ]; then
    echo "ERROR: Laravel application or vendor directory missing"
    exit 1
fi

chown -R ssm-user:apache storage bootstrap/cache
chmod -R g+rwX storage bootstrap/cache

echo "Laravel permissions configured."
