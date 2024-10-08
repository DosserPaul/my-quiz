#!/bin/sh
npx prisma migrate deploy
npx ts-node seed.ts
npm run dev
