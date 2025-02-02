import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import GuestLayout from "./layouts/GuestLayout";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from Flask backend
    axios
      .get("http://127.0.0.1:5000/api/data")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <GuestLayout></GuestLayout>
    </div>
  );
}

export default App;
