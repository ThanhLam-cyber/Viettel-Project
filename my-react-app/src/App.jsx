import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/HomePage";
import SimPlanDetailPage from "./pages/SimPlanDetailPage";
import InternetPlanDetail from "./pages/InternetPlanDetail";
import PaymentPage from "./pages/PaymentPage";
import BusinessPage from "./pages/BusinessPage";
import { useEffect } from "react";
import { preventSiteSpam } from "./secure/rateLimit";
function App() {
  // useEffect(() => {
  //   const allowed = preventSiteSpam("site-access", 3, 60, 10);

  //   if (!allowed) {
  //     alert("Bạn đã truy cập quá thường xuyên. Vui lòng đợi một lúc rồi thử lại.");
  //     document.body.innerHTML = "<h1 style='text-align:center;margin-top:20%'>Đã vượt quá giới hạn truy cập. Vui lòng quay lại sau.</h1>";
  //   }
  // }, []);

  return (
    <Router>
      <Routes>
        {/* Dùng chung DefaultLayout */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/goi-cuoc/:planCode" element={<SimPlanDetailPage />} />
          <Route path="/goi-internet/:planCode" element={<InternetPlanDetail />} />
          <Route path="/doanh-nghiep" element={<BusinessPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
