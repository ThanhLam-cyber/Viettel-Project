require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const morgan = require("morgan");
const hpp = require("hpp"); // ✅ Thêm hpp để chống HTTP Parameter Pollution
const xss = require("xss-clean"); // ✅ Thêm xss-clean để sanitize input chống XSS
const client = require("prom-client");
const { sendEmailRegister, sendCameraRegisterEmail, sendConsultEmail } = require("../src/email/account");
const { business_package, metadataNote } = require('./data/buisiness_package'); // ✅ Sửa spelling "buissiness" thành "business" và điều chỉnh path cho nhất quán
const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  "https://viettel-project.vercel.app",
  "https://viettel-project-djoan-thanh-lams-projects-d7d2a1fb.vercel.app",
  "https://viettel-project-git-master-djoan-thanh-lams-projects-d7d2a1fb.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json({ limit: '50kb' })); // ✅ Giới hạn kích thước body để chống DoS
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      // Thêm các directives khác nếu cần
    }
  }
})); // ✅ Cấu hình helmet chi tiết hơn với CSP
app.use(morgan('combined'));
app.use(hpp()); // ✅ Chống HTTP Parameter Pollution
app.use(xss()); // ✅ Sanitize input chống XSS

// ✅ Giới hạn yêu cầu chung
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau."
});
app.use(limiter);

// ✅ Giới hạn riêng cho routes nhạy cảm (ví dụ: register) để chống brute-force
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 5, // Giới hạn 5 yêu cầu mỗi giờ per IP
  message: "Quá nhiều yêu cầu đăng ký từ IP này, vui lòng thử lại sau."
});
app.use("/register", registerLimiter);
app.use("/register-camera", registerLimiter);
app.use("/register-consult", registerLimiter);

// ✅ Enforce HTTPS ở production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

// === Biến môi trường ===
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

// === Import dữ liệu ===
const viettelSimData = require("./data/viettelSimData");
const { viettelInternet, prepaidFees, tvChannelMapping } = require("./data/viettelInternet");
const chatScript = require("./data/chatScript");

// === Metrics Prometheus ===
client.collectDefaultMetrics();
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// === API dữ liệu ===
app.get("/business-package", (req, res) => res.json({ business_package, metadataNote })); // ✅ Sửa tên biến
app.get("/sim-data", (req, res) => res.json(viettelSimData));
app.get("/internet-data", (req, res) => res.json({ viettelInternet, prepaidFees, tvChannelMapping }));
app.get("/chat-script", (req, res) => res.json(chatScript));

// === Xác minh reCAPTCHA ===
async function verifyRecaptcha(token) {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`;
  const res = await fetch(url, { method: "POST" });
  return res.json();
}

app.post("/register-consult", [
  body('contactInfo.name').trim().notEmpty().escape().withMessage('Tên không hợp lệ'),
  body('contactInfo.phone').trim().matches(/^[0-9]{10,11}$/).withMessage('Số điện thoại không hợp lệ'),
  body('contactInfo.address').trim().notEmpty().escape().withMessage('Địa chỉ không hợp lệ'),
  body('contactInfo.email').optional().trim().isEmail().normalizeEmail().withMessage('Email không hợp lệ')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  const { contactInfo } = req.body;

  try {
    await sendConsultEmail({ contactInfo });
    return res.json({ success: true });
  } catch (error) {
    console.error("Lỗi xử lý yêu cầu tư vấn:", error);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

// === Route đăng ký ===
app.post("/register", [
  body('name').trim().notEmpty().escape().withMessage('Tên không hợp lệ'),
  body('phone').trim().matches(/^[0-9]{10,11}$/).withMessage('Số điện thoại không hợp lệ'),
  body('address').trim().notEmpty().escape().withMessage('Địa chỉ không hợp lệ'),
  body('packageName').trim().notEmpty().escape().withMessage('Tên gói không hợp lệ'),
  body('packageType').trim().notEmpty().escape().withMessage('Loại gói không hợp lệ'), // ✅ Sửa typo "notEmpt" thành "notEmpty"
  body('token').notEmpty().withMessage('Thiếu token reCAPTCHA')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  const { name, phone, address, packageName, packageType, token } = req.body;

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

app.post("/register-camera", [
  body('name').trim().notEmpty().escape().withMessage('Tên không hợp lệ'),
  body('phone').trim().matches(/^[0-9]{10,11}$/).withMessage('Số điện thoại không hợp lệ'),
  body('address').trim().notEmpty().escape().withMessage('Địa chỉ không hợp lệ')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  const { name, phone, address } = req.body;

  try {
    await sendCameraRegisterEmail({ name, phone, address });
    res.json({ success: true });
  } catch (error) {
    console.error("Lỗi xử lý đăng ký camera:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

// ✅ Xử lý lỗi toàn cầu
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
});

// === Start server ===
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});