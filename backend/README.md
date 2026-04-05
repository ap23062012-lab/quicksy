# QUICKSY Backend API

Node.js + Express backend for the QUICKSY multi-platform delivery app.

## Setup

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/quicksy
DATABASE_POOL_SIZE=10

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
```

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/      # Request handlers
├── middleware/       # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
└── index.js         # Entry point
```

## API Endpoints (WIP)

- `GET /api/v1/health` - Health check
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/products` - List products
- `POST /api/v1/products` - Create product (sellers)
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders/:id` - Get order details

## Running

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Testing

```bash
npm test
```

---

**More documentation:** See `docs/` folder
