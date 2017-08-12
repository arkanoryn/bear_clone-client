#! /bin/bash
./node_modules/.bin/eslint $1 | sed -E 's/(.)+flowtype(.)+//' | sed '/^$/d'
