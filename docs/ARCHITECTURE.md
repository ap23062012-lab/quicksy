# QUICKSY - System Architecture

## High-Level Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Android App   │     │    iOS App      │     │   Web App       │
│  (Kotlin)       │────▶│   (Swift)       │◀────│  (Next.js)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         │                      │                       │
         └──────────────────────┼───────────────────────┘
                                │ REST/WebSocket API
                                ▼
                    ┌───────────────────────┐
                    │  Backend API Server   │
                    │  (Node.js/Express)    │
                    └───────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
                ▼               ▼               ▼
            ┌────────┐    ┌────────┐    ┌────────────────┐
            │PostgreSQL   │ Redis  │    │ External APIs  │
            │(Database)   │(Cache) │    │(Payment, FCM)  │
            └────────┘    └────────┘    └────────────────┘
```

## Core Components

### 1. Backend (Node.js/Express)
**Responsibilities:**
- REST API endpoints for all platforms
- Authentication & Authorization
- Business logic and validations
- Database operations
- Real-time notifications (WebSocket)
- Payment processing integration
- Courier integration

**Database Schema Layers:**
- Users (Customers, Sellers, Couriers, Admin)
- Products & Inventory
- Orders & Order Items
- Payments & Transactions
- Deals & Offers
- Courier Assignments
- Returns & Refunds

### 2. Android App (Kotlin)
**User Types:**
- Customer: Browse, search, checkout, track orders
- Seller: Manage products, track sales, create deals
- Courier: Accept deliveries, update status, earn

**Key Screens:**
- Authentication (Login/Register)
- Product Catalog
- Order Management
- Profile & Settings
- Notifications

### 3. iOS App (Swift)
**Feature Parity with Android**
- Same user types and functionality
- Native iOS UI with SwiftUI
- Optimized for iOS ecosystem

### 4. Web App (Next.js)
**Primary Users:**
- Sellers (Desktop dashboard)
- Admin (Backend management)

**Admin Features:**
- Seller verification
- Courier management
- Commission tracking
- Platform analytics
- Dispute resolution

## Data Flow

### Order Creation Flow
```
Customer App
    ↓
  Cart → Checkout → Payment Gateway
    ↓
Backend: Validate → Create Order → Assign Courier
    ↓
Notification → Seller App + Courier App
```

### Order Delivery Flow
```
Courier App
    ↓
Pickup Order → Route Optimization → Real-time Tracking
    ↓
Backend: Update Status → Notifications
    ↓
Customer + Seller + Courier Updated
```

## API Endpoints Structure

```
/api/v1/
├── auth/
│   ├── register
│   ├── login
│   └── refresh-token
├── products/
│   ├── GET /search
│   ├── GET /:id
│   └── POST / (sellers only)
├── orders/
│   ├── GET /
│   ├── POST /
│   ├── GET /:id
│   └── PUT /:id/status
├── sellers/
│   ├── GET /profile
│   ├── PUT /profile
│   └── GET /analytics
├── couriers/
│   ├── GET /available-orders
│   ├── POST /:orderId/accept
│   └── PUT /:orderId/status
└── payments/
    ├── POST /initiate
    └── POST /verify
```

## Authentication & Security

- **JWT Tokens** for API authentication
- **Role-Based Access Control (RBAC)** for different user types
- **HTTPS/TLS** for all communications
- **Password hashing** with bcrypt
- **API rate limiting** for DDoS protection
- **Firebase Cloud Messaging** for push notifications

## Scalability Considerations

1. **Horizontal Scaling:** Multiple backend instances behind load balancer
2. **Caching:** Redis for frequently accessed data (products, user profiles)
3. **Database Optimization:** Indexed queries, connection pooling
4. **CDN:** For static assets (product images)
5. **Message Queue:** For async operations (order processing, notifications)
6. **Microservices (Future):** Separate services for payments, notifications, courier management

## Deployment Strategy

- **Backend:** Docker containers on cloud (AWS/GCP/Azure)
- **Android:** Google Play Store
- **iOS:** Apple App Store
- **Web:** Vercel or similar serverless platform

---

**Next:** See `DATABASE.md` for detailed schema
