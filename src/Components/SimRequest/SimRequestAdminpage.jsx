// import React, { useState ,useEffect} from 'react';
// import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
// import {
//     Badge, Button,
//     Card,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeaderCell,
//     TableRow,
//     Text, TextInput,
//     Title,

// } from "@tremor/react";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
// import {useDisclosure} from "@chakra-ui/react";
// import Popnotification from '../PopNotification/Popnotification.jsx';
// import Editopstions from '../EditFunctionality/Editopstions.jsx';
// import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
// import Addnewsimrequest from './Addnewsimrequest.jsx';
// import moment from "moment/moment.js";
// import Nodatafound from '../NoDataFound/Nodatafound.jsx';
// import { reqremoveItem } from './simrequestdatalist.jsx';
// import { requpdateItemstatus } from './simrequestdatalist.jsx';
// import Dropdown from '../Dropdown/Dropdown.jsx';
// import axios from "axios";
// import config from "../../config.jsx";
// import AlertBox from '../AlertBox/AlertBox.jsx';
// import {useAuth} from "../../Context/AuthInfo.jsx";
// import {useTranslation} from "react-i18next";

// const SimRequestAdminpage = ({actioncallset}) => {

//     const { user , token, changeLoad } = useAuth();
//     const {t} = useTranslation()
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     const [showedit,setshowedit]=useState(false)
//     const [showeditindex,setshoweditindex]=useState(null)
//     const [selecteditem,setselecteditem]=useState(null)
//     const [actiontype,setactiontype]=useState(false)

//     const [showpopoup,setshowpopup]=useState(false)
//     const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
//     const [showpopoupmsg,setshowpopupmsg]=useState('')
//     const [pageview,setpageview]=useState('initial')
//     const [loader,setloader]=useState(false)
//     const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()

//     const[dataset,setdataset]=useState([])
//     const[dataset2,setdataset2]=useState([])
//     const[datasetfilter,setdatasetfilter]=useState([])
//     const [simList,setSimList]=useState([])
//     const [nodatafound,setnodatafound]=useState(false)

//     const [alertType, setAlertType] = useState('');
//     const [alertText, setAlertText] = useState('');
//     const [alertButtonText, setAlertButtonText] = useState('');
//     const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
  


//     const getaction=(e)=>{
//         console.log('actionxxxxx',selecteditem)
//         let order_item=selecteditem;
//         if (order_item) {
//             try {
//                 console.log("asdadade",order_item?.details)
//             const operatorCounts = order_item?.details;
//             // order_item?.details.forEach((sim) => {
//             // const operatorName = sim.name
//             //     console.log("first")
//             // if (operatorName) {
//             //     const existingOperator = operatorCounts.find((op) => op.operator === operatorName);

//             //     if (existingOperator) {
//             //         existingOperator.total++;
//             //     } else {
//             //     operatorCounts.push({ operator: operatorName, total: 1 });
//             //     }
//             // }
//             // });
//             console.log("sdfsdfsdffff",operatorCounts)
//             let dd={'order_id':selecteditem?.order_no ,'data':operatorCounts}
//              localStorage.setItem('orderitem',JSON.stringify(dd))
//             } catch (error) {

//             console.error('Error parsing item from localStorage:', error);
//             }
//         }
//         console.log("weee",e)
//         if(e.type === 'edit'){
//             actioncallset('review',selecteditem?.order_no )
//         }else if(e.type === 'delete'){

//             setactiontype(false)
//             let ress=null
         
//             axios.delete(`${config.apiUrl}/api/order/${selecteditem?.order_no}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }).then((ress)=> {
//                 if(ress.status === 200){
//                     getorderlist()
//                     setshowpopup(true)
//                     setshowpopupstatus('success')

//                     setshowpopupmsg('Order successfully deleted')
//                     setTimeout(() => {
//                     setshowpopup(false)
//                     }, 3000);
//                 }else{
//                     setshowpopupstatus('failed')

//                     setshowpopup(true)
//                     setshowpopupmsg('could not delete')
//                     setTimeout(() => {
//                     setshowpopup(false)
//                     }, 3000);
//                 }
//             });
           
        
//             // if (response.status === 200) {
//             //     getorderlist(); 
//             //     ress= response.status;
//             // } else {
            
//             //     ress= response.status;
//             // }
              
//             console.log("showing ress",ress)
                
            
//         }else if(e.type === 'pdf_info'){
//             actioncallset('pdf_info',selecteditem?.order_no )

//         }

//     }

//     const callbox =()=>{
//         setactiontype(false)
//         onOpen()
//     }

