# QUICKSY Development Setup Guide

Complete guide to set up and run QUICKSY on your local machine.

## Prerequisites

### System Requirements
- Windows 10/11 or macOS 11+ or Linux (Ubuntu 20.04+)
- 8GB RAM minimum, 16GB recommended
- 20GB free disk space

### Required Software
- Git
- Node.js 16+ and npm
- PostgreSQL 13+
- Redis
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

## Backend Setup

### 1. Install Node.js Dependencies

```bash
cd backend
npm install
```

### 2. Set Up PostgreSQL Database

**Windows (using PostgreSQL installer):**
```bash
# Install PostgreSQL from https://www.postgresql.org/download/windows/
createdb quicksy
```

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
createdb quicksy
```

**Linux (Ubuntu):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres createdb quicksy
```

### 3. Set Up Redis

**Windows (using WSL):**
```bash
wsl
sudo apt-get install redis-server
redis-server
```

**macOS (using Homebrew):**
```bash
brew install redis
brew services start redis
```

**Linux (Ubuntu):**
```bash
sudo apt-get install redis-server
sudo service redis-server start
```

### 4. Environment Configuration

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your configuration:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/quicksy
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
```

### 5. Run Database Migrations

```bash
# (Database migration scripts to be created)
npm run migrate
```

### 6. Start Backend Server

```bash
npm run dev
```

Backend should now run on `http://localhost:5000`

## Android Setup

### 1. Clone Repository and Open in Android Studio

```bash
cd android
# Open in Android Studio or use command line
./gradlew assembleDebug
```

### 2. Configure SDK

- Open Android Studio
- Go to: Tools → SDK Manager
- Install:
  - Android SDK Platform 34
  - Android SDK Build-Tools 34.0.0
  - Android Emulator
  - Google Play Services

### 3. Configure Backend URL

Create/edit `android/local.properties`:
```
sdk.dir=/path/to/android/sdk
api.base_url=http://10.0.2.2:5000/api/v1
```

### 4. Run App

```bash
./gradlew installDebug
```

Or use Android Studio: Run → Run 'app'

## iOS Setup

### 1. Clone Repository and Setup

```bash
cd ios
pod install
open Quicksy.xcworkspace
```

### 2. Configure Backend URL

In Xcode, go to:
- Build Settings → Search "Base URL"
- Set API base URL to `http://localhost:5000/api/v1`

### 3. Run App

```bash
# Using Xcode
open Quicksy.xcworkspace
# Then press Cmd+R to run
```

Or from terminal:
```bash
xcodebuild -scheme Quicksy -configuration Debug -derivedDataPath build
```

## Web Setup

### 1. Install Dependencies

```bash
cd web
npm install
```

### 2. Environment Configuration

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_ENV=development
```

### 3. Run Development Server

```bash
npm run dev
```

Web app runs on `http://localhost:3000`

## Full Stack Testing

### Test All Services Together

1. **Terminal 1 - Backend:**
```bash
cd backend && npm run dev
```

2. **Terminal 2 - Web:**
```bash
cd web && npm run dev
```

3. **Android Emulator/Device:**
```bash
cd android && ./gradlew installDebug
```

4. **iOS Simulator:**
```bash
cd ios && xcodebuild -scheme Quicksy
```

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
# Windows: netstat -ano | findstr :5000
# Linux/Mac: lsof -i :5000

# Kill process and try again
npm run dev
```

### PostgreSQL Connection Error
```bash
# Verify PostgreSQL is running
# Windows: Get-Service postgresql

# Check connection string in .env
# Ensure database exists
createdb quicksy
```

### Android Build Fails
```bash
# Clean and rebuild
./gradlew clean
./gradlew build

# Clear Android Studio cache
# File → Invalidate Caches → Clear files and restart
```

### iOS Pod Issues
```bash
# Remove and reinstall pods
rm -rf Pods
rm Podfile.lock
pod install
```

### CORS Issues
Ensure backend CORS is enabled for:
- `http://localhost:3000` (web)
- `http://10.0.2.2:5000` (Android emulator)
- `http://localhost:5000` (iOS simulator)

## Database Seeding

```bash
cd backend
npm run seed
```

This will populate:
- Sample sellers
- Sample products
- Sample customers
- Test deals/offers

## Running Tests

### Backend
```bash
cd backend
npm test
npm run test:watch
```

### Web
```bash
cd web
npm test
npm run test:watch
```

### Android
```bash
cd android
./gradlew test
./gradlew connectedAndroidTest
```

### iOS
```bash
cd ios
xcodebuild test -scheme Quicksy
```

## IDE Setup

### VS Code (Backend/Web)
Recommended extensions:
- ESLint
- Prettier
- Thunder Client (API testing)
- REST Client
- SQLTools (database management)

### Android Studio
- Kotlin plugin (built-in)
- Compose UI debugging tools

### Xcode
- SwiftFormat extension
- SwiftLint

## Next Steps

1. Review [ARCHITECTURE.md](ARCHITECTURE.md) for system design
2. Review [DATABASE.md](DATABASE.md) for schema details
3. Review [API.md](API.md) for API specifications
4. Start implementing core features
5. Set up CI/CD pipeline (GitHub Actions)

## Documentation

- [Architecture](ARCHITECTURE.md) - System design and component overview
- [Database](DATABASE.md) - Schema and data model
- [API](API.md) - REST API documentation
- [Security](SECURITY.md) - Security guidelines (coming soon)

---

**Happy coding! 🚀**
