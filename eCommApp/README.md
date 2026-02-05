# 🍎 The Daily Harvest: A Modern & Accessible eCommerce Platform

![The Daily Harvest](./public/vite.svg)

Welcome to **The Daily Harvest**, a modern, single-page eCommerce application built with React and TypeScript. This project serves as a demonstration of a clean, performant, and highly accessible online store, compliant with the latest web standards, including the **European Accessibility Act (EAA)**.

---

## ✨ Core Features

- **Product Catalog**: Browse a dynamic list of products fetched from a local API.
- **Shopping Cart**: Add, remove, and view items in a persistent shopping cart using React Context.
- **Admin Panel**: A password-protected area for administrators to manage store-wide sales.
- **Responsive Design**: A mobile-first design that looks great on all devices.
- **Accessibility First**: Built from the ground up to be compliant with **WCAG 2.1 Level AA**, ensuring it's usable for everyone.

---

## ♿ Accessibility Compliance

This application has been developed to meet the standards of the **European Accessibility Act (EAA)** by adhering to **WCAG 2.1 Level AA**.

Key accessibility features include:

- **Full Keyboard Navigability**: Every interactive element is accessible via keyboard.
- **Screen Reader Support**: Semantic HTML and ARIA attributes provide a rich experience for screen reader users.
- **Focus Management**: Modals and dynamic content correctly manage focus.
- **Skip Navigation**: A "Skip to main content" link for keyboard users.
- **Reduced Motion**: Respects user preferences for reduced motion.

---

## 🛠️ Technology Stack

- **Frontend**: [React 18](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State Management**: [React Context](https://reactjs.org/docs/context.html)
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Styling**: CSS with modern features (custom properties, etc.)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm (v9.x or higher)

### Installation & Setup

1.  **Clone the repository**
2.  **Navigate to the project directory**:
    ```bash
    cd eCommApp
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    ```
5.  Open your browser and go to `http://localhost:5173` (or the port specified in your terminal).

### 🔑 Admin Access

To access the admin panel, use the following credentials:

- **Username**: `admin`
- **Password**: `admin`

---

## 🧪 Testing

This project uses **Vitest** and **React Testing Library** for comprehensive unit and integration testing with **100% test pass rate** and excellent code coverage.

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

The current test suite includes **41 comprehensive tests** across all components:

- ✅ **100% test pass rate** (41/41 tests passing)
- 📊 **76.19% overall code coverage**
- 🎯 **89.52% component coverage**

#### Component Coverage Breakdown

| Component         | Statements | Branches | Functions | Lines  |
| ----------------- | ---------- | -------- | --------- | ------ |
| AdminPage.tsx     | 97.61%     | 87.5%    | 100%      | 97.61% |
| CartPage.tsx      | 96.1%      | 85.71%   | 100%      | 96.1%  |
| LoginPage.tsx     | 100%       | 100%     | 100%      | 100%   |
| CheckoutModal.tsx | 80%        | 81.81%   | 100%      | 80%    |
| ReviewModal.tsx   | 89.25%     | 89.47%   | 100%      | 89.25% |
| ProductsPage.tsx  | 87.15%     | 85.71%   | 66.66%    | 87.15% |
| Header.tsx        | 100%       | 100%     | 100%      | 100%   |
| Footer.tsx        | 100%       | 100%     | 100%      | 100%   |

### Test Structure

All component tests follow **best practices**:

- ✅ **AAA Pattern** (Arrange-Act-Assert)
- ✅ **Factory functions** for test data creation
- ✅ **Named constants** instead of magic numbers
- ✅ **Single responsibility** per test
- ✅ **Edge case coverage**
- ✅ **Accessibility testing** (ARIA attributes, keyboard navigation)

---

## 📁 Project Structure

```
eCommApp/
├── public/                      # Static assets
│   └── products/                # Product data and images
│       ├── apple.json
│       ├── grapes.json
│       ├── orange.json
│       ├── pear.json
│       └── productImages/       # Product image assets
├── src/
│   ├── components/              # React components
│   │   ├── AdminPage.tsx        # Admin panel for sales management
│   │   ├── CartPage.tsx         # Shopping cart page
│   │   ├── CheckoutModal.tsx    # Checkout confirmation modal
│   │   ├── Footer.tsx           # Application footer
│   │   ├── Header.tsx           # Application header with navigation
│   │   ├── HomePage.tsx         # Landing page
│   │   ├── LoginPage.tsx        # Admin login page
│   │   ├── ProductsPage.tsx     # Product catalog page
│   │   ├── ReviewModal.tsx      # Product review modal
│   │   ├── *.test.tsx           # Component test files
│   ├── context/                 # React Context
│   │   └── CartContext.tsx      # Shopping cart state management
│   ├── test/                    # Test configuration
│   │   ├── setup.ts             # Vitest setup
│   │   └── test-utils.tsx       # Custom test utilities
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts             # Shared type definitions
│   ├── utils/                   # Utility functions
│   │   └── helpers.ts           # Helper functions
│   ├── App.tsx                  # Main app with routing
│   ├── main.tsx                 # Application entry point
│   ├── App.css                  # Component styles
│   └── index.css                # Global styles
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
└── README.md                    # This file
```

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, please open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
