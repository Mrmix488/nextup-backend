// backend/server.js (เวอร์ชันเชื่อมต่อ Firestore!)

import express from 'express';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2gPz-2l2TPPbEAPovBvnjs8tcdiiYN7U",
  authDomain: "ffs-project-e51ae.firebaseapp.com",
  projectId: "ffs-project-e51ae",
  storageBucket: "ffs-project-e51ae.firebasestorage.app",
  messagingSenderId: "999697549524",
  appId: "1:999697549524:web:700ad6168d9b8bc8c09341",
  measurementId: "G-YZDN0207YE"
};

// --- 2. เริ่มการเชื่อมต่อกับ Firebase ---
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();
const port = 5000;
app.use(cors());


// --- 3. API Endpoint ทั้งหมดจะถูกแก้ไขให้ดึงข้อมูลจาก FIRESTORE ---

// API: ดึง "หมวดหมู่หลัก" ที่ไม่ซ้ำกัน
app.get('/api/categories', async (req, res) => {
  try {
    const servicesRef = collection(db, 'services');
    const q = query(servicesRef, where("status", "==", "approved"));
    const querySnapshot = await getDocs(q);
    const categories = [...new Set(querySnapshot.docs.map(doc => doc.data().category))];
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Error fetching categories");
  }
});


// API: ดึง "บริการ" ทั้งหมด (ที่อนุมัติแล้ว) พร้อมกรอง
app.get('/api/services', async (req, res) => {
  try {
    const { category, subcategory } = req.query; 
    const servicesRef = collection(db, 'services');
    
    // เริ่มต้น Query ด้วยเงื่อนไขพื้นฐาน
    let q = query(servicesRef, where("status", "==", "approved"));

    // เพิ่มเงื่อนไขการกรอง (ถ้ามี)
    if (category && category !== 'ทั้งหมด') {
      q = query(q, where("category", "==", category));
    }
    if (subcategory) {
      q = query(q, where("subcategory", "==", subcategory));
    }

    const querySnapshot = await getDocs(q);
    const servicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(servicesData);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).send("Error fetching services");
  }
});

// API: ดึง "บริการ" แค่ชิ้นเดียวตาม ID
app.get('/api/services/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceRef = doc(db, 'services', serviceId); // <-- ใช้ doc แทน find
    const docSnap = await getDoc(serviceRef);

    if (docSnap.exists()) {
      res.json({ id: docSnap.id, ...docSnap.data() });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error("Error fetching service detail:", error);
    res.status(500).send("Error fetching service detail");
  }
});


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});