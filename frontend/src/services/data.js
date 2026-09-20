// ============================================
// SMART MALL — Data & Service Layer v2.0
// Complete catalog with real brands, proper relationships,
// intelligent search, and data validation.
// ============================================

// ── Departments ─────────────────────────────
export const departments = [
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'fashion', name: 'Fashion', icon: '👔' },
  { id: 'sports', name: 'Sports & Fitness', icon: '🏃' },
  { id: 'beauty', name: 'Beauty & Personal Care', icon: '✨' },
  { id: 'food', name: 'Food & Beverage', icon: '☕' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🛍️' },
  { id: 'books', name: 'Books & Stationery', icon: '📚' },
  { id: 'home', name: 'Home & Living', icon: '🏠' },
];

// ── Stores ──────────────────────────────────
export const stores = [
  {
    id: 1, name: 'Croma', brand: 'Croma', department: 'electronics',
    category: 'Electronics', floor: 'Ground Floor', location: 'G-01',
    rating: 4.5, reviews: 1284, isOpen: true, hours: '10:00 AM – 9:30 PM',
    description: 'India\'s largest electronics retail chain. Shop the latest smartphones, laptops, TVs, audio gear, and smart home devices from top global brands.',
    logo: 'Croma',
    banner: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
    bannerGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    offers: 3, productCount: 8,
    allowedCategories: ['Smartphones', 'Laptops', 'Audio', 'Tablets', 'Wearables', 'Accessories', 'TVs', 'Cameras'],
  },
  {
    id: 2, name: 'H&M', brand: 'H&M', department: 'fashion',
    category: 'Fashion', floor: '1st Floor', location: 'F1-03',
    rating: 4.3, reviews: 2156, isOpen: true, hours: '10:00 AM – 10:00 PM',
    description: 'Trendy, sustainable fashion for men, women, and kids. Discover the latest collections in clothing, accessories, and footwear at affordable prices.',
    logo: 'H&M',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    bannerGradient: 'linear-gradient(135deg, #e8345a 0%, #cc2b5e 100%)',
    offers: 2, productCount: 7,
    allowedCategories: ['T-Shirts', 'Shirts', 'Jeans', 'Dresses', 'Hoodies', 'Jackets', 'Accessories'],
  },
  {
    id: 3, name: 'Nike', brand: 'Nike', department: 'sports',
    category: 'Sports & Fashion', floor: 'Ground Floor', location: 'G-05',
    rating: 4.7, reviews: 1890, isOpen: true, hours: '10:00 AM – 9:00 PM',
    description: 'Just Do It. Shop performance running shoes, training gear, sportswear, and lifestyle sneakers from the world\'s leading athletic brand.',
    logo: 'Nike',
    banner: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80',
    bannerGradient: 'linear-gradient(135deg, #111111 0%, #333333 100%)',
    offers: 2, productCount: 6,
    allowedCategories: ['Running Shoes', 'Sneakers', 'Sportswear', 'Training', 'Sports Accessories'],
  },
  {
    id: 4, name: 'Sephora', brand: 'Sephora', department: 'beauty',
    category: 'Beauty', floor: '1st Floor', location: 'F1-07',
    rating: 4.6, reviews: 967, isOpen: true, hours: '10:00 AM – 9:30 PM',
    description: 'The world\'s leading beauty retailer. Discover premium makeup, skincare, fragrance, and haircare from 200+ brands including exclusive collections.',
    logo: 'Sephora',
    banner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    bannerGradient: 'linear-gradient(135deg, #000000 0%, #434343 100%)',
    offers: 2, productCount: 5,
    allowedCategories: ['Makeup', 'Skincare', 'Fragrance', 'Haircare', 'Beauty Tools'],
  },
  {
    id: 5, name: 'Starbucks', brand: 'Starbucks', department: 'food',
    category: 'Food & Beverage', floor: '2nd Floor', location: 'F2-01',
    rating: 4.4, reviews: 3421, isOpen: true, hours: '8:00 AM – 11:00 PM',
    description: 'Your neighborhood coffee house. Enjoy handcrafted beverages, fresh pastries, and premium Teavana teas in a warm, inviting atmosphere.',
    logo: 'Starbucks',
    banner: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    bannerGradient: 'linear-gradient(135deg, #1e3932 0%, #00704A 100%)',
    offers: 1, productCount: 5,
    allowedCategories: ['Coffee', 'Tea', 'Pastries', 'Cold Beverages', 'Merchandise'],
  },
  {
    id: 6, name: "Levi's", brand: "Levi's", department: 'fashion',
    category: 'Fashion', floor: '1st Floor', location: 'F1-05',
    rating: 4.5, reviews: 1567, isOpen: true, hours: '10:00 AM – 9:00 PM',
    description: 'The original jeans brand since 1853. Shop iconic 501s, trucker jackets, and modern denim essentials for men and women.',
    logo: "Levi's",
    banner: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80',
    bannerGradient: 'linear-gradient(135deg, #c0392b 0%, #8e1c1c 100%)',
    offers: 2, productCount: 5,
    allowedCategories: ['Jeans', 'Jackets', 'T-Shirts', 'Shirts', 'Accessories'],
  },
  {
    id: 7, name: 'Samsung', brand: 'Samsung', department: 'electronics',
    category: 'Electronics', floor: 'Ground Floor', location: 'G-03',
    rating: 4.4, reviews: 1123, isOpen: true, hours: '10:00 AM – 9:00 PM',
    description: 'Samsung Experience Store. Explore Galaxy smartphones, tablets, wearables, TVs, and smart home devices. Try before you buy.',
    logo: 'Samsung',
    banner: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
    bannerGradient: 'linear-gradient(135deg, #1428a0 0%, #0b1d51 100%)',
    offers: 2, productCount: 6,
    allowedCategories: ['Smartphones', 'Tablets', 'Wearables', 'TVs', 'Audio', 'Accessories'],
  },
  {
    id: 8, name: 'Decathlon', brand: 'Decathlon', department: 'sports',
    category: 'Sports & Fitness', floor: 'Ground Floor', location: 'G-07',
    rating: 4.5, reviews: 2345, isOpen: true, hours: '9:00 AM – 9:30 PM',
    description: 'Making sport accessible for all. Affordable sports gear, fitness equipment, outdoor apparel, and accessories for 80+ sports.',
    logo: 'Decathlon',
    banner: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    bannerGradient: 'linear-gradient(135deg, #0066CC 0%, #004494 100%)',
    offers: 2, productCount: 6,
    allowedCategories: ['Running', 'Fitness Equipment', 'Sportswear', 'Outdoor', 'Sports Accessories', 'Yoga'],
  },
  {
    id: 9, name: 'Shoppers Stop', brand: 'Shoppers Stop', department: 'lifestyle',
    category: 'Lifestyle', floor: '2nd Floor', location: 'F2-03',
    rating: 4.2, reviews: 1890, isOpen: true, hours: '10:00 AM – 9:30 PM',
    description: 'India\'s premier lifestyle destination. Shop curated fashion, beauty, home decor, and accessories from premium national and international brands.',
    logo: 'Shoppers Stop',
    banner: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    bannerGradient: 'linear-gradient(135deg, #6a0572 0%, #ab2587 100%)',
    offers: 1, productCount: 5,
    allowedCategories: ['Fashion', 'Home Decor', 'Accessories', 'Fragrance', 'Watches'],
  },
  {
    id: 10, name: 'Crossword', brand: 'Crossword', department: 'books',
    category: 'Books & Stationery', floor: '2nd Floor', location: 'F2-05',
    rating: 4.6, reviews: 876, isOpen: true, hours: '10:00 AM – 9:00 PM',
    description: 'India\'s leading bookstore chain. Bestsellers, classics, academic, stationery, and curated collections. A haven for book lovers.',
    logo: 'Crossword',
    banner: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
    bannerGradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    offers: 1, productCount: 5,
    allowedCategories: ['Bestsellers', 'Fiction', 'Non-Fiction', 'Stationery', 'Art Supplies'],
  },
];

