import { useEffect, useState } from "react";
import { getBestSellingBooks } from "../api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BestSellingBooksChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getBestSellingBooks();
      const labels = data.map((book) => book.judul);
      const salesData = data.map((book) => parseInt(book.total_penjualan));

      setChartData({
        labels,
        datasets: [
          {
            label: "Total Sales",
            data: salesData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }

    fetchData();
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2>📊 Best-Selling Books</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BestSellingBooksChart;
