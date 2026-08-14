import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const url
  const [temp,settemp]=useState("0");
  useEffect(()=>{
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
   } else {
    alert("Geolocation is not supported by this browser.");
   }

  },[temp])

  async function success(position) {
    lin(position.coords.latitude,position.coords.longitude);
    result= await fetch(url, {method:"GET"});
    data= await result.json();
    console.log(data.current.temperature_2m);
    temp.innerHTML=data.current.temperature_2m+"°C";
    total.innerHTML="Max Temperature: "+data.daily.temperature_2m_max[0]+"°C, Min Temperature: "+data.daily.temperature_2m_min[0]+"°C";
    uv.innerHTML="UV Index: "+data.daily.uv_index_max[0];

}
  return (
   <>
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 item-center flex flex-col gap-6'>
      <div className='flex items-start text-center'>
        <h1 className='!text-[100px] text-yellow-500 font-medium'>0</h1>
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
