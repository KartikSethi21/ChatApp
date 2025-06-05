
import { ArcElement, CategoryScale, Chart as ChartJs, Filler, Legend, LinearScale, LineElement, plugins, PointElement, scales, Tooltip } from 'chart.js'
import React from 'react'
import { Doughnut, Line } from 'react-chartjs-2';
import {orange, purple } from "../../constants/color";
import { getLast7Days } from '../../lib/features';

ChartJs.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
    ArcElement,
    Legend,
    Tooltip
);

const labels=getLast7Days();

const lineChartsOptions={
    responsive:true,
    plugins:{
        legend:{
            display : false,
        },
        title:{
            display : false,
        },
    },
    scales:{
      x:{
        grid:{
          display:false
        }
        // display:false
      },
      y:{
        beginAtZero:true,
        grid:{
          display:false
        }
        // display:false
      }
    }
};

const LineChart = ({value=[]}) => {
    const data={
        labels,
        datasets:[
        //   {
        //   data:value,
        //   label:"Revenue",
        //   fill:false,
        //   backgroundColor:"rgba(75,192,192,0.2)",
        //   borderColor:"rgba(75,192,192,1)",
        // },
        {
          data:value,
          label:"Revenue 2",
          fill:true,
          backgroundColor:"rgba(75,12,192,0.2)",
          borderColor:purple,
        },
      ],
    };
    return (
      <Line data={data} options={lineChartsOptions}/>
    )
  }

  const doughnutChatOptions={
    responsive:true,
    plugins:{
      legend:{display:false},
      title:{display:false},
    },
    cutout:120,
  };
  const DoughnutChart = ({value=[],labels}) => {
    const data={
      labels,
      datasets:[
      {
        data:value,
        // label:"Total Chats vs Group Chats",
        backgroundColor:["rgba(75,12,192,0.2)","rgba(234,112,112,0.2)"],
        hoverBackgroundColor:[purple,orange],
        borderColor:[purple,orange],
        offset:40,
      },
    ],
    };
    return (
      <Doughnut 
      style={{zIndex:10}}
      data={data} options={doughnutChatOptions}/>
    );
  }

export  {LineChart,DoughnutChart}