---
title: An OOTB SSR resume system
description: client page + admin page + Next.js API.
date: 2021-09-01
interface: /projects/resume-en.jpg
---
# Intro
![interface](/projects/resume-en.jpg)
This project was develop for Lab recruitment,which build with React.js +
TypeScript + Three.js (for animation) for client.And Next.js + Postgres + Prisma for backend API.
- Use Monorepo for project construction, isomorphic design of front-end, back-end and API
- Use tailwind css to build pages, Next.js to develop SSR front page
- redux state management and persistence
- Register and log in on the client side, upload a resume, fill in the form, and view resume status
- Message queue to push resume status updates
- Background audit and operation