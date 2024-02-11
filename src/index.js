import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { HomeMonitoringContent, HomeMonitoringTop } from "./pages/homemonitoring";
import { CameraContent, CameraTop } from "./pages/camera";
import { RowContent, RowTop } from "./pages/row";
import { StatusContent, StatusTop } from "./pages/status";
// import { SettingsContent, SettingsTop } from "./pages/settings";
import { PlantContent, PlantTop } from "./pages/plant";
import { PlantStatusContent, PlantStatusTop } from "./pages/plantstatus";
import { Divider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div id="wrapper" className="wrapper">
        <Top />
        <Divider className="divider" variant="middle" />
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
      <Route path="/plant/*" element={<PlantTop />} />
      <Route path="/details/*" element={<PlantStatusTop />} />
      {/* <Route path="/settings" element={<SettingsTop />} /> */}
      <Route path="/settings" element={<HomeMonitoringTop />} />
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
      <Route path="/plant/*" element={<PlantContent />} />
      <Route path="/details/*" element={<PlantStatusContent />} />
      {/* <Route path="/settings" element={<SettingsContent />} /> */}
      <Route path="/settings" element={<HomeMonitoringContent />} />
    </Routes>
  );
}
