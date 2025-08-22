// import React, {useState,useEffect} from 'react';
// import {
//     chakra,
//     FormControl,
//     FormLabel, Modal,
//     ModalBody,
//     ModalCloseButton,
//     ModalContent, ModalFooter,
//     ModalHeader,
//     ModalOverlay,
//     Button,
//     Input, background
// } from "@chakra-ui/react";
// import {global_css} from "../../GlobalCss/GlobalCSS.js";
// import simcon1 from '../../assets/static/s1.png'
// import simcon2 from '../../assets/static/s2.png'
// import simcon3 from '../../assets/static/s3.png'
// import simcon4 from '../../assets/static/s4.png'
// import simcon5 from '../../assets/static/s5.png'
// import simcon6 from '../../assets/static/s6.png'
// import simcon7 from '../../assets/static/s7.png'
// import simcon8 from '../../assets/static/s8.png'
// import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
// import { reqaddnewsimlist } from './simrequestdatalist.jsx';
// import { requpdateItem } from './simrequestdatalist.jsx';
// import Popnotification from '../PopNotification/Popnotification.jsx';
// import { dataset } from './simrequestdatalist.jsx';
// import axios from "axios";
// import config from "../../config.jsx";
// import {useAuth} from "../../Context/AuthInfo.jsx";
// import {useTranslation} from "react-i18next";
// const Addnewsimrequest = ({isOpen, onClose ,data ,action,getstatus, alertOpen}) => {
//     const { user , token, changeLoad } = useAuth();
//     const {t} = useTranslation()
//     const [showpopoup,setshowpopup]=useState(false)
//     const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
//     const [showpopoupmsg,setshowpopupmsg]=useState('')
//     const [loader,setloader]=useState(false)
//     const [filteredSimcardData, setFilteredSimcardData] = useState([]);
//     const[simdatalist,setseimdatalist]=useState()
 

//     const [simcarddata,setSimcarddata]=useState([])
 



//     const sendata=()=>{

//                 const fd=simcarddata.filter((n)=>n.amount !== '')

//                  onClose()
//                  setloader(true)

                 
               
//                 if(action === true){
//                     let up={
//                         order_no:data?.order_no,
//                         details:fd,
//                         order_date:data?.order_date,
//                         status:data?.status
//                     }
//                         requpdateItem(up).then(res=>{
                            
//                             if(res === 200){
//                                 setshowpopupmsg('Successfully updated data')
//                                 getstatus('true')
//                                 setshowpopup(true)
//                                 changeLoad()
//                             }else{
//                                 setshowpopupmsg('data update was unsuccessfull')
//                                 getstatus('false')
//                                 setshowpopup(true)
//                                 setshowpopupmsg('')
//                             }
//                             setTimeout(() => {
//                                 setshowpopup(false)
//                             }, 3000);
//                         })
//                         setloader(false)
                       
//                 }else{

//                     reqaddnewsimlist(fd, token).then(res=>{
//                             console.log("wewew",res)
//                             if(res === 201){
//                                 alertOpen()
//                                 changeLoad()
//                             }else{
//                                 setshowpopupmsg('could not add data')
//                                 getstatus('false')
//                                 setshowpopup(true)


//                             }

//                             setTimeout(() => {
//                                 setshowpopup(false)
//                             }, 3000);
//                         })
//                     setloader(false)

      
//                 }
         
         
          
//             setshowpopupstatus('success')
//             setshowpopup(true)
            
//             setTimeout(() => {
//               setshowpopup(false)
//             }, 3000);
            

//     }

 

   
    


//     const  handleonchange = (value,name,index) =>{
//         setSimcarddata((prevData) => {
//             const updatedData = [...prevData];
//             updatedData[index].amount = value;
//             return updatedData;
//           });

//           console.log("343535",simcarddata)

//         if (value === '') {

//             const updatedFilteredData = filteredSimcardData.filter((i) => i.name !== name);
//             setFilteredSimcardData(updatedFilteredData);
//           } else {
              
//             const updatedFilteredData = [...filteredSimcardData];
//             updatedFilteredData[index] = { name: name, amount: value };
//             setFilteredSimcardData(updatedFilteredData);
//           }


//           console.log("showing datalist",filteredSimcardData)

//     }

