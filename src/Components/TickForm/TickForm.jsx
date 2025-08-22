import React from 'react'
import tickwhite from '../../assets/static/tick.svg'
import tickgreen from '../../assets/static/tickgreen.svg'


const TickForm = ({status}) => {
  return (
    <span className="checkbox-icon" style={{transition:'all 300ms'}}>
        {status ? (
             <img src={tickgreen} 
            //  style={{width:'18px',height:'18px',transition:'all 300ms'}}
             />
        ) : (
            <img src={tickwhite} 
            // style={{width:'18px',height:'18px',transition:'all 300ms'}}
            />

        )}
      </span>
  )
}

export default TickForm