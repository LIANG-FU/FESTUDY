#!/usr/bin/env node

if [ $1 ]
then
    git init
    git add .
    git commit -m "$1"
    git branch -M main
    git remote add origin git@github.com:LIANG-FU/FESTUDY.git
    git push -u origin main
else 
    echo "请输入git tag"
fi
