#!/bin/bash

mongosh -u gptpet -p gptpet --authenticationDatabase admin --eval "db.getSiblingDB('posts').dropDatabase()"