//     const GetSimList = async () => {
   
//         let xdata=[]
//         try {
//             // ${config.apiUrl}/${item.logoUrl}
//             const response = await axios.get(`${config.apiUrl}/api/operator`,{
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             console.log('Response:for get sim', response.data.operators);
//             for(const i of response?.data?.operators ){
//                 let dx={'img':` ${config.apiUrl}${i.logoUrl}`,'name':i.name,amount:'','operator_id':i.id}
//                 xdata.push(dx)
//                 console.log("saf",i)
//             }
//             setSimcarddata(xdata)
     
//         } catch (error) {
//             console.error('Error++++:', error);
//             throw error;
        
//         }
      
      
//       };

//     useEffect(() => {
       
//         console.log(':action message',data)
//         if(action === true){


//             setSimcarddata(prevData => {
//                 const updatedSimcarddata = [...prevData];
    
//                 for (const i of data?.details) {
//                     for (const y of updatedSimcarddata) {
//                         if (i.name === y.name) {
//                             console.log("i.amount", i.amount);
//                             y.amount = i.amount;
//                         }
//                     }
//                 }
    
//                 return updatedSimcarddata;
//             });
//         }else{
//             GetSimList()         
//         }

        

//     }, [action,data,isOpen, onClose])





//     return (
//         <div >
//           {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
//           {loader &&  <LoadingSoS  /> } 

//             <Modal 
//                 isOpen={isOpen}
//                 onClose={onClose}
               

//             >
//                 <ModalOverlay/>
//                 <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
//                     <ModalHeader >{action ?'Edit Order':t('requestOrder')}</ModalHeader>
//                     <div style={{height:'1px',backgroundColor:'#404040',width:'90%',alignSelf:'center'}}></div>
//                     <ModalCloseButton />
//                     <ModalBody style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1rem',}}>

//                      <div style={{display:'flex' ,width:'100%',height:'100%' ,flexDirection:'column',gap:'.5rem'}}>

//                             <div 
//                             //  style={{width: '100%',display: 'flex',height:'auto', justifyContent:'center',alignItems:'center',flexDirection:'column', gap: '5px',transition:'all 300ms',cursor:'pointer',backgroundColor:'',overflowY:'auto',scrollbarWidth: '1px', scrollbarColor: '#555 transparent',}}
//                             style={{transition:'all 400ms',width: '100%', height:'22rem',display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1px',cursor:'pointer',backgroundColor:'',overflowY:'auto',scrollbarWidth: '1px', scrollbarColor: '#555 transparent'}}
//                              >

//                                 {simcarddata.map((n,index)=>{
//                                     return (
//                                         <div  key={index} style={{width:'100%',padding:'7px',borderRadius:'5px',gap:'8px' , transition: 'all 400ms',display:'flex' ,alignItems:'center' ,justifyContent:'space-between'}} 
//                                         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#27CF7A')}
//                                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
//                                             >
//                                               <div style={{display:'flex',width:'40%',justifyContent:'flex-start',alignItems:'center',gap:'4px',backgroundColor:'#404040',border : '1px solid #595959',  borderRadius : global_css.field_border_radius,padding:'5px'}}> 
//                                                 <img src={n.img} style={{height:'100%' ,width:'20%'}}/> <span>{n.name} </span></div> 
//                                               <div style={{display:'flex',width:'60%',justifyContent:'center',alignItems:'center'}}>
//                                                     <FormControl>
                    
//                                                         <Input type='number' value={n.amount} onChange={(e)=>handleonchange(e.target.value,n.name,index)} style={{
//                                                             outline: 'none !important',
//                                                             boxShadow: 'none',
//                                                             border : '1px solid #595959',
//                                                             background : '#404040'
//                                                         }}   placeholder='Ex. 1242353455' />
                                                        
//                                                     </FormControl>
//                                               </div>
//                                               </div>
//                                     )
//                                 })}
                            
//                             </div>  

//                     </div>   
//                     </ModalBody>

//                     <ModalFooter style={{display:'flex',gap:'1rem',justifyContent:'flex-end',width:'100%',backgroundColor:''}}>
                        
//                         <Button colorScheme='white' variant='outline' onClick={onClose}>{t('cancel')}</Button>
//                         <Button onClick={()=>sendata() }  style={{background : "#27CF7A", color: 'white',width:'35%'}} > {t('requestOrder')}
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>

         
//             </Modal>

