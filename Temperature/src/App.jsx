import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [temp,settemp]=useState("0");


  const success = async(position) => {
    try{
      const url=`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&hourly=temperature_2m&current=temperature_2m,is_day&timezone=auto&forecast_days=1`;
      const result=await fetch(url, {method:"GET"});
      const data =await result.json();
      var i=0;
      setInterval(()=>{
        if(i<data.current.temperature_2m){
          settemp(i);
          i+=1;
        }
      },50)
    }catch(err){
      alert("We encountered an error")
    }
}

useEffect(()=>{
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
    console.log("Location fetch success! contacting API for data")
   } else {
     console.log("Location not found")
     settemp('Not found')
   }

  },[])

  //frontend code
  return (
   <>
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 item-center flex flex-col gap-6'>
      <div className='flex items-start text-center'>
        <h1 className='!text-[100px] text-yellow-500 font-medium'>{temp}</h1>
        <label>&deg; C</label>
      </div>
      <div className='flex flex-col text-center'>
        <b>City_name</b>
       <b>Max_Temp, Min_temp</b>
      </div>
      
    </div>
   </>
  )
}

export default App
