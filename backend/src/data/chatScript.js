const chatScript = {
  start: {
    message: "👋 Chào bạn! Tôi là chatbot hỗ trợ về dịch vụ Wi-Fi, gói cước di động, internet, và truyền hình. Bạn cần giúp gì hôm nay?",
    options: [
      { text: "🖧 Dịch vụ Wi-Fi", next: "wifi" },
      { text: "📱 Gói cước di động", next: "mobile" },
      { text: "🌍 Dịch vụ Internet", next: "internet" },
      { text: "📺 Dịch vụ truyền hình", next: "tv" },
      { text: "🎉 Khuyến mãi", next: "promotion" },
      { text: "🔧 Hỗ trợ kỹ thuật", next: "technical" },
      { text: "🔄 Thay đổi gói cước", next: "change_plan" },
      { text: "📊 Kiểm tra băng thông", next: "bandwidth" },
      { text: "💳 Cách thanh toán", next: "payment" },
      { text: "📝 Đăng ký dịch vụ", next: "register" },
      { text: "⏳ Thời gian sử dụng", next: "usage_time" },
      { text: "🎓 Gói cước cho sinh viên", next: "student" },
      { text: "📡 Kết nối nhiều thiết bị", next: "multi_device" },
      { text: "🔑 Thay đổi mật khẩu Wi-Fi", next: "change_wifi_password" },
      { text: "📄 Kiểm tra hóa đơn", next: "check_bill" },
      { text: "🛑 Hủy gói cước", next: "cancel_plan" },
      { text: "🛠 Thiết bị hỗ trợ", next: "devices" },
      { text: "📞 Tư vấn gói cước", next: "consult" },
      { text: "⏰ Thời gian lắp đặt", next: "installation_time" },
      { text: "🔌 Cài đặt modem", next: "setup_modem" },
      { text: "🌐 Dịch vụ quốc tế", next: "international" },
      { text: "🔢 Đổi số điện thoại", next: "change_phone" },
      { text: "🌎 Phí chuyển vùng", next: "roaming" },
    ],
  },
  wifi: {
    message: "🖧 Phí lắp đặt Wi-Fi là 300.000 VNĐ. Các gói Wi-Fi của chúng tôi bao gồm: Gói cơ bản, Gói nâng cao, và Gói siêu tốc. Bạn muốn biết thêm chi tiết về gói nào?",
    options: [
      { text: "📋 Nhận tư vấn chi tiết", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  mobile: {
    message: "📱 Chúng tôi cung cấp nhiều gói cước di động khác nhau, bao gồm gói 4G và 5G. Bạn có muốn biết cụ thể về gói nào? Hãy gọi đến số hotline 0868623393 để được tư vấn chi tiết!",
    options: [
      { text: "📞 Nhận tư vấn qua hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  internet: {
    message: "🌍 Chúng tôi có nhiều gói internet khác nhau với tốc độ từ 20Mbps đến 1Gbps. Để biết thêm thông tin chi tiết, vui lòng gọi đến số hotline 0868623393!",
    options: [
      { text: "📋 Nhận tư vấn chi tiết", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  tv: {
    message: "📺 Dịch vụ truyền hình của chúng tôi có nhiều kênh và gói cước khác nhau. Bạn có thể gọi đến số hotline 0868623393 để được tư vấn thêm!",
    options: [
      { text: "📞 Nhận tư vấn qua hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  promotion: {
    message: "🎉 Chúng tôi thường xuyên có các chương trình khuyến mãi. Bạn có thể kiểm tra trên trang web hoặc gọi hotline để biết thêm thông tin!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  technical: {
    message: "🔧 Nếu bạn gặp sự cố với dịch vụ, hãy gọi số hotline 0868623393 để được hỗ trợ kỹ thuật nhanh chóng!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  change_plan: {
    message: "🔄 Bạn có thể thay đổi gói cước tại cửa hàng hoặc gọi hotline 0868623393 để được hướng dẫn chi tiết!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  bandwidth: {
    message: "📊 Bạn có thể sử dụng các công cụ trực tuyến để kiểm tra tốc độ băng thông. Nếu có vấn đề, hãy gọi hotline 0868623393!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  payment: {
    message: "💳 Bạn có thể thanh toán hóa đơn qua ứng dụng di động, website hoặc trực tiếp tại cửa hàng. Bạn cần hướng dẫn thêm không?",
    options: [
      { text: "📋 Nhận hướng dẫn chi tiết", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  register: {
    message: "📝 Để đăng ký dịch vụ, bạn có thể gọi hotline 0868623393 hoặc đến cửa hàng gần nhất để được hỗ trợ!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  usage_time: {
    message: "⏳ Thời gian sử dụng gói cước sẽ tùy thuộc vào loại gói bạn chọn. Bạn có thể kiểm tra thời gian sử dụng trong tài khoản của mình!",
    options: [
      { text: "📋 Nhận hỗ trợ kiểm tra", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  student: {
    message: "🎓 Chúng tôi có các gói cước ưu đãi dành riêng cho sinh viên. Hãy gọi hotline 0868623393 để biết thêm chi tiết!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  multi_device: {
    message: "📡 Bạn có thể kết nối nhiều thiết bị với Wi-Fi, nhưng tốc độ có thể giảm nếu quá nhiều thiết bị sử dụng đồng thời. Bạn cần hỗ trợ thêm không?",
    options: [
      { text: "📋 Nhận hỗ trợ thêm", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  change_wifi_password: {
    message: "🔑 Để thay đổi mật khẩu Wi-Fi, bạn cần truy cập vào trang quản lý router. Nếu cần hỗ trợ, hãy gọi hotline 0868623393!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  check_bill: {
    message: "📄 Bạn có thể kiểm tra hóa đơn qua ứng dụng hoặc website. Nếu cần hỗ trợ, hãy gọi hotline 0868623393!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  cancel_plan: {
    message: "🛑 Để hủy gói cước, bạn có thể gọi hotline 0868623393 hoặc đến cửa hàng để được hỗ trợ!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  devices: {
    message: "🛠 Chúng tôi cung cấp các thiết bị như router và modem để hỗ trợ dịch vụ. Bạn cần thông tin gì về thiết bị không?",
    options: [
      { text: "📋 Nhận thông tin chi tiết", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  consult: {
    message: "📞 Vui lòng để lại email hoặc số điện thoại, đội ngũ chúng tôi sẽ liên hệ hỗ trợ bạn ngay!",
    input: true,
    next: "end",
  },
  installation_time: {
    message: "⏰ Thời gian lắp đặt thường từ 1-3 ngày làm việc. Nếu cần hỗ trợ, hãy gọi hotline 0868623393!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  setup_modem: {
    message: "🔌 Bạn có thể tham khảo hướng dẫn cài đặt trên website hoặc gọi hotline 0868623393 để được hỗ trợ!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  international: {
    message: "🌐 Chúng tôi cung cấp các gói cước cho dịch vụ quốc tế. Hãy gọi hotline 0868623393 để biết thêm chi tiết!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  change_phone: {
    message: "🔢 Bạn có thể thay đổi số điện thoại tại cửa hàng hoặc qua hotline 0868623393!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  roaming: {
    message: "🌎 Phí chuyển vùng sẽ tùy thuộc vào gói cước bạn chọn. Hãy gọi hotline 0868623393 để biết thêm chi tiết!",
    options: [
      { text: "📞 Gọi hotline", next: "consult" },
      { text: "🏠 Về trang chính", next: "start" },
    ],
  },
  end: {
    message: "🎉 Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm qua thông tin bạn cung cấp.",
  },
};

export default chatScript;