//     const onbuttonclicked=(e)=>{
//         console.log("eee",e)
//         if(e.clicked === true){
//             callbox()
//         }
// }


// const countamount = (e) =>{
//     const total = e.reduce((accumulator, currentValue) => {
//         return accumulator + parseInt(currentValue.amount);
//       }, 0);
//       return total
// }  


// const getselecteditem=(e)=>{

          


//     requpdateItemstatus(selecteditem,e, token).then(res=>{
//         if(res === 200){
//             setshowpopupstatus('success')
//             setshowpopupmsg('Status successfully updated')
//             setshowpopup(true)
//             getorderlist()
//             changeLoad()
//             setTimeout(() => {
//                 setshowpopup(false)
//               }, 3000);
              
//         }else{
//             setshowpopupstatus('failed')
//             setshowpopupmsg('Status could not update')
//             setshowpopup(true)
//             setTimeout(() => {
//                 setshowpopup(false)
//               }, 3000);
//         }
//     })
//     console.log("sdadad",xx)
  
// }   




// const getdata=(da)=>{
//     let sds=[]
//       for(const i of da){
//         let xx={
//           'img':'',
//           'name':i.operator.name,
//           'amount':i.quantity,
//           'operator_id':i.operator.id
//         }
  
//         sds.push(xx)
//       }
  
//       return sds
//   }

  

// const getorderlist=async()=>{
  
//     console.log('ssssssdsdsds')
//      let xdata=[]
//      try {
       
//          const response = await axios.get(`${config.apiUrl}/api/order`, {
//              headers: {
//                  Authorization: `Bearer ${token}`
//              }
//          });
//          for(const i of response?.data?.orders ){
   
//            console.log("jnjnjnjni",i)
//              let dx={order_no:i.id,
   
//                details:getdata(i.orderItems),
   
//                order_date:i.updatedAt,
//                isdeleted:i.isDeleted,
   
//                status:i.status,
//              total_quantity:i.totalQuantity,
//              simCards:i.simCards,
//             totalPrice:i.totalPrice,
//         totalQuantity:i.totalQuantity}
   
   
   
//              xdata.push(dx)
//              console.log("asasaas",dx)
//          }
//          setdataset(xdata)
//          setdataset2(xdata)
//          setdatasetfilter(xdata)
//          setloader(false)
//          setnodatafound(response.data.orders.length>0?false:true)
//          console.log("adadada",xdata)
         
//      } catch (error) {
//         setloader(false)
//          console.error('Error++++:', error);
//          toast.error(error)
//          throw error;
     
//      }
  
//    }

// const handlefilter=(e)=>{
//     console.log("filter",e)
//     let val=e.target.value
//     if(val !== ''){
//         const df=datasetfilter?.filter((n)=>n.order_no === parseInt(val))
//         // console.log("filter",e,df)
//         setdataset(df.length>0?df:[])
//     }else{ 
//         setdataset(dataset2)
//         console.log("filter",'emty')
//     }
   
// }

// const GetSimList = async () => {
//     try {
//         const response = await axios.get(`${config.apiUrl}/api/sim`,{
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         console.log('Response:', response);
//         setSimList(response.data.SIMCards)
//     } catch (error) {
//         console.error('Error++++:', error);
//         throw error;
//     }
// };



// const leftbtn =()=>{
 
   
// }

// const rightbtn=async()=>{

// }


// useEffect(() => { 
//     setloader(true)
//     // getorderlis()
//     console.log("sdsdsfe333")
//     getorderlist()
//     GetSimList()
// }, [])



//   return (

   
//     <div  className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px]" >
//     <Addnewsimrequest isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype}/>
//     <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={leftbtn} type={alertType} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={rightbtn} />

//     {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
//     {loader &&   <LoadingSoS  /> } 


 
//         {nodatafound === false ?
//     <Card className="bg-[#303038]  text-white h-full w-[95%]" style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column',backgroundColor:'', transition: "all 300ms"}}>
//         <div className="flex justify-between items-center ">
//         <Title className="text-4xl">{t('requestOrder')}</Title>
//             <div className="flex justify-between items-center gap-3">
//                 <TextInput type='number' onChange={(e)=>handlefilter(e)} className="rounded-[5px]  !bg-[#444444] border border-[#595959] w-[17rem]" icon={SearchIcon} placeholder={t('search')}/>
//             </div>
//         </div>
//         <Table className="mt-5 h-[80vh] transition-all[300]" >
//             <TableHead>
//                 <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:''}}>
//                     <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input type="checkbox"/> {t('serial')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('orderNo')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('details')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('total')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('totalPrice')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Order date</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('status')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
//                 </TableRow>
//             </TableHead>
        
