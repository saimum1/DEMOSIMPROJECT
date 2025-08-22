import React,{useState,useEffect} from 'react'
import successicon from '../../assets/static/checok.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import fileicon from '../../assets/static/File.png'
import fileiconred from '../../assets/static/trashred.png'
import deleteicon from '../../assets/static/trash.svg'
import deleteicongreen from '../../assets/static/trashgreen.svg'
import { progress } from 'framer-motion';
import config from "../../config.jsx";
import {useAuth} from "../../Context/AuthInfo.jsx";
import axios from 'axios';

const VideoUploader =  ({filex,geturl,bannerStatus}) => {
    const { user , token } = useAuth();
    const[message,setMessage]=useState(false)
    const[boxClose,setboxClose]=useState(false)
    const [progress, setProgress] = useState(0);
    const[filename,setfilename] = useState(0);
    const[fileSize,setfileSize] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [statuscode, setstatuscode] = useState(true);


  const uploadFile = async(file) => {
    setProgress(0)
    console.log("filedsfsdfs",file)
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      `${config.apiUrl}/api/minioapi/upload/?isBanner=${bannerStatus}`, 
      formData, 
      {
          headers: {
              Authorization: `Bearer ${token}`
          },
          onUploadProgress: (progressEvent) => {
              const progressd = parseInt((progressEvent.loaded / progressEvent.total) * 100);
              console.log("showing pr", progressd);
              setProgress(progressd);
          }
      }
  );

    // const response = await axios.post(`${config.apiUrl}/api/minioapi/upload/?isBanner=${bannerStatus}`, formData, {
    //     onUploadProgress: (progressEvent) => {
    //         const progressd = parseInt((progressEvent.loaded / progressEvent.total) * 100) ;
    //                 console.log("showing pr",progressd)
    //                 setProgress(progressd)
    //     }},{
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     },)
    console.log('ssdeesds', response?.status);
  //   if(response){
  //     setstatuscode(true)
  //     setTimeout(() => {
  //         setMessage(false)
  //         setboxClose(true)
  //     }, 1000);
  //     setTimeout(() => {
  //         setboxClose(false)
  //         setProgress(0)
  //     }, 1300);

  //     console.log("shoowing clg",response)
  //     geturl(response)
  // }
    if(response?.status === 200){  
        setstatuscode(true)
        setTimeout(() => {
            setMessage(false)
            setboxClose(true)
        }, 1000);
        setTimeout(() => {
            setboxClose(false)
            setProgress(0)
        }, 1300);

        console.log("shoowing clg",response)
        geturl(response)
    }else{
        setstatuscode(false)
        // setTimeout(() => {
        // setMessage(false)
        // setboxClose(true)
        // }, 1000);
        // setTimeout(() => {
        //     setboxClose(false)
        //     setProgress(0)
        // }, 1300);

    }

  }

  useEffect(() => {

    if(filex){ 
        setMessage(true)
        setfilename(filex.name)
        setfileSize(((filex.size)/(1000)).toFixed(2))
        uploadFile(filex)
    
    }else{
        setMessage(false)
    }

    setIsHovered(false)

  }, [filex])
  

  return (

    <div 
     style={{ 
        transition:'all 500ms',
        position: 'fixed', top: '2%', right: '2%',display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B2B33',
        width:message===true?'20rem':boxClose === false? '0rem':'22rem',
        height:'5.4rem',
        margin:message === false && boxClose  === false ? '0' : '0 0 1rem 0',
        padding: message === false && boxClose  === false ? '0' : '1.5rem 0.5rem',
        borderRadius:message === false && boxClose  === false ? '0' : '8px',
        border:message === false && boxClose  === false ? '0' : '1px solid #999999',
        color:'#FFFFFF',
        fontSize:'14px' ,
        zIndex:'10000'}}
        >
    <div
     
        style={{transition:'all 500ms',visibility: message === false && boxClose  === false ?'hidden': 'visible'  , opacity: message === false && boxClose  === false ? '0' : '1',
         display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',width:'100%',height:'100%',backgroundColor:'',gap:'1rem'
        }}
      >

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',backgroundColor:'',flex:'1',width:'100%',gap:'1rem',height:'100%',paddingTop:'4px'}}>

            <div  style={{flex:1}}> <img src={statuscode === true? fileicon : fileiconred} /></div>
            <div style={{flex:7,display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'column'}}>
                <span style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '200px'}}>{statuscode === false ? 'Upload failed , try again' :filename && filename}</span>
              {statuscode === true  ?<span>{fileSize && fileSize} KB</span>: <span style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '200px'}}> {filename && filename }</span>}  
                </div>
            <div style={{flex:1 ,cursor:'pointer',transition:'all 400ms'}} onClick={()=>setMessage(false)}
            onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}
            
            > <img style={{transition:'all 400ms'}} src={isHovered === true ?deleteicongreen:  deleteicon}/></div>

        </div>
       

        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'',flex:'1',width:'100%',height:'100%'}}>

        <div  style={{flex:1}}> </div>
        {/* <div>failed to upload</div> */}

        {statuscode === true ?
            <div style={{flex:6,display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                    <div className="progress-container" >
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>

                        <div className="progress-label">{progress}%</div>
                </div>
                 :<span style={{color:'red',display:'flex',justifyContent:'flex-start',alignItems:'flex-start',width:'85%'}}>try again</span> }
        
        </div>
           
      </div>
    

      <style jsx>
        {`
        
       

        .progress-container {
            display: flex;
            align-items: center;
            width: 100% ;
            border-radius: 8px;
            // padding: 10px; 
            background-color: #404040; 

            
          }
          
          .progress-bar {

            height: 8px; 
            background-color: #4CAF50; 
            border-radius: 8px; 
            transition: width 0.5s ease-in-out; 
          }
          
          .progress-label {
            font-size:12px;
            margin-left: 8px; /* Spacing between progress bar and label */
            color: white; /* Text color */
          }
          
        
        `}
      </style>

  </div>
  )
}


export default VideoUploader