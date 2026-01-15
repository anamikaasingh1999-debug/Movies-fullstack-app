# Movie Database Backend API

A full-featured NestJS backend application for managing a movie database with authentication, file uploads, and RESTful API endpoints.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Protected routes with guards
  - Password hashing with bcrypt

- **Movie Management**
  - Create, read, update, and delete movies
  - Pagination and search functionality
  - User-specific movie collections
  - Field validation

- **File Upload**
  - Image upload for movie posters
  - File type and size validation
  - Secure file storage

- **Additional Features**
  - Swagger API documentation
  - MongoDB database integration
  - Global exception handling
  - Request/response transformation
  - CORS enabled
  - Security with Helmet
  - Compression enabled

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd movie-database-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/movie-database
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=7d
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
CORS_ORIGIN=http://localhost:3001
API_PREFIX=api/v1
```

4. **Create uploads directory**
```bash
mkdir uploads
```

## 🚦 Running the Application

### Development mode
```bash
npm run start:dev
```

### Production mode
```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:3000/api/docs
```

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Movies (Protected)
- `GET /api/v1/movies` - Get all movies (with pagination)
- `GET /api/v1/movies/:id` - Get a specific movie
- `POST /api/v1/movies` - Create a new movie
- `PATCH /api/v1/movies/:id` - Update a movie
- `DELETE /api/v1/movies/:id` - Delete a movie

### Upload (Protected)
- `POST /api/v1/upload` - Upload a file

## 📝 Request Examples

### Register
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'
```

### Create Movie
```bash
curl -X POST http://localhost:3000/api/v1/movies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "The Shawshank Redemption",
    "publishingYear": 1994,
    "poster": "https://example.com/poster.jpg"
  }'
```

### Get Movies with Pagination
```bash
curl -X GET "http://localhost:3000/api/v1/movies?page=1&limit=10&search=shawshank" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Upload File
```bash
curl -X POST http://localhost:3000/api/v1/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

## 🗂️ Project Structure

```
src/
├── auth/                   # Authentication module
│   ├── dto/               # Data transfer objects
│   ├── guards/            # Auth guards
│   ├── strategies/        # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/                 # Users module
│   ├── schemas/          # Mongoose schemas
│   ├── users.service.ts
│   └── users.module.ts
├── movies/               # Movies module
│   ├── dto/             # Data transfer objects
│   ├── schemas/         # Mongoose schemas
│   ├── movies.controller.ts
│   ├── movies.service.ts
│   └── movies.module.ts
├── upload/              # File upload module
│   ├── upload.controller.ts
│   ├── upload.service.ts
│   └── upload.module.ts
├── common/              # Shared resources
│   ├── decorators/     # Custom decorators
│   ├── filters/        # Exception filters
│   ├── interceptors/   # Response interceptors
│   └── pipes/          # Validation pipes
├── config/             # Configuration
│   └── configuration.ts
├── app.module.ts
└── main.ts
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password encryption
- **Helmet**: Security headers
- **CORS**: Configurable cross-origin resource sharing
- **Validation**: Input validation with class-validator
- **File Upload Security**: Type and size restrictions

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Database Schema

### User
```typescript
{
  email: string (unique, required)
  password: string (hashed, required)
  isActive: boolean (default: true)
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
}
```

### Movie
```typescript
{
  title: string (required)
  publishingYear: number (required, 1800-2100)
  poster: string (required)
  userId: ObjectId (required, ref: User)
  createdAt: Date
  updatedAt: Date
}
```

## 🚀 Deployment

### AWS Deployment Steps

1. **Set up EC2 instance**
   - Launch Ubuntu instance
   - Install Node.js and MongoDB
   - Configure security groups

2. **Deploy application**
```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Clone repository
git clone <your-repo-url>
cd movie-database-backend

# Install dependencies
npm install

# Set up environment variables
nano .env

# Build application
npm run build

# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start dist/main.js --name movie-api

# Save PM2 configuration
pm2 save
pm2 startup
```

3. **Set up MongoDB Atlas** (Recommended)
   - Create cluster on MongoDB Atlas
   - Update MONGODB_URI in .env

4. **Configure Nginx** (Optional for reverse proxy)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - your.email@example.com

## 🙏 Acknowledgments

- NestJS framework
- MongoDB
- Passport.js for authentication
- All contributors and maintainers