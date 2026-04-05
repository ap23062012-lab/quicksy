# Backend Models & Database Documentation

## Overview
This document provides detailed information about the database schema, models, and relationships for QUICKSY Backend.

## Technology Stack
- **ORM:** Sequelize
- **Database:** PostgreSQL
- **Authentication:** JWT

## Models Overview

### 1. User Model
Core user model for all user types (customer, seller, courier, admin)

**Key Fields:**
- `id` - UUID primary key
- `email` - Unique email address
- `password_hash` - Bcrypt hashed password
- `user_type` - ENUM: customer, seller, courier, admin
- `is_verified` - Boolean for email verification
- `is_active` - Account activation status

**Methods:**
- `comparePassword(password)` - Compare plain password with hash

### 2. CustomerProfile
Extended profile for customer users

**Key Fields:**
- `user_id` - Foreign key to User
- `default_address` - Primary delivery address
- `saved_addresses` - JSON array of saved addresses
- `loyalty_points` - Accumulated points
- `preferred_language` - Language preference

### 3. SellerProfile
Shop/seller information

**Key Fields:**
- `user_id` - Foreign key to User
- `shop_name` - Name of the shop
- `category` - Product category
- `dealership_status` - ENUM: pending, approved, rejected, suspended
- `commission_percentage` - Shop's commission rate
- `monthly_revenue` - Total monthly sales
- `average_rating` - Shop rating (1-5)

### 4. CourierProfile
Courier/delivery partner information

**Key Fields:**
- `user_id` - Foreign key to User
- `vehicle_type` - ENUM: bike, car, van
- `current_location` - JSON {lat, lng}
- `max_capacity` - Maximum items can carry
- `current_load` - Currently carrying items
- `is_available` - Availability status

### 5. Product
Products sold by sellers

**Key Fields:**
- `seller_id` - Foreign key to SellerProfile
- `name` - Product name
- `category` - Product category
- `price` - Product price
- `stock_quantity` - Available stock
- `sku` - Unique product code
- `images` - JSON array of image URLs
- `specifications` - JSON product specs
- `is_returnable` - Return eligibility
- `return_window_days` - Return period

### 6. Order
Customer orders

**Key Fields:**
- `order_number` - Unique order identifier
- `customer_id` - Foreign key to Customer
- `seller_id` - Foreign key to Seller
- `courier_id` - Foreign key to Courier
- `status` - ENUM: pending, confirmed, processing, picked_up, in_transit, delivered, cancelled, returned
- `delivery_address` - Delivery location
- `total_amount` - Total order amount
- `commission_amount` - Platform commission
- `delivery_charge` - Delivery cost
- `discount_amount` - Applied discount
- `payment_status` - ENUM: pending, completed, failed, refunded

### 7. OrderItem
Individual items in an order

**Key Fields:**
- `order_id` - Foreign key to Order
- `product_id` - Foreign key to Product
- `quantity` - Number of items
- `unit_price` - Price per item
- `total_price` - Quantity × unit_price

### 8. Payment
Payment transactions

**Key Fields:**
- `order_id` - Foreign key to Order
- `amount` - Payment amount
- `transaction_id` - Unique transaction ID
- `status` - ENUM: initiated, completed, failed, pending
- `payment_gateway` - Payment provider (razorpay, stripe, etc.)

### 9. DealOffer
Promotions and discounts

**Key Fields:**
- `seller_id` - Foreign key to Seller (null for platform deals)
- `product_id` - Foreign key to Product (null for seller-wide deals)
- `title` - Deal title
- `discount_type` - ENUM: percentage, fixed_amount
- `discount_value` - Discount amount
- `start_date` - Deal start date
- `end_date` - Deal end date
- `max_uses` - Usage limit

### 10. Review
Product reviews and ratings

**Key Fields:**
- `product_id` - Foreign key to Product
- `order_id` - Foreign key to Order
- `customer_id` - Foreign key to Customer
- `rating` - Review rating (1-5)
- `title` - Review title
- `content` - Review content
- `verified_purchase` - Is verified purchase

