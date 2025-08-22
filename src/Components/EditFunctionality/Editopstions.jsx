import React, { useState } from 'react'
import editicon from '../../assets/static/edit.svg'
import pdficon from '../../assets/static/pdficon.svg'
import { global_css } from '../../GlobalCss/GlobalCSS'
const Editopstions = ({getdata,edittext,status}) => {

 

    const handleclick =(e)=>{
       let d={
            'type':e
        }
           
          

            getdata(d)
    }

  return (
    <div  
    style={{borderRadius:global_css.card_border_radius,border:'1px solid #595959',width:'100%',height:"100%",backgroundColor:global_css.primary_card_bg}}>
        <div style={{display:'flex',justifyContent:'center',gap:'5px' ,alignItems:'flex-start',flexDirection:'column',width:'100%' ,height:'100%',padding:'8px 15px'}}>

           {edittext && <span onClick={()=>handleclick('edit')} style={{display:'flex' ,justifyContent:'center',alignItems:'center',gap:'12px',color:'#27CF7A',height:'50%',backgroundColor:''}}><img src={editicon}/>  <span>{edittext}</span></span>} 
            <div  style={{width:'100%',height:'1px',backgroundColor:'#303038'}}></div>
            <span onClick={()=>handleclick('delete')} style={{height:'50%'}}>Delete</span>
            {status === 'approved'?<span onClick={()=>handleclick('pdf_info')} style={{display:'flex' ,justifyContent:'center',alignItems:'center',gap:'4px',color:'#27CF7A',height:'50%',backgroundColor:''}}><img src={pdficon}/>  <span style={{fontSize:'12px'}}>PDF (Order Info)</span></span>:''}
        </div>
    </div>
  )
}

export default Editopstions