"use client"
import data from '@/data/data'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { XAxis, YAxis, LineChart, Line, Tooltip, AreaChart, Area, CartesianGrid } from 'recharts';

const Data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];

const ChildrenChart = () => {
    const params = useParams();
    const id = params.id;
    const [chartData, setChartData] = useState(null);
    console.log("found", chartData);

    const findItemById = (items, id) =>{
        // console.log("all data",items)
        for(let item of items){
            if(item.id === id) return item;
            if(item.children){
                const found = findItemById(item.children, id);
                if(found) return found;
            }
        }
        return null;
    }

    useEffect(() =>{
        // const item = data.find((item) => item.id === id);
        if(id){
            const item = findItemById(data, id);

            // console.log("hell", item);
            if(item){
                setChartData(item);
            }            
        }
    },[id])
    
  return (
    <div>
      {/* <h1>{chartData.name}</h1> */}
      {/* <h1>{chartData.map((item)=>)}</h1> */}
      <div className='m-10'>
        <AreaChart width={800} height={500} data={Data} margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
        <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
            <Tooltip />
        </AreaChart>
      </div>
    </div>
  )
}

export default ChildrenChart
