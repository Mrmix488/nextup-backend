// backend/server.js (เวอร์ชันสุดท้ายจริงๆ)
import express from 'express';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

// โค้ดจะอ่านจาก Environment Groups ที่เราตั้งใน Render โดยตรง
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

if (!firebaseConfig.apiKey) {
  console.error("Firebase API Key is missing!");
  process.exit(1);
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

// --- API Endpoints ---
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

app.get('/api/services', async (req, res) => {
  try {
    const { category, subcategory } = req.query; 
    const servicesRef = collection(db, 'services');
    let q = query(servicesRef, where("status", "==", "approved"));
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

app.get('/api/services/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceRef = doc(db, 'services', serviceId);
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
  console.log(`Backend server is running on port ${port}`);
});