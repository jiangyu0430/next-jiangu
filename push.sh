#!/bin/bash

# 让用户输入 commit message
read -p "请输入本次更新说明: " msg

# 添加所有更改
git add .

# 提交
git commit -m "$msg"

# 推送到 main 分支
git push origin main