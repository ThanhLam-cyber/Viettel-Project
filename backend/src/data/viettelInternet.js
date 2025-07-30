const viettelInternet = [
  {
    name: "NETVT1_T",
    description: "Vùng phủ 2-3 phòng, hoc online. 15 thiết bị kết nối đồng thời.",
    wifiDevices: 1,
    bandwidth: "300Mbps",
    ftth: 180000,
    comboGiaiTri: {
      app:200000,
      box:220000
    },
    comboDangCap: {
      app:230000,
      box:230000
    },
    comboKPlus: {
      app:359000,
      box:379000
    },
  },
  {
    name: "NETVT2_T",
    description: "2-3 phòng, Video 4K, hop truc tuyền. 15 thiết bị kết nối đồng thời.",
    wifiDevices: 1,
    bandwidth: "500Mbps - 1Gbps",
    ftth: 240000,
    comboGiaiTri: {
      app:260000,
      box:280000
    },
    comboDangCap: {
      app:290000,
      box:290000
    },
    comboKPlus: {
      app:419000,
      box:439000
    },
  },
  {
    name: "MESHVT1_T",
    description: "Vùng phủ 2-5 phòng, nhá 1-2 tầng. 25 thiết bị kết nối đồng thời.",
    wifiDevices: 2,
    bandwidth: "300Mbps",
    ftth: 210000,
    comboGiaiTri: {
      app:230000,
      box:250000
    },
    comboDangCap: {
      app:260000,
      box:260000
    },
    comboKPlus: {
      app:389000,
      box:409000
    },
  },
  {
    name: "MESHVT2_T",
    description: "Vùng phủ 5-8 phòng, nhá 1-3 tầng. 30 thiết bị kết nối đồng thời.",
    wifiDevices: 3,
    bandwidth: "500Mbps - 1Gbps",
    ftth: 245000,
   comboGiaiTri: {
      app:265000,
      box:285000
    },
    comboDangCap: {
      app:295000,
      box:295000
    },
    comboKPlus: {
      app:424000,
      box:444000
    },
  },
  {
    name: "MESHVT3_T",
    description: "Vùng phủ 6-10 phòng, nhá 1-4 tầng. 40 thiết bị kết nối đồng thời.",
    wifiDevices: 4,
    bandwidth: "500Mbps - 1Gbps",
    ftth: 299000,
     comboGiaiTri: {
      app:319000,
      box:339000
    },
    comboDangCap: {
      app:349000,
      box:349000
    },
    comboKPlus: {
      app:478000,
      box:498000
    },
  },
];

const prepaidFees = {
  note: "Tất cả các gói cước trang bị Modem Wifi-6 2 băng tần.",
  prepaidOptions: [
    {
      duration: "06 tháng",
      fee: 300000,
      discount: "Không tặng",
    },
    {
      duration: "12 tháng",
      fee: 300000,
      discount: "Tặng 01 tháng",
    },
  ],
};



module.exports = { viettelInternet, prepaidFees };