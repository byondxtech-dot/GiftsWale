# 🎁 GiftsWale

An e-commerce platform for gifts and personalized items.

## 📁 Project Structure

```
GiftsWale/
├── frontend/          # React + Vite frontend
└── backened/          # Express.js backend
```

## 🚀 Tech Stack

### Frontend
- React 19
- Vite 7
- Tailwind CSS 4

### Backend
- Express.js 5
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (Image uploads)
- Multer (File handling)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backened
npm install
# Create .env file with required variables
npm start
```

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📄 License

ISC