//             <style jsx>
//                 {
//                     ``
//                 }
//             </style>
//         </div>
//     );
// };

// export default Addnewsimrequest




import React, { useState, useEffect } from 'react';
import {
    chakra,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Input
} from "@chakra-ui/react";
import { global_css } from "../../GlobalCss/GlobalCSS.js";
import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
import Popnotification from '../PopNotification/Popnotification.jsx';
import { useAuth } from "../../Context/AuthInfo.jsx";
import { useTranslation } from "react-i18next";
import { dummySimRequests } from './simrequestdata.jsx';
import { dummyOperators } from '../InventoryTable/dataset.jsx';


const Addnewsimrequest = ({ isOpen, onClose, data, action, getstatus, alertOpen }) => {
    const { user, changeLoad } = useAuth();
    const { t } = useTranslation();
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('success');
    const [showpopoupmsg, setshowpopupmsg] = useState('');
    const [loader, setloader] = useState(false);
    const [filteredSimcardData, setFilteredSimcardData] = useState([]);
    const [simcarddata, setSimcarddata] = useState([]);

    // const sendata = () => {
    //     console.log("dataaa",data)
    //     setloader(true);
    //     const fd = simcarddata.filter((n) => n.amount !== '' && n.amount !== '0');

    //     if (action === true) {
    //         // Update existing request
    //         const index = dummySimRequests.findIndex(req => req.id === data.id);
    //         if (index !== -1) {
    //             dummySimRequests[index] = {
    //                 ...dummySimRequests[index],
    //                 details: fd.map(item => ({
    //                     name: item.name,
    //                     amount: parseInt(item.amount),
    //                     operator_id: item.operator_id
    //                 })),
    //                 order_date: data.order_date,
    //                 status: data.status
    //             };
    //             setshowpopupmsg('Successfully updated data');
    //             setshowpopupstatus('success');
    //             getstatus('true');
    //             changeLoad();
    //         } else {
    //             setshowpopupmsg('Data update was unsuccessful');
    //             setshowpopupstatus('fail');
    //             getstatus('false');
    //         }
    //     } else {
    //         // Add new request
    //         const newRequest = {
    //             id: dummySimRequests.length + 1,
    //             order_no: `ORD${(dummySimRequests.length + 1).toString().padStart(3, '0')}`,
    //             details: fd.map(item => ({
    //                 name: item.name,
    //                 amount: parseInt(item.amount),
    //                 operator_id: item.operator_id
    //             })),
    //             order_date: new Date().toISOString().split('T')[0],
    //             status: 'pending'
    //         };
    //         dummySimRequests.push(newRequest);
    //         setshowpopupmsg('Request added successfully');
    //         setshowpopupstatus('success');
    //         alertOpen();
    //         changeLoad();
    //     }

    //     onClose();
    //     setshowpopup(true);
    //     setTimeout(() => {
    //         setshowpopup(false);
    //     }, 3000);
    //     setloader(false);
    // };

    const sendata = () => {
    console.log("dataaa", data);
    setloader(true);
    const fd = simcarddata.filter((n) => n.amount !== '' && n.amount !== '0');

    if (action === true) {
        // Update existing request
            const index = dummySimRequests.findIndex(req => req.order_no === data.order_no);
            if (index !== -1) {
                dummySimRequests[index] = {
                    ...dummySimRequests[index],
                    details: fd.map(item => ({
                        name: item.name,
                        amount: parseInt(item.amount),
                        operator_id: item.operator_id
                    })),
                    order_date: data.order_date,
                    status: data.status
                };
                setshowpopupmsg('Successfully updated data');
                setshowpopupstatus('success');
                getstatus('true');
                changeLoad();
            } else {
                setshowpopupmsg('Data update was unsuccessful');
                setshowpopupstatus('fail');
                getstatus('false');
            }
        } else {
            // Add new request
            const newRequest = {
                id: dummySimRequests.length + 1,
                order_no: `ORD${(dummySimRequests.length + 1).toString().padStart(3, '0')}`,
                details: fd.map(item => ({
                    name: item.name,
                    amount: parseInt(item.amount),
                    operator_id: item.operator_id
                })),
                order_date: new Date().toISOString().split('T')[0],
                status: 'pending',
                isdeleted: false,
                total_quantity: fd.reduce((sum, item) => sum + parseInt(item.amount), 0),
                totalPrice: 0 // Mock price, adjust as needed
            };
            dummySimRequests.push(newRequest);
            setshowpopupmsg('Request added successfully');
            setshowpopupstatus('success');
            alertOpen();
            changeLoad();
        }

        onClose();
        setshowpopup(true);
        setTimeout(() => {
            setshowpopup(false);
        }, 3000);
        setloader(false);
    };

    const handleonchange = (value, name, index) => {
        setSimcarddata((prevData) => {
            const updatedData = [...prevData];
            updatedData[index].amount = value;
            return updatedData;
        });

        if (value === '' || value === '0') {
            const updatedFilteredData = filteredSimcardData.filter((i) => i.name !== name);
            setFilteredSimcardData(updatedFilteredData);
        } else {
            const updatedFilteredData = [...filteredSimcardData];
            updatedFilteredData[index] = { name: name, amount: value };
            setFilteredSimcardData(updatedFilteredData);
        }
    };

    const GetSimList = async () => {
        try {
            const xdata = dummyOperators.map(operator => ({
                img: operator.logo,
                name: operator.name,
                amount: '',
                operator_id: operator.id
            }));
            setSimcarddata(xdata);
        } catch (error) {
            console.error('Error:', error);
            setshowpopupmsg('Failed to fetch operators');
            setshowpopupstatus('fail');
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 3000);
        }
    };

    useEffect(() => {
        if (action === true && data) {
            const updatedSimcarddata = dummyOperators.map(operator => {
                const detail = data.details.find(d => d.name === operator.name) || { amount: '' };
                return {
                    img: operator.logo,
                    name: operator.name,
                    amount: detail.amount ? detail.amount.toString() : '',
                    operator_id: operator.id
                };
            });
            setSimcarddata(updatedSimcarddata);
            setFilteredSimcardData(data.details.map(d => ({ name: d.name, amount: d.amount.toString() })));
        } else {
            GetSimList();
            setFilteredSimcardData([]);
        }
    }, [action, data, isOpen]);

    return (
        <div>
            {showpopoup && <Popnotification msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} />}
            {loader && <LoadingSoS />}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={global_css.modal_bg} style={{ color: 'white' }}>
                    <ModalHeader>{action ? 'Edit Order' : t('requestOrder')}</ModalHeader>
                    <div style={{ height: '1px', backgroundColor: '#404040', width: '90%', alignSelf: 'center' }}></div>
                    <ModalCloseButton />
                    <ModalBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column', gap: '.5rem' }}>
                            <div style={{ transition: 'all 400ms', width: '100%', height: '22rem', display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1px', cursor: 'pointer', backgroundColor: '', overflowY: 'auto', scrollbarWidth: '1px', scrollbarColor: '#555 transparent' }}>
                                {simcarddata.map((n, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            width: '100%',
                                            padding: '7px',
                                            borderRadius: '5px',
                                            gap: '8px',
                                            transition: 'all 400ms',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#27CF7A')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                                    >
                                        <div style={{ display: 'flex', width: '40%', justifyContent: 'flex-start', alignItems: 'center', gap: '4px', backgroundColor: '#404040', border: '1px solid #595959', borderRadius: global_css.field_border_radius, padding: '5px' }}>
                                            <img src={n.img} style={{ height: '100%', width: '20%' }} />
                                            <span>{n.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    value={n.amount}
                                                    onChange={(e) => handleonchange(e.target.value, n.name, index)}
                                                    style={{
                                                        outline: 'none !important',
                                                        boxShadow: 'none',
                                                        border: '1px solid #595959',
                                                        background: '#404040'
                                                    }}
                                                    placeholder='Ex. 10'
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', width: '100%', backgroundColor: '' }}>
                        <Button colorScheme='white' variant='outline' onClick={onClose}>{t('cancel')}</Button>
                        <Button onClick={() => sendata()} style={{ background: "#27CF7A", color: 'white', width: '35%' }}>{t('requestOrder')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <style jsx>{``}</style>
        </div>
    );
};

export default Addnewsimrequest;