// ── Products ────────────────────────────────
export const products = [
  // ═══════════════════════════════════════════
  // CROMA — Electronics
  // ═══════════════════════════════════════════
  {
    id: 1, name: 'MacBook Air M3', brand: 'Apple', store: 'Croma', storeId: 1,
    department: 'electronics', category: 'Electronics', subcategory: 'Laptops',
    description: 'Apple MacBook Air with M3 chip, 15.3" Liquid Retina display, 16GB unified memory, 256GB SSD. Fanless design, 18-hour battery life.',
    price: 134900, originalPrice: 149900, discount: 10,
    rating: 4.8, reviews: 1289, stock: 15, color: 'Space Gray',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80',
    ],
    tags: ['laptop', 'apple', 'macbook', 'ultrabook', 'm3'],
  },
  {
    id: 2, name: 'Sony WH-1000XM5', brand: 'Sony', store: 'Croma', storeId: 1,
    department: 'electronics', category: 'Electronics', subcategory: 'Audio',
    description: 'Industry-leading noise cancellation with Auto NC Optimizer. 30-hour battery, crystal clear hands-free calling, multipoint connection.',
    price: 24990, originalPrice: 29990, discount: 17,
    rating: 4.7, reviews: 2456, stock: 42, color: 'Black',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    ],
    tags: ['headphones', 'sony', 'wireless', 'noise-cancelling', 'premium'],
  },
  {
    id: 3, name: 'iPad Pro 12.9"', brand: 'Apple', store: 'Croma', storeId: 1,
    department: 'electronics', category: 'Electronics', subcategory: 'Tablets',
    description: 'M2 chip, 12.9" Liquid Retina XDR display, ProMotion, Face ID, 5G capable. The ultimate iPad for creative professionals.',
    price: 112900, originalPrice: 124900, discount: 10,
    rating: 4.7, reviews: 834, stock: 19, color: 'Silver',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    ],
    tags: ['tablet', 'apple', 'ipad', 'pro', 'creative'],
  },
  {
    id: 4, name: 'JBL Flip 6', brand: 'JBL', store: 'Croma', storeId: 1,
    department: 'electronics', category: 'Electronics', subcategory: 'Audio',
    description: 'Portable Bluetooth speaker with powerful JBL Original Pro Sound, IP67 waterproof and dustproof, 12-hour playtime. Bold sound that moves with you.',
    price: 9999, originalPrice: 12999, discount: 23,
    rating: 4.5, reviews: 3120, stock: 55, color: 'Blue',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    ],
    tags: ['speaker', 'jbl', 'bluetooth', 'portable', 'waterproof'],
  },
  {
    id: 5, name: 'Apple Watch Series 9', brand: 'Apple', store: 'Croma', storeId: 1,
    department: 'electronics', category: 'Electronics', subcategory: 'Wearables',
    description: '41mm GPS, Always-On Retina display, blood oxygen sensor, ECG, crash detection, temperature sensing. The essential health companion.',
    price: 41900, originalPrice: 45900, discount: 9,
    rating: 4.6, reviews: 1445, stock: 35, color: 'Midnight',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&q=80',
    ],
    tags: ['watch', 'apple', 'smartwatch', 'fitness', 'health'],
  },
  {
    id: 6, name: 'Logitech MX Master 3S', brand: 'Logitech', store: 'Croma', storeId: 1,
    department: 'electronics', category: 'Electronics', subcategory: 'Accessories',
    description: 'Advanced wireless mouse with 8000 DPI, MagSpeed electromagnetic scroll, USB-C quick charging, quiet clicks. Works on any surface including glass.',
    price: 8995, originalPrice: 10995, discount: 18,
    rating: 4.6, reviews: 1980, stock: 37, color: 'Graphite',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
    ],
    tags: ['mouse', 'logitech', 'wireless', 'ergonomic', 'productivity'],
  },
  {
    id: 7, name: 'USB-C Hub 7-in-1', brand: 'Anker', store: 'Croma', storeId: 1,
    department: 'electronics', category: 'Electronics', subcategory: 'Accessories',
    description: 'Multiport adapter with HDMI 4K@60Hz, USB 3.0 ×3, SD/microSD card readers, USB-C PD 100W pass-through. Slim aluminum body.',
    price: 2999, originalPrice: 4499, discount: 33,
    rating: 4.4, reviews: 890, stock: 80, color: 'Silver',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80',
    ],
    tags: ['hub', 'usb-c', 'adapter', 'anker', 'accessories'],
  },
  {
    id: 8, name: 'Wireless Charging Pad', brand: 'Belkin', store: 'Croma', storeId: 1,
    department: 'electronics', category: 'Electronics', subcategory: 'Accessories',
    description: '15W fast wireless charger compatible with all Qi-enabled devices. MagSafe compatible. LED indicator with foreign object detection.',
    price: 1499, originalPrice: 2499, discount: 40,
    rating: 4.3, reviews: 678, stock: 150, color: 'White',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=600&q=80',
    ],
    tags: ['charger', 'wireless', 'qi', 'belkin', 'magsafe'],
  },

  // ═══════════════════════════════════════════
  // H&M — Fashion
  // ═══════════════════════════════════════════
  {
    id: 9, name: 'Slim Fit Oxford Shirt', brand: 'H&M', store: 'H&M', storeId: 2,
    department: 'fashion', category: 'Fashion', subcategory: 'Shirts',
    description: 'Premium slim fit oxford cotton shirt in classic white. Button-down collar, chest pocket. Perfect for formal and smart-casual occasions.',
    price: 1499, originalPrice: 2499, discount: 40,
    rating: 4.2, reviews: 890, stock: 120, color: 'White',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    ],
    tags: ['shirt', 'oxford', 'formal', 'cotton', 'slim-fit', 'white'],
  },
  {
    id: 10, name: 'High Waist Skinny Jeans', brand: 'H&M', store: 'H&M', storeId: 2,
    department: 'fashion', category: 'Fashion', subcategory: 'Jeans',
    description: 'Stretch denim jeans with high waist and skinny leg. Classic blue wash. Made from sustainable cotton blend with recycled polyester.',
    price: 2499, originalPrice: 3499, discount: 29,
    rating: 4.4, reviews: 1560, stock: 85, color: 'Blue',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80',
    ],
    tags: ['jeans', 'denim', 'women', 'high-waist', 'skinny', 'blue'],
  },
  {
    id: 11, name: 'Oversized Hoodie', brand: 'H&M', store: 'H&M', storeId: 2,
    department: 'fashion', category: 'Fashion', subcategory: 'Hoodies',
    description: 'Relaxed-fit hoodie in soft sweatshirt fabric with lined drawstring hood, kangaroo pocket, and ribbed cuffs. Unisex design.',
    price: 1999, originalPrice: 2999, discount: 33,
    rating: 4.5, reviews: 2340, stock: 95, color: 'Black',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
    ],
    tags: ['hoodie', 'casual', 'unisex', 'oversized', 'black', 'streetwear'],
  },
  {
    id: 12, name: 'Floral Midi Dress', brand: 'H&M', store: 'H&M', storeId: 2,
    department: 'fashion', category: 'Fashion', subcategory: 'Dresses',
    description: 'Calf-length dress in airy woven fabric with a delicate floral print. V-neck, short puff sleeves, and smocked waistband.',
    price: 2999, originalPrice: 4499, discount: 33,
    rating: 4.3, reviews: 670, stock: 45, color: 'Floral',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
    ],
    tags: ['dress', 'floral', 'women', 'midi', 'summer'],
  },
  {
    id: 13, name: 'Linen Blazer', brand: 'H&M', store: 'H&M', storeId: 2,
    department: 'fashion', category: 'Fashion', subcategory: 'Jackets',
    description: 'Relaxed fit linen blazer in navy blue. Single-breasted with notch lapels, welt chest pocket. Perfect for summer evenings.',
    price: 4999, originalPrice: 6999, discount: 29,
    rating: 4.3, reviews: 560, stock: 30, color: 'Navy',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    ],
    tags: ['blazer', 'linen', 'formal', 'navy', 'men'],
  },
  {
    id: 14, name: 'Cotton T-Shirt Pack', brand: 'H&M', store: 'H&M', storeId: 2,
    department: 'fashion', category: 'Fashion', subcategory: 'T-Shirts',
    description: 'Pack of 3 regular-fit T-shirts in soft cotton jersey. Crew neck, short sleeves. Available in black, white, and gray.',
    price: 999, originalPrice: 1499, discount: 33,
    rating: 4.1, reviews: 3450, stock: 200, color: 'Multi',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    ],
    tags: ['tshirt', 'cotton', 'basic', 'pack', 'casual', 'men'],
  },
  {
    id: 15, name: 'Crossbody Bag', brand: 'H&M', store: 'H&M', storeId: 2,
    department: 'fashion', category: 'Fashion', subcategory: 'Accessories',
    description: 'Compact crossbody bag in faux leather with adjustable strap. Zip closure, multiple compartments. Everyday essential.',
    price: 1799, originalPrice: 2499, discount: 28,
    rating: 4.2, reviews: 1450, stock: 55, color: 'Tan',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    ],
    tags: ['bag', 'crossbody', 'women', 'faux-leather', 'tan'],
  },

  // ═══════════════════════════════════════════
  // NIKE — Sports & Fashion
  // ═══════════════════════════════════════════
  {
    id: 16, name: 'Nike Air Zoom Pegasus 41', brand: 'Nike', store: 'Nike', storeId: 3,
    department: 'sports', category: 'Sports & Fashion', subcategory: 'Running Shoes',
    description: 'Your workhorse with wings. Responsive React foam midsole, Zoom Air cushioning in the forefoot, breathable mesh upper. Trusted by millions of runners.',
    price: 11495, originalPrice: 13995, discount: 18,
    rating: 4.7, reviews: 4500, stock: 60, color: 'Black/White',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    ],
    tags: ['shoes', 'running', 'nike', 'pegasus', 'athletic'],
  },
  {
    id: 17, name: 'Nike Air Force 1 \'07', brand: 'Nike', store: 'Nike', storeId: 3,
    department: 'sports', category: 'Sports & Fashion', subcategory: 'Sneakers',
    description: 'The legend lives on. Full-grain leather upper, Nike Air cushioning, classic pivot circle tread pattern. An icon since 1982.',
    price: 8195, originalPrice: 9695, discount: 15,
    rating: 4.8, reviews: 6780, stock: 40, color: 'White',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80',
    ],
    tags: ['sneakers', 'nike', 'air-force', 'white', 'classic', 'lifestyle'],
  },
  {
    id: 18, name: 'Nike Dri-FIT Running Tee', brand: 'Nike', store: 'Nike', storeId: 3,
    department: 'sports', category: 'Sports & Fashion', subcategory: 'Sportswear',
    description: 'Lightweight Dri-FIT technology wicks sweat away. Standard fit, reflective swoosh logo, mesh back panel for ventilation.',
    price: 1995, originalPrice: 2495, discount: 20,
    rating: 4.4, reviews: 2340, stock: 110, color: 'Black',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
    ],
    tags: ['tshirt', 'nike', 'dri-fit', 'running', 'sports'],
  },
  {
    id: 19, name: 'Nike Pro Training Shorts', brand: 'Nike', store: 'Nike', storeId: 3,
    department: 'sports', category: 'Sports & Fashion', subcategory: 'Training',
    description: 'Lightweight training shorts with built-in brief liner. Dri-FIT fabric, elastic waistband, side pockets. Quick-dry with reflective details.',
    price: 1799, originalPrice: 2295, discount: 22,
    rating: 4.3, reviews: 1890, stock: 90, color: 'Gray',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80',
    ],
    tags: ['shorts', 'nike', 'training', 'gym', 'sports'],
  },
  {
    id: 20, name: 'Nike Heritage Backpack', brand: 'Nike', store: 'Nike', storeId: 3,
    department: 'sports', category: 'Sports & Fashion', subcategory: 'Sports Accessories',
    description: 'Classic 25L backpack with padded laptop compartment, dual-zip main compartment, external pocket. Durable polyester construction.',
    price: 2495, originalPrice: 2995, discount: 17,
    rating: 4.4, reviews: 1670, stock: 65, color: 'Black',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    ],
    tags: ['backpack', 'nike', 'bag', 'laptop', 'school'],
  },
  {
    id: 21, name: 'Nike Revolution 6', brand: 'Nike', store: 'Nike', storeId: 3,
    department: 'sports', category: 'Sports & Fashion', subcategory: 'Running Shoes',
    description: 'Soft foam midsole, lightweight knit upper, rubber outsole. A budget-friendly runner that doesn\'t compromise on comfort.',
    price: 3695, originalPrice: 4995, discount: 26,
    rating: 4.3, reviews: 5670, stock: 75, color: 'Navy',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    ],
    tags: ['shoes', 'running', 'nike', 'revolution', 'budget', 'navy'],
  },

  // ═══════════════════════════════════════════
  // SEPHORA — Beauty
  // ═══════════════════════════════════════════
  {
    id: 22, name: 'Vitamin C Brightening Serum', brand: 'Sephora Collection', store: 'Sephora', storeId: 4,
    department: 'beauty', category: 'Beauty', subcategory: 'Skincare',
    description: '20% Vitamin C + Hyaluronic Acid + Vitamin E serum. Brightens, hydrates, and protects against environmental damage. Dermatologist tested.',
    price: 1899, originalPrice: 2499, discount: 24,
    rating: 4.6, reviews: 2340, stock: 150, color: null,
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    ],
    tags: ['skincare', 'serum', 'vitamin-c', 'brightening', 'hydrating'],
  },
  {
    id: 23, name: 'Matte Lipstick Collection', brand: 'MAC', store: 'Sephora', storeId: 4,
    department: 'beauty', category: 'Beauty', subcategory: 'Makeup',
    description: 'Set of 6 iconic MAC matte lipsticks in trending shades. Long-lasting, creamy formula enriched with vitamin E. Professional quality.',
    price: 4999, originalPrice: 6999, discount: 29,
    rating: 4.5, reviews: 1890, stock: 75, color: 'Multi',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80',
    ],
    tags: ['lipstick', 'makeup', 'mac', 'matte', 'beauty'],
  },
  {
    id: 24, name: 'SPF 50 Sunscreen Gel', brand: 'La Roche-Posay', store: 'Sephora', storeId: 4,
    department: 'beauty', category: 'Beauty', subcategory: 'Skincare',
    description: 'Lightweight, non-greasy SPF 50 PA++++ sunscreen gel. Oil-free, suitable for all skin types, water resistant. Anthelios technology.',
    price: 1299, originalPrice: 1699, discount: 24,
    rating: 4.7, reviews: 3450, stock: 200, color: null,
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    ],
    tags: ['sunscreen', 'skincare', 'spf', 'gel', 'protection'],
  },
  {
    id: 25, name: 'Eau de Parfum — Bloom', brand: 'Gucci', store: 'Sephora', storeId: 4,
    department: 'beauty', category: 'Beauty', subcategory: 'Fragrance',
    description: 'A rich, white floral scent celebrating authenticity. Notes of jasmine bud, tuberose, and Rangoon creeper. 50ml bottle.',
    price: 8500, originalPrice: 9900, discount: 14,
    rating: 4.6, reviews: 890, stock: 30, color: null,
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
    ],
    tags: ['perfume', 'fragrance', 'gucci', 'floral', 'women'],
  },
  {
    id: 26, name: 'Hair Repair Mask', brand: 'Moroccanoil', store: 'Sephora', storeId: 4,
    department: 'beauty', category: 'Beauty', subcategory: 'Haircare',
    description: 'Restorative hair mask with argan oil, keratin, and shea butter. Repairs, conditions, and adds shine. For all hair types. 250ml.',
    price: 2999, originalPrice: 3999, discount: 25,
    rating: 4.4, reviews: 1230, stock: 60, color: null,
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    ],
    tags: ['haircare', 'mask', 'repair', 'argan-oil', 'moroccanoil'],
  },

  // ═══════════════════════════════════════════
  // STARBUCKS — Food & Beverage
  // ═══════════════════════════════════════════
  {
    id: 27, name: 'Signature Cold Brew', brand: 'Starbucks', store: 'Starbucks', storeId: 5,
    department: 'food', category: 'Food & Beverage', subcategory: 'Coffee',
    description: 'Our signature slow-steeped, super-smooth cold brew. Made with a custom blend of beans for a naturally sweet flavor. Grande size.',
    price: 325, originalPrice: 375, discount: 13,
    rating: 4.8, reviews: 5670, stock: 999, color: null,
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    ],
    tags: ['coffee', 'cold-brew', 'starbucks', 'iced', 'drinks'],
  },
  {
    id: 28, name: 'Caramel Frappuccino', brand: 'Starbucks', store: 'Starbucks', storeId: 5,
    department: 'food', category: 'Food & Beverage', subcategory: 'Cold Beverages',
    description: 'Caramel syrup blended with coffee, milk, and ice, topped with whipped cream and caramel drizzle. Tall size.',
    price: 395, originalPrice: 425, discount: 7,
    rating: 4.6, reviews: 4320, stock: 999, color: null,
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
    ],
    tags: ['frappuccino', 'caramel', 'starbucks', 'cold', 'sweet'],
  },
  {
    id: 29, name: 'Matcha Green Tea Latte', brand: 'Starbucks', store: 'Starbucks', storeId: 5,
    department: 'food', category: 'Food & Beverage', subcategory: 'Tea',
    description: 'Smooth and creamy matcha green tea sweetened just right and steamed with milk. Available hot or iced. Grande size.',
    price: 375, originalPrice: 425, discount: 12,
    rating: 4.5, reviews: 2890, stock: 999, color: null,
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80',
    ],
    tags: ['matcha', 'latte', 'tea', 'green-tea', 'starbucks'],
  },
  {
    id: 30, name: 'Blueberry Muffin', brand: 'Starbucks', store: 'Starbucks', storeId: 5,
    department: 'food', category: 'Food & Beverage', subcategory: 'Pastries',
    description: 'Moist, fluffy muffin loaded with juicy blueberries and topped with a crunchy streusel. Baked fresh daily.',
    price: 275, originalPrice: 325, discount: 15,
    rating: 4.4, reviews: 1560, stock: 999, color: null,
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80',
    ],
    tags: ['muffin', 'blueberry', 'pastry', 'bakery', 'breakfast'],
  },
  {
    id: 31, name: 'Avocado Toast', brand: 'Starbucks', store: 'Starbucks', storeId: 5,
    department: 'food', category: 'Food & Beverage', subcategory: 'Pastries',
    description: 'Artisan sourdough toast with smashed avocado, cherry tomatoes, feta crumbles, and everything bagel seasoning.',
    price: 425, originalPrice: 475, discount: 11,
    rating: 4.3, reviews: 1120, stock: 999, color: null,
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&q=80',
    ],
    tags: ['food', 'toast', 'avocado', 'breakfast', 'healthy'],
  },

  // ═══════════════════════════════════════════
  // LEVI'S — Fashion
  // ═══════════════════════════════════════════
  {
    id: 32, name: "Levi's 501 Original Jeans", brand: "Levi's", store: "Levi's", storeId: 6,
    department: 'fashion', category: 'Fashion', subcategory: 'Jeans',
    description: 'The original straight fit jean that started it all. Button fly, signature leather patch, 100% cotton selvedge denim. An American icon since 1873.',
    price: 3999, originalPrice: 5499, discount: 27,
    rating: 4.7, reviews: 4560, stock: 80, color: 'Indigo',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80',
    ],
    tags: ['jeans', 'levis', '501', 'original', 'denim', 'men', 'indigo'],
  },
  {
    id: 33, name: "Levi's Trucker Jacket", brand: "Levi's", store: "Levi's", storeId: 6,
    department: 'fashion', category: 'Fashion', subcategory: 'Jackets',
    description: 'The iconic denim jacket. Non-stretch denim, button front, chest pockets, adjustable side tabs. A wardrobe essential for every season.',
    price: 5999, originalPrice: 7999, discount: 25,
    rating: 4.6, reviews: 2340, stock: 35, color: 'Medium Wash',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    ],
    tags: ['jacket', 'levis', 'trucker', 'denim', 'classic'],
  },
  {
    id: 34, name: "Levi's Graphic Tee", brand: "Levi's", store: "Levi's", storeId: 6,
    department: 'fashion', category: 'Fashion', subcategory: 'T-Shirts',
    description: 'Classic batwing logo graphic T-shirt. 100% cotton jersey, relaxed fit, crew neck. The essential casual everyday tee.',
    price: 1299, originalPrice: 1799, discount: 28,
    rating: 4.3, reviews: 3450, stock: 150, color: 'White',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    ],
    tags: ['tshirt', 'levis', 'graphic', 'logo', 'casual', 'white'],
  },
  {
    id: 35, name: "Levi's Leather Belt", brand: "Levi's", store: "Levi's", storeId: 6,
    department: 'fashion', category: 'Fashion', subcategory: 'Accessories',
    description: 'Classic genuine leather belt with polished metal buckle. Width: 35mm. Available in black and brown. Embossed Levi\'s logo.',
    price: 1499, originalPrice: 2299, discount: 35,
    rating: 4.2, reviews: 1230, stock: 90, color: 'Brown',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    ],
    tags: ['belt', 'leather', 'levis', 'accessories', 'brown'],
  },
  {
    id: 36, name: "Levi's 511 Slim Fit", brand: "Levi's", store: "Levi's", storeId: 6,
    department: 'fashion', category: 'Fashion', subcategory: 'Jeans',
    description: 'Slim from hip to ankle. Advanced stretch denim for comfort all day. Zip fly, five-pocket styling. Modern essential.',
    price: 3499, originalPrice: 4999, discount: 30,
    rating: 4.5, reviews: 3890, stock: 70, color: 'Dark Blue',
    floor: '1st Floor',
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80',
    ],
    tags: ['jeans', 'levis', '511', 'slim', 'denim', 'dark-blue'],
  },

  // ═══════════════════════════════════════════
  // SAMSUNG — Electronics
  // ═══════════════════════════════════════════
  {
    id: 37, name: 'Galaxy S24 Ultra', brand: 'Samsung', store: 'Samsung', storeId: 7,
    department: 'electronics', category: 'Electronics', subcategory: 'Smartphones',
    description: '6.8" Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 200MP camera, S Pen, 5000mAh battery, 12GB RAM. Galaxy AI built-in.',
    price: 129999, originalPrice: 139999, discount: 7,
    rating: 4.7, reviews: 3450, stock: 28, color: 'Titanium Black',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80',
      'https://images.unsplash.com/photo-1592950630581-03cb41342cc5?w=600&q=80',
    ],
    tags: ['phone', 'samsung', 'galaxy', 'android', 'flagship', 's24'],
  },
  {
    id: 38, name: 'Galaxy Tab S9 FE', brand: 'Samsung', store: 'Samsung', storeId: 7,
    department: 'electronics', category: 'Electronics', subcategory: 'Tablets',
    description: '10.9" LCD, Exynos 1380, 6GB RAM, S Pen included, IP68 water resistance, 8000mAh battery. Perfect for entertainment and productivity.',
    price: 44999, originalPrice: 49999, discount: 10,
    rating: 4.4, reviews: 1230, stock: 40, color: 'Gray',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1561154464-82e9aab73a69?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1561154464-82e9aab73a69?w=600&q=80',
    ],
    tags: ['tablet', 'samsung', 'galaxy-tab', 'android', 's-pen'],
  },
  {
    id: 39, name: 'Galaxy Watch 6', brand: 'Samsung', store: 'Samsung', storeId: 7,
    department: 'electronics', category: 'Electronics', subcategory: 'Wearables',
    description: '44mm, Super AMOLED, BioActive Sensor, heart rate, blood pressure, body composition, sleep coaching. Wear OS by Google.',
    price: 26999, originalPrice: 32999, discount: 18,
    rating: 4.5, reviews: 2340, stock: 45, color: 'Graphite',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80',
    ],
    tags: ['watch', 'samsung', 'galaxy-watch', 'smartwatch', 'fitness'],
  },
  {
    id: 40, name: 'Galaxy Buds2 Pro', brand: 'Samsung', store: 'Samsung', storeId: 7,
    department: 'electronics', category: 'Electronics', subcategory: 'Audio',
    description: 'Active noise cancellation, Hi-Fi 24-bit audio, 360 Audio, IPX7 water resistant. Ergonomic fit with AirTight seal. 29hr total battery.',
    price: 15999, originalPrice: 17999, discount: 11,
    rating: 4.4, reviews: 2890, stock: 55, color: 'Bora Purple',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80',
    ],
    tags: ['earbuds', 'samsung', 'galaxy-buds', 'wireless', 'anc'],
  },
  {
    id: 41, name: 'Crystal UHD 4K Smart TV', brand: 'Samsung', store: 'Samsung', storeId: 7,
    department: 'electronics', category: 'Electronics', subcategory: 'TVs',
    description: '55" Crystal UHD 4K, Crystal Processor 4K, Smart TV with Tizen, HDR, Adaptive Sound, AirSlim design. Cinematic experience at home.',
    price: 47990, originalPrice: 58990, discount: 19,
    rating: 4.5, reviews: 1670, stock: 12, color: 'Black',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80',
    ],
    tags: ['tv', 'samsung', '4k', 'smart-tv', 'crystal-uhd', '55-inch'],
  },
  {
    id: 42, name: 'Galaxy A15 5G', brand: 'Samsung', store: 'Samsung', storeId: 7,
    department: 'electronics', category: 'Electronics', subcategory: 'Smartphones',
    description: '6.5" Super AMOLED, Dimensity 6100+, 50MP triple camera, 5000mAh, 25W fast charging. Flagship features at an affordable price.',
    price: 13999, originalPrice: 16999, discount: 18,
    rating: 4.2, reviews: 4560, stock: 90, color: 'Blue Black',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
    ],
    tags: ['phone', 'samsung', 'galaxy-a15', 'budget', '5g', 'android'],
  },

  // ═══════════════════════════════════════════
  // DECATHLON — Sports & Fitness
  // ═══════════════════════════════════════════
  {
    id: 43, name: 'Yoga Mat 6mm', brand: 'Domyos', store: 'Decathlon', storeId: 8,
    department: 'sports', category: 'Sports & Fitness', subcategory: 'Yoga',
    description: '6mm thick TPE yoga mat with alignment lines. Non-slip surface, eco-friendly material, carrying strap included. 183×61cm.',
    price: 999, originalPrice: 1499, discount: 33,
    rating: 4.5, reviews: 4560, stock: 120, color: 'Blue',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80',
    ],
    tags: ['yoga', 'mat', 'fitness', 'domyos', 'decathlon', 'exercise'],
  },
  {
    id: 44, name: 'Adjustable Dumbbell Set', brand: 'Domyos', store: 'Decathlon', storeId: 8,
    department: 'sports', category: 'Sports & Fitness', subcategory: 'Fitness Equipment',
    description: '20kg adjustable dumbbell set with quick-change mechanism. Cast iron weights, rubber grip handle. Space-saving design for home gym.',
    price: 4999, originalPrice: 6999, discount: 29,
    rating: 4.6, reviews: 1890, stock: 25, color: 'Black',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    ],
    tags: ['dumbbells', 'weights', 'home-gym', 'fitness', 'strength'],
  },
  {
    id: 45, name: 'Running Jacket Windproof', brand: 'Kalenji', store: 'Decathlon', storeId: 8,
    department: 'sports', category: 'Sports & Fitness', subcategory: 'Sportswear',
    description: 'Lightweight windproof running jacket. Water-repellent treatment, breathable mesh lining, reflective prints. Packs into its own pocket.',
    price: 1999, originalPrice: 2999, discount: 33,
    rating: 4.3, reviews: 2340, stock: 65, color: 'Neon Yellow',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80',
    ],
    tags: ['jacket', 'running', 'windproof', 'kalenji', 'decathlon'],
  },
  {
    id: 46, name: 'Resistance Bands Set', brand: 'Domyos', store: 'Decathlon', storeId: 8,
    department: 'sports', category: 'Sports & Fitness', subcategory: 'Fitness Equipment',
    description: 'Set of 5 latex resistance bands with 5 strength levels (5–25 kg). Includes door anchor, handles, and carry bag. Perfect for home workouts.',
    price: 799, originalPrice: 1299, discount: 38,
    rating: 4.3, reviews: 5670, stock: 200, color: 'Multi',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&q=80',
    ],
    tags: ['resistance-bands', 'fitness', 'home-workout', 'domyos'],
  },
  {
    id: 47, name: 'Protein Shaker 700ml', brand: 'Domyos', store: 'Decathlon', storeId: 8,
    department: 'sports', category: 'Sports & Fitness', subcategory: 'Sports Accessories',
    description: 'BPA-free 700ml protein shaker with mixing ball and snap-lock lid. Leak-proof, dishwasher safe. Measurement markings.',
    price: 399, originalPrice: 599, discount: 33,
    rating: 4.1, reviews: 3450, stock: 300, color: 'Black',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80',
    ],
    tags: ['shaker', 'protein', 'gym', 'fitness', 'bottle'],
  },
  {
    id: 48, name: 'Gym Duffel Bag 40L', brand: 'Kipsta', store: 'Decathlon', storeId: 8,
    department: 'sports', category: 'Sports & Fitness', subcategory: 'Sports Accessories',
    description: 'Spacious 40L gym bag with ventilated shoe compartment, water bottle holder, and adjustable shoulder strap. Durable polyester.',
    price: 1499, originalPrice: 1999, discount: 25,
    rating: 4.2, reviews: 2340, stock: 75, color: 'Navy',
    floor: 'Ground Floor',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    ],
    tags: ['bag', 'gym', 'duffel', 'sports', 'kipsta'],
  },

  // ═══════════════════════════════════════════
  // SHOPPERS STOP — Lifestyle
  // ═══════════════════════════════════════════
  {
    id: 49, name: 'Minimalist Leather Wallet', brand: 'Tommy Hilfiger', store: 'Shoppers Stop', storeId: 9,
    department: 'lifestyle', category: 'Lifestyle', subcategory: 'Accessories',
    description: 'Slim bifold genuine leather wallet with RFID blocking. Holds 8 cards + cash compartment. Embossed Tommy logo. Gift boxed.',
    price: 2999, originalPrice: 4499, discount: 33,
    rating: 4.4, reviews: 1890, stock: 55, color: 'Black',
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
    ],
    tags: ['wallet', 'leather', 'tommy', 'rfid', 'minimalist'],
  },
  {
    id: 50, name: 'Analog Watch Classic', brand: 'Fossil', store: 'Shoppers Stop', storeId: 9,
    department: 'lifestyle', category: 'Lifestyle', subcategory: 'Watches',
    description: '42mm stainless steel case, genuine leather strap, mineral crystal, Japanese quartz movement. Water resistant to 5 ATM.',
    price: 7999, originalPrice: 10999, discount: 27,
    rating: 4.5, reviews: 1230, stock: 30, color: 'Brown/Silver',
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    ],
    tags: ['watch', 'fossil', 'analog', 'leather', 'classic'],
  },
  {
    id: 51, name: 'Aroma Diffuser LED', brand: 'Home Centre', store: 'Shoppers Stop', storeId: 9,
    department: 'lifestyle', category: 'Lifestyle', subcategory: 'Home Decor',
    description: 'Ultrasonic essential oil diffuser with 7-color LED mood lighting. 300ml capacity, auto shut-off, whisper quiet operation.',
    price: 1999, originalPrice: 2999, discount: 33,
    rating: 4.3, reviews: 890, stock: 70, color: 'White',
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80',
    ],
    tags: ['diffuser', 'aroma', 'home', 'decor', 'led', 'relaxation'],
  },
  {
    id: 52, name: 'Silk Scarf', brand: 'Vero Moda', store: 'Shoppers Stop', storeId: 9,
    department: 'lifestyle', category: 'Lifestyle', subcategory: 'Fashion',
    description: 'Luxurious printed silk scarf with hand-rolled edges. Versatile styling — wear as a headband, neck scarf, or bag accessory. 90×90cm.',
    price: 1499, originalPrice: 2499, discount: 40,
    rating: 4.2, reviews: 670, stock: 45, color: 'Multi',
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    ],
    tags: ['scarf', 'silk', 'fashion', 'women', 'accessories'],
  },
  {
    id: 53, name: 'Eau de Toilette — Blue', brand: 'Park Avenue', store: 'Shoppers Stop', storeId: 9,
    department: 'lifestyle', category: 'Lifestyle', subcategory: 'Fragrance',
    description: 'Fresh aquatic fragrance with notes of bergamot, sea notes, and cedarwood. Long-lasting EDT. 100ml bottle.',
    price: 599, originalPrice: 899, discount: 33,
    rating: 4.1, reviews: 2340, stock: 100, color: null,
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80',
    ],
    tags: ['perfume', 'fragrance', 'men', 'edt', 'fresh'],
  },

  // ═══════════════════════════════════════════
  // CROSSWORD — Books & Stationery
  // ═══════════════════════════════════════════
  {
    id: 54, name: 'Atomic Habits', brand: 'Penguin', store: 'Crossword', storeId: 10,
    department: 'books', category: 'Books & Stationery', subcategory: 'Bestsellers',
    description: 'By James Clear. An easy & proven way to build good habits & break bad ones. #1 New York Times Bestseller with 15 million+ copies sold.',
    price: 499, originalPrice: 799, discount: 38,
    rating: 4.9, reviews: 12450, stock: 200, color: null,
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
    ],
    tags: ['book', 'self-help', 'bestseller', 'habits', 'james-clear'],
  },
  {
    id: 55, name: 'The Psychology of Money', brand: 'Jaico', store: 'Crossword', storeId: 10,
    department: 'books', category: 'Books & Stationery', subcategory: 'Non-Fiction',
    description: 'By Morgan Housel. Timeless lessons on wealth, greed, and happiness. 19 short stories exploring how people think about money.',
    price: 399, originalPrice: 599, discount: 33,
    rating: 4.8, reviews: 8900, stock: 180, color: null,
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
    ],
    tags: ['book', 'finance', 'bestseller', 'money', 'morgan-housel'],
  },
  {
    id: 56, name: 'Premium Notebook Set', brand: 'Moleskine', store: 'Crossword', storeId: 10,
    department: 'books', category: 'Books & Stationery', subcategory: 'Stationery',
    description: 'Set of 3 A5 Moleskine notebooks — ruled, dotted, and plain. 240 pages each, 70gsm ivory paper, elastic closure, expandable pocket.',
    price: 1899, originalPrice: 2699, discount: 30,
    rating: 4.6, reviews: 2340, stock: 90, color: 'Black',
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80',
    ],
    tags: ['notebook', 'moleskine', 'stationery', 'writing', 'premium'],
  },
  {
    id: 57, name: 'Art Sketching Kit Pro', brand: 'Faber-Castell', store: 'Crossword', storeId: 10,
    department: 'books', category: 'Books & Stationery', subcategory: 'Art Supplies',
    description: 'Professional sketching set: 24 graphite pencils (6H–8B), 6 charcoal sticks, 4 blending stumps, kneaded eraser, sharpener. Tin case.',
    price: 1499, originalPrice: 2199, discount: 32,
    rating: 4.5, reviews: 1230, stock: 60, color: null,
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    ],
    tags: ['art', 'sketching', 'drawing', 'pencils', 'faber-castell'],
  },
  {
    id: 58, name: 'Sapiens: A Brief History', brand: 'Vintage', store: 'Crossword', storeId: 10,
    department: 'books', category: 'Books & Stationery', subcategory: 'Non-Fiction',
    description: 'By Yuval Noah Harari. A groundbreaking narrative of humanity\'s creation and evolution. Explores history, biology, and the future of Homo Sapiens.',
    price: 499, originalPrice: 699, discount: 29,
    rating: 4.7, reviews: 6780, stock: 150, color: null,
    floor: '2nd Floor',
    image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&q=80',
    ],
    tags: ['book', 'history', 'sapiens', 'non-fiction', 'harari'],
  },
];