//             <TableBody style={{height:'100%',backgroundColor:"",transition: "all 300ms"}} className='transition-all[300ms]'>
               
//                 {dataset?.map((item,index) => (
//                     <TableRow key={index} style={{borderColor:'#595959',transition: "all 300ms"}} >
//                         <TableCell>
//                             <input type="checkbox" style={{backgroundColor:'#2B2B33'}}/> <span style={{backgroundColor:'#2B2B33'}} className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
//                         </TableCell>

//                         <TableCell>
//                             <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
//                                   <Text>{item.order_no}</Text>
//                             </div>
                           
//                         </TableCell>

//                         <TableCell>
//                             <Text style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'column',gap:'5px',height:'auto'}}>{item.details?.map((n)=>{
//                                 return(
//                                     <div style={{display:'flex' ,alignItems:'center',justifyContent:'center',gap:'2px'}}>
//                                             <span style={{width:'64%',textAlign:'left'}}>{n.name}</span>
//                                             <span style={{width:'1%'}}>:</span>
//                                             <span style={{width:'35%',textAlign:'left',marginLeft:'10px'}}>{n.amount}</span>
//                                     </div>
//                                 )
//                             })}</Text>
//                         </TableCell>
                     

//                         <TableCell>
//                             <Text>
//                             {item.totalQuantity}
//                             </Text>
//                         </TableCell>

//                         <TableCell>
//                           <Text>
//                               €{item.totalPrice}
//                           </Text>
//                         </TableCell>

//                         <TableCell>
//                            <Text>{moment(item.order_date).format('YYYY-MM-DD')}</Text>
//                         </TableCell>

//                         <TableCell onClick={()=>setselecteditem(item)} style={{backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',position:'relative', transition: "all 300ms"}}>

//                               <div style={{backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',position:'relative', transition: "all 300ms",width:'8.5rem'}}>
//                                  <Dropdown dropType={'sim'} getdata={getselecteditem}  order_status={item.status}/></div> 
                         
             
//                         </TableCell>


//                         <TableCell >
//                             <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
//                             <FontAwesomeIcon icon={faEllipsisVertical} />
//                             {showedit &&  <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%',zIndex:'9999999' ,height:'4rem',display:( index === showeditindex) ?'flex':'none'}}>
//                             <Editopstions 
//                              getdata={getaction} edittext={item.status !== 'approved'?'Add Sim':''} status={item.status === 'approved'?'approved':''}/> 
                             
//                             </div>}
//                             </div>
                        
//                         </TableCell>

//                     </TableRow>
//                 ))}
//             </TableBody>
            
//         </Table>
//     </Card>
//     :<Nodatafound btn_text={''}  tittle_head={'No Order List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>}

  
    
    
    
    
    
    
    
//     <style jsx>
//         {`body::-webkit-scrollbar {
//                 display: none;
//                 }

//                 /* Hide scrollbar for IE, Edge */
//                 body {
//                 -ms-overflow-style: none;
//                 }

//                 /* Hide scrollbar for Firefox */
//                 body {
//                 scrollbar-width: thin;
//                 scrollbar-color: transparent transparent;
//                 }`}
//     </style>
//     </div>
//   )
// }


// export default SimRequestAdminpage


import React, { useState, useEffect } from 'react';
import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    TextInput,
    Title
} from "@tremor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDisclosure } from "@chakra-ui/react";
import Popnotification from '../PopNotification/Popnotification.jsx';
import Editopstions from '../EditFunctionality/Editopstions.jsx';
import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
import Addnewsimrequest from './Addnewsimrequest.jsx';
import moment from "moment/moment.js";
import Nodatafound from '../NoDataFound/Nodatafound.jsx';
import Dropdown from '../Dropdown/Dropdown.jsx';
import AlertBox from '../AlertBox/AlertBox.jsx';
import { useAuth } from "../../Context/AuthInfo.jsx";
import { useTranslation } from "react-i18next";
import { dummySimRequests } from './simrequestdata.jsx';
import { dummyOperators } from '../InventoryTable/dataset.jsx';
import { dummySims } from '../SimList/simlistdataset.jsx';


