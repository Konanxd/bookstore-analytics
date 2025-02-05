import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import TestingChart from "../charts/TestingChart";
import TestingCard from "../partials/dashboard/TestingCard";

export default function Pelanggan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <TestingCard></TestingCard>
        </div>
      </div>
    </div>
  );
}
