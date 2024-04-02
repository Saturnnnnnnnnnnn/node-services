#!/bin/bash

# Подготовка директории на удаленном сервере
ssh saturn@192.168.0.114 'mkdir -p /var/www/node-services/'

# Копирование кода на удаленный сервер
scp -r ./* saturn@192.168.0.114:/var/www/node-services/

# Запуск Docker Compose на удаленном сервере
ssh saturn@192.168.0.114 'cd /var/www/node-services/ && docker-compose up -d'
