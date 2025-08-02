// backend/server.js (เวอร์ชันอ่านจาก Environment Variables)

import express from 'express';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

// --- อ่าน "เชื้อเพลิง" จากท่อส่ง (Environment Variables) ---
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
const port = 5000;
app.use(cors());

// ... API Endpoints ทั้งหมดเหมือนเดิมเป๊ะๆ ...
app.get('/api/categories', async (req, res) => { /*...*/ });
app.get('/api/services', async (req, res) => { /*...*/ });
app.get('/api/services/:id', async (req, res) => { /*...*/ });


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});