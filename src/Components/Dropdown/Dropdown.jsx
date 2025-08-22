import React, { useRef, useState ,useEffect} from 'react';
import { Select, SelectItem } from "@tremor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import pendingicon from '../../assets/static/status1.svg';
import processingicon from '../../assets/static/status2.svg';
import approvedicon from '../../assets/static/status3.svg';
import canceledicon from '../../assets/static/status4.svg';
import AlertBox from '../AlertBox/AlertBox';
import { useDisclosure } from '@chakra-ui/react';

const Dropdown = ({ getdata, order_status, dropType }) => {

    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [selecteditem, setselecteditem] = useState('');
    const [itemheight, setitemheight] = useState('');
    const [dataFiltered, setdataFiltered] = useState([]);
    // const [selectedlang, Setselectedlang] = useState({
    //     lang: order_status,
    //     img: order_status === 'pending' ? pendingicon : order_status === 'processing' ? processingicon :
    //         order_status === 'approved' ? approvedicon :
    //             order_status === 'canceled' ? canceledicon : order_status === 'rejected' ? canceledicon : order_status === 'ready_to_use' ? approvedicon :  '',
    

    //             name: order_status === 'pending' ? 'Pending' : order_status === 'processing' ? 'Processing' :
    //         order_status === 'approved' ? 'Approved' :
    //             order_status === 'canceled' ? 'Canceled' : order_status === 'rejected' ? 'Rejected' : order_status === 'ready_to_use' ? 'Ready to use' :  ''
    // });

    const [selectedlang, Setselectedlang] = useState({
        lang: 'pending',
        img: pendingicon,
        name:'Pending'
    });
    const [clicked, setclicked] = useState(false);
    const [clickedsec, setclickedsec] = useState(false);

    const data = dropType === 'sim'? 
    
    [{
        'lang': 'pending',
        'name':'Pending',
        'img': pendingicon,
        'code': 1
    }, {
        'lang': 'processing',
        'name':'Processing',
        'img': processingicon,
        'code': 2
    }, {
        'lang': 'cancelled',
        'name':'Cancelled',
        'img': canceledicon,
        'code': 3
    }, {
        'lang': 'approved',
        'name':'Approved',
        'img': approvedicon,
        'code': 4
    }] 
    
    
    : dropType ==='sales'? [{
        'lang': 'pending',
        'name':'Pending',

        'img': pendingicon,
        'code': 1
    }, {
        'lang': 'processing',
        'name': 'Processing',
        'img': processingicon,
        'code': 2
    }, {
        'lang': 'rejected',
        'name':'Rejected',

        'img': canceledicon,
        'code': 3
    }, {
        'lang': 'ready_to_use',
        'name': 'Ready to use',
        'img': approvedicon,
        'code': 4
    }] 
    
    : [{
        'lang': 'pending',
        'name':'Pending',
        'img': pendingicon,
        'code': 1
    }, {
        'lang': 'processing',
        'name':'Processing',
        
        'img': processingicon,
        'code': 2
    }, {
                'lang': 'cancelled',
                'name':'Cancelled',
                'img': canceledicon,
                'code': 3
    }, {
        'lang': 'approved',
        'name':'Approved',
        'img': approvedicon,
        'code': 4
    }];



    const showlangoptions = () => {
        setclicked(!clicked);
        setTimeout(() => {
           setclickedsec(!clickedsec)
        }, 300);
       
    };

    const setlang = (e) => {
        setselecteditem(e);
        onAlertOpen();
        setAlertType('warning');
        setAlertText('Are you sure you want to change the status?');
        setAlertButtonText('Yes, Update');
        setAlertButtonTextSecond('Cancel');
    };

    const leftbtn = () => {
        if (alertType === 'warning') {
            onAlertClose();
            showlangoptions()
        }
    };

    const rightbtn = async () => {
        if (alertType === 'warning') {
            onAlertClose();
            showlangoptions()
            for (const i of data) {
                if (i.code === selecteditem) {
                    selectedlang.lang = i.lang;
                    selectedlang.img = i.img;
                    selectedlang.name = i.name;

                }
            }
            getdata(selectedlang);
        }
    };


    const setinitial=(e)=>{
        if(e){
            let xdata=data?.filter((item) => item.lang !== e)
            setdataFiltered(xdata)
            setitemheight((xdata?.length)*2)
            let ydata=data?.filter((item) => item.lang === e)
            selectedlang.img=ydata[0]?.img
            selectedlang.lang=ydata[0]?.lang
            selectedlang.name=ydata[0]?.name

        }
       
    }


    useEffect(() => {
        // if (dropType !== 'sim') {
        //     data.push({
        //         'lang': 'approved',
        //         'img': approvedicon,
        //         'code': 4
        //     });
        // }
        setinitial(order_status)
        console.log("istatus",order_status,dropType)
    }, [getdata, order_status, dropType])
    

    

    return (
        <div style={{
            backgroundColor: "",
            height: "100%",
            width: '100%',
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: clicked ? '' : '8px',
            borderBottomRightRadius: clicked ? '' : '8px',
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative',
            // border: clicked?'':'1px solid #595959',

            borderBottomColor:clicked?'transparent':'#595959',
        }}>

            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={leftbtn} type={alertType} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={rightbtn} />






            <div   style={{
                backgroundColor: "var(--Dark-Gery, #444)",
                height: "100%",
                width: '100%',
                borderTopRightRadius: "8px",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: clicked ? '' : '8px',
                borderBottomRightRadius: clicked ? '' : '7px',
                padding: '8px 4px',
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #595959',
                borderBottom:clicked?'none':'',
                borderTopColor:'#595959'
                ,marginBottom:clicked?'1px':"",
                gap:'3px',

            }}>

                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '100%',gap:'6px' }}>
                    <img src={selectedlang.img} style={{ width: '28px', height: '15px' }} />
                    <span style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: 'auto',
                    height: '100%',
                    fontFamily: "inter",
                    fontWeight: "500",
                    lineHeight: "15px",
                    fontSize: "16px",
                    textAlign:'start'

                }} >{selectedlang.name}</span>
                </div>

                {/* <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: 'auto',
                    height: '100%',
                    fontFamily: "inter",
                    fontWeight: "500",
                    lineHeight: "15px",
                    fontSize: "16px",
                    textAlign:'start'

                }} >{selectedlang.name}</div> */}
                
                {order_status === 'approved' ?
                    <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>

                    </div>
                    : <div style={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                        onClick={() => showlangoptions()}
                    >
                        <FontAwesomeIcon icon={faAngleUp} style={{ height: '15px', width: "15px", }} rotation={clicked && 180} />
                    </div>}

            </div>

            {/* {clicked && ( */}
                <div   
                    style={{
                        cursor: "pointer",
                        backgroundColor: "var(--Dark-Gery, #444)",
                        width: "100%",
                        borderBottomRightRadius: "8px",
                        borderBottomLeftRadius: "8px",
                        height: clicked? `${itemheight}rem` :'0px', 
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        position: "relative",
                        // transition: "all 400ms",
                        transition: "height 400ms ease-in-out",
                        border:clicked?'1px solid #595959':'',
                        borderTopColor:clicked?'#303038':'#595959',
                      
                       
                       
                      
                    }}
                >
                    {clickedsec && dataFiltered?.map((item, index, array) =>{

                      
                              
                     return (
                         <div 
                            key={item.code}
                            style={{
                               transition: "all 400ms",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                width: "100%",
                                height: "2rem",
                                borderBottomLeftRadius: index === (array.length - 1) ? '8px' : '',
                                borderBottomRightRadius: index === (array.length - 1) ? '8px' : '',
                                borderBottom: index === (array.length - 1) ? '' : '2px solid #303038'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--Dark-Gery, #444)")}
                            onClick={() => setlang(item.code)}
                        >
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                <img src={item.img} style={{ width: '28px', height: '15px' }} alt='' />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontFamily: "inter", fontWeight: "500", lineHeight: "15px", fontSize: "16px" }} >
                                {item.name}
                            </div>
                        </div>
                    ) 
                 })
                }
                  
                </div>


            {/* )} */}



            <style jsx>

                {`
                
              
                `}

            </style>
        </div>
    );
}

