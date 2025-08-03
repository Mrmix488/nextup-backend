 import express from 'express';
    import cors from 'cors';
    import { initializeApp } from 'firebase/app';
    import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    };
    
    // เพิ่มการตรวจสอบว่า Config มาครบไหม
    if (!firebaseConfig.apiKey) {
      console.error("Firebase API Key is missing!");
      process.exit(1); // หยุดการทำงานของเซิร์ฟเวอร์ไปเลยถ้าไม่มี Key
    }

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const app = express();
    const port = process.env.PORT || 5000;
    app.use(cors());

    // ... API Endpoints ทั้งหมด ...
    app.get('/api/categories', async (req, res) => { /*...*/ });
    app.get('/api/services', async (req, res) => { /*...*/ });
    app.get('/api/services/:id', async (req, res) => { /*...*/ });
    
    app.listen(port, () => {
      console.log(`Backend server is running on port ${port}`);
    });