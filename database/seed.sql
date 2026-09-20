-- =====================================================
-- SMART MALL — Seed Data
-- Demo data for development and testing
-- =====================================================

USE smart_mall;

-- Roles
INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');

-- Users (passwords are BCrypt hashed - DEMO ONLY)
-- admin123 = $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
-- user123 = $2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG
INSERT INTO users (name, email, password, phone, avatar) VALUES
('Admin User', 'admin@smartmall.demo', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+91 98765 43210', 'A'),
('Vraj Patel', 'user@smartmall.demo', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '+91 98765 43211', 'V'),
('Jeel Shah', 'jeel@smartmall.demo', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '+91 98765 43212', 'J'),
('Rudra Desai', 'rudra@smartmall.demo', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '+91 98765 43213', 'R');

INSERT INTO user_roles (user_id, role_id) VALUES (1, 2), (1, 1), (2, 1), (3, 1), (4, 1);

-- Store Categories
INSERT INTO store_categories (name, icon, color) VALUES
('Electronics', '🖥️', '#667eea'),
('Fashion', '👗', '#f5576c'),
('Sports', '⚽', '#4facfe'),
('Beauty', '💄', '#fcb69f'),
('Food & Beverage', '☕', '#a18cd1'),
('Accessories', '🎒', '#66a6ff'),
('Home & Living', '🏠', '#fdcbf1'),
('Books & Stationery', '📚', '#a1c4fd');

-- Stores
INSERT INTO stores (name, description, category_id, floor, logo, banner, rating, review_count, is_open, opening_hours) VALUES
('TechWorld', 'Your one-stop destination for the latest gadgets, laptops, smartphones, and tech accessories.', 1, 'Ground Floor', '🖥️', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 4.5, 328, TRUE, '10:00 AM - 9:00 PM'),
('H&M', 'Trendy fashion for everyone. Discover the latest styles in clothing, accessories, and footwear.', 2, '1st Floor', '👗', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 4.3, 512, TRUE, '10:00 AM - 10:00 PM'),
('SportZone', 'Premium sports gear, fitness equipment, and activewear for athletes and fitness enthusiasts.', 3, 'Ground Floor', '⚽', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 4.6, 245, TRUE, '9:00 AM - 9:00 PM'),
('GlowUp', 'Premium beauty and skincare products from top brands. Your beauty transformation starts here.', 4, '1st Floor', '💄', 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', 4.4, 189, TRUE, '10:00 AM - 9:30 PM'),
('Brew Lab', 'Artisan coffee, fresh juices, gourmet sandwiches, and baked goods. The perfect spot to recharge.', 5, '2nd Floor', '☕', 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', 4.7, 672, TRUE, '8:00 AM - 11:00 PM'),
('UrbanCarry', 'Premium bags, wallets, watches, and lifestyle accessories for the modern urban explorer.', 6, 'Ground Floor', '🎒', 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', 4.2, 156, TRUE, '10:00 AM - 9:00 PM'),
('HomeHub', 'Transform your living space with premium furniture, decor, and home essentials.', 7, '2nd Floor', '🏠', 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', 4.3, 203, FALSE, '10:00 AM - 8:00 PM'),
('BookNest', 'A curated collection of bestsellers, classics, stationery, and art supplies for curious minds.', 8, '2nd Floor', '📚', 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', 4.8, 412, TRUE, '9:00 AM - 9:00 PM');

-- Product Categories (same as store categories for simplicity)
INSERT INTO product_categories (name, icon, color) VALUES
('Electronics', '🖥️', '#667eea'), ('Fashion', '👗', '#f5576c'), ('Sports', '⚽', '#4facfe'),
('Beauty', '💄', '#fcb69f'), ('Food & Beverage', '☕', '#a18cd1'), ('Accessories', '🎒', '#66a6ff'),
('Home & Living', '🏠', '#fdcbf1'), ('Books & Stationery', '📚', '#a1c4fd');

-- Products (first 10 as sample)
INSERT INTO products (name, description, price, original_price, discount, category_id, store_id, rating, review_count, stock, tags) VALUES
('MacBook Air M3', 'Apple MacBook Air with M3 chip, 15" Liquid Retina display, 16GB RAM, 256GB SSD.', 134900, 149900, 10, 1, 1, 4.8, 89, 15, 'laptop,apple,macbook'),
('Sony WH-1000XM5', 'Industry-leading noise cancelling headphones with 30hr battery.', 24990, 29990, 17, 1, 1, 4.7, 256, 42, 'headphones,sony,wireless'),
('Samsung Galaxy S24 Ultra', '6.8" Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP Camera.', 129999, 139999, 7, 1, 1, 4.6, 178, 28, 'phone,samsung,android'),
('Slim Fit Cotton Shirt', 'Premium slim fit cotton shirt in classic white.', 1499, 2499, 40, 2, 2, 4.2, 89, 120, 'shirt,formal,cotton'),
('Nike Air Zoom Pegasus 41', 'Responsive running shoes with Zoom Air cushioning.', 11495, 13995, 18, 3, 3, 4.7, 345, 60, 'shoes,running,nike'),
('Vitamin C Serum', '20% Vitamin C + Hyaluronic Acid + Vitamin E serum.', 1299, 1999, 35, 4, 4, 4.6, 423, 150, 'skincare,serum,vitamin-c'),
('Signature Cold Brew', 'Our signature 16-hour cold brew coffee.', 299, 349, 14, 5, 5, 4.8, 890, 999, 'coffee,cold-brew,drinks'),
('Canvas Backpack', 'Water-resistant canvas backpack with padded laptop compartment.', 3499, 4999, 30, 6, 6, 4.4, 234, 55, 'backpack,laptop,travel'),
('Aroma Diffuser', 'Ultrasonic essential oil diffuser with LED mood lighting.', 1999, 2999, 33, 7, 7, 4.5, 312, 70, 'diffuser,aroma,home'),
('Atomic Habits', 'By James Clear. Build good habits & break bad ones.', 499, 799, 38, 8, 8, 4.9, 2345, 200, 'book,self-help,bestseller');

-- Offers
INSERT INTO offers (title, description, discount_text, code, store_id, category, min_purchase, valid_until) VALUES
('Tech Weekend Sale', 'Flat 20% off on all electronics.', '20% OFF', 'TECH20', 1, 'Electronics', 5000, '2026-09-28'),
('Buy 2 Get 1 Free', 'Buy any 2 fashion items and get 1 free.', 'B2G1', 'B2G1HM', 2, 'Fashion', 2000, '2026-09-30'),
('Fitness Friday', '25% off on all fitness equipment.', '25% OFF', 'FIT25', 3, 'Sports', 1000, '2026-09-27'),
('Beauty Bonanza', 'Up to 40% off on premium skincare.', '40% OFF', 'GLOW40', 4, 'Beauty', 800, '2026-10-05'),
('Happy Hours', '₹100 off on orders above ₹300.', '₹100 OFF', 'HAPPY100', 5, 'Food & Beverage', 300, '2026-10-31');

-- Parking Slots (sample - P1 zone)
INSERT INTO parking_slots (slot_number, zone, floor, status) VALUES
('P1-001', 'P1', 'Basement 1', 'AVAILABLE'), ('P1-002', 'P1', 'Basement 1', 'OCCUPIED'),
('P1-003', 'P1', 'Basement 1', 'AVAILABLE'), ('P1-004', 'P1', 'Basement 1', 'RESERVED'),
('P1-005', 'P1', 'Basement 1', 'OCCUPIED'), ('P1-006', 'P1', 'Basement 1', 'AVAILABLE'),
('P1-007', 'P1', 'Basement 1', 'AVAILABLE'), ('P1-008', 'P1', 'Basement 1', 'OCCUPIED'),
('P2-001', 'P2', 'Basement 2', 'AVAILABLE'), ('P2-002', 'P2', 'Basement 2', 'OCCUPIED'),
('P3-001', 'P3', 'Basement 3', 'AVAILABLE'), ('P3-002', 'P3', 'Basement 3', 'AVAILABLE');
