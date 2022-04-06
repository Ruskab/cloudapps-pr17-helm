#!/usr/bin/env bash

printf "Remove Database folders\n"

sudo rm -rf mongo_db mysql_db rabbitmq || true
sudo rm -rf mysql_db_dev mongo_db_dev rabbitmq_dev || true

exit 0