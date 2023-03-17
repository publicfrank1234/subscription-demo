import React from 'react'
import StreamApp from '../components/stream-app/StreamApp'
import Header from "../components/stream-app/Header"

const streamAppPage = () => {
  return ( 
         <div> 
              <Header /> 
              <StreamApp/> 
         </div>
         )
}

export default streamAppPage