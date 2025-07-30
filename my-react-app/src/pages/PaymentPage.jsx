import React from "react";
import QRCodeImage from "/qr.jpg"; // Path to your QR code image

function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Thanh toán</h1>
      <img
        src={QRCodeImage}
        alt="QR Code for Payment"
        className="h-[35rem] w-96" // Increased height to 28rem (448px), width remains 24rem (384px)
      />
      <p className="mt-4 text-gray-700 text-center">
        Quét mã QR để thực hiện thanh toán
      </p>
    </div>
  );
}

export default PaymentPage;