export default Dropdown;




// import React, { useRef, useState } from 'react';
// import { Select, SelectItem } from "@tremor/react";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faAngleUp, faCaretDown, faCaretUp, faChevronDown, faL} from "@fortawesome/free-solid-svg-icons";

// import pendingicon from '../../assets/static/status1.svg'
// import processingicon from '../../assets/static/status2.svg'
// import approvedicon from '../../assets/static/status3.svg'
// import canceledicon from '../../assets/static/status4.svg'
// import AlertBox from '../AlertBox/AlertBox';
// import { useDisclosure } from '@chakra-ui/react';
// const Dropdown = ({getdata,order_status, dropType}) => {

//     const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     const [alertType, setAlertType] = useState('');
//     const [alertText, setAlertText] = useState('');
//     const [alertButtonText, setAlertButtonText] = useState('');
//     const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
//     const[selecteditem,setselecteditem]= useState('');
   

   
//     const[selectedlang,Setselectedlang]=useState({
//         lang:order_status,
//         img:order_status === 'pending'?pendingicon:order_status === 'processing'?processingicon:
//         order_status === 'approved'?approvedicon:
//         order_status === 'canceled'?canceledicon:''
//       })
//       const[clicked,setclicked]=useState(false)
       
    
//        const data=[{
//             'lang':'pending',
//             'img':pendingicon,
//             'code':1
//         },{
//             'lang':'processing',
//             'img':processingicon,

//             'code':2
//         },{
//             'lang':'canceled',
//             'img':canceledicon,

