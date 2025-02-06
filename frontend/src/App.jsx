import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Buku from "./pages/DataManage/Buku";
import Pelanggan from "./pages/DataManage/Pelanggan";
import Login from "./pages/auth/login";
import Pesanan from "./pages/OrderManage/Pesanan";
import Pengiriman from "./pages/OrderManage/Pengiriman";
import Penerbit from "./pages/DataManage/Penerbit";
import Genre from "./pages/DataManage/Genre";
import Penulis from "./pages/DataManage/Penulis";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/data/buku" element={<Buku />} />
        <Route exact path="/data/pelanggan" element={<Pelanggan />} />
        <Route exact path="/data/penerbit" element={<Penerbit />} />
        <Route exact path="/data/genre" element={<Genre />} />
        <Route exact path="/data/penulis" element={<Penulis />} />
        <Route exact path="/order/pesanan" element={<Pesanan />} />
        <Route exact path="/order/pengiriman" element={<Pengiriman />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
