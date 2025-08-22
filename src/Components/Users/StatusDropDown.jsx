import React, {useEffect, useState} from 'react';
import axios from "axios";
import config from "../../config.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import activeIcon from '../../assets/static/active.png'
import lockIcon from '../../assets/static/Lock.png'
import unlockIcon from '../../assets/static/Unlock.png'
import upcoming from '../../assets/static/upcoming.png'
import inactive from '../../assets/static/inactive.png'
import {useTranslation} from "react-i18next";

const StatusDropDown = ({selectedlang, Setselectedlang, action, selected, SetSelected, option}) => {
    const {t} = useTranslation()

    const[clicked,setclicked]=useState(false)
    const[choosen,setChosen]=useState({})

    console.log("=======choosen", selectedlang)

    const showlangoptions=()=>{
        setclicked(!clicked)
    }

    const setlang=(e)=>{
        console.log('showinfgsg',e)
        SetSelected(false)
        Setselectedlang(e)
        setclicked(!clicked)

    }
    const statusList = option=== 'offer'?  [
        {

            "name" : 'Active',
            "img" : activeIcon
        },        {

            "name" : 'Inactive',
            "img" : inactive
        },  {

            "name" : 'Upcoming',
            "img" : upcoming
        }

    ] : option === 'group'? [
            {

                "name" : 'Active',
                "img" : activeIcon
            },        {

                "name" : 'Inactive',
                "img" : inactive
            }

        ] : [
        {

            "name" : 'Active',
            "img" : activeIcon
        },        {

            "name" : 'Locked',
            "img" : lockIcon
        }, 
        //  {

        //     "name" : 'Unlocked',
        //     "img" : unlockIcon
        // }

    ]

    console.log("seeeeelected", selected)
    useEffect(() => {
        if(action && selected){
            const activeObjects = statusList.filter(item => item.name.toLowerCase() === selected.toLowerCase());
            Setselectedlang(activeObjects[0])
        }
    }, [action, selected]);





    return (

        <div style={{backgroundColor:"#595959"
            ,height:"auto",width:'100%',borderRadius:'6px',border: '1px solid #595959',
            marginRight:"3rem",display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>


            <div style={{backgroundColor:"#404040"
                ,height:"2.4rem",width:'100%' ,borderRadius:'6px',
                padding:'8px 16px',display:"flex",justifyContent:'space-between',alignItems:'center'}}>
                {selectedlang?.name?
                    <div style={{display:'flex',justifyContent:'flex-start' ,alignItems:'center' ,width:'100%' ,height:'100%' ,gap:"1rem"}}>
                        <img src={selectedlang?.img} style={{width:'25px' ,height:'25px'}}/>
                        <span>{selectedlang?.name}</span>
                    </div>:
                    <div style={{display:'flex',justifyContent:'flex-start' ,alignItems:'center' ,width:'100%' ,height:'100%'}}>

                        <span>{t('status')}</span>
                    </div>}
                <div style={{cursor:'pointer',display:'flex',justifyContent:'flex-end' ,alignItems:'center',width:'100%' ,height:'100%'}}
                     onClick={()=>showlangoptions()}
                >
                    <FontAwesomeIcon icon={faAngleUp} style={{height:'20px' ,width:"20px",}} rotation={clicked && 180}/>
                </div>

            </div>

            {clicked && (
                <div
                    style={{
                        cursor: "pointer",
                        backgroundColor: "#2B2B33",
                        // backgroundColor: "var(--Dark-Gery, #444)",
                        width: "100%",
                        // borderBottomRightRadius: "8px",
                        // borderBottomLeftRadius:"8px",
                        borderRadius:'6px',
                        border: '1px solid var(--Base-Color-White-Dark, #999)',
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        position: "absolute",
                        top: "4.9rem",
                        // right: "2.6rem",
                        zIndex: 1,
                        transition: "all 300ms"
                    }}
                >
                    {statusList.filter((item) => item.name !== selectedlang?.name).map((item,index,array) => (
                        <>
                            <div
                                key={item.code}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "2.6rem",
                                    paddingLeft:'1rem',
                                    // borderBottomLeftRadius:index === (array.length -1)? '8px':'',
                                    // borderBottomRightRadius:index === (array.length -1)? '8px':'',
                                    // borderBottom:index === (array.length -1)?'':'2px solid #303038'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2B2B33")}
                                onClick={()=>setlang(item)}
                            >
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flex: "1", width: "100%", height: "100%",gap:'1rem' }}>
                                    <img src={item.img} style={{ width: "25px", height: "25px" }} alt='' />

                                    <psan>{item.name} </psan>
                                </div>
                            </div>
                            <div style={{width:"98%",height:'1px',backgroundColor:'#595959'}}></div>
                        </>
                    ))}
                </div>
            )}









        </div>
    );
};

export default StatusDropDown;