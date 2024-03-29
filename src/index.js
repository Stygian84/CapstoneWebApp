// This file is to define all the routes
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { HomeMonitoringContent, HomeMonitoringTop } from "./pages/homemonitoring";
import { GraphicContent, GraphicTop } from "./pages/graphic";
import { LevelContent, LevelTop } from "./pages/level";
import { StatusContent, StatusTop } from "./pages/status";
import { PlantContent, PlantTop } from "./pages/plant";
import { PlantStatusContent, PlantStatusTop } from "./pages/plantstatus";
import { Divider } from "@mui/material";
import { ParameterDetailsContent, ParameterDetailsTop } from "./pages/parameterdetails";
import { gettoken } from "./firebase";
import axios from "axios";
import { HarvestContent, HarvestTop } from "./pages/harvest";
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
  const [isTokenFound, setTokenFound] = useState(false);
  const [tokenValue, setTokenValue] = useState(null);
  const [UID, setUID] = useState(null);

  //Retrieve Token
  useEffect(() => {
    gettoken(setUID, setTokenFound, setTokenValue);
  }, []);

  //Send Token
  useEffect(() => {
    if (isTokenFound && UID != null) {
      axios.post(
        process.env.REACT_APP_RENDER_URL + "/post/token",
        {
          UserID: UID,
          token: tokenValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }, [isTokenFound]);

  return (
    <Routes>
      <Route path="/" exact element={<HomeMonitoringTop />} />
      <Route path="/row" element={<LevelTop />} />
      <Route path="/camera/*" element={<GraphicTop />} />
      <Route path="/status/*" element={<StatusTop />} />
      <Route path="/plant/*" element={<PlantTop />} />
      <Route path="/details/*" element={<PlantStatusTop />} />
      {/* <Route path="/settings" element={<SettingsTop />} /> */}
      <Route path="/harvest" element={<HarvestTop />} />
      <Route path="/settings" element={<HomeMonitoringTop />} />
      <Route path="/parameterdetails/*" element={<ParameterDetailsTop />} />
    </Routes>
  );
}

function Content() {
  return (
    <Routes>
      <Route path="/" exact element={<HomeMonitoringContent />} />
      <Route path="/row" element={<LevelContent />} />
      <Route path="/camera/*" element={<GraphicContent />} />
      <Route path="/status/*" element={<StatusContent />} />
      <Route path="/plant/*" element={<PlantContent />} />
      <Route path="/details/*" element={<PlantStatusContent />} />
      {/* <Route path="/settings" element={<SettingsContent />} /> */}
      <Route path="/harvest" element={<HarvestContent />} />
      <Route path="/settings" element={<HomeMonitoringContent />} />
      <Route path="/parameterdetails/*" element={<ParameterDetailsContent />} />
    </Routes>
  );
}
