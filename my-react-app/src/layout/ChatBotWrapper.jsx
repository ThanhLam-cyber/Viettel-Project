import React, { useEffect, useRef, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const sendConsultationRequest = async (contactInfo) => {
  try {
    const response = await fetch(`${API_URL}/register-consult`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactInfo }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể gửi yêu cầu tư vấn");
    }

    return { success: true, message: "Yêu cầu tư vấn đã được gửi thành công!" };
  } catch (error) {
    console.error("Lỗi gửi yêu cầu tư vấn:", error);
    return { success: false, message: error.message || "Không thể gửi yêu cầu tư vấn" };
  }
};

const ChatBotWrapper = () => {
  const [chatScript, setChatScript] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [currentStep, setCurrentStep] = useState("start");
  const [history, setHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  // Extract the actual chatScript from the response
  useEffect(() => {
    console.log("Fetching chat script...");
    setIsLoading(true);
    fetch("http://localhost:3000/chat-script")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Raw fetched data:", data);
        const script = data.default || data;
        if (!script.start) {
          throw new Error("Invalid chatScript: missing 'start' step");
        }
        setChatScript(script);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching chatScript:", err);
        setError("Không thể tải chatbot. Vui lòng thử lại sau.");
        setIsLoading(false);
      });
  }, []);

  // Auto-scroll to the bottom when history or step changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentStep]);

  const step = chatScript?.[currentStep];

  const handleOptionClick = (opt) => {
    setHistory((prev) => [
      ...prev,
      { from: "user", text: opt.text },
      { from: "bot", text: step.message },
    ]);
    setCurrentStep(opt.next);
  };

  const handleInputSubmit = async () => {
    if (!userInput.trim()) return;

    // Validate input (email or phone)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput);
    const isPhone = /^\d{10}$/.test(userInput);
    if (!isEmail && !isPhone) {
      setError("Vui lòng nhập email hoặc số điện thoại hợp lệ (10 chữ số).");
      return;
    }

    setIsLoading(true);
    const result = await sendConsultationRequest(userInput);

    if (result.success) {
      setHistory((prev) => [
        ...prev,
        { from: "user", text: userInput },
        { from: "bot", text: step.message || "Cảm ơn bạn đã để lại thông tin! Chúng tôi sẽ liên hệ sớm." },
      ]);
      setUserInput("");
      setError(null);
      setCurrentStep(step.next || "end"); // Move to next step or end
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <img
        src="/anhchatbot.png"
        alt="Chatbot Icon"
        className="fixed bottom-20 md:bottom-10 right-4 w-16 h-16 z-50 cursor-pointer hover:scale-105 transition-transform drop-shadow-xl"
        onClick={() => {
          console.log("Toggling chat, showChat:", !showChat);
          setShowChat(!showChat);
        }}
      />
      {showChat && (
        <div className="fixed bottom-28 right-6 w-[92vw] max-w-sm bg-white border border-gray-300 shadow-2xl rounded-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-[#e60000] text-white px-4 py-3 rounded-t-2xl">
            <h3 className="font-bold text-lg">Hỗ trợ Viettel 🤖</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-xl hover:text-yellow-300 transition"
            >
              ×
            </button>
          </div>
          {/* Chat content */}
          <div className="p-4 h-96 overflow-y-auto bg-gray-50 space-y-3 text-sm scroll-smooth custom-scrollbar">
            {isLoading && (
              <div className="text-center text-gray-500">Đang tải...</div>
            )}
            {error && <div className="text-center text-red-500">{error}</div>}
            {!isLoading && !error && (
              <>
                {chatScript && step ? (
                  <>
                    {history.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex transition-all duration-300 ${
                          msg.from === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`px-4 py-2 rounded-2xl max-w-[80%] shadow ${
                            msg.from === "user"
                              ? "bg-[#e60000] text-white"
                              : "bg-white border border-gray-200 text-gray-800"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {/* Current bot message */}
                    <div className="flex justify-start">
                      <div className="px-4 py-2 rounded-2xl bg-white border border-gray-200 text-gray-800 shadow max-w-[80%]">
                        {step.message}
                      </div>
                    </div>
                    {/* Options */}
                    {step.options && (
                      <div className="flex flex-wrap gap-2 mt-2 justify-start">
                        {step.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleOptionClick(opt)}
                            className="border border-[#e60000] text-[#e60000] hover:bg-[#e60000] hover:text-white px-4 py-1.5 rounded-full text-xs font-medium transition shadow-sm"
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    )}
                    {/* Input field */}
                    {step.input && (
                      <div className="flex gap-2 mt-4 px-1">
                        <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Nhập email hoặc số điện thoại..."
                          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                        />
                        <button
                          onClick={handleInputSubmit}
                          className="bg-[#e60000] hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                        >
                          Gửi
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-red-500">
                    Dữ liệu chatbot không khả dụng. Bước hiện tại: {currentStep}
                  </div>
                )}
              </>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      )}
    </>
  );
};

// Add to your stylesheet (e.g., index.css)
const customScrollbarStyles = `
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e60000;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #c40000;
}
`;

export default ChatBotWrapper;