import React from 'react'
import { global_css } from '../../GlobalCss/GlobalCSS'
import spinnericon from '../../assets/static/spinner.svg'
const LoadingSoS = () => {
  return (
    <div 
    style={{opacity:'0.8',height : '87%',width:'82%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',backgroundColor:global_css.primary_card_bg,gap:'1rem',borderRadius:'8px',position:'absolute',zIndex:'1000000'}}
    >
       <img src={spinnericon} style={{backgroundColor:'transparent' ,width:'85px',height:'112px'}} alt='loader'/>

       </div>
  )
}

export default LoadingSoS