import { useState, useEffect} from 'react'
import './App.css'

function App() {
  return (
   <>
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex'>
      <h1 className='!text-[100px] text-yellow-500 font-medium'>0</h1>
      <label>&deg; C</label>
    </div>
   </>
  )
}

export default App
