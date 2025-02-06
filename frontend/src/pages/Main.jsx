import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import BarChart from "../components/chart/BarChart";
import PieChart from "../components/chart/PieChart";
import LineChart from "../components/chart/LineChart";
import StackedBar from "../components/chart/StackedBar";

export default function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto flex flex-col gap-4">
            <div className="bg-white w-full h-[200px] rounded-2xl"></div>
            <div className="grid grid-cols-2 w-full gap-8">
              <PieChart />
              <BarChart />
              <LineChart />
              <StackedBar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
