# Bookly

A modern book management web application that helps you track your reading journey with an intuitive, Claude-inspired dark interface.

🔗 Live Demo: https://bookly-eux2.onrender.com/

## Overview

Bookly is a full-stack book tracking application where users can manage their personal library by organizing books into three categories: books they wish to read, books they've already read, and their favorites. The application features a clean, professional UI with real-time CRUD operations and dynamic filtering capabilities.

## Key Features

- **Smart Organization**: Categorize books as "Wish to Read", "Read", or "Favourite"
- **Dynamic Filtering**: Instantly filter your library by reading status
- **Real-time Editing**: Update book details on the fly with inline editing
- **Bookmark Tracking**: Keep track of your current reading position
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Dark Theme UI**: Eye-friendly interface inspired by modern design principles

## 🛠️ Tech Stack

**Frontend:**
- React 19 with TypeScript
- Radix UI for accessible components
- Axios for API communication
- CSS3 for custom styling

**Backend:**
- RESTful API (Django/Django REST)
- Database: PostgreSQL

## Getting Started

**Prerequisites:**
```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

**Installation:**
```bash
# Clone the repository
git clone https://github.com/yourusername/bookly.git

# Navigate to project directory
cd bookly

# Install dependencies
npm install

# Set up environment variables
echo "VITE_BASE_URL=your_api_url" > .env

# Start development server
npm run dev
```

## Usage

The application presents a single-page interface divided into two sections. The top section contains a comprehensive form where you can add new books with details including title, author, publication year, description, and current bookmark position. The bottom section displays your book collection as interactive cards that can be edited or deleted with a single click.

## Design Philosophy

The interface adopts a dark theme with warm accent colors, emphasizing readability and reducing eye strain during extended use. Card-based layouts with subtle shadows and smooth transitions create a premium feel while maintaining functionality.

## 🔗 API Endpoints

- `GET /books/` - Retrieve all books
- `POST /books/` - Add a new book
- `PUT /books/{id}` - Update book details
- `DELETE /books/{id}` - Remove a book

*Built with ❤️ to help readers organize their literary adventures*
