import {
    ResultToday,
    ResultMonth,
    ChartContainer
} from "./home.styles";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Các Mặt Hàng Bán Chạy Nhất Tháng Này',
        font: {
            size: 21
        }
      },
    },
  };
  
  const labels = ['Hàng 5', 'Hàng 4', 'Hàng 1', 'Hàng 3', 'Hàng 2'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Doanh Thu',
        data: [5200000,7400000,11500000,15900000,23100000],
        backgroundColor: '#e05454',
        barThickness: 50
      }
    ]
  };
  
const Home = () => {
    return (
        <section>
            <ResultToday>
                <p>Doanh Thu Hôm Nay</p>
                <p>1 Hóa Đơn</p>
                <p>1,395,000 Vnđ</p>
            </ResultToday>
            <ResultMonth>
                <p>Doanh Thu Tháng Này</p>
                <p>312 Hóa Đơn</p>
                <p>32,500,000 Vnđ</p>
            </ResultMonth>
            <ChartContainer>
                <Bar
                    data={data}
                    options={options}/>
            </ChartContainer>
        </section>
    );
}
export default Home;