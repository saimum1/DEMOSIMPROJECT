import React, {useEffect, useState} from 'react';
import bg from "../../assets/static/icons_tower.png"
import {Button, TextInput} from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import emailicon from '../Crediantials/imagesCredintials/Group.svg'
import { global_css } from '../../GlobalCss/GlobalCSS';
import { useParams } from 'react-router-dom';
import axios from "axios";
import config from "../../config.jsx";
import { useAuth } from '../../Context/AuthInfo.jsx';
const Forgotpage = () => {
      const { user , token,valuePass,changeR } = useAuth();
  
    const[issentokay,setissentokay]=useState(true)
    const[email,setEmail]=useState('')

  const SendEmail = async () => {
    try {

        const data = {
          'email' : email
        }
      const response = await axios.post(`${config.apiUrl}/api/auth/forgot-password`, data,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      console.log('Response:', response);
    } catch (error) {
      console.error('Error++++:', error);
      throw error;
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    if (email) {
      // Do something with the email value
      console.log('Email from URL:', email);
      setEmail(email)
    }
  }, []);

  return (
    <div style={{height : 'calc(100vh - 4.5rem)'}}>
    <div  className='bg-[#3A3F44] h-full w-full '>
        <img src={bg} className="h-full w-full" alt=""/>

    </div>
    <div
        className="w-4/12 md:w-6/12 lg:w-4/12"
    style={{height:'auto',display:'flex',justifyContent:'center',alignItems:'center'
    ,position:'absolute',top:'55%' ,left:'50%',transform:"translate(-50%,-45%)",
    backgroundColor:'#303038' ,color:'white',padding:'26px 54px',borderRadius:'16px'}} 
    
    >
        {issentokay? 
        <div style={{backgroundColor:'' ,width:'100%' ,height:'100%',display:'flex' ,justifyContent:'center',
                    alignItems:'center',flexDirection:'column',gap:'1rem' ,fontFamily:'inter'}}>

            <div className="sm:text-xl md:text-[40px] lg:text-[35px] xl:text-5xl text-3xl" style={{display:'flex',justifyContent:'center',alignItems:'flex-start',backgroundColor:'',
            height:'4rem' ,width:'100%',fontFamily:'inter',color:'rgba(255, 255, 255, 0.75)'}}>
                       Forgot Password?
            </div>

    

            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',
            width:'100%',gap:'11px' }}>
                <span style={{width:"100%",color:'rgba(255, 255, 255, 0.75)'}}>Email</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' style={{height:'48px',backgroundColor:'#444444',padding:'1rem' ,border:'none',borderRadius:'10px',fontFamily:'inter',width:'100%',color:'rgba(255, 255, 255, 0.85)',outline:'none'}} placeholder="xyz123@gmail.com"/>
            </div>

            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',
            width:'100%',gap:'11px' }}>
                <button
                onMouseDown={(e) => {
                    e.target.style.backgroundColor = '#1EAB5E'; 
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = '#27CF7A'; 
                  }}
                
                className="py-4 mb-1 border-none rounded-[8px] bg-[#27CF7A] mt-1 font-inter w-full px-4 font-bold" style={{height:'48px',display:'flex',justifyContent:'center' ,alignItems:'center' ,fontStyle:'normal',fontFamily:'inter',color:'#FFF'}} onClick={()=> {
                  setissentokay(!issentokay);
                  SendEmail()
                }}>Send Instruction</button>
            </div>

        </div>
        :

        <div style={{backgroundColor:'' ,width:'100%' ,height:'100%',display:'flex' ,justifyContent:'center',
                    alignItems:'center',flexDirection:'column',gap:'1rem' ,fontFamily:'inter'}}>

            <div  style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#595960',flexGrow:1,
            height:'auto' ,width:'auto',padding:'1.2rem',marginBottom:'1rem',borderRadius:'50%',flexShrink:0}}>
                     <img src={emailicon} width={60} height={60}/>
            </div>

    

            <div className="sm:text-xl md:text-[40px] lg:text-3xl xl:text-5xl text-3xl "  style={{display:'flex',justifyContent:'center',alignItems:'flex-start',backgroundColor:'',flexGrow:1,
            height:'3rem' ,width:'100%',fontFamily:'inter',color:'rgba(255, 255, 255, 0.75)'}}>
                       Check your email
            </div>

            <div className="sm:text-xl md:text-2xl lg:text-2xl" style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'',flexGrow:1,textAlign:'center',
            height:'3rem' ,width:'100%',fontFamily:'inter',color:global_css.secondary_txt_color,fontSize:'18px',flexDirection:'column'}}>
                      <span>We have sent a password recover</span>  
                      <span>instructions to your email</span>
            </div>

            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',
            width:'100%',gap:'11px' }}>
                <button
                onMouseDown={(e) => {
                    e.target.style.backgroundColor = '#1EAB5E'; 
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = '#27CF7A'; 
                  }}
                
                className="py-4 mb-1 border-none rounded-[8px] bg-[#27CF7A] mt-1 font-inter w-full px-4 font-bold" style={{height:'48px',display:'flex',justifyContent:'center' ,alignItems:'center' ,fontStyle:'normal',fontFamily:'inter',color:'#FFF'}} ><a href='/setnewpassword'  onClick={()=>window.location.href = 'mailto:'} >Open email app</a> </button>
            </div>

        </div>}
    </div>
    <style jsx="true">
        {
            `
            .texthover:hover{
                color:red;
            }
                input[type="checkbox"] {
                    opacity: 0; /* Hide the visually */
                    position: absolute; /* Remove from layout */
                }
              .checkbox-container {
                display: inline-block;
                position: relative;
                padding-left: 25px; /* Adjust for checkbox size */
              }

              .checkbox-checkmark {
                position: absolute;
                top: -14px;
                left: 0.5px;
                height: 15px; /* Adjust for checkbox size */
                width: 15px; /* Adjust for checkbox size */
                border: 1px solid #ccc; /* Adjust border color */
                border-radius: 3px;
              }

              input[type="checkbox"]:checked + .checkbox-checkmark {
                background-color: #27CF7A; /* Checked state color */
              }

            
            `
        }
    </style>
</div>
  )
}

export default Forgotpage