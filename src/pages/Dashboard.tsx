import { Divider, Table } from 'antd';
import Chart from "react-apexcharts"

const series = [
  {
    name: 'Quantity',
    type: 'column',
    data: [200],
  },
  {
    name: 'Purchase Price',
    type: 'line',
    data: [15000],
  },
  {
    name: 'Selling Price',
    type: 'line',
    data: [17000],
  },
];

const options: any = {
  chart: {
    height: 350,
    type: 'line',
  },
  stroke: {
    width: [0, 4, 4],
  },
  title: {
    text: 'Stock Overview',
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1, 2],
  },
  labels: ['iPhone'],
  xaxis: {
    type: 'category',
  },
  yaxis: [
    {
      title: {
        text: 'Quantity',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Purchase Price',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Selling Price',
      },
    },
  ],
};
function Dashboard() {
  return (
    <div>
      <Divider>Dashboard</Divider>
      <Chart  options={options} series={series} type='line' height={350}/>
    </div>
  )
}

export default Dashboard