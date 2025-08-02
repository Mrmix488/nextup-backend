// backend/server.js (เวอร์ชันแก้ไข Port)

import express from 'express';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

// --- อ่าน Config จาก Environment Variables ---
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const app = express();

// --- นี่คือหัวใจของการแก้ไข! ---
// ให้ใช้ Port ที่ Render กำหนดมาให้ (ผ่าน process.env.PORT)
// แต่ถ้าเป็นการรันในเครื่องเรา (ที่ไม่มี process.env.PORT) ให้ใช้ 5000 แทน
const port = process.env.PORT || 5000;

app.use(cors());

// --- API Endpoints ทั้งหมดเหมือนเดิม ---
app.get('/api/categories', async (req, res) => { /*...*/ });
app.get('/api/services', async (req, res) => { /*...*/ });
app.get('/api/services/:id', async (req, res) => { /*...*/ });

app.listen(port, () => {
  // แสดง Port ที่ใช้งานจริงออกมาใน Log
  console.log(`Backend server is running on port ${port}`);
});