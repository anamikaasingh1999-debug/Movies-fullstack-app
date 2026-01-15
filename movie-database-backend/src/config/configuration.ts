export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://devendraprajapat3086:t6TXel66uClcPBmp@cluster0.9p4ik9s.mongodb.net/?appName=Cluster0',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-key',
    expiresIn: process.env.JWT_EXPIRATION || '7d',
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880, // 5MB
    path: process.env.UPLOAD_PATH || './uploads',
  },
});