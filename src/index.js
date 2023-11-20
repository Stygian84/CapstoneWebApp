import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import {
  HomeMonitoringContent,
  HomeMonitoringTop,
} from "./pages/homemonitoring";
import { CameraContent, CameraTop } from "./pages/camera";
import { RowContent, RowTop } from "./pages/row";
import { StatusContent, StatusTop } from "./pages/status";
import { SettingsContent, SettingsTop } from "./pages/settings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div id="wrapper" className="wrapper">
        <Top />
        <Content />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

function Top() {
  return (
    <Routes>
      <Route path="/" exact element={<HomeMonitoringTop />} />
      <Route path="/row" element={<RowTop />} />
      <Route path="/camera/*" element={<CameraTop />} />
      <Route path="/status/*" element={<StatusTop />} />
      <Route path="/settings" element={<SettingsTop />} />
    </Routes>
  );
}

function Content() {
  
  return (
    <Routes>
      <Route path="/" exact element={<HomeMonitoringContent />} />
      <Route path="/row" element={<RowContent />} />
      <Route path="/camera/*" element={<CameraContent />} />
      <Route path="/status/*" element={<StatusContent />} />
      <Route path="/settings" element={<SettingsContent />} />
    </Routes>
  );
}
