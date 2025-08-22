import React,{useEffect,useState} from 'react'
import { global_css } from '../../GlobalCss/GlobalCSS.js'
import axios from "axios";
import config from "../../config.jsx";
import checkicon from '../../assets/static/clicked.svg'
import {useTranslation} from "react-i18next";
import { useAuth } from '../../Context/AuthInfo.jsx';
const SimrequestFilter = ({getfnc,edittext}) => {
    const { user , token, changeLoad } = useAuth();

    const[data,setdata]=useState([])
    const[selected,setselected]=useState('')
    const {t} = useTranslation()
    useEffect(() => {
        GetOperators()
    }, []);



    const GetOperators = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator`,{
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
            console.log('Response:=-=-=-=-=', response.data.operators);
            setdata(response.data.operators)
        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    };

    const handleclick =(e)=>{
      setselected(e)
    }

  return (
    <div  
    style={{borderRadius:global_css.card_border_radius,border:'1px solid #595959',width:'100%',height:"100%",backgroundColor:global_css.primary_card_bg}}>
        <div style={{display:'flex',justifyContent:'center',gap:'5px' ,alignItems:'flex-start',flexDirection:'column',width:'100%' ,height:'100%',padding:'8px 15px'}}>

            <span onClick={()=>handleclick('edit')} style={{display:'flex' ,justifyContent:'center',alignItems:'center',gap:'12px',color:'#FFF',height:'50%',backgroundColor:''}}> <span>{t('selectOperator')}</span></span>
            <div  style={{width:'100%',height:'1px',backgroundColor:'#404040'}}></div>
                    <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',width:'100%',flexDirection:'column',padding:'.6rem',gap:'4px'}}>
                    {data?.map((n)=>{
                        return(
                            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',cursor:'pointer',gap:'3px',color:selected===n.name?'#29CC79':'#FFF'}} 
                            onClick={()=>handleclick(n.name)} onMouseEnter={(e)=>e.currentTarget.style.color='#29CC79'}
                                    onMouseLeave={(e)=>e.currentTarget.style.color=selected===n.name?'#29CC79':'#FFF'}>
                                        <span>{selected === n.name ? <img src={checkicon} style={{width:'14px',height:'14px'}}/>:''} </span>
                                        <span>{n.name}</span>
                                        </div>
                        )
                    })}
                </div>
       <div style={{display:'flex' ,justifyContent:'space-between',alignItems:'center',width:'100%',gap:'1rem'}}>

       <button  onMouseDown={(e) => {
                    e.target.style.backgroundColor = '#999999'; 
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = 'transparent'; 
                  }} onClick={()=>{setselected('');getfnc('')}} className="py-2 px-2 bg-[transparent] text-[#999] font-bold  rounded-[4px] w-[100%]" style={{border:'1px solid #999'}}>Reset</button>


        <button   onMouseDown={(e) => {
                    e.target.style.backgroundColor = '#1EAB5E'; 
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = '#27CF7A'; 
                  }} onClick={()=>getfnc(selected)} className="py-2 px-2 bg-[#27CF7A] text-[#FFF] font-bold  rounded-[4px] w-[100%]" style={{border:'1px solid #27CF7A'}} >{t('search')}</button>

       </div>
        </div>
    </div>
  )
}


export default SimrequestFilter