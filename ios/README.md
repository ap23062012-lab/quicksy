# QUICKSY iOS App

Swift-based iOS application with SwiftUI framework.

## Tech Stack
- **Language:** Swift
- **UI:** SwiftUI
- **Architecture:** MVVM
- **Networking:** URLSession / Alamofire
- **Local Storage:** CoreData
- **Dependency Injection:** Manual/Swift Package Manager
- **Async:** async/await + Combine

## Project Setup

### Prerequisites
- Xcode 14.0 or later
- Swift 5.7+
- iOS Deployment Target: 14.0+

## Project Structure (WIP)

```
Quicksy/
├── App/
├── Models/
├── ViewModels/
├── Views/
│   ├── Authentication/
│   ├── Home/
│   ├── Products/
│   ├── Orders/
│   └── Profile/
├── Services/
│   ├── APIService.swift
│   ├── AuthService.swift
│   └── OrderService.swift
├── Utilities/
└── Resources/
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

## Building

```bash
# Open in Xcode
open Quicksy.xcodeproj

# Or build from terminal
xcodebuild -scheme Quicksy -configuration Debug -derivedDataPath build
```

---

**More documentation:** See root `docs/` folder
