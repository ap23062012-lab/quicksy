`   1# QUICKSY Android App

Kotlin-based Android application with Jetpack Compose UI.

## Tech Stack
- **Language:** Kotlin
- **UI:** Jetpack Compose
- **Architecture:** MVVM + Repository Pattern
- **Networking:** Retrofit + OkHttp
- **Local Storage:** Room Database
- **Dependency Injection:** Hilt
- **Async:** Coroutines + Flow

## Project Setup

### Prerequisites
- Android Studio Flamingo or later
- Kotlin 1.8+
- Min API Level: 24
- Target API Level: 34

### Build

```bash
./gradlew build
./gradlew installDebug
```

## Project Structure (WIP)

```
app/src/main/
├── java/com/quicksy/
│   ├── di/              # Dependency injection
│   ├── data/            # Data layer (API, DB, repositories)
│   ├── domain/          # Business logic
│   ├── presentation/    # UI layer (screens, components)
│   └── utils/           # Utilities
└── res/
    ├── drawable/
    ├── layout/
    ├── values/
    └── mipmap/
```

## Features

### Customer App
- [ ] User authentication
- [ ] Product browsing & search
- [ ] Shopping cart
- [ ] Checkout & payments
- [ ] Order tracking
- [ ] Order history
- [ ] Reviews & ratings
- [ ] Push notifications

### Seller App
- [ ] Shop management
- [ ] Product listing
- [ ] Order management
- [ ] Sales analytics
- [ ] Deal creation

### Courier App
- [ ] Order pickup
- [ ] Route optimization
- [ ] Delivery tracking
- [ ] Earnings dashboard

## Running

```bash
# Debug
./gradlew installDebug

# Release
./gradlew assembleRelease
```

---

**More documentation:** See root `docs/` folder
123 x 12

