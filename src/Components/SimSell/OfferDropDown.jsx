import React, { useState ,useEffect } from 'react';
import { Select, SelectItem } from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp, faArrowUp, faCaretDown, faCaretUp, faChevronDown, faL} from "@fortawesome/free-solid-svg-icons";
import usa from '../../assets/static/usa.png'
import Avatar from "../Avatar.jsx";
import { data } from 'autoprefixer';
import italyimagesvg from '../Navbar/Image/IT.svg'
import usaimagesvg from '../Navbar/Image/US.svg'
import companylogo from '../../assets/static/companylogo.svg'
import {useAuth} from "../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../config.jsx";

const OfferDropDown = ({selected,getofferdata,oid,objskey,datax,operatoridx}) => {
    const { user , logout} = useAuth();

  const[selecteddesc,Setselecteddesc]=useState({
    desc:'',
    name:'',
    code:''
  })
  const[clicked,setclicked]=useState(false)
  const[data,setdata]=useState(datax)




    // const GetofferList = async () => {
    //     console.log("hsdasdas",operatoridx)
    //     try {
    //         const response = await axios.get(`${config.apiUrl}/api/offer`);
    //         console.log('offers:====xxx', response?.data?.offers);
    //         let xdata=response?.data?.offers

    //         let objarr=[]

    //         if(xdata?.length >0){
    //             for(const i of xdata){
    //                 let obj={
    //                     'name':i['offerName'],
    //                     'desc':i['offerDetails'],
    //                     'code':i['operatorId']
    //                 }

    //                 objarr.push(obj)

    //             }
    //             setdata(objarr)
    //         }
          

    //     } catch (error) {
    //         console.error('Error++++:', error);
    //         setLoader(false)
    //         throw error;
    //     }
    // };


    const showdescoptions=()=>{
            setclicked(!clicked)
    }

    const setdesc=(e)=>{
        console.log("ddd",e)
        for(const i of datax){
            console.log("showinf i ",i)
            if(i.code === e.code){
                selecteddesc.desc = i.desc
                selecteddesc.name = i.name
                selecteddesc.code = i.code
            }
        }
        setclicked(!clicked)
        getofferdata(e)
        updateLocalStorageByKey(objskey,e.code)
    }




    const updateLocalStorageByKey = (key, value) => {
      
        // Get the current data from localStorage
        let locaStoragedata=JSON.parse(localStorage.getItem('saleId'))
        let actualDatax=locaStoragedata?.filter(n=>n.id === oid)

        // Update the value for the specified key
        let newDataObj = actualDatax.map(item => {
         
                item.data[key] = value;
        
            return item;
        });

        // Save the updated data back to localStorage
        localStorage.setItem('saleId', JSON.stringify(newDataObj));
    }

    useEffect(() => {
       console.log("dadsasdas",datax)
        let locaStoragedata=JSON.parse(localStorage.getItem('saleId'))
        console.log("local dataxxxx",locaStoragedata)
        let actualDatax=locaStoragedata?.filter(n=>n.id === oid)
        let actualData=actualDatax[0]
        console.log("local dataxxxxccccccccc",actualData?.data[objskey])
 
        
         if(actualData){ 
            console.log("offerlocal",actualData)
            for(const i of datax){
                console.log("showinf i offer",actualData.data[objskey])
                if(i.code === actualData.data[objskey]){
                    selecteddesc.desc = i.desc
                    selecteddesc.name = i.name
                    selecteddesc.code = i.code
                }
            } 

         }

        //  GetofferList()
        console.log("offerdatac",datax)
    }, [selected,getofferdata,oid,objskey,clicked])
    
    return (
        <div style={{backgroundColor:"#303038",display:"flex",height:"100%" ,
        width:'100%',justifyContent:'space-between',alignItems:'center' }} >
          
              
            <div style={{display : 'flex', gap : '0%', alignItems : 'center',width:'100%'}}>
            <div style={{backgroundColor:"var(--Dark-Gery, #444)" 
                ,height:"100%",width:'100%', borderTopRightRadius:"8px",
                borderTopLeftRadius: "8px",borderBottomLeftRadius:'8px',borderBottomRightRadius:'8px',
                display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                

                <div  onClick={()=>showdescoptions()} style={{backgroundColor:"var(--Dark-Gery, #444)" ,cursor:'pointer'
                        ,height:"2.6rem",width:'100%' , borderTopRightRadius:"8px",
                        borderTopLeftRadius: "8px",borderBottomLeftRadius:'8px',borderBottomRightRadius:'8px',
                        padding:'8px 16px',display:"flex",justifyContent:'space-between',alignItems:'center'}}>
                

                        <div style={{display:'flex',justifyContent:'center' ,alignItems:'center'  ,height:'100%',
                        color:'rgba(255, 255, 255, 0.85)' ,fontFamily:"inter",fontWeight:"500" ,lineHeight:"15px",fontSize:"16px",whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
                            {/* {selecteddesc?.name} */}
                            {datax && datax?.length >0? selecteddesc?.name.length>78? selecteddesc?.name.slice(0, 76) : selecteddesc?.name :'no offer found'}{selecteddesc?.name.length>76? '...' : null}
                            </div>
                        <div style={{cursor:'pointer',display:'flex',justifyContent:'center' ,alignItems:'center' ,height:'100%'}} 
                           
                        >
                           {datax && datax?.length >0?   <FontAwesomeIcon icon={faAngleUp} style={{ height:'18px' ,width:"18px",}} rotation={clicked && 180}/>:''}
                        </div>
                
                  </div>
                  

                                {clicked && (
                                        <div
                                            style={{
                                            cursor: "pointer",
                                            backgroundColor: "#2B2B33",
                                            width: "100%",
                                            borderRadius:'6px',
                                            border: '1px solid var(--Base-Color-White-Dark, #999)',
                                            height: "auto",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            position: "absolute",
                                            top: "4.5rem",
                                            zIndex: 1,
                                            transition: "all 300ms",overflowY: "auto"
                                            }}
                                        >
                                            {datax && datax?.map((item,index,array) => (
                                            <div
                                                key={item.code}
                                                style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "100%",
                                                height: "auto",
                                                borderBottomLeftRadius:index === (array.length -1)? '8px':'',
                                                borderBottomRightRadius:index === (array.length -1)? '8px':'',
                                                borderBottom:index === (array.length -1)?'':'2px solid #303038'
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2B2B33")}
                                                onClick={()=>setdesc(item)}
                                            >
                                                
                                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flex: "1", width: "100%", height: "100%", color: "var(--Base-Color-White-Dark, #999)", fontFamily: "Inter", fontWeight: "500", lineHeight: "15px", fontSize: "12px" ,padding:"1rem"}}>
                                                  {item.desc} 
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                        )}


           

           

            
                

            </div>



            </div>
               



        </div>

       
    );
};
export default OfferDropDown