// backend/server.js (เวอร์ชันทดสอบ - ไม่ต้องคุยกับ Firebase)

import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// --- Endpoint ทดสอบที่ 1 ---
// แค่เข้าไปดูว่าเซิร์ฟเวอร์ "ตื่น" หรือยัง
app.get('/', (req, res) => {
  res.send('Hello from NextUp Backend! The server is running!');
});


// --- Endpoint ทดสอบที่ 2 ---
// จำลองการส่งข้อมูล Categories กลับไป โดยไม่ต้องไปถาม Firebase
app.get('/api/categories', (req, res) => {
  console.log("Request received for /api/categories");
  const mockCategories = ["ติวหนังสือ (Test)", "ออกแบบ (Test)", "ศิลปะ (Test)"];
  res.json(mockCategories);
});

// (เราจะคอมเมนต์ Endpoint อื่นๆ ทิ้งไปก่อนชั่วคราว)
/*
app.get('/api/services', async (req, res) => { ... });
app.get('/api/services/:id', async (req, res) => { ... });
*/

app.listen(port, () => {
  console.log(`Test server is running on port ${port}`);
});