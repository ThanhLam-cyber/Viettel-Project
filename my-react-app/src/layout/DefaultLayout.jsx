import { Outlet } from "react-router-dom";
import Header from "./Header";
import ServiceOptionsForMobile from "./ServiceOptionsForMobile";
import ChatBotWrapper from "./ChatBotWrapper";
import Footer from "./Footer";
import HelpCenter from "./HelpCenter";
import { useState } from "react";

function DefaultLayout() {
  const [refs, setRefs] = useState({
    scrollToInternet: null,
    scrollTo5g: null,
    scrollToCamera: null,
    scrollToBusinessPackage: null,
  });

  return (
    <div>
      <Header />
      <Outlet context={{ setRefs }} />
      <ServiceOptionsForMobile
        scrollToInternet={refs.scrollToInternet}
        scrollTo5g={refs.scrollTo5g}
        scrollToCamera={refs.scrollToCamera}
        scrollToBusinessPackage={refs.scrollToBusinessPackage}
      />
      <ChatBotWrapper />
      <HelpCenter />
      <Footer />
    </div>
  );
}

export default DefaultLayout;