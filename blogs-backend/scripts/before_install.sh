#!/bin/bash
set -e

APP_DIR="/var/www/laravel"

echo "Checking existing Laravel application..."

if [ ! -f "$APP_DIR/.env" ]; then
    echo "ERROR: Production .env file is missing!"
    exit 1
fi

if [ ! -d "$APP_DIR/storage" ]; then
    echo "ERROR: Laravel storage directory is missing!"
    exit 1
fi

echo "Production .env and storage directories verified."
echo "Before-install checks completed."
