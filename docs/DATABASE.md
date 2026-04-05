# QUICKSY - Database Schema

## Overview
PostgreSQL with normalized design for scalability and data integrity.

## Core Tables

### 1. Users Table
```sql
users
├── id (UUID, PK)
├── email (VARCHAR, UNIQUE)
├── password_hash (VARCHAR)
├── first_name (VARCHAR)
├── last_name (VARCHAR)
├── phone (VARCHAR)
├── profile_image_url (VARCHAR)
├── user_type (ENUM: 'customer', 'seller', 'courier', 'admin')
├── is_active (BOOLEAN)
├── is_verified (BOOLEAN)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── deleted_at (TIMESTAMP, soft delete)
```

### 2. Customer Profile
```sql
customer_profiles
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── default_address (TEXT)
├── saved_addresses (JSON)
├── default_payment_method (VARCHAR)
├── preferred_language (VARCHAR)
├── loyalty_points (INTEGER)
└── last_order_date (TIMESTAMP)
```

### 3. Seller Profile
```sql
seller_profiles
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── shop_name (VARCHAR)
├── shop_description (TEXT)
├── shop_image_url (VARCHAR)
├── category (VARCHAR)
├── address (TEXT)
├── city (VARCHAR)
├── state (VARCHAR)
├── pincode (VARCHAR)
├── phone (VARCHAR)
├── bank_account (JSON, encrypted)
├── dealership_status (ENUM: 'pending', 'approved', 'rejected', 'suspended')
├── commission_percentage (DECIMAL)
├── monthly_revenue (DECIMAL)
├── total_orders (INTEGER)
├── average_rating (DECIMAL)
├── is_verified (BOOLEAN)
├── verification_date (TIMESTAMP)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### 4. Courier Profile
```sql
courier_profiles
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── company_name (VARCHAR)
├── vehicle_type (ENUM: 'bike', 'car', 'van')
├── vehicle_number (VARCHAR)
├── license_number (VARCHAR)
├── address (TEXT)
├── service_area (POLYGON)
├── current_location (POINT)
├── max_capacity (INTEGER)
├── current_load (INTEGER)
├── is_available (BOOLEAN)
├── average_rating (DECIMAL)
├── total_deliveries (INTEGER)
├── total_earnings (DECIMAL)
├── bank_account (JSON, encrypted)
├── is_verified (BOOLEAN)
├── verification_date (TIMESTAMP)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### 5. Products
```sql
products
├── id (UUID, PK)
├── seller_id (UUID, FK → seller_profiles)
├── name (VARCHAR)
├── description (TEXT)
├── category (VARCHAR)
├── subcategory (VARCHAR)
├── price (DECIMAL)
├── stock_quantity (INTEGER)
├── images (JSON array of URLs)
├── specifications (JSON)
├── weight (DECIMAL)
├── dimensions (JSON: height, width, depth)
├── sku (VARCHAR, UNIQUE)
├── is_returnable (BOOLEAN)
├── return_window_days (INTEGER)
├── is_active (BOOLEAN)
├── average_rating (DECIMAL)
├── total_reviews (INTEGER)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── deleted_at (TIMESTAMP)
```

### 6. Orders
```sql
orders
├── id (UUID, PK)
├── order_number (VARCHAR, UNIQUE)
├── customer_id (UUID, FK → customers)
├── seller_id (UUID, FK → sellers)
├── courier_id (UUID, FK → couriers, nullable)
├── status (ENUM: 'pending', 'confirmed', 'processing', 'picked_up', 'in_transit', 'delivered', 'cancelled', 'returned')
├── delivery_address (TEXT)
├── delivery_coordinates (POINT)
├── customer_notes (TEXT)
├── total_amount (DECIMAL)
├── commission_amount (DECIMAL)
├── delivery_charge (DECIMAL)
├── discount_amount (DECIMAL)
├── payment_method (VARCHAR)
├── payment_status (ENUM: 'pending', 'completed', 'failed', 'refunded')
├── tracking_number (VARCHAR)
├── estimated_delivery_date (DATE)
├── actual_delivery_date (DATE)
├── is_returnable (BOOLEAN)
├── return_deadline (DATE)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── deleted_at (TIMESTAMP)
```

