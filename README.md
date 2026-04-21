# 🍳 AI Recipe Generator

A full-stack application that leverages AI to generate personalized recipes based on your pantry inventory, dietary preferences, and allergies. Manage your pantry, plan meals, and create shopping lists with ease.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Overview](#api-overview)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 Authentication

- **User Registration & Login** - Secure authentication with JWT tokens
- **Password Hashing** - Bcrypt for secure password storage
- **Session Management** - Cookie-based JWT tokens

### 🤖 AI Recipe Generation

- **Google GenAI Integration** - Generate recipes using Google's AI
- **Smart Recommendations** - Recipes based on pantry items and preferences
- **Dietary Customization** - Respects dietary restrictions and allergies

### 🥫 Pantry Management

- **Inventory Tracking** - Add, update, and delete pantry items
- **Expiry Tracking** - Monitor item expiration dates
- **Low Stock Alerts** - Get notified when items are running low
- **Category Organization** - Organize items by food categories

### 📋 Recipe Features

- **Recipe Browsing** - Browse and search saved recipes
- **Recipe Details** - View full recipe information, ingredients, and instructions
- **Recipe Saving** - Save your favorite generated recipes
- **Difficulty Levels** - Filter recipes by difficulty (easy, medium, hard)

### 📅 Meal Planner

- **Weekly Planning** - Plan meals for the entire week
- **Drag & Drop** - Easily organize meal schedules
- **Meal Calendar** - Visual calendar view of your meals

### 🛒 Shopping List

- **Smart Lists** - Generate shopping lists from pantry items
- **Categories** - Organize shopping items by category
- **Checkoff System** - Mark items as purchased

### ⚙️ User Settings

- **Profile Management** - Update user profile information
- **Dietary Preferences** - Set dietary restrictions and allergies
- **Cuisine Preferences** - Choose preferred cuisines
- **Portion Control** - Set default serving sizes
- **Measurement Units** - Choose metric or imperial units

## 🛠 Tech Stack

### Frontend

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **State Management**: React Context API
- **API Client**: Axios
- **Drag & Drop**: @dnd-kit (Core, Sortable, Utilities)
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Linting**: ESLint

### Backend

- **Runtime**: Node.js with ES Modules
- **Framework**: Express 5
- **Database**: PostgreSQL
- **ORM**: Sequelize 6
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: Bcrypt
- **AI Integration**: Google GenAI
- **Validation**: express-validator
- **Environment**: dotenv
- **CORS**: Enable cross-origin requests
- **Development**: Nodemon

## 📦 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** (v12 or higher)
- **Google GenAI API Key** (for recipe generation)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-recipe-generator
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
cd ..
```

### 4. Set Up Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_recipe_generator
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Google GenAI Configuration
GOOGLE_GENAI_API_KEY=your_google_genai_api_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 5. Set Up Database

Create a PostgreSQL database and run the schema:

```bash
# Create database
createdb ai_recipe_generator

# Run migration
cd server
npm run migrate
```

Or manually create tables by executing the SQL in `server/config/schema.sql`.

## 📁 Project Structure

```
ai-recipe-generator/
├── client/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation component
│   │   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Authentication context
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   ├── Pantry.jsx          # Pantry management
│   │   │   ├── RecipeGenerator.jsx # AI recipe generation
│   │   │   ├── MyRecipes.jsx       # Saved recipes
│   │   │   ├── RecipeDetail.jsx    # Recipe details view
│   │   │   ├── MealPlanner.jsx     # Weekly meal planning
│   │   │   ├── ShoppingList.jsx    # Shopping list management
│   │   │   ├── Settings.jsx        # User settings
│   │   │   ├── Login.jsx           # Login page
│   │   │   └── SignUp.jsx          # Registration page
│   │   ├── services/
│   │   │   └── api.js              # API client configuration
│   │   ├── data/
│   │   │   └── dummyData.js        # Sample data for development
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # React entry point
│   │   ├── App.css                 # App styles
│   │   └── index.css               # Global styles
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── vite.config.js              # Vite configuration
│   ├── eslint.config.js            # ESLint configuration
│   └── index.html                  # HTML entry point
│
├── server/                          # Backend (Express + Node.js)
│   ├── controllers/
│   │   ├── auth.js                 # Authentication logic
│   │   └── user.js                 # User management
│   ├── middlewares/
│   │   ├── authMiddleware.js       # JWT verification
│   │   ├── custom-error.js         # Error handling
│   │   └── validatorMiddleware.js  # Request validation
│   ├── model/
│   │   ├── User.js                 # User model
│   │   ├── UserPreferences.js      # User preferences model
│   │   └── Error.js                # Custom error classes
│   ├── routes/
│   │   └── auth-router.js          # Authentication routes
│   ├── config/
│   │   ├── db.js                   # Database configuration
│   │   └── schema.sql              # Database schema
│   ├── utils/
│   │   └── generateToken.js        # JWT token generation
│   ├── server.js                   # Express app setup
│   ├── migrate.js                  # Database migration script
│   └── package.json
│
└── README.md                        # This file
```

## ⚙️ Configuration

### Frontend Configuration

Update `client/src/services/api.js` to point to your backend server:

```javascript
const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:3000/api/v1";
```

### Backend Configuration

The backend uses environment variables (`.env`) for all configuration. See the installation section for required variables.

## 🏃 Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:3000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

### Build for Production

**Frontend:**

```bash
cd client
npm run build
```

**Backend:**

```bash
cd server
npm start
```

## 📡 API Overview

### Authentication Endpoints

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/current-user` - Get current user (protected)
- `POST /api/v1/auth/password-reset` - Request password reset

### Request/Response Format

All API requests should include:

```json
{
	"Content-Type": "application/json"
}
```

Successful responses return:

```json
{
	"success": true,
	"data": {
		/* response data */
	},
	"message": "Success message"
}
```

Error responses return:

```json
{
	"success": false,
	"message": "Error message"
}
```

## 🗄️ Database Schema

### Users Table

- `id` (UUID) - Primary key
- `email` (varchar) - User email (unique)
- `hashed_password` (varchar) - Encrypted password
- `name` (varchar) - User name
- `created_at` (timestamp) - Account creation date
- `updated_at` (timestamp) - Last update date

### User Preferences Table

- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to users
- `dietary_restrictions` (text[]) - Array of restrictions
- `allergies` (text[]) - Array of allergies
- `preferred_cuisines` (text[]) - Array of cuisine preferences
- `default_servings` (int) - Default serving size
- `measurement_unit` (varchar) - Metric or imperial

### Pantry Items Table

- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to users
- `name` (varchar) - Item name
- `quantity` (decimal) - Item quantity
- `unit` (varchar) - Measurement unit
- `category` (varchar) - Item category
- `expiry_date` (date) - Expiration date
- `is_running_low` (boolean) - Low stock indicator

### Recipes Table

- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to users
- `name` (varchar) - Recipe name
- `description` (text) - Recipe description
- `cuisine_type` (varchar) - Cuisine type
- `difficulty` (varchar) - Difficulty level
- Additional fields for ingredients, instructions, etc.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

### Code Style

- Follow existing code conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Run linter before submitting: `npm run lint`

## 📝 License

This project is licensed under the ISC License - see the individual package.json files for details.

## 🆘 Support

For issues or questions, please:

1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Include steps to reproduce the problem

## 🎯 Roadmap

- [ ] Advanced meal planning with nutritional information
- [ ] Recipe sharing with other users
- [ ] Integration with grocery delivery services
- [ ] Mobile app with React Native
- [ ] Recipe rating and reviews system
- [ ] Nutritional analysis and calorie tracking
- [ ] Social features and recipe recommendations

---

**Happy Cooking! 🍽️**
