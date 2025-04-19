# Promptinsta

A community-driven platform for sharing, discovering, and managing AI prompts. Promptinsta allows users to create, browse, and search for effective prompts across various AI tools and use cases.

Deployemnt link: [https://nextjs-prompt-insta.vercel.app](https://nextjs-prompt-insta.vercel.app).

## Feature

- Authentication
- CRUD Post
- Search prompt

## Technology Used

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Auth.js](https://authjs.dev)
- [Prisma](https://prisma.io)
- [MongoDB](https://www.mongodb.com/)

## Prerequisites

Before setting up this project, make sure you have the following installed:

- Node.js (v18 or newer)
- Node package manager (bun recommended)
- MongoDB database

## Getting Started

1.  Clone this repository to your local machine.
2.  In the project folder, rename **.env.example** to **.env** (no period after).
3.  Set **all** the environment variables according to the instructions I've included in the file. If you don't set them properly, the application is not going to work.
4.  Run `bun install` to install the dependencies.
5.  Run `bunx prisma db push & bunx prisma generate` to setup database and prisma.
6.  Run `bunx prisma db seed` If you want seed initial data.
7.  Run `bun run dev` to start the web server.