// ── Categories ──────────────────────────────
export const categories = (() => {
  const catMap = {};
  products.forEach(p => {
    if (!catMap[p.category]) {
      catMap[p.category] = { count: 0, subcategories: new Set() };
    }
    catMap[p.category].count++;
    if (p.subcategory) catMap[p.category].subcategories.add(p.subcategory);
  });
  const icons = { 'Electronics': '💻', 'Fashion': '👔', 'Sports & Fashion': '🏃', 'Sports & Fitness': '🏋️', 'Beauty': '✨', 'Food & Beverage': '☕', 'Lifestyle': '🛍️', 'Books & Stationery': '📚', 'Home & Living': '🏠' };
  const colors = { 'Electronics': '#4F6BF6', 'Fashion': '#e8345a', 'Sports & Fashion': '#111', 'Sports & Fitness': '#0066CC', 'Beauty': '#d4a574', 'Food & Beverage': '#00704A', 'Lifestyle': '#6a0572', 'Books & Stationery': '#2c3e50', 'Home & Living': '#a18cd1' };
  return Object.entries(catMap).map(([name, data], i) => ({
    id: i + 1, name, icon: icons[name] || '🏷️', color: colors[name] || '#4F6BF6',
    count: data.count, subcategories: [...data.subcategories],
  }));
})();

