#!/bin/bash
set -e

cd /var/www/laravel

php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

systemctl restart php-fpm

echo "Laravel application started successfully."
