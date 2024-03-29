import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

import router from "./routes/index.js";

const app = express();

const { PORT, DB_URI } = process.env;

// Middleware
app.use(cors());
app.use(express.json());

// ? Phương thức connect với tham số connect string
await mongoose.connect(DB_URI).then(() => {
  console.log("connect to database successfully");
});

// Router
app.use("/api", router);

// Middleware xử lý khi không tìm thấy địa chỉ yêu cầu (404 Not Found)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error); // Chuyển lỗi tới middleware xử lý lỗi cuối cùng
});

// Middleware xử lý mọi lỗi server (500 Internal Server Error)
app.use((err, req, res, next) => {
  const statusCode = err.status || 500; // Sử dụng status của lỗi hoặc mặc định là 500
  return res.status(statusCode).json({
    name: err.name,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
