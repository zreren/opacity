---
title: An OOTB SSR resume system
description: 用户端 + 管理端 + Next.js API.
date: 2021-09-01
interface: /card.png
---
# Intro
This project was develop for Lab recruitment,which build with React.js +
TypeScript + Three.js (for animation) for client.And Next.js + Postgres + Prisma for backend API.
![interface](https://www.gitkraken.com/wp-content/uploads/2022/10/netflix-150x150.png)
- Use Monorepo for project construction, isomorphic design of front-end, back-end and API
- Use tailwind css to build pages, Next.js to develop SSR front page
- redux state management and persistence
- Register and log in on the client side, upload a resume, fill in the form, and view resume status
- Message queue to push resume status updates
- Background audit and operation