//             'code':4
//         }]

//     if (dropType !== 'sim') {
//         data.push({
//             'lang': 'approved',
//             'img': approvedicon,
//             'code': 4
//         });
//     }
//         const showlangoptions=()=>{
//                 setclicked(!clicked)
//         }
    
//         const setlang=(e)=>{
//             setselecteditem(e)
//             onAlertOpen();
//             setAlertType('warning')
//             setAlertText('Are you sure you want to change the status?');
//             setAlertButtonText('Yes,Update')
//             setAlertButtonTextSecond('Cancel')

          
    
//         }



//         const leftbtn =()=>{
//             console.log("3434",'ll')
           
//             if(alertType === 'warning'){
//                 onAlertClose()
               
//             }
           
//         }
        
//         const rightbtn=async()=>{

//             if(alertType === 'warning'){
//                 onAlertClose()
//                 for(const i of data){
                    
//                     console.log("showinf i ",i)
//                     if(i.code === selecteditem){
//                         selectedlang.lang = i.lang
//                         selectedlang.img = i.img

//                     }
                
//                 }

//                 getdata(selectedlang)
//                 setclicked(!clicked)
                
//             }

//           }
        
//   return (
//     <div  style={{backgroundColor:"" 
//     ,height:"100%",width:'100%', borderTopRightRadius:"8px",
//     borderTopLeftRadius: "8px",borderBottomLeftRadius:clicked?'':'8px',borderBottomRightRadius:clicked?'':'8px',
//     display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column',position:'relative', transition: "all 300ms"}}>
    
//     <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={leftbtn} type={alertType} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={rightbtn} />

//     <div style={{backgroundColor:"var(--Dark-Gery, #444)" 
//             ,height:"2rem",width:'8.5rem' , borderTopRightRadius:"8px",
//             borderTopLeftRadius: "8px",borderBottomLeftRadius:clicked?'':'8px',borderBottomRightRadius:clicked?'':'7px',
//             padding:'8px 1px',display:"flex",justifyContent:'space-between',alignItems:'center',border:'1px solid #595959', transition: "all 300ms"}}>

//              <div style={{display:'flex',justifyContent:'center' ,alignItems:'center' ,width:'100%' ,height:'100%'}}>
//                             <img src={selectedlang.img} style={{width:'28px' ,height:'15px'}}/>
//                         </div>
        
//             <div style={{display:'flex',justifyContent:'center' ,alignItems:'center' ,width:'100%' ,height:'100%',
//            fontFamily:"inter",fontWeight:"500" ,lineHeight:"15px",fontSize:"16px"}} >{selectedlang.lang}</div>
//           {order_status === 'approved' ?
//           <div style={{cursor:'pointer',display:'flex',justifyContent:'center' ,alignItems:'center' ,width:'100%' ,height:'100%'}}>
              
//             </div>
//             : <div style={{cursor:'pointer',display:'flex',justifyContent:'center' ,alignItems:'center' ,width:'100%' ,height:'100%'}} 
//                 onClick={()=>showlangoptions()}
//             >
//                  <FontAwesomeIcon icon={faAngleUp} style={{ height:'15px' ,width:"15px",}} rotation={clicked && 180}/>
//             </div>} 
    
//       </div>

//                     {clicked && (
//                             <div
//                                 style={{
//                                 cursor: "pointer",
//                                 backgroundColor: "var(--Dark-Gery, #444)",
//                                 width: "8.5rem",
//                                 borderBottomRightRadius: "8px",
//                                 borderBottomLeftRadius:"8px",
//                                 height: "auto",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 flexDirection: "column",
//                                 position: "relative",
//                                 transition: "all 300ms",border:'1px solid #595959'
                                
//                                 }}
//                             >
//                                 {data.filter((item) => item.lang !== selectedlang.lang).map((item,index,array) => (
//                                 <div
//                                     key={item.code}
//                                     style={{
//                                     display: "flex",
//                                     justifyContent: "flex-start",
//                                     alignItems: "center",
//                                     width: "100%",
//                                     height: "2rem",
//                                     transition: "all 300ms",
//                                     borderBottomLeftRadius:index === (array.length -1)? '8px':'',
//                                     borderBottomRightRadius:index === (array.length -1)? '8px':'',
//                                     borderBottom:index === (array.length -1)?'':'2px solid #303038'
//                                     }}
//                                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
//                                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--Dark-Gery, #444)")}
//                                     onClick={()=>setlang(item.code) }
//                                 >
//                                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
//                                                 <img src={item.img} style={{ width:'28px' ,height:'15px' }} alt='' />
//                                                 </div>
//                                     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontFamily: "inter", fontWeight: "500", lineHeight: "15px", fontSize: "16px" }} >
//                                       {item.lang} 
//                                     </div>
//                                 </div>
//                                 ))}
//                             </div>
//                             )}







    

// </div>
//   )
// }

// export default Dropdown



