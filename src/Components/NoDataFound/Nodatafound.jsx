import React from 'react'
import nodataicon from '../../assets/static/nodatafound.svg'
import { global_css } from '../../GlobalCss/GlobalCSS'

const Nodatafound = ({btn_text,tittle_head,title_des,buttonclicked}) => {


  return (
    <div className="flex justify-center h-full w-full items-center" >
        <div 
         style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',backgroundColor:global_css.primary_card_bg,gap:'1rem',borderRadius:'8px'}}
         >
            <div style={{height:'35%',width:'100%' ,backgroundColor:""}}>
                <img src={nodataicon}style={{height:'100%',width:'100%'}} />
              </div>

            <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1rem'}}>
                <div style={{backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',flexDirection:'column',width:'40%',gap:'1rem'}}>
                    <span style={{fontFamily:'Lexand',color:global_css.primary_txt_color}} className="sm:text-xl md:text-[35px] lg:text-[30px] xl:text-4xl text-3xl">
                        {tittle_head}
                    </span>
                    <span className="sm:text-xl md:text-2xl lg:text-xl xl:text-2xl" style={{color:global_css.secondary_txt_color}}>{title_des}</span>
                </div>
                {btn_text &&
            <button
                onClick={()=>buttonclicked({'clicked':true})}
                onMouseDown={(e) => {
                    e.target.style.backgroundColor = '#1EAB5E'; 
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = '#27CF7A'; 
                  }}
                
              style={{display:'flex',justifyContent:'center' 
              ,alignItems:'center' ,fontStyle:'normal',fontFamily:'inter',borderRadius:'5px'
              ,color:'#FFF',backgroundColor:'#27CF7A',padding:'.5rem 1.5rem'}} >{btn_text} </button>}
            </div>

            </div>

    </div>
  )
}

export default Nodatafound