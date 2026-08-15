import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [temp,settemp]=useState("0");
  const [day,setDay]=useState("Made with meteo API")
  const [min_temp,setMin]=useState("0");
  const [max_temp,setMax]=useState("0");
  const [sunrise,setSunrise]=useState("0");
  const [sunset,setSunset]=useState("0");
  
  const success = async(position) => {
    var i=0;
    try{
      const url=`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&hourly=temperature_2m&current=temperature_2m,is_day&timezone=auto&forecast_days=1`;
      console.log(url);
      const result=await fetch(url, {method:"GET"});
      const data =await result.json();

      //We got the detail in the above part and now we will put that data in frontend.
      setMin(data.daily.temperature_2m_min);
      setMax(data.daily.temperature_2m_max);
      setSunrise(data.daily.sunrise);
      setSunset(data.daily.sunset);


      //code for greeting message based on isDay or not
      if(data.current.is_day==1){
        setDay("Github sharmapushkar2006")
      }else{setDay("Good Night")}
      //code to make the temperature number rise.
      setInterval(()=>{
        if(i<data.current.temperature_2m){
          settemp(i+"° C");
          i+=1;
        }
      },20)
    }catch(err){
      alert("We encountered an error")
    }
}

const error=()=>{
  settemp('Guess what! we encountered an error')
}

useEffect(()=>{
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success,error);
    console.log("Location fetch success! contacting API for data")
   } else {
     console.log("Location not found")
     settemp('Not found')
   }

  },[])

  //frontend code
  return (
   <>
   <div className='fixed left-1/2 top-30 -translate-x-1/2'>
        <h2 className='bg-transparent border border-solid px-5 py-5 border-white rounded-md shadow-md'>{day}</h2>
       <b></b>
    </div>
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 item-center flex flex-col gap-6'>
      <div className='flex items-start text-center'>
        <h1 className='!text-[100px] text-yellow-500 font-medium'>{temp}</h1>
        {/* <label>&deg; C</label> */}
      </div>
      <div className='flex flex-col text-center gap-3'>
         <b className='border border-solid border-white-500 px-4 py-5 rounded-lg shadow-lg'>Sun will rise at: {sunrise}</b>
         <b className='border border-solid border-white-500 px-4 py-5 rounded-lg'>Min Temp: {min_temp}</b>
         <b className='border border-solid border-white-500 px-4 py-5 rounded-lg'>Max Temp: {max_temp}</b>
      </div>
      
    </div>
   </>
  )
}

export default App
