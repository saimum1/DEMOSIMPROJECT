import React, { useState } from 'react'
import { global_css } from '../../GlobalCss/GlobalCSS'
const NewEditOption = ({getdata,optionList,status, setNow, now}) => {




    const handleclick =(e)=>{
        let d={
            'type':e
        }



        getdata(d)
    }

    return (
        <div
            style={{borderRadius:global_css.card_border_radius,border:'1px solid #595959',width:'100%',height:"100%",  backgroundColor:global_css.primary_card_bg}}>
            <div style={{display:'flex',justifyContent:'center',gap:'5px' ,alignItems:'flex-start',flexDirection:'column',width:'100%' ,height:'100%',padding:'8px 15px'}}>

                {optionList?.map((item, index) =>  <span onMouseEnter={() => setNow(item.type)} onClick={()=> {
                    handleclick(item?.type);

                }} style={{display:'flex' ,justifyContent:'center',alignItems:'center',gap:'12px',color:`${item.type === now? '#27CF7A' : '#F5F5F5'}`,height:'50%',backgroundColor:''}}>{item?.icon} <span style={{textWrap : 'wrap'}}>{item?.text}</span>
                <div  style={{width:'100%',height:'1px',backgroundColor:'#303038'}}></div>
                </span>)}

                {/*<span onClick={()=>handleclick('delete')} style={{height:'50%'}}>Delete</span>*/}
                {/*{status === 'approved'?<span onClick={()=>handleclick('pdf_info')} style={{display:'flex' ,justifyContent:'center',alignItems:'center',gap:'4px',color:'#27CF7A',height:'50%',backgroundColor:''}}><img src={pdficon}/>  <span style={{fontSize:'12px'}}>PDF (Order Info)</span></span> : ''}*/}
            </div>
        </div>
    )
}


export default NewEditOption;