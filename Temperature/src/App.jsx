import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [temp,settemp]=useState("Locating..");
  var url;
  function lin(x,y){
    url=`https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&hourly=temperature_2m&current=temperature_2m,is_day&timezone=auto&forecast_days=1`
  }

  async function success(position) {
    lin(position.coords.latitude,position.coords.longitude);
    result= await fetch(url, {method:"GET"});
    data= await result.json();
    console.log(data.current.temperature_2m);
    temp.innerHTML=data.current.temperature_2m+"°C";
    total.innerHTML="Max Temperature: "+data.daily.temperature_2m_max[0]+"°C, Min Temperature: "+data.daily.temperature_2m_min[0]+"°C";
    uv.innerHTML="UV Index: "+data.daily.uv_index_max[0];

}



useEffect(()=>{
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
    console.log("Location fetch success! contacting API for data")
   } else {
     console.log("Location not found")
     settemp('Not found')
   }

  },[temp])
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
