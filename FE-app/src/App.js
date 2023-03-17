import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage"
import StreamAppPage from "./pages/StreamAppPage"
import SubscriptionPage from "./pages/SubscriptionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />}> </Route>
        <Route path="/app" element={<StreamAppPage />}> </Route>
        <Route path="/subscription" element={<SubscriptionPage />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