const SimRequestAdminpage = ({ actioncallset }) => {
    const { user, changeLoad } = useAuth();
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const [showedit, setshowedit] = useState(false);
    const [showeditindex, setshoweditindex] = useState(null);
    const [selecteditem, setselecteditem] = useState(null);
    const [actiontype, setactiontype] = useState(false);
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('success');
    const [showpopoupmsg, setshowpopupmsg] = useState('');
    const [loader, setloader] = useState(false);
    const [dataset, setdataset] = useState([]);
    const [dataset2, setdataset2] = useState([]);
    const [datasetfilter, setdatasetfilter] = useState([]);
    const [simList, setSimList] = useState([]);
    const [nodatafound, setnodatafound] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');

    const getaction = (e) => {
        if (e.type === 'edit') {
            actioncallset('review', selecteditem?.order_no);
        } else if (e.type === 'delete') {
            setactiontype(false);
            setAlertType('');
            setAlertText('Are you sure you want to delete this order?');
            setAlertButtonText(t('yesDel'));
            setAlertButtonTextSecond(t('cancel'));
            onAlertOpen();
        } else if (e.type === 'pdf_info') {
            const operatorCounts = selecteditem?.details.map(detail => ({
                operator: detail.name,
                total: detail.amount
            }));
            localStorage.setItem('orderitem', JSON.stringify({ order_id: selecteditem?.order_no, data: operatorCounts }));
            actioncallset('pdf_info', selecteditem?.order_no);
        }
    };

    const callbox = () => {
        setactiontype(false);
        onOpen();
    };

    const onbuttonclicked = (e) => {
        if (e.clicked === true) {
            callbox();
        }
    };

    const countamount = (e) => {
        return e.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.amount), 0);
    };

    const getselecteditem = (status) => {
        const index = dummySimRequests.findIndex(req => req.order_no === selecteditem.order_no);
        if (index !== -1) {
            dummySimRequests[index].status = status.toLowerCase();
            setshowpopupstatus('success');
            setshowpopupmsg('Status successfully updated');
            setshowpopup(true);
            getorderlist();
            changeLoad();
            setTimeout(() => {
                setshowpopup(false);
            }, 3000);
        } else {
            setshowpopupstatus('fail');
            setshowpopupmsg('Status could not update');
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 3000);
        }
    };

    const getdata = (da) => {
        return da.map(item => ({
            img: dummyOperators.find(op => op.id === item.operator_id)?.logo || '',
            name: item.name,
            amount: item.amount,
            operator_id: item.operator_id
        }));
    };

    const getorderlist = async () => {
        setloader(true);
        try {
            const xdata = dummySimRequests.map(order => ({
                order_no: order.order_no,
                details: getdata(order.details),
                order_date: order.order_date,
                isdeleted: order.isdeleted || false,
                status: order.status,
                total_quantity: order.total_quantity,
                totalPrice: order.status === 'approved' ? order.details.reduce((sum, item) => sum + item.amount * 10, 0) : 0, // Mock price
                simCards: dummySims.filter(sim => sim.order_no === order.order_no) // Mock simCards
            }));
            setdataset(xdata);
            setdataset2(xdata);
            setdatasetfilter(xdata);
            setnodatafound(xdata.length === 0);
            setloader(false);
        } catch (error) {
            console.error('Error:', error);
            setshowpopupmsg('Failed to fetch orders');
            setshowpopupstatus('fail');
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 3000);
            setloader(false);
        }
    };

    const deleteOrder = async (item) => {
        try {
            const index = dummySimRequests.findIndex(req => req.order_no === item.order_no);
            if (index !== -1) {
                dummySimRequests.splice(index, 1);
                await getorderlist();
                setshowpopupmsg('Order successfully deleted');
                setshowpopupstatus('success');
                setshowpopup(true);
                setTimeout(() => {
                    setshowpopup(false);
                }, 3000);
                onAlertClose();
            } else {
                throw new Error('Order not found');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            setshowpopupmsg('Could not delete order');
            setshowpopupstatus('fail');
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 3000);
        }
    };

    const GetSimList = async () => {
        try {
            setSimList(dummySims);
        } catch (error) {
            console.error('Error:', error);
            setshowpopupmsg('Failed to fetch SIMs');
            setshowpopupstatus('fail');
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 3000);
        }
    };

    const handlefilter = (e) => {
        const val = e.target.value;
        if (val !== '') {
            const df = datasetfilter.filter(n => n.order_no.toLowerCase().includes(val.toLowerCase()));
            setdataset(df.length > 0 ? df : []);
        } else {
            setdataset(dataset2);
        }
    };

    useEffect(() => {
        setloader(true);
        getorderlist();
        GetSimList();
    }, []);

    return (
        <div className="flex justify-center h-full w-full items-center md:items-start bg-[#303038] rounded-[7px]">
            <Addnewsimrequest
                isOpen={isOpen}
                onClose={onClose}
                data={selecteditem}
                action={actiontype}
                getstatus={() => getorderlist()}
                alertOpen={onAlertOpen}
            />
            <AlertBox
                isOpen={isAlertOpen}
                onOpen={onAlertOpen}
                onClose={onAlertClose}
                type={alertType}
                text={alertText}
                buttonText={alertButtonText}
                seconDbuttonText={alertButtonTextSecond}
                exFunc={() => deleteOrder(selecteditem)}
            />
            {showpopoup && <Popnotification msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} />}
            {loader && <LoadingSoS />}
            {nodatafound ? (
                <Nodatafound
                    btn_text={''}
                    tittle_head={'No Order List Found'}
                    title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}
                />
            ) : (
                <Card
                    className="bg-[#303038] text-white h-full w-[95%]"
                    style={{ border: 'none', borderStyle: 'none', boxShadow: 'none', gap: '2rem', display: 'flex', flexDirection: 'column', backgroundColor: '', transition: "all 300ms" }}
                >
                    <div className="flex justify-between items-center">
                        <Title className="text-4xl">{t('requestOrder')}</Title>
                        <div className="flex justify-between items-center gap-3">
                            <TextInput
                                type='text'
                                onChange={handlefilter}
                                className="rounded-[5px] !bg-[#444444] border border-[#595959] w-[17rem]"
                                icon={SearchIcon}
                                placeholder={t('search')}
                            />
                        </div>
                    </div>
                    <Table className="mt-5 h-[80vh] transition-all[300]">
                        <TableHead>
                            <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{ margin: '0px 4px', backgroundColor: '' }}>
                                <TableHeaderCell style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', borderRight: '2px solid #303038' }}>
                                    <input type="checkbox" /> {t('serial')}
                                </TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('orderNo')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('details')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('total')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('totalPrice')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>Order date</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('status')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>Action</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ height: '100%', backgroundColor: "", transition: "all 300ms" }} className='transition-all[300ms]'>
                            {dataset?.map((item, index) => (
                                <TableRow key={index} style={{ borderColor: '#595959', transition: "all 300ms" }}>
                                    <TableCell>
                                        <input type="checkbox" style={{ backgroundColor: '#2B2B33' }} />
                                        <span style={{ backgroundColor: '#2B2B33' }} className="ml-5">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Text>{item.order_no}</Text>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Text style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', gap: '5px', height: 'auto' }}>
                                            {item.details?.map((n, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                                                    <span style={{ width: '64%', textAlign: 'left' }}>{n.name}</span>
                                                    <span style={{ width: '1%' }}>:</span>
                                                    <span style={{ width: '35%', textAlign: 'left', marginLeft: '10px' }}>{n.amount}</span>
                                                </div>
                                            ))}
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{item.total_quantity}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>€{item.totalPrice}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{moment(item.order_date).format('YYYY-MM-DD')}</Text>
                                    </TableCell>
                                    <TableCell onClick={() => setselecteditem(item)} style={{ backgroundColor: '', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', transition: "all 300ms" }}>
                                        <div style={{ backgroundColor: '', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', transition: "all 300ms", width: '8.5rem' }}>
                                            <Dropdown dropType={'sim'} getdata={getselecteditem} order_status={item.status} />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            style={{ position: 'relative', width: "100%", backgroundColor: '', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                                            onClick={() => {
                                                setshowedit(index === showeditindex ? false : true);
                                                setshoweditindex(index === showeditindex ? null : index);
                                                setselecteditem(item);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                            {showedit && (
                                                <div
                                                    style={{ position: 'absolute', width: '8rem', right: '50%', top: '1%', zIndex: '9999999', height: '4rem', display: index === showeditindex ? 'flex' : 'none' }}
                                                >
                                                    <Editopstions
                                                        getdata={getaction}
                                                        edittext={item.status !== 'approved' ? 'Add Sim' : ''}
                                                        status={item.status === 'approved' ? 'approved' : ''}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}
            <style jsx>{`
                body::-webkit-scrollbar {
                    display: none;
                }
                body {
                    -ms-overflow-style: none;
                    scrollbar-width: thin;
                    scrollbar-color: transparent transparent;
                }
                input[type="checkbox"] {
                    appearance: none;
                    width: 15px;
                    height: 15px;
                    border: 2px solid #ddd;
                    border-radius: 3px;
                    background-color: transparent;
                }
                input[type="checkbox"]:checked {
                    background-color: #4CAF50;
                }
            `}</style>
        </div>
    );
};

export default SimRequestAdminpage;