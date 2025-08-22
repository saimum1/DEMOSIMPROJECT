import React,{useState,useEffect} from 'react'
import successicon from '../../assets/static/checok.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import deleteicon from '../../assets/static/trash.svg'
import deleteicongreen from '../../assets/static/trashgreen.svg'
const Popnotification = ({msg, showpopoup, status,type}) => {

    const[message ,setMessage]=useState('')
    const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {

    if(showpopoup === true){

  
 
   if(msg !==''){
    setMessage(msg)

    if(type==='fixed'){

    }else{
      setTimeout(() => {
        setMessage('')
    
        }, 4000);
    }
   
   }
  }
  }, [showpopoup])
  

  return (

    <div className={message === ''? 'closeboxE':'openboxE'} style={{ 
      transition:'all 300ms',
      position: 'fixed', top: '2%', right: '2%',display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2B2B33',
    // borderRadius: '8px',
    // border:'1px solid #999999',
    // margin: '0 0 1rem 0',
    // padding:'1rem',
    // color:'#FFFFFF',
    // fontSize:'14px' ,
    zIndex:'1000000'}}>
  

  {message && 
    <div
     
        style={{
         display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',width:'100%',height:'100%',gap:'1rem'
        }}
      >
            <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}> 
                <span > 
                  {status==='success'?<img src={successicon}/> : <FontAwesomeIcon style={{width : '15px', height : '15px', color : '#DC4446'}} icon={faCircleXmark} />} 
                  </span>  
              
              <span>
              <div style={{cursor:'pointer',transition:'all 400ms'}} onClick={()=>setMessage('')}
                onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}
            
            > 
            {/* <img style={{transition:'all 400ms'}} src={isHovered === true ?deleteicongreen:  deleteicon}/> */}
            </div>
              </span>
              
                </div>
            <div >{msg}</div>
      </div>
    }

      <style jsx>
        {`
        
        .openboxE{
            width:20rem;
            transition:all 800ms;
            height:5rem;
            min-height:4.5rem;
            background-color: #2B2B33;
            border-radius: 8px;
            border:1px solid #999999;
            margin: 0 0 1rem 0;
            padding:1rem;
            color:#FFFFFF;
            font-size:14px;
        }

        .closeboxE{
            width:0rem;
            transition:all 800ms;
            // max-height:5rem;
            min-height:4.5rem;
        }
        
        `}
      </style>

  </div>
  )
}

export default Popnotification