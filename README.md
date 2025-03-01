# Role-Based Access Control (RBAC) System

## Overview
This project is a Role-Based Access Control (RBAC) system built with a .NET backend and a React frontend. It provides authentication and authorization features using JWT tokens and role-based user management.

## Features
- User authentication with JWT
- Role-based access control (Admin, User)
- Secure API endpoints
- CRUD operations for users
- Session management
- Responsive frontend built with React, Vite, and Tailwind CSS

## Tech Stack
### Backend:
- .NET 8
- ASP.NET Core
- Entity Framework Core
- SQL Server
- JWT Authentication

### Frontend:
- React 19
- Vite
- Tailwind CSS
- React Router DOM

## Directory Structure
```
rghvgrv-rbac/
├── Backend/
│   ├── Controllers/          # API controllers
│   ├── DB/                   # Database context
│   ├── Middleware/           # Authentication middleware
│   ├── Models/               # DTOs and Entities
│   ├── Repos/                # Repository pattern for database operations
│   ├── Services/             # Business logic and JWT services
│   ├── Program.cs            # Entry point for the backend
│   ├── appsettings.json      # Configuration file
│   ├── SampleOAuth.sln       # Solution file
│   ├── SampleOAuth.csproj    # Project file
│   ├── .gitignore            # Ignore file
│
├── Frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── App.jsx           # Main React component
│   │   ├── main.jsx          # Entry point
│   │   ├── Home.jsx          # Home page
│   │   ├── Login.jsx         # Login page
│   │   ├── Signup.jsx        # Signup page
│   │   ├── About.jsx         # User details page
│   │   ├── Update.jsx        # User update page
│   ├── package.json          # Dependencies and scripts
│   ├── vite.config.js        # Vite configuration
│   ├── .gitignore            # Ignore file
│
└── README.md                 # Project documentation
```

## Installation
### Backend Setup
1. Install .NET 8 SDK
2. Navigate to the `Backend` directory:
   ```sh
   cd Backend
   ```
3. Restore dependencies:
   ```sh
   dotnet restore
   ```
4. Update `appsettings.json` with your database connection string.
5. Apply database migrations:
   ```sh
   dotnet ef database update
   ```
6. Run the backend:
   ```sh
   dotnet run
   ```

### Frontend Setup
1. Install Node.js and npm.
2. Navigate to the `Frontend` directory:
   ```sh
   cd Frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints
### Authentication
- `POST /api/Auth/Login` - User login
- `POST /api/Auth/Logout` - User logout

### User Management
- `GET /api/User/GetAll` - Get all users (Admin only)
- `GET /api/User/GetDetails/{id}` - Get user details by ID
- `GET /api/User/GetDetailsByUserName/{username}` - Get user details by username
- `POST /api/User/Add` - Add a new user
- `PUT /api/User/Update/{username}` - Update user details


## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

## License
This project is licensed under the MIT License.