### 7. Order Items
```sql
order_items
├── id (UUID, PK)
├── order_id (UUID, FK → orders)
├── product_id (UUID, FK → products)
├── quantity (INTEGER)
├── unit_price (DECIMAL)
├── total_price (DECIMAL)
└── created_at (TIMESTAMP)
```

### 8. Deals & Offers
```sql
deals_offers
├── id (UUID, PK)
├── seller_id (UUID, FK → sellers, nullable for platform-wide)
├── product_id (UUID, FK → products, nullable for seller-wide)
├── title (VARCHAR)
├── description (TEXT)
├── discount_type (ENUM: 'percentage', 'fixed_amount')
├── discount_value (DECIMAL)
├── start_date (TIMESTAMP)
├── end_date (TIMESTAMP)
├── max_uses (INTEGER)
├── current_uses (INTEGER)
├── min_purchase_amount (DECIMAL)
├── banner_image (VARCHAR)
├── is_active (BOOLEAN)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### 9. Payments
```sql
payments
├── id (UUID, PK)
├── order_id (UUID, FK → orders)
├── amount (DECIMAL)
├── payment_method (VARCHAR)
├── transaction_id (VARCHAR, UNIQUE)
├── status (ENUM: 'initiated', 'completed', 'failed', 'pending')
├── payment_gateway (VARCHAR)
├── metadata (JSON)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### 10. Returns
```sql
returns
├── id (UUID, PK)
├── order_id (UUID, FK → orders)
├── order_item_id (UUID, FK → order_items, nullable)
├── customer_id (UUID, FK → customers)
├── reason (TEXT)
├── status (ENUM: 'initiated', 'approved', 'rejected', 'picked_up', 'received', 'refunded')
├── refund_amount (DECIMAL)
├── initiated_date (TIMESTAMP)
├── approved_date (TIMESTAMP)
├── pickup_date (TIMESTAMP)
├── received_date (TIMESTAMP)
├── refund_date (TIMESTAMP)
└── notes (TEXT)
```

### 11. Reviews & Ratings
```sql
reviews
├── id (UUID, PK)
├── product_id (UUID, FK → products)
├── order_id (UUID, FK → orders)
├── customer_id (UUID, FK → customers)
├── rating (INTEGER: 1-5)
├── title (VARCHAR)
├── content (TEXT)
├── verified_purchase (BOOLEAN)
├── helpful_count (INTEGER)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### 12. Notifications
```sql
notifications
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── type (VARCHAR)
├── title (VARCHAR)
├── message (TEXT)
├── related_order_id (UUID, nullable)
├── is_read (BOOLEAN)
├── created_at (TIMESTAMP)
└── expires_at (TIMESTAMP)
```

### 13. Transactions (Earnings)
```sql
transactions
├── id (UUID, PK)
├── user_id (UUID, FK → users)
├── type (ENUM: 'credit', 'debit')
├── amount (DECIMAL)
├── order_id (UUID, FK → orders, nullable)
├── description (VARCHAR)
├── balance_before (DECIMAL)
├── balance_after (DECIMAL)
├── created_at (TIMESTAMP)
```

## Indexes

```sql
-- Performance optimization
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_products_seller_id ON products(seller_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_seller_id ON orders(seller_id);
CREATE INDEX idx_orders_courier_id ON orders(courier_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
```

## Enum Types

```sql
CREATE TYPE user_type_enum AS ENUM ('customer', 'seller', 'courier', 'admin');
CREATE TYPE dealership_status_enum AS ENUM ('pending', 'approved', 'rejected', 'suspended');
CREATE TYPE order_status_enum AS ENUM ('pending', 'confirmed', 'processing', 'picked_up', 'in_transit', 'delivered', 'cancelled', 'returned');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE return_status_enum AS ENUM ('initiated', 'approved', 'rejected', 'picked_up', 'received', 'refunded');
```

---

**Relationships Diagram:**
```
Users --1:many--> Customer_Profiles
Users --1:many--> Seller_Profiles
Users --1:many--> Courier_Profiles
Seller_Profiles --1:many--> Products
Products --1:many--> Order_Items
Orders --many:1--> Seller_Profiles
Orders --many:1--> Customers
Orders --many:1--> Couriers
Orders --1:many--> Returns
Order_Items --many:1--> Products
```
