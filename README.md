# 💻 Blog API

A full-stack application built with React, Node.js, PostgreSQL, Prisma, JWT Tokens, and CSS Modules.

This project was created to learn how to design an API connecting to two, separate, frontend applications as well as learn how to implement JWT authentication.

## 🚀 Live Deployment

## ▶️ Demo Account

## 📋 Overview

Public-facing, client application allows authenticated users to read and comment on all blog posts. Users are able to delete their own comments.

The admin portal is reserved for blog authors. Authors do not have access to each other's posts — only their own. They can delete or edit any comment on their posts.

Admins can also publish/unpublish their posts with a toggle switch. This switch determines whether or not a post is visible on the public-facing client

## 👨‍💻 Technologies Used

- React
- React Router
- CSS Modules
- Node.js
- Express
- Express-validator
- PostgreSQL
- Prisma
- Passport
- JWT

## ✨ Features

### Client

- Public, user sign up
- Comment on all blog posts
- Users can delete their own comments

### Admin

- Delegated to only blog authors
- Authors can only view their own blog posts
- Can create posts, publish/unpublish posts, edit/delete post comments

## 👨‍🎓 What I Learned

- How to implement JWT authentication
- How to build a RESTful API

## 🛠️ Future Improvements

- Allow blog authors to delete their posts
- Add TinyMCE rich text editor to create blog posts
- Add ability to upgrade user account to a blog author account
