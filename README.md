# Lemoncode User Management System

A full-stack user management system built with Laravel (Backend) and Next.js (Frontend). This application provides authentication and CRUD operations for user management with a modern, responsive interface.

## 🚀 Features

- **User Authentication**: Secure login/logout system using Laravel Sanctum
- **User Management**: Complete CRUD operations for users
  - List all users
  - Create new users
  - View user details
  - Update user information
  - Delete users
- **Modern UI**: Built with Next.js 16 and Tailwind CSS
- **RESTful API**: Laravel backend with clean API architecture
- **Form Validation**: Client-side validation using React Hook Form
- **Responsive Design**: Mobile-friendly interface

## 🛠 Tech Stack

### Backend
- **Framework**: Laravel 12
- **Authentication**: Laravel Sanctum
- **Database**: MySQL
- **PHP Version**: 8.2+
- **Testing**: Pest PHP

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.x
- **npm** or **yarn**
- **MySQL** >= 8.0
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd lemoncode-user-management
```

### 2. Backend Setup (Laravel)

#### Navigate to backend directory
```bash
cd lemoncode-backend
```

#### Install PHP dependencies
```bash
composer install
```

#### Create environment file
```bash
cp .env.example .env
```

#### Configure database in `.env` file
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lemoncodedb
DB_USERNAME=root
DB_PASSWORD=your_password
```

#### Generate application key
```bash
php artisan key:generate
```

#### Create database
```bash
mysql -u root -p
CREATE DATABASE lemoncodedb;
exit;
```

#### Run migrations
```bash
php artisan migrate
```

#### (Optional) Seed database with sample data
```bash
php artisan db:seed
```

#### Install Node dependencies for Vite
```bash
npm install
```

#### Build assets
```bash
npm run build
```

### 3. Frontend Setup (Next.js)

#### Navigate to frontend directory (from root)
```bash
cd ../lemoncode-frontend
```

#### Install dependencies
```bash
npm install
```

#### Create environment file
```bash
cp .env.local.example .env.local
```

Or create `.env.local` with the following content:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🚀 Running the Application

### Option 1: Run Backend and Frontend Separately

#### Terminal 1 - Start Laravel Backend
```bash
cd lemoncode-backend
php artisan serve
```
Backend will run at: `http://localhost:8000`

#### Terminal 2 - Start Next.js Frontend
```bash
cd lemoncode-frontend
npm run dev
```
Frontend will run at: `http://localhost:3000`

### Option 2: Run Backend with Development Tools (Recommended)

The backend includes a convenient development script that runs multiple services:

```bash
cd lemoncode-backend
composer dev
```

This will start:
- Laravel development server (port 8000)
- Queue worker
- Log viewer (Pail)
- Vite dev server for assets

Then in another terminal, start the frontend:
```bash
cd lemoncode-frontend
npm run dev
```

## 🌐 Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Backend Login Page**: http://localhost:3000/login

### Default Credentials

After running seeders (if implemented), you can use:
```
Email: admin@example.com
Password: password
```

*Note: Update these credentials or create your first user via the application.*

## 📚 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/logout` - User logout (requires authentication)
- `GET /api/me` - Get authenticated user details (requires authentication)

### Users (all require authentication)
- `GET /api/users` - List all users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get user details
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## 🗂 Project Structure

```
lemoncode-user-management/
├── lemoncode-backend/          # Laravel backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/    # API controllers
│   │   ├── Models/             # Eloquent models
│   │   └── Providers/          # Service providers
│   ├── database/
│   │   ├── migrations/         # Database migrations
│   │   └── seeders/            # Database seeders
│   ├── routes/
│   │   └── api.php             # API routes
│   └── .env.example            # Environment template
│
└── lemoncode-frontend/         # Next.js frontend
    ├── src/
    │   ├── app/
    │   │   ├── login/          # Login page
    │   │   ├── users/          # User management pages
    │   │   │   ├── create/     # Create user page
    │   │   │   └── [id]/       # User detail/edit page
    │   │   └── page.tsx        # Home/Dashboard
    │   └── lib/                # Utilities and helpers
    └── .env.local              # Environment variables
```

## 🧪 Testing

### Backend Tests
```bash
cd lemoncode-backend
php artisan test
# or using Pest
./vendor/bin/pest
```

### Frontend Tests
```bash
cd lemoncode-frontend
npm test
```

## 🔒 Security

- API endpoints are protected using Laravel Sanctum
- CORS is configured for frontend-backend communication
- Passwords are hashed using bcrypt
- CSRF protection is enabled
- Environment variables are used for sensitive configuration

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check MySQL is running
mysql --version

# Test database connection
php artisan tinker
>>> DB::connection()->getPdo();
```

### CORS Issues
Ensure `config/cors.php` in backend allows requests from frontend origin:
```php
'allowed_origins' => ['http://localhost:3000'],
```

### Port Conflicts
If default ports are in use:
- Backend: Change port with `php artisan serve --port=8001`
- Frontend: Change port in `package.json` script or use `PORT=3001 npm run dev`

### Clear Caches
```bash
cd lemoncode-backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

## 📝 Development Workflow

1. Make changes to backend code
2. Test API endpoints using Postman or similar tools
3. Update frontend components to consume API
4. Test the entire flow in the browser
5. Commit changes with meaningful messages

## 🚢 Deployment

### Backend Deployment
1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Run `composer install --optimize-autoloader --no-dev`
4. Run `php artisan config:cache`
5. Run `php artisan route:cache`
6. Run `php artisan view:cache`
7. Set up proper web server (Nginx/Apache)
8. Configure SSL certificates

### Frontend Deployment
1. Update `NEXT_PUBLIC_API_URL` to production API URL
2. Run `npm run build`
3. Run `npm run start` or deploy to Vercel/Netlify
4. Configure environment variables in hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Afiq Baharuddin - Fullstack Software Developer

## 📞 Support

For support, email mafqqq16@gmail.com or open an issue in the repository.

---

**Happy Coding! 🎉**