// ── Offers ───────────────────────────────────
export const offers = [
  { id: 1, title: 'Tech Weekend Sale', discount: '20% OFF', description: 'Flat 20% off on all electronics. Laptops, phones, audio & more!', storeId: 1, store: 'Croma', category: 'Electronics', validUntil: '2026-09-28', code: 'TECH20', minPurchase: 5000 },
  { id: 2, title: 'End of Season Sale', discount: 'Up to 50% OFF', description: 'Massive clearance on summer fashion. T-shirts, dresses, jeans & more.', storeId: 2, store: 'H&M', category: 'Fashion', validUntil: '2026-10-15', code: 'EOSS50', minPurchase: 1500 },
  { id: 3, title: 'Buy 2 Get 1 Free', discount: 'B2G1', description: 'Buy any 2 fashion items and get 1 free. Mix and match!', storeId: 2, store: 'H&M', category: 'Fashion', validUntil: '2026-09-30', code: 'B2G1HM', minPurchase: 2000 },
  { id: 4, title: 'Just Do It Sale', discount: '25% OFF', description: '25% off on running shoes and training gear. Get moving!', storeId: 3, store: 'Nike', category: 'Sports & Fashion', validUntil: '2026-09-27', code: 'NIKE25', minPurchase: 3000 },
  { id: 5, title: 'Beauty Bonanza', discount: '30% OFF', description: 'Up to 30% off on premium skincare and makeup. Glow up season!', storeId: 4, store: 'Sephora', category: 'Beauty', validUntil: '2026-10-05', code: 'GLOW30', minPurchase: 1000 },
  { id: 6, title: 'Happy Hours', discount: '₹100 OFF', description: '₹100 off on orders above ₹300. Valid 2 PM – 5 PM daily.', storeId: 5, store: 'Starbucks', category: 'Food & Beverage', validUntil: '2026-10-31', code: 'HAPPY100', minPurchase: 300 },
  { id: 7, title: 'Denim Days', discount: '30% OFF', description: '30% off on all Levi\'s jeans. The originals, on sale.', storeId: 6, store: "Levi's", category: 'Fashion', validUntil: '2026-10-10', code: 'DENIM30', minPurchase: 2000 },
  { id: 8, title: 'Galaxy Fest', discount: '₹5000 OFF', description: 'Flat ₹5000 off on Galaxy S24 series. Limited time!', storeId: 7, store: 'Samsung', category: 'Electronics', validUntil: '2026-10-05', code: 'GALAXY5K', minPurchase: 30000 },
  { id: 9, title: 'Fitness First', discount: '35% OFF', description: '35% off on fitness equipment. Dumbbells, mats, bands & more.', storeId: 8, store: 'Decathlon', category: 'Sports & Fitness', validUntil: '2026-10-20', code: 'FIT35', minPurchase: 500 },
  { id: 10, title: 'Read More Sale', discount: '40% OFF', description: 'Up to 40% off on bestselling books. Stock your reading list!', storeId: 10, store: 'Crossword', category: 'Books & Stationery', validUntil: '2026-10-10', code: 'READ40', minPurchase: 300 },
  { id: 11, title: 'Nike Air Max Day', discount: '₹2000 OFF', description: '₹2000 off on Air Max collection. Celebrate the icon.', storeId: 3, store: 'Nike', category: 'Sports & Fashion', validUntil: '2026-09-30', code: 'AIRMAX2K', minPurchase: 5000 },
  { id: 12, title: 'Croma Electronics Fest', discount: '₹3000 OFF', description: 'Flat ₹3000 off on purchases above ₹50,000. Premium gadgets!', storeId: 1, store: 'Croma', category: 'Electronics', validUntil: '2026-10-05', code: 'FEST3K', minPurchase: 50000 },
];

