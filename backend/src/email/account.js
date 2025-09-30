const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailRegister = async ({ name, phone, address, packageName, packageType }) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("Khóa API SendGrid không được thiết lập.");
    }

    const msg = {
      to: "dthlam.co@gmail.com", // <- Người nhận (email của bạn)
      from: "dthlam.co@gmail.com", // <- Địa chỉ đã verify
      subject: "📦 Có người vừa đăng ký gói cước mới!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #2c3e50;">🚀 Đăng ký gói cước mới</h2>
          <p style="font-size: 16px;">Một người dùng đã đăng ký gói cước mới. Dưới đây là thông tin chi tiết:</p>
          <table style="width: 100%; max-width: 600px; background: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 16px;">
            <tr>
              <td style="padding: 8px;"><strong>👤 Họ và tên:</strong></td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px;"><strong>📞 Số điện thoại:</strong></td>
              <td style="padding: 8px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>📍 Địa chỉ lắp đặt:</strong></td>
              <td style="padding: 8px;">${address}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px;"><strong>📦 Gói cước:</strong></td>
              <td style="padding: 8px;">${packageName} (${packageType})</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 14px; color: #888;">Email được gửi tự động từ hệ thống Viettel.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log("✅ Email đăng ký đã được gửi thành công!");
    return { success: true };
  } catch (error) {
    console.error("❌ Lỗi gửi email:", error.message);
    if (error.response) {
      console.error("📋 Chi tiết lỗi từ SendGrid:", JSON.stringify(error.response.body, null, 2));
    }
    throw error;
  }
};


const sendCameraRegisterEmail = async ({ name, phone, address }) => {
  try {
    const msg = {
       to: "dthlam.co@gmail.com", // <- Người nhận (email của bạn)
      from: "dthlam.co@gmail.com", // <- Địa chỉ đã verify
      subject: "📷 Đăng ký lắp đặt Camera từ khách hàng",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>Thông tin đăng ký Camera:</h3>
          <ul>
            <li><strong>👤 Họ tên:</strong> ${name}</li>
            <li><strong>📞 Số điện thoại:</strong> ${phone}</li>
            <li><strong>📍 Địa chỉ:</strong> ${address}</li>
          </ul>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log("✅ Email camera đã được gửi.");
    return { success: true };
  } catch (error) {
    console.error("❌ Lỗi gửi email camera:", error.message);
    if (error.response) {
      console.error("📋 Chi tiết lỗi:", JSON.stringify(error.response.body, null, 2));
    }
    throw error;
  }
};

const sendConsultEmail = async ({ contactInfo }) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("Khóa API SendGrid không được thiết lập.");
    }

    // Validate contactInfo (basic check for phone or email)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo);
    const isPhone = /^\d{10}$/.test(contactInfo); // Example: 10-digit phone number
    if (!isEmail && !isPhone) {
      throw new Error("Vui lòng cung cấp email hoặc số điện thoại hợp lệ.");
    }

    const contactLabel = isEmail ? "Email" : "Số điện thoại";

    const msg = {
      to: "dthlam.co@gmail.com", // Email admin
      from: "dthlam.co@gmail.com", // Email đã verify
      subject: "📞 Yêu cầu tư vấn từ khách hàng",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #2c3e50;">🚀 Yêu cầu tư vấn mới</h2>
          <p style="font-size: 16px;">Một khách hàng đã yêu cầu tư vấn. Dưới đây là thông tin chi tiết:</p>
          <table style="width: 100%; max-width: 600px; background: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 16px;">
            <tr>
              <td style="padding: 8px;"><strong>${contactLabel}:</strong></td>
              <td style="padding: 8px;">${contactInfo}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 14px; color: #888;">Email được gửi tự động từ hệ thống Viettel.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log("✅ Email tư vấn đã được gửi thành công!");
    return { success: true };
  } catch (error) {
    console.error("❌ Lỗi gửi email tư vấn:", error.message);
    if (error.response) {
      console.error("📋 Chi tiết lỗi từ SendGrid:", JSON.stringify(error.response.body, null, 2));
    }
    throw error;
  }
};
module.exports = {
  sendEmailRegister,
  sendCameraRegisterEmail,
  sendConsultEmail,
};