### 11. Return
Product return requests

**Key Fields:**
- `order_id` - Foreign key to Order
- `customer_id` - Foreign key to Customer
- `reason` - Return reason
- `status` - ENUM: initiated, approved, rejected, picked_up, received, refunded
- `refund_amount` - Refund amount
- `initiated_date` - Return start date
- `pickup_date` - Return pickup date
- `refund_date` - Refund processed date

### 12. Notification
User notifications

**Key Fields:**
- `user_id` - Foreign key to User
- `type` - Notification type
- `title` - Notification title
- `message` - Notification message
- `is_read` - Read status

### 13. Transaction
Earnings/financial transactions for sellers and couriers

**Key Fields:**
- `user_id` - Foreign key to User
- `type` - ENUM: credit, debit
- `amount` - Transaction amount
- `order_id` - Related order
- `balance_before` - Previous balance
- `balance_after` - New balance

## Relationships

### User Relationships
```
User (1) ──── (1) CustomerProfile
User (1) ──── (1) SellerProfile
User (1) ──── (1) CourierProfile
User (1) ──── (N) Notification
User (1) ──── (N) Transaction
```

### Product & Order Relationships
```
SellerProfile (1) ──── (N) Product
SellerProfile (1) ──── (N) Order
SellerProfile (1) ──── (N) DealOffer

Product (1) ──── (N) OrderItem
Product (1) ──── (N) Review
Product (1) ──── (N) DealOffer

Order (1) ──── (N) OrderItem
Order (1) ──── (1) Payment
Order (1) ──── (N) Review
Order (1) ──── (N) Return
Order (N) ──── (1) Customer
Order (N) ──── (1) Seller
Order (N) ──── (1) Courier
```

## Database Indexes

Indexes are created on frequently queried columns:
- `users.email` - For login queries
- `users.user_type` - For role-based queries
- `products.seller_id` - For seller products
- `products.category` - For category browsing
- `orders.customer_id` - For customer orders
- `orders.seller_id` - For seller orders
- `orders.courier_id` - For courier orders
- `orders.status` - For order status filtering
- `orders.created_at` - For date range queries

## Enum Types

PostgreSQL ENUM types are defined for:
- `user_type_enum` - customer, seller, courier, admin
- `dealership_status_enum` - pending, approved, rejected, suspended
- `order_status_enum` - pending, confirmed, processing, picked_up, in_transit, delivered, cancelled, returned
- `payment_status_enum` - pending, completed, failed, refunded
- `return_status_enum` - initiated, approved, rejected, picked_up, received, refunded

## Best Practices

### Creating Records
```javascript
const user = await User.create({
  email: 'user@example.com',
  password_hash: 'password123', // Will be hashed automatically
  first_name: 'John',
  user_type: 'customer'
});
```

### Querying with Associations
```javascript
const order = await Order.findByPk(orderId, {
  include: [
    { association: 'customer', attributes: ['id', 'first_name'] },
    { association: 'items', include: ['product'] },
    { association: 'payment' }
  ]
});
```

### Transactions
```javascript
const transaction = await sequelize.transaction();
try {
  // Multiple operations
  await Order.create({ ... }, { transaction });
  await Payment.create({ ... }, { transaction });
  await transaction.commit();
} catch (error) {
  await transaction.rollback();
}
```

## Data Validation

Sequelize handles validation through model definitions:
- Email format validation
- UUID format validation
- Enum value validation
- Numeric range validation
- Unique constraint validation

## Security Notes

1. **Passwords** - Automatically hashed using bcrypt
2. **Data Types** - Sensitive fields (bank accounts) stored as JSON
3. **Soft Deletes** - `deleted_at` field for data recovery
4. **Timestamps** - `created_at`, `updated_at` for audit trails

---

**For more information:**
- See [DATABASE.md](../../docs/DATABASE.md) for complete schema
- See [API.md](../../docs/API.md) for API usage