// ── Parking ─────────────────────────────────
export const parkingZones = [
  { id: 'P1', name: 'Parking Zone P1', floor: 'Basement 1', total: 200, occupied: 143, reserved: 12 },
  { id: 'P2', name: 'Parking Zone P2', floor: 'Basement 2', total: 180, occupied: 112, reserved: 10 },
  { id: 'P3', name: 'Parking Zone P3', floor: 'Basement 3', total: 120, occupied: 88, reserved: 8 },
];

// ── Helper Functions ─────────────────────────
export const getStoreById = (id) => stores.find(s => s.id === Number(id));
export const getProductById = (id) => products.find(p => p.id === Number(id));
export const getProductsByStore = (storeId) => products.filter(p => p.storeId === Number(storeId));
export const getOffersByStore = (storeId) => offers.filter(o => o.storeId === Number(storeId));

// ── Intelligent Search Engine ────────────────
const BRAND_ALIASES = {
  'nike': 'Nike', 'nik': 'Nike', 'nikey': 'Nike',
  'samsung': 'Samsung', 'samsang': 'Samsung', 'samung': 'Samsung',
  'apple': 'Apple', 'appl': 'Apple',
  'sony': 'Sony', 'soni': 'Sony',
  'h&m': 'H&M', 'hm': 'H&M', 'h and m': 'H&M', 'hnm': 'H&M',
  "levi's": "Levi's", 'levis': "Levi's", 'levi': "Levi's",
  'sephora': 'Sephora',
  'starbucks': 'Starbucks', 'sbux': 'Starbucks',
  'croma': 'Croma', 'chroma': 'Croma',
  'decathlon': 'Decathlon', 'decath': 'Decathlon',
  'jbl': 'JBL', 'logitech': 'Logitech', 'belkin': 'Belkin', 'anker': 'Anker',
  'mac': 'MAC', 'gucci': 'Gucci', 'fossil': 'Fossil', 'tommy': 'Tommy Hilfiger',
  'moleskine': 'Moleskine', 'faber': 'Faber-Castell', 'domyos': 'Domyos',
};

