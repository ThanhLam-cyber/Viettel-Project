const chatScript = {
  start: {
    message: "👋 Xin chào! Tôi là trợ lý Viettel. Bạn đang quan tâm đến dịch vụ nào?",
    options: [
      { text: "📦 Xem sản phẩm", next: "products" },
      { text: "🌐 Gói cước Internet", next: "internet" },
      { text: "📷 Dịch vụ Camera", next: "camera" },
      { text: "📺 Truyền hình Viettel", next: "tv" },
      { text: "📞 Tư vấn cá nhân", next: "consult" },
    ],
  },

  products: {
    message: "🛍️ Chúng tôi đang cung cấp các sản phẩm sau. Bạn muốn xem gì?",
    options: [
      { text: "📱 Điện thoại", next: "phone" },
      { text: "💻 Laptop", next: "laptop" },
      { text: "💳 Sim số Viettel", next: "sim" },
      { text: "🔙 Quay lại", next: "start" },
    ],
  },

  phone: {
    message: "📱 Các dòng điện thoại đang được ưa chuộng gồm iPhone, Samsung, Xiaomi... 🔁",
    options: [
      { text: "🔙 Quay lại sản phẩm", next: "products" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },

  laptop: {
    message: "💻 Chúng tôi cung cấp nhiều dòng laptop như MacBook, Dell, Asus...",
    options: [
      { text: "🔙 Quay lại sản phẩm", next: "products" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },

  sim: {
    message: "💳 Bạn cần sim số đẹp, sim trả sau hay sim data? Liên hệ để được tư vấn kỹ hơn nhé!",
    options: [
      { text: "🔙 Quay lại sản phẩm", next: "products" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },

  internet: {
    message: "🌐 Viettel có nhiều gói Internet với tốc độ cao, phù hợp gia đình & doanh nghiệp. Bạn muốn xem gói nào?",
    options: [
      { text: "Gói cước thường (NETVT)", next: "netvt" },
      { text: "Gói Mesh Wi-Fi (MESHVT)", next: "meshvt" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },

  netvt: {
    message: "📶 Các gói NETVT có tốc độ từ 300Mbps đến 1Gbps, thiết bị Wi-Fi miễn phí. Gói nào bạn muốn biết chi tiết?",
    options: [
      { text: "NETVT1", next: "planDetails" },
      { text: "NETVT2", next: "planDetails" },
      { text: "🔙 Quay lại Internet", next: "internet" },
    ],
  },

  meshvt: {
    message: "🚀 Gói MESHVT sử dụng Mesh Wi-Fi phủ sóng toàn bộ ngôi nhà, nhiều thiết bị hỗ trợ đồng thời.",
    options: [
      { text: "MESHVT1", next: "planDetails" },
      { text: "MESHVT2", next: "planDetails" },
      { text: "MESHVT3", next: "planDetails" },
      { text: "🔙 Quay lại Internet", next: "internet" },
    ],
  },

  planDetails: {
    message: "📄 Vui lòng để lại email, chúng tôi sẽ gửi thông tin chi tiết và báo giá sớm nhất.",
    input: true,
    next: "end",
  },

  camera: {
    message: "📷 Dịch vụ Camera Viettel giám sát an ninh 24/7, lắp đặt nhanh chóng – phù hợp hộ gia đình và doanh nghiệp.",
    options: [
      { text: "Nhận tư vấn chi tiết", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },

  tv: {
    message: "📺 Truyền hình Viettel có hơn 180 kênh đặc sắc, HD và 4K, có cả phim, thể thao, thiếu nhi, giải trí…",
    options: [
      { text: "Tư vấn gói combo Internet + Truyền hình", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },

  consult: {
    message: "💬 Vui lòng để lại email hoặc số điện thoại, đội ngũ Viettel sẽ liên hệ hỗ trợ bạn ngay!",
    input: true,
    next: "end",
  },

  end: {
    message: "🎉 Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm qua thông tin bạn cung cấp.",
  },
};

export default chatScript;
