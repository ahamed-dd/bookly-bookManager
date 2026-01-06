# Bookly — Book Tracking Web App

A full-stack book management application to track reading progress and organize personal libraries.

🔗 **Live Demo:** https://bookly-eux2.onrender.com/

---

## Overview
Bookly allows users to manage their book collection by categorizing books into **Wish to Read**, **Read**, and **Favourite**, while tracking reading progress using bookmarks. The application supports real-time CRUD operations with dynamic filtering.

---

## Tech Stack

**Frontend**
- React 19 + TypeScript  
- Radix UI  
- Axios  
- Custom CSS (dark theme)

**Backend**
- Django REST Framework  
- PostgreSQL  

---

## Key Features
- Book categorization (Wish to Read, Read, Favourite)
- Reading progress tracking with bookmarks
- Real-time create, update, and delete operations
- Dynamic filtering by reading status
- Responsive, dark-themed UI
- Clean separation between frontend and backend

---

## API Endpoints
- `GET /books/` — Retrieve all books  
- `POST /books/` — Add a new book  
- `PUT /books/{id}` — Update book details  
- `DELETE /books/{id}` — Remove a book  

---

## Setup (Optional)
```bash
git clone https://github.com/yourusername/bookly.git
cd bookly
npm install
npm run dev

---

Bookly was built to demonstrate real-world full-stack development — from designing RESTful APIs and database models to building a responsive, type-safe frontend. The project focuses on clean architecture, maintainability, and practical user experience rather than demos or mock features.