const CATEGORY_KEYWORDS = {
  'Smartphones': ['phone', 'smartphone', 'mobile', 'cell'],
  'Laptops': ['laptop', 'macbook', 'notebook', 'computer'],
  'Audio': ['headphones', 'headphone', 'earbuds', 'earphone', 'speaker', 'audio', 'earphones'],
  'Tablets': ['tablet', 'ipad', 'tab'],
  'Wearables': ['smartwatch', 'watch', 'wearable', 'fitness-tracker', 'band'],
  'TVs': ['tv', 'television', 'monitor', 'screen'],
  'Accessories': ['charger', 'cable', 'hub', 'adapter', 'accessory', 'mouse', 'keyboard'],
  'Running Shoes': ['running-shoes', 'running shoes', 'runners'],
  'Sneakers': ['sneakers', 'sneaker', 'kicks', 'air-force', 'air force'],
  'Shoes': ['shoes', 'shoe', 'footwear'],
  'T-Shirts': ['tshirt', 't-shirt', 'tee', 'top'],
  'Shirts': ['shirt', 'oxford', 'button-down'],
  'Jeans': ['jeans', 'denim', 'pants', 'trousers'],
  'Dresses': ['dress', 'frock', 'gown'],
  'Hoodies': ['hoodie', 'hoody', 'sweatshirt', 'pullover'],
  'Jackets': ['jacket', 'blazer', 'coat', 'trucker'],
  'Skincare': ['skincare', 'serum', 'moisturizer', 'cream', 'sunscreen', 'spf'],
  'Makeup': ['makeup', 'lipstick', 'foundation', 'mascara', 'eyeliner', 'cosmetics'],
  'Fragrance': ['perfume', 'fragrance', 'cologne', 'edt', 'edp', 'scent'],
  'Coffee': ['coffee', 'espresso', 'latte', 'cappuccino', 'brew', 'americano'],
  'Books': ['book', 'novel', 'read', 'bestseller', 'fiction', 'non-fiction'],
  'Stationery': ['notebook', 'stationery', 'pen', 'pencil', 'writing'],
  'Sportswear': ['sportswear', 'activewear', 'gym-wear', 'athletic'],
  'Fitness Equipment': ['dumbbell', 'weight', 'gym', 'fitness', 'equipment', 'mat', 'band'],
  'Bags': ['bag', 'backpack', 'duffel', 'crossbody', 'tote', 'purse'],
  'Wallets': ['wallet', 'card-holder', 'purse'],
};

const COLOR_KEYWORDS = ['black', 'white', 'blue', 'red', 'green', 'navy', 'gray', 'grey', 'brown', 'tan', 'pink', 'yellow', 'purple', 'silver', 'gold', 'indigo', 'neon'];

const GIFT_KEYWORDS = ['gift', 'present', 'birthday', 'anniversary', 'surprise'];
const GIFT_RECIPIENTS = {
  'brother': ['Electronics', 'Sports & Fashion', 'Sports & Fitness', 'Lifestyle'],
  'sister': ['Fashion', 'Beauty', 'Lifestyle', 'Books & Stationery'],
  'friend': ['Electronics', 'Fashion', 'Sports & Fitness', 'Food & Beverage'],
  'mom': ['Beauty', 'Lifestyle', 'Books & Stationery', 'Food & Beverage'],
  'mother': ['Beauty', 'Lifestyle', 'Books & Stationery', 'Food & Beverage'],
  'dad': ['Electronics', 'Lifestyle', 'Books & Stationery'],
  'father': ['Electronics', 'Lifestyle', 'Books & Stationery'],
  'boyfriend': ['Electronics', 'Sports & Fashion', 'Lifestyle'],
  'girlfriend': ['Fashion', 'Beauty', 'Lifestyle'],
  'wife': ['Fashion', 'Beauty', 'Lifestyle'],
  'husband': ['Electronics', 'Sports & Fashion', 'Lifestyle'],
};

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function fuzzyMatch(input, target, threshold = 2) {
  const a = input.toLowerCase(), b = target.toLowerCase();
  if (b.includes(a) || a.includes(b)) return true;
  if (a.length >= 3 && levenshtein(a, b) <= threshold) return true;
  return false;
}

