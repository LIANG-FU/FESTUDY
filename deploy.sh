#!/usr/bin/env node

if [ $1 ]
then
    git init
    git add .
    git commit -m "$1"
else 
    echo "请输入git tag"
fi
