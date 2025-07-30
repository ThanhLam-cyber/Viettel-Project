const viettelSimData = {
  "goi5GData": [
    {
      name: "5G135N",
      price: 135000,
      data: "6GB/ngày",
      tv360: "Miễn phí TV360 4K",
      mybox: "20GB"
    },
    {
      name: "5G150N",
      price: 150000,
      data: "8GB/ngày",
      tv360: "Miễn phí TV360 4K",
      mybox: "30GB"
    }
  ],
  "goi5GDataZone": {
    zone12: [
      "Đà Nẵng", "Quảng Nam", "Quảng Bình", "Hồ Chí Minh", "Cần Thơ",
      "Cà Mau", "Bạc Liêu", "Đồng Tháp", "Vĩnh Long", "Kiên Giang", "Hậu Giang", "Long An"
    ],
    monthlyPlans: [
      {
        name: "SD125Z",
        price: 125000,
        duration: "30 ngày",
        data: "8GB/ngày",
        zoneData: "03GB toàn quốc + 05GB trong Zone",
        tv360: "Miễn phí TV360 4K"
      },
      {
        name: "3SD125Z",
        price: 375000,
        duration: "90 ngày",
        data: "9GB/ngày",
        zoneData: "03GB toàn quốc + 06GB trong Zone",
        tv360: "Miễn phí TV360 4K"
      },
      {
        name: "6SD125Z",
        price: 750000,
        duration: "180 ngày",
        data: "9GB/ngày",
        zoneData: "03GB toàn quốc + 06GB trong Zone",
        tv360: "Miễn phí TV360 4K"
      },
      {
        name: "12SD125Z",
        price: 1500000,
        duration: "360 ngày",
        data: "10GB/ngày",
        zoneData: "03GB toàn quốc + 07GB trong Zone",
        tv360: "Miễn phí TV360 4K"
      }
    ],
    dailyPlan: {
      name: "SD125T",
      price: 125000,
      data: "10GB/ngày",
      zoneData: "03GB toàn quốc + 07GB Zone",
      zone: ["Đà Nẵng", "Cần Thơ", "Hồ Chí Minh", "Bạc Liêu", "Cà Mau"],
      tv360: "Miễn phí TV360 4K"
    }
  },
  "goi5GCombo": [
    {
      name: "5G160B",
      price: 160000,
      data: "4GB/ngày",
      otherCallMinutes: "100 phút",
      viettelCall: "10 phút/cuộc",
      tv360: "Miễn phí TV360 4K",
      mybox: "20GB"
    },
    {
      name: "5G180B",
      price: 180000,
      data: "6GB/ngày",
      otherCallMinutes: "100 phút",
      viettelCall: "10 phút/cuộc",
      tv360: "Miễn phí TV360 4K",
      mybox: "30GB"
    },
    {
      name: "5G230B",
      price: 230000,
      data: "8GB/ngày",
      otherCallMinutes: "150 phút",
      viettelCall: "15 phút/cuộc",
      tv360: "Miễn phí TV360 4K",
      mybox: "50GB"
    },
    {
      name: "5G280B",
      price: 280000,
      data: "10GB/ngày",
      otherCallMinutes: "200 phút",
      viettelCall: "20 phút/cuộc",
      tv360: "Miễn phí TV360 4K",
      mybox: "70GB"
    },
    {
      name: "5G330B",
      price: 330000,
      data: "12GB/ngày",
      otherCallMinutes: "200 phút",
      viettelCall: "20 phút/cuộc",
      tv360: "Miễn phí TV360 4K",
      mybox: "100GB"
    },
    {
      name: "5G380B",
      price: 380000,
      data: "15GB/ngày",
      otherCallMinutes: "300 phút",
      viettelCall: "20 phút/cuộc",
      tv360: "Miễn phí TV360 4K",
      mybox: "150GB"
    },
    {
      name: "5G480B",
      price: 480000,
      data: "20GB/ngày",
      otherCallMinutes: "300 phút",
      viettelCall: "20 phút/cuộc",
      tv360: "Miễn phí TV360 4K",
      mybox: "200GB"
    }
  ],
  "goi5GDacBiet": [
    {
      name: "5GLQ190",
      price: 190000,
      data: "6GB/ngày",
      extra: "MP Liên Quân Mobile (2GB/ngày)",
      viettelCall: "Miễn phí TV360 4K",
      mybox: "30GB"
    },
    {
      name: "5GLQ210",
      price: 210000,
      data: "10GB/ngày",
      extra: "100 phút",
      viettelCall: "20 phút/cuộc",
      tv360: "Miễn phí TV360 4K",
      mybox: "50GB"
    }
  ],
  "note": "* Một esim/sim vật lý giá 50.000 đồng (Bảng giá trên chưa bao gồm giá sim)"
};
module.exports = viettelSimData