export function extractSearchIntent(query) {
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/);
  const intent = { raw: query, brand: null, categories: [], color: null, maxPrice: null, minPrice: null, isGift: false, giftRecipient: null, keywords: [] };

  // Price extraction
  const priceMatch = q.match(/(?:under|below|less than|upto|up to|max|within)\s*₹?\s*(\d[\d,]*)/i);
  if (priceMatch) intent.maxPrice = parseInt(priceMatch[1].replace(/,/g, ''));
  const minPriceMatch = q.match(/(?:above|over|more than|min|atleast|at least)\s*₹?\s*(\d[\d,]*)/i);
  if (minPriceMatch) intent.minPrice = parseInt(minPriceMatch[1].replace(/,/g, ''));
  // Handle "X to Y" range
  const rangeMatch = q.match(/(\d[\d,]*)\s*(?:to|-)\s*(\d[\d,]*)/);
  if (rangeMatch) {
    intent.minPrice = parseInt(rangeMatch[1].replace(/,/g, ''));
    intent.maxPrice = parseInt(rangeMatch[2].replace(/,/g, ''));
  }
  // Handle spoken numbers
  const spokenNumbers = { 'thousand': 1000, 'lakh': 100000, 'lac': 100000, 'k': 1000 };
  const spokenMatch = q.match(/(\d+)\s*(thousand|lakh|lac|k)/i);
  if (spokenMatch && !intent.maxPrice) {
    const num = parseInt(spokenMatch[1]) * (spokenNumbers[spokenMatch[2].toLowerCase()] || 1);
    if (q.includes('under') || q.includes('below') || q.includes('less')) intent.maxPrice = num;
    else intent.maxPrice = num; // default to max
  }

  // Brand extraction with fuzzy matching
  for (const token of tokens) {
    const clean = token.replace(/[^a-z0-9&']/gi, '').toLowerCase();
    if (BRAND_ALIASES[clean]) { intent.brand = BRAND_ALIASES[clean]; break; }
    // Fuzzy brand match
    for (const [alias, brandName] of Object.entries(BRAND_ALIASES)) {
      if (fuzzyMatch(clean, alias, 1)) { intent.brand = brandName; break; }
    }
    if (intent.brand) break;
  }

  // Category extraction
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      if (q.includes(kw)) { intent.categories.push(cat); break; }
    }
  }

  // Color extraction
  for (const color of COLOR_KEYWORDS) {
    if (tokens.includes(color)) { intent.color = color; break; }
  }

  // Gift intent
  if (GIFT_KEYWORDS.some(g => q.includes(g))) {
    intent.isGift = true;
    for (const [recipient, cats] of Object.entries(GIFT_RECIPIENTS)) {
      if (q.includes(recipient)) { intent.giftRecipient = recipient; intent.giftCategories = cats; break; }
    }
  }

  // Remaining meaningful keywords
  const stopWords = new Set(['a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'and', 'or', 'is', 'are', 'was', 'show', 'me', 'find', 'get', 'i', 'want', 'need', 'looking', 'search', 'under', 'below', 'above', 'over', 'my', 'some', 'any', 'good', 'best', 'buy', 'shop', 'please', 'can', 'you', 'do', 'have', 'near']);
  intent.keywords = tokens.filter(t => t.length > 2 && !stopWords.has(t) && !COLOR_KEYWORDS.includes(t));

  return intent;
}

export function intelligentSearch(query) {
  if (!query || query.trim().length === 0) return { results: [], intent: null };
  const intent = extractSearchIntent(query);
  let results = [...products];

  // Brand filter
  if (intent.brand) {
    const brandProducts = results.filter(p => p.brand === intent.brand || p.store === intent.brand);
    if (brandProducts.length > 0) results = brandProducts;
  }

  // Category filter
  if (intent.categories.length > 0) {
    const catFiltered = results.filter(p =>
      intent.categories.some(c =>
        p.subcategory === c || p.category === c ||
        p.tags.some(t => fuzzyMatch(t, c.toLowerCase(), 1))
      )
    );
    if (catFiltered.length > 0) results = catFiltered;
  }

  // Color filter
  if (intent.color) {
    const colorFiltered = results.filter(p =>
      p.color && p.color.toLowerCase().includes(intent.color) ||
      p.name.toLowerCase().includes(intent.color) ||
      p.tags.some(t => t.includes(intent.color))
    );
    if (colorFiltered.length > 0) results = colorFiltered;
  }

  // Price filters
  if (intent.maxPrice) results = results.filter(p => p.price <= intent.maxPrice);
  if (intent.minPrice) results = results.filter(p => p.price >= intent.minPrice);

  // Gift filtering
  if (intent.isGift && intent.giftCategories) {
    const giftFiltered = results.filter(p =>
      intent.giftCategories.includes(p.category) && p.rating >= 4.3
    );
    if (giftFiltered.length > 0) results = giftFiltered;
  }

  // If no structured filters matched, fall back to keyword search
  if (results.length === products.length && intent.keywords.length > 0) {
    results = results.filter(p => {
      const searchable = `${p.name} ${p.brand} ${p.store} ${p.category} ${p.subcategory} ${p.description} ${p.tags.join(' ')}`.toLowerCase();
      return intent.keywords.some(kw => searchable.includes(kw) || fuzzyMatch(kw, p.name.toLowerCase().split(' ')[0], 2));
    });
  }

  // Score and sort
  results = results.map(p => {
    let score = 0;
    if (intent.brand && (p.brand === intent.brand || p.store === intent.brand)) score += 10;
    if (intent.categories.some(c => p.subcategory === c)) score += 5;
    if (intent.categories.some(c => p.category === c)) score += 3;
    if (intent.color && p.color?.toLowerCase().includes(intent.color)) score += 3;
    score += p.rating * 2;
    score += Math.min(p.reviews / 1000, 3);
    if (p.discount > 20) score += 1;
    return { ...p, _score: score };
  }).sort((a, b) => b._score - a._score);

  return { results, intent };
}

// Legacy search functions (backward compatible)
export const searchProducts = (query) => {
  const { results } = intelligentSearch(query);
  return results;
};

export const filterProducts = (filters) => {
  let result = [...products];
  if (filters.category) result = result.filter(p => p.category === filters.category);
  if (filters.store) result = result.filter(p => p.store === filters.store);
  if (filters.brand) result = result.filter(p => p.brand === filters.brand);
  if (filters.subcategory) result = result.filter(p => p.subcategory === filters.subcategory);
  if (filters.department) result = result.filter(p => p.department === filters.department);
  if (filters.minPrice) result = result.filter(p => p.price >= filters.minPrice);
  if (filters.maxPrice) result = result.filter(p => p.price <= filters.maxPrice);
  if (filters.rating) result = result.filter(p => p.rating >= filters.rating);
  if (filters.color) result = result.filter(p => p.color?.toLowerCase().includes(filters.color.toLowerCase()));
  if (filters.sort) {
    switch (filters.sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      case 'popular': result.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }
  }
  return result;
};

export const getRecommendations = (productId, history = []) => {
  const product = getProductById(productId);
  if (!product) return products.slice(0, 6);
  return products
    .filter(p => p.id !== product.id)
    .map(p => {
      let score = 0;
      if (p.category === product.category) score += 3;
      if (p.subcategory === product.subcategory) score += 4;
      if (p.storeId === product.storeId) score += 2;
      if (p.brand === product.brand) score += 3;
      if (Math.abs(p.price - product.price) < product.price * 0.3) score += 1;
      if (p.rating >= 4.5) score += 1;
      if (p.tags.some(t => product.tags.includes(t))) score += 2;
      if (history.includes(p.category)) score += 1;
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
};

// ── Smart Assistant ─────────────────────────
export const processAssistantQuery = (query) => {
  const q = query.toLowerCase();
  const { results, intent } = intelligentSearch(query);

  // Special intents
  if (q.includes('parking') || q.includes('park')) {
    const totalAvailable = parkingZones.reduce((sum, z) => sum + (z.total - z.occupied - z.reserved), 0);
    return { text: `There are ${totalAvailable} parking spots available right now.`, parking: parkingZones, type: 'parking' };
  }
  if (q.includes('map') || q.includes('navigate') || q.includes('where') || q.includes('find store') || q.includes('direction')) {
    return { text: 'Explore the interactive mall map to find stores and navigate.', type: 'navigate', link: '/mall-map' };
  }
  if (q.includes('offer') || q.includes('deal') || q.includes('sale') || q.includes('discount') || q.includes('coupon')) {
    let matchedOffers = offers;
    if (intent.brand) {
      matchedOffers = offers.filter(o => o.store === intent.brand || o.store.toLowerCase().includes(intent.brand.toLowerCase()));
    }
    if (matchedOffers.length === 0) matchedOffers = offers.slice(0, 6);
    return { text: `Here are the current offers${intent.brand ? ` at ${intent.brand}` : ''}:`, offers: matchedOffers, type: 'offers' };
  }
  if (q.includes('store') || q.includes('shop')) {
    let matchedStores = stores;
    if (intent.brand) {
      matchedStores = stores.filter(s => s.name === intent.brand || s.brand === intent.brand);
    }
    if (matchedStores.length === 0) matchedStores = stores;
    return { text: matchedStores.length > 0 ? 'Here are the stores I found:' : 'Here are all our stores:', stores: matchedStores, type: 'stores' };
  }

  // Gift intent
  if (intent.isGift) {
    return {
      text: `Here are some great gift ideas${intent.giftRecipient ? ` for your ${intent.giftRecipient}` : ''}${intent.maxPrice ? ` under ₹${intent.maxPrice.toLocaleString()}` : ''}:`,
      products: results.slice(0, 8), type: 'products'
    };
  }

  // Product results
  if (results.length > 0) {
    let text = `Here's what I found`;
    if (intent.brand) text += ` from ${intent.brand}`;
    if (intent.maxPrice) text += ` under ₹${intent.maxPrice.toLocaleString()}`;
    text += ':';
    return { text, products: results.slice(0, 8), type: 'products' };
  }

  return { text: `I couldn't find anything matching "${query}". Try a brand (Nike, Samsung), category (shoes, phone), or price range (under 5000).`, type: 'empty' };
};

// ── Format Helpers ──────────────────────────
export const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

export const generateOrderId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'SM-';
  for (let i = 0; i < 8; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
};

export const getProductImage = (product) => {
  if (product.image && product.image.startsWith('http')) return product.image;
  const colors = {
    'Electronics': ['#1a1a2e', '#16213e'],
    'Fashion': ['#e8345a', '#cc2b5e'],
    'Sports & Fashion': ['#111111', '#333333'],
    'Sports & Fitness': ['#0066CC', '#004494'],
    'Beauty': ['#000000', '#434343'],
    'Food & Beverage': ['#1e3932', '#00704A'],
    'Lifestyle': ['#6a0572', '#ab2587'],
    'Books & Stationery': ['#2c3e50', '#3498db'],
    'Home & Living': ['#a18cd1', '#fbc2eb'],
  };
  const c = colors[product.category] || ['#4F6BF6', '#818CF8'];
  return `linear-gradient(135deg, ${c[0]} 0%, ${c[1]} 100%)`;
};

// ── Data Validation ─────────────────────────
export function validateCatalog() {
  const errors = [];
  const productIds = new Set();
  const storeIds = new Set();

  // Validate stores
  stores.forEach(s => {
    if (storeIds.has(s.id)) errors.push(`Duplicate store ID: ${s.id}`);
    storeIds.add(s.id);
    if (!s.name || !s.department || !s.category) errors.push(`Store ${s.id} missing required fields`);
  });

  // Validate products
  products.forEach(p => {
    if (productIds.has(p.id)) errors.push(`Duplicate product ID: ${p.id}`);
    productIds.add(p.id);

    const store = getStoreById(p.storeId);
    if (!store) { errors.push(`Product "${p.name}" (${p.id}) has invalid storeId: ${p.storeId}`); return; }
    if (p.store !== store.name) errors.push(`Product "${p.name}" store name mismatch: "${p.store}" vs "${store.name}"`);
    if (p.department !== store.department) errors.push(`Product "${p.name}" department mismatch: "${p.department}" vs store "${store.name}" department "${store.department}"`);

    // Cross-category pollution check
    if (store.department === 'fashion' && ['Smartphones', 'Laptops', 'Audio', 'Tablets', 'TVs', 'Cameras'].includes(p.subcategory)) {
      errors.push(`❌ CRITICAL: Electronics product "${p.name}" found under fashion store "${store.name}"`);
    }
    if (store.department === 'electronics' && ['Jeans', 'Shirts', 'Dresses', 'Hoodies', 'T-Shirts'].includes(p.subcategory)) {
      errors.push(`❌ CRITICAL: Fashion product "${p.name}" found under electronics store "${store.name}"`);
    }
    if (store.department === 'beauty' && ['Smartphones', 'Laptops', 'Jeans', 'Shoes'].includes(p.subcategory)) {
      errors.push(`❌ CRITICAL: Wrong product "${p.name}" under beauty store "${store.name}"`);
    }

    // Required fields
    if (!p.name) errors.push(`Product ${p.id} missing name`);
    if (!p.brand) errors.push(`Product "${p.name}" missing brand`);
    if (!p.image) errors.push(`Product "${p.name}" missing image`);
    if (p.price <= 0) errors.push(`Product "${p.name}" has invalid price: ${p.price}`);
    if (p.rating < 0 || p.rating > 5) errors.push(`Product "${p.name}" has invalid rating: ${p.rating}`);
    if (p.stock < 0) errors.push(`Product "${p.name}" has invalid stock: ${p.stock}`);
    if (!p.category) errors.push(`Product "${p.name}" missing category`);
    if (!p.subcategory) errors.push(`Product "${p.name}" missing subcategory`);
  });

  return { valid: errors.length === 0, errors, summary: `${products.length} products, ${stores.length} stores, ${errors.length} errors` };
}

// ── Price History Engine ────────────────────
// Generates realistic 30-day price history for each product
// Uses seeded pseudo-random to ensure consistent data across renders

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getPriceHistory(productId, days = 30) {
  const product = getProductById(productId);
  if (!product) return [];

  const today = new Date();
  const history = [];
  const basePrice = product.originalPrice || product.price;
  const seed = productId * 137;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Create realistic price fluctuation pattern
    const dayFactor = seededRandom(seed + i * 31);
    const trendFactor = seededRandom(seed + i * 17);

    // Simulate: occasional sales, gradual changes, stable periods
    let priceMultiplier;
    if (dayFactor > 0.92) {
      // Flash sale (8% chance) — big drop
      priceMultiplier = 0.70 + trendFactor * 0.10;
    } else if (dayFactor > 0.80) {
      // Sale period (12% chance) — moderate drop
      priceMultiplier = 0.82 + trendFactor * 0.08;
    } else if (dayFactor > 0.60) {
      // Normal price with minor variance
      priceMultiplier = 0.95 + trendFactor * 0.10;
    } else {
      // Stable at listed price
      priceMultiplier = 0.97 + trendFactor * 0.06;
    }

    const dayPrice = Math.round(basePrice * priceMultiplier);
    const dateStr = date.toISOString().split('T')[0];

    history.push({
      date: dateStr,
      dateLabel: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      price: dayPrice,
    });
  }

  // Ensure today's price matches the current product price
  if (history.length > 0) {
    history[history.length - 1].price = product.price;
  }

  return history;
}

export function getPriceStats(productId) {
  const history = getPriceHistory(productId);
  if (history.length === 0) return null;

  const prices = history.map(h => h.price);
  const currentPrice = prices[prices.length - 1];
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const yesterdayPrice = prices.length > 1 ? prices[prices.length - 2] : currentPrice;
  const weekAgoPrice = prices.length > 7 ? prices[prices.length - 8] : currentPrice;

  const dailyChange = currentPrice - yesterdayPrice;
  const weeklyChange = currentPrice - weekAgoPrice;
  const dailyChangePercent = yesterdayPrice > 0 ? ((dailyChange / yesterdayPrice) * 100).toFixed(1) : 0;
  const weeklyChangePercent = weekAgoPrice > 0 ? ((weeklyChange / weekAgoPrice) * 100).toFixed(1) : 0;

  const isAtLowest = currentPrice <= lowestPrice;
  const isAtHighest = currentPrice >= highestPrice;
  const savingsFromHighest = highestPrice - currentPrice;

  // Trend analysis
  const recentPrices = prices.slice(-7);
  const isDropping = recentPrices[recentPrices.length - 1] < recentPrices[0];
  const isRising = recentPrices[recentPrices.length - 1] > recentPrices[0];
  const trend = isDropping ? 'dropping' : isRising ? 'rising' : 'stable';

  return {
    currentPrice,
    lowestPrice,
    highestPrice,
    avgPrice,
    dailyChange,
    weeklyChange,
    dailyChangePercent: Number(dailyChangePercent),
    weeklyChangePercent: Number(weeklyChangePercent),
    isAtLowest,
    isAtHighest,
    savingsFromHighest,
    trend,
    history,
  };
}

// ── Cross-Store Price Comparison ────────────
// Finds same/similar products across different stores
// and generates realistic competitor pricing

export function getCrossStoreComparison(productId) {
  const product = getProductById(productId);
  if (!product) return [];

  // Find similar products in different stores (same subcategory or similar name)
  const similarProducts = products.filter(p =>
    p.id !== product.id &&
    p.storeId !== product.storeId &&
    (p.subcategory === product.subcategory || p.category === product.category)
  );

  // Build comparison: current store + up to 3 competitors
  const comparisons = [
    {
      storeId: product.storeId,
      storeName: product.store,
      storeLogo: stores.find(s => s.id === product.storeId)?.logo || product.store,
      productName: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      inStock: product.stock > 0,
      delivery: 'In-Store Pickup',
      isCurrent: true,
      isBest: false,
    }
  ];

  // Add competitor stores with simulated prices
  const competitorStores = stores.filter(s =>
    s.id !== product.storeId &&
    (s.category === product.category || s.department === product.department)
  ).slice(0, 3);

  competitorStores.forEach((store, idx) => {
    const seed = productId * 100 + store.id;
    const priceFactor = 0.85 + seededRandom(seed) * 0.35; // 85% to 120% of original price
    const competitorPrice = Math.round(product.price * priceFactor);
    const hasStock = seededRandom(seed + 1) > 0.2; // 80% chance in stock

    comparisons.push({
      storeId: store.id,
      storeName: store.name,
      storeLogo: store.logo || store.name,
      productName: product.name,
      price: competitorPrice,
      originalPrice: Math.round(competitorPrice * (1 + seededRandom(seed + 2) * 0.15)),
      rating: Math.round((3.5 + seededRandom(seed + 3) * 1.5) * 10) / 10,
      inStock: hasStock,
      delivery: hasStock ? (seededRandom(seed + 4) > 0.5 ? 'In-Store Pickup' : 'Home Delivery') : 'Out of Stock',
      isCurrent: false,
      isBest: false,
    });
  });

  // Mark the best price
  const sortedByPrice = [...comparisons].filter(c => c.inStock).sort((a, b) => a.price - b.price);
  if (sortedByPrice.length > 0) {
    const bestId = sortedByPrice[0].storeId;
    comparisons.forEach(c => { c.isBest = c.storeId === bestId; });
  }

  return comparisons;
}

// Get all products with price comparison data (for comparison page)
export function getAllComparisons() {
  return products.slice(0, 20).map(p => ({
    product: p,
    comparisons: getCrossStoreComparison(p.id),
    stats: getPriceStats(p.id),
  }));
}
