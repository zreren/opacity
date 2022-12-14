---
title: 开箱即用的简历系统
description: 用户端 + 管理端 + Next.js API.
date: 2021-09-01
interface: /projects/resume-cn.jpg
---
# 简介
![interface](/projects/resume-cn.jpg)
该项目是我在大学时，用于招收实验室新成员时所开发的系统，前端采用 React.js + TypeScript + Three.js（用于动效），后端采用 Next.js + Postgres + Prisma.
提供了
- 采用Monorepo进行项目搭建，前台后台及API同构设计
- 使用tailwind css 构建页面，Next.js开发SSR前台页面
- redux状态管理和持久化
- 用户端注册登录，上传简历填写表单，查看简历状态
- 消息队列推送简历状态更新
- 后台的审核和操作
