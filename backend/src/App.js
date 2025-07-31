require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const helmet = require("helmet"); // ✅ Mớ
const client = require("prom-client");
const { sendEmailRegister, sendCameraRegisterEmail,sendConsultEmail } = require("../src/email/account");
const {buissiness_package,metadataNote} = require('../src/data/buisiness_package')
const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  "https://viettel-project-git-master-djoan-thanh-lams-projects-d7d2a1fb.vercel.app"
  
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(helmet()); 

// === Biến môi trường ===
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;





// === Import dữ liệu ===
const viettelSimData = require("./data/viettelSimData");
const {viettelInternet,prepaidFees, tvChannelMapping} = require("./data/viettelInternet");
const chatScript = require("./data/chatScript");

// === Metrics Prometheus ===
client.collectDefaultMetrics();
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// === API dữ liệu ===
app.get("/business-package", (req, res) => res.json({buissiness_package,metadataNote}));
app.get("/sim-data", (req, res) => res.json(viettelSimData));
app.get("/internet-data", (req, res) => res.json({viettelInternet,prepaidFees, tvChannelMapping}));
app.get("/chat-script", (req, res) => res.json(chatScript));

// === Xác minh reCAPTCHA ===
async function verifyRecaptcha(token) {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`;
  const res = await fetch(url, { method: "POST" });
  return res.json();
}

app.post("/register-consult", async (req, res) => {
  const { contactInfo } = req.body;

  if (!contactInfo) {
    return res.status(400).json({ success: false, message: "Thiếu thông tin liên hệ" });
  }

  try {
    await sendConsultEmail({ contactInfo });
    return res.json({ success: true });
  } catch (error) {
    console.error("Lỗi xử lý yêu cầu tư vấn:", error);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

// === Route đăng ký ===
app.post("/register", async (req, res) => {
  const { name, phone, address, packageName, packageType, token } = req.body;
  if (!token) return res.status(400).json({ success: false, message: "Thiếu token reCAPTCHA" });

  try {
    const recaptchaData = await verifyRecaptcha(token);
    console.log("reCAPTCHA data:", recaptchaData);

    if (!recaptchaData.success || recaptchaData.score < 0.7) {
      return res.status(403).json({ success: false, message: "Xác minh reCAPTCHA thất bại" });
    }

    await sendEmailRegister({ name, phone, address, packageName, packageType });
    return res.json({ success: true });

  } catch (error) {
    console.error("Lỗi xử lý đăng ký:", error);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

app.post("/register-camera", async (req, res) => {
  const { name, phone, address } = req.body;

  if (!name || !phone || !address) {
    return res.status(400).json({ error: "Thiếu thông tin." });
  }

  try {
    await sendCameraRegisterEmail({ name, phone, address });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Gửi mail thất bại." });
  }
});



// === Start server ===
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
