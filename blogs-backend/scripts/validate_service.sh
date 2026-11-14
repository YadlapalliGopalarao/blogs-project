#!/bin/bash
set -e

APP_DIR="/var/www/laravel"

echo "Validating Laravel deployment..."

cd "$APP_DIR"

# Check Laravel application
php artisan --version

# Check Nginx
systemctl is-active --quiet nginx

# Check PHP-FPM
systemctl is-active --quiet php-fpm

echo "Laravel deployment validation completed successfully."
