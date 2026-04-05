# QUICKSY API Documentation

## Base URL
```
Development: http://localhost:5000/api/v1
Production: https://api.quicksy.com/api/v1
```

## Authentication

All authenticated endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
Body:
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "+91XXXXXXXXXX",
  "user_type": "customer" | "seller" | "courier"
}
Response: { token, user }
```

#### Login
```
POST /auth/login
Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}
Response: { token, user, refresh_token }
```

#### Refresh Token
```
POST /auth/refresh
Body:
{
  "refresh_token": "token"
}
Response: { token }
```

### Products

#### List Products
```
GET /products?category=food&page=1&limit=20&search=milk
Response: { products: [], pagination: { page, limit, total } }
```

#### Get Product Details
```
GET /products/:id
Response: { product: { ...details, reviews: [] } }
```

#### Create Product (Seller)
```
POST /products
Headers: Authorization: Bearer <token>
Body:
{
  "name": "Product Name",
  "category": "food",
  "price": 299.99,
  "stock_quantity": 100,
  "description": "Product description",
  "images": ["url1", "url2"],
  "weight": 0.5,
  "is_returnable": true,
  "return_window_days": 7
}
Response: { product }
```

#### Update Product (Seller)
```
PUT /products/:id
Headers: Authorization: Bearer <token>
Body: { ...updated fields }
Response: { product }
```

#### Delete Product (Seller)
```
DELETE /products/:id
Headers: Authorization: Bearer <token>
Response: { success: true }
```

### Orders

#### Create Order
```
POST /orders
Headers: Authorization: Bearer <token>
Body:
{
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2
    }
  ],
  "delivery_address": "Full address",
  "customer_notes": "Special instructions",
  "payment_method": "credit_card"
}
Response: { order: { id, order_number, status, total_amount } }
```

#### Get Customer Orders
```
GET /orders?status=delivered&page=1&limit=10
Headers: Authorization: Bearer <token>
Response: { orders: [], pagination: {} }
```

#### Get Order Details
```
GET /orders/:id
Headers: Authorization: Bearer <token>
Response: { order: { ...details, items: [], tracking: {} } }
```

#### Update Order Status (Courier)
```
PUT /orders/:id/status
Headers: Authorization: Bearer <token>
Body:
{
  "status": "delivered",
  "location": { "lat": 12.34, "lng": 56.78 },
  "notes": "Delivered successfully"
}
Response: { order }
```

### Seller Dashboard

#### Get Seller Profile
```
GET /sellers/profile
Headers: Authorization: Bearer <token>
Response: { seller: { shop_name, category, address, ...stats } }
```

#### Get Seller Analytics
```
GET /sellers/analytics?period=month
Headers: Authorization: Bearer <token>
Response: {
  total_orders: 150,
  total_revenue: 45000,
  average_rating: 4.8,
  pending_orders: 5,
  top_products: [],
  sales_trend: []
}
```

#### Create Deal/Offer
```
POST /sellers/deals
Headers: Authorization: Bearer <token>
Body:
{
  "product_id": "uuid",
  "title": "Seasonal Sale",
  "discount_type": "percentage",
  "discount_value": 20,
  "start_date": "2024-03-25T00:00:00Z",
  "end_date": "2024-03-31T23:59:59Z",
  "max_uses": 100
}
Response: { deal }
```

### Courier Operations

#### Get Available Orders
```
GET /couriers/available-orders?location=12.34,56.78
Headers: Authorization: Bearer <token>
Response: { orders: [] }
```

#### Accept Order
```
POST /couriers/orders/:id/accept
Headers: Authorization: Bearer <token>
Response: { order }
```

### Payments

#### Initiate Payment
```
POST /payments/initiate
Headers: Authorization: Bearer <token>
Body:
{
  "order_id": "uuid",
  "amount": 299.99,
  "payment_method": "card"
}
Response: { payment_session_id, payment_url }
```

#### Verify Payment
```
POST /payments/verify
Headers: Authorization: Bearer <token>
Body:
{
  "order_id": "uuid",
  "transaction_id": "txn_123",
  "signature": "signature"
}
Response: { payment: { status, amount } }
```

### Returns

#### Initiate Return
```
POST /orders/:id/return
Headers: Authorization: Bearer <token>
Body:
{
  "reason": "Product quality issue",
  "order_item_ids": ["uuid1", "uuid2"]
}
Response: { return: { id, status, refund_amount } }
```

### Reviews

#### Post Review
```
POST /products/:id/reviews
Headers: Authorization: Bearer <token>
Body:
{
  "order_id": "uuid",
  "rating": 4,
  "title": "Great product",
  "content": "Very satisfied with the purchase"
}
Response: { review }
```

#### Get Product Reviews
```
GET /products/:id/reviews?page=1&limit=10
Response: { reviews: [], pagination: {} }
```

## HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Missing/invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `422 Unprocessable Entity` - Validation error
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Pagination

Endpoints supporting pagination return:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

**More details:** Check individual endpoint documentation in code
