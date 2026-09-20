# 🛒 Smart Mall — "A Smarter Way to Shop"

![Smart Mall](https://img.shields.io/badge/Smart%20Mall-v1.0.0-7048F5?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-6DB33F?style=for-the-badge&logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)

---

## 📋 Project Overview

**Smart Mall** is a comprehensive, full-stack smart shopping mall management system that redefines the traditional mall experience with digital innovation. It provides an integrated ecosystem for shoppers to discover stores, browse products, manage parking, interact with a smart assistant, and complete purchases — all through a single, unified platform.

### 🎯 Key Objectives
- **Digital Mall Navigation** — Interactive floor-by-floor mall maps with store locations
- **Smart Shopping** — Product catalog with search, filters, and AI-ready recommendations
- **Parking Management** — Real-time parking availability with spot reservation
- **Smart Assistant** — NLP-ready chatbot for product discovery and mall information
- **Admin Control** — Complete dashboard with analytics, CRUD operations, and monitoring

---

## 🏗️ Architecture

```
smart-mall/
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, Footer, ProductCard, StoreCard)
│   │   ├── context/          # React Context providers (Auth, Cart, Wishlist, Toast)
│   │   ├── pages/            # Page components (22 pages)
│   │   │   ├── admin/        # Admin dashboard & CRUD pages
│   │   │   └── *.jsx         # Public-facing pages
│   │   ├── services/         # Data service layer (mock data + business logic)
│   │   ├── App.jsx           # Router configuration
│   │   ├── main.jsx          # Application entry point
│   │   └── index.css         # Complete design system
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Spring Boot REST API
│   ├── src/main/java/com/smartmall/
│   │   ├── controller/       # REST controllers
│   │   ├── entity/           # JPA entities
│   │   ├── repository/       # Data access layer
│   │   ├── config/           # Security & CORS config
│   │   └── exception/        # Global error handling
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── database/                 # MySQL schema & seed data
│   ├── schema.sql
│   └── seed.sql
└── README.md
```

---

## 🚀 Tech Stack

| Layer        | Technology                                   |
|-------------|----------------------------------------------|
| **Frontend** | React 18, Vite 6, React Router v7, Lucide Icons, Recharts |
| **Backend**  | Java 17, Spring Boot 3.2, Spring Security, Spring Data JPA |
| **Database** | MySQL 8.0                                    |
| **Auth**     | JWT (JSON Web Tokens) + BCrypt               |
| **Styling**  | Vanilla CSS (custom design system)           |
| **Build**    | Maven (backend), npm (frontend)              |

---

## 📦 Modules (22 Total)

### 🛍️ Core Shopping
| # | Module | Description |
|---|--------|-------------|
| 1 | **Landing Page** | Hero section, featured stores, trending products, smart features showcase |
| 2 | **User Authentication** | Login, Register with demo accounts, role-based access |
| 3 | **Store Directory** | Search, filter by category/floor/status, store cards |
| 4 | **Store Details** | Banner, description, products, offers, navigation link |
| 5 | **Product Catalog** | Full-text search, multi-filter, sorting, active filter chips |
| 6 | **Product Details** | Gallery, ratings, stock, related products, add to cart/wishlist |
| 7 | **Shopping Cart** | Quantity controls, dynamic pricing, free delivery threshold |
| 8 | **Checkout** | Customer details, address, payment method selection |
| 9 | **Order Management** | Order list, status badges, order tracking |
| 10 | **Order Details** | Timeline visualization, items, delivery info, status advance |
| 11 | **Wishlist** | Save, remove, move to cart |
| 12 | **Offers & Deals** | Coupon codes, validity dates, store links |

### 🗺️ Smart Features
| # | Module | Description |
|---|--------|-------------|
| 13 | **Interactive Mall Map** | SVG floor plans, clickable stores, route visualization |
| 14 | **Smart Parking** | Real-time grid, zone tabs, spot reservation system |
| 15 | **Smart Assistant** | Chat interface, suggestion chips, product/store/offer results |
| 16 | **User Profile** | Editable info, recent orders, account management |

### ⚙️ Admin Panel
| # | Module | Description |
|---|--------|-------------|
| 17 | **Admin Dashboard** | Stats cards, revenue chart, category chart, recent orders |
| 18 | **Manage Stores** | CRUD with add form, search, table listing |
| 19 | **Manage Products** | CRUD with category/store filters, stock tracking |
| 20 | **Manage Orders** | Status management, order search, status updates |
| 21 | **Manage Users** | User directory with role badges |
| 22 | **Admin Layout** | Sidebar navigation, role-based access guard |

---

## 🏃 Quick Start

### Prerequisites
- **Node.js** ≥ 18
- **Java** ≥ 17
- **MySQL** 8.0 (optional — frontend works standalone with mock data)

### Frontend Only (Fastest)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Full Stack

1. **Database Setup**
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

2. **Backend**
```bash
cd backend
./mvnw spring-boot:run
```

3. **Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@smartmall.demo` | `admin123` |
| **User** | `user@smartmall.demo` | `user123` |

> Click the demo account buttons on the login page to auto-fill credentials.

---

## 🎨 Design System

The project uses a custom CSS design system (`index.css`) with:

| Token | Value |
|-------|-------|
| Primary | `#7048F5` |
| Secondary | `#9B6CFF` |
| Dark | `#11152B` |
| Background | `#F7F8FC` |
| Success | `#20B486` |
| Font | Inter (Google Fonts) |
| Border Radius | 14px (cards), 10px (inputs) |

---

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Stores
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stores` | Get all stores |
| GET | `/api/stores/:id` | Get store by ID |
| POST | `/api/stores` | Create store (Admin) |
| PUT | `/api/stores/:id` | Update store (Admin) |
| DELETE | `/api/stores/:id` | Delete store (Admin) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/products/search?q=` | Search products |
| GET | `/api/products/recommendations` | Get recommendations |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

---

## 👥 Team

| Member | Role | Enrollment |
|--------|------|------------|
| **Vraj Patel** | Full-Stack Developer, Frontend Lead | 23002171310159 |
| **Jeel Shah** | Backend Developer, Database Design | 23002171310149 |
| **Rudra Desai** | UI/UX Designer, Testing | 23002171310113 |

**Guide**: Prof. Riddhi Mavani

---

## 📄 License

This project was developed as a college project for academic purposes.

© 2026 Smart Mall — Darshan University
