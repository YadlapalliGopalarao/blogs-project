#!/bin/bash
set -e

PHP_INI="/etc/php.ini"

echo "Configuring PHP settings..."

cp -a "$PHP_INI" "$PHP_INI.backup"

sed -i 's/^upload_max_filesize.*/upload_max_filesize = 20M/' "$PHP_INI"
sed -i 's/^post_max_size.*/post_max_size = 25M/' "$PHP_INI"
sed -i 's/^max_file_uploads.*/max_file_uploads = 20/' "$PHP_INI"
sed -i 's/^max_execution_time.*/max_execution_time = 120/' "$PHP_INI"
sed -i 's/^memory_limit.*/memory_limit = 256M/' "$PHP_INI"

systemctl restart php-fpm

echo "PHP configuration completed."
