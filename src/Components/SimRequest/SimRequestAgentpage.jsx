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
// // import {dataset} from "./simrequestdatalist";
// import {useDisclosure} from "@chakra-ui/react";
// import Popnotification from '../PopNotification/Popnotification.jsx';
// import Editopstions from '../EditFunctionality/Editopstions.jsx';
// import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
// import Addnewsimrequest from './Addnewsimrequest.jsx';
// import Nodatafound from '../NoDataFound/Nodatafound.jsx';
// import { reqremoveItem } from './simrequestdatalist.jsx';
// import { requpdateItemstatus } from './simrequestdatalist.jsx';
// import Dropdown from '../Dropdown/Dropdown.jsx';
// import axios from "axios";
// import config from "../../config.jsx";
// import moment from 'moment';
// import {useAuth} from "../../Context/AuthInfo.jsx";
// import {convertString} from "../commonFunctions/StringConversion.jsx";
// import AlertBox from '../AlertBox/AlertBox.jsx';
// import {useTranslation} from "react-i18next";
// const SimRequestAgentpage = () => {
//     const {t} = useTranslation()
//     const { user , token } = useAuth();
//     const { isOpen, onOpen, onClose } = useDisclosure()

//     const [showAlert, setShowAlert] = useState(false);
//     const { isOpen:isOpenEdit , onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure()
//     const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
//     const [selected, setSelected] = useState([]);
//     const [isAllSelected, setIsAllSelected] = useState(false);
//     const [alertType, setAlertType] = useState('');
//     const [alertText, setAlertText] = useState('');
//     const [alertButtonText, setAlertButtonText] = useState('');
//     const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');

//     const [showedit,setshowedit]=useState(false)
//     const [showeditindex,setshoweditindex]=useState(null)
//     const [selecteditem,setselecteditem]=useState(null)
//     const [actiontype,setactiontype]=useState(false)
//     const [loader,setloader]=useState(false)
//     const [showpopoup,setshowpopup]=useState(false)
//     const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
//     const [showpopoupmsg,setshowpopupmsg]=useState('')
//     const [pageview,setpageview]=useState('initial')
//     const [orderlist,setorderlist]=useState([])
//     const[dataset,setdataset]=useState([])

//     const getaction=(e)=>{
//         console.log('action',selecteditem)
//         if(e.type === 'edit'){
//                 setactiontype(true)
//                 onOpen()

//         }else if(e.type === 'delete'){
//                 setactiontype(false)

//                 let ress=null
//                 axios.delete(`${config.apiUrl}/api/order/${selecteditem?.order_no}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }).then((ress)=> {
//                     if(ress.status === 200){
//                         getorderlist()
//                         setshowpopup(true)
//                         setshowpopupstatus('success')

//                         setshowpopupmsg('Order successfully deleted')
//                         setTimeout(() => {
//                         setshowpopup(false)
//                         }, 3000);
//                     }else{
//                         setshowpopupstatus('failed')

//                         setshowpopup(true)
//                         setshowpopupmsg('could not delete')
//                         setTimeout(() => {
//                         setshowpopup(false)
//                         }, 3000);
//                     }
//                 });


//                 // reqremoveItem(selecteditem, token).then(res=>{
//                 //     if(res === 200){
//                 //         getorderlist()
                        
//                 //         setshowpopupmsg('Order successfully deleted')
//                 //         setshowpopup(true)
//                 //         setTimeout(() => {
//                 //         setshowpopup(false)
//                 //         }, 3000);
//                 //     }else{
//                 //         setshowpopup(true)
//                 //         setshowpopupmsg('could not delete')
//                 //         setTimeout(() => {
//                 //         setshowpopup(false)
//                 //         }, 3000);
//                 //     }
//                 // })
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
//     setloader(true)
//     console.log('ssssss')
//      let xdata=[]
//      try {
//          // ${config.apiUrl}/${item.logoUrl}
//          const response = await axios.get(`${config.apiUrl}/api/order`,{
//              headers: {
//                  Authorization: `Bearer ${token}`
//              }
//          });
//          console.log('Response:for get order', response.data.orders);
//          for(const i of response?.data?.orders ){
   
//            console.log("jnjnjnjni",i)
//              let dx={order_no:i.id,
   
//                details:getdata(i.orderItems),
   
//                order_date:i.updatedAt,
//                isdeleted:i.isDeleted,
   
//                status:i.status,
//              total_quantity:i.totalQuantity,
//             totalPrice:i.totalPrice}
   
   
   
//              xdata.push(dx)
//              console.log("asasaas",dx)
//          }
//          setdataset(xdata)
   
//          console.log("adadada",dataset)
         
//      } catch (error) {
//          console.error('Error++++:', error);
//          throw error;
     
//      }
//      setloader(false)
//    }


//    const getstatus=(e)=>{
//     console.log("sd status89898",e)
//         if(e==='true'){
//             getorderlist(token)
//         }
//    } 

// useEffect(() => { 
//     // getorderlis()
//     console.log("asdasd")
//     getorderlist(token)
// }, [])

// const alertFunc = () => {
//         onAlertClose()
// }

//   return (
//     <div  className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px]" >
//     <Addnewsimrequest isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype} alertOpen={onAlertOpen}  getstatus={getstatus}/>
//     {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 

//      {loader &&  <LoadingSoS  /> }

//      <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={'success'}
                      
//                       text={'Your request has been successfully placed.'} buttonText={'Back to inventory'}
//                       seconDbuttonText={''}
//                       exFunc={alertFunc}

//             />

//     {  dataset.length>0?
    
//     <Card className="bg-[#303038]  text-white h-full w-[95%]" style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column',backgroundColor:''}}>
//         <div className="flex justify-between items-center ">
//         <Title className="text-4xl">{t('requestOrder')}</Title>
//             <div className="flex justify-between items-center gap-3">
//                 <TextInput className="rounded-[5px]  !bg-[#444444] border border-[#595959] w-[17rem]" icon={SearchIcon} placeholder={t('search')} />
//                 <button onClick={()=>callbox()} className="py-2 px-2 bg-[#27CF7A] text-white font-bold  rounded-[4px] w-[8rem]">Add new</button>
//             </div>
//         </div>
//         <Table className="mt-5 h-[80vh]" >
//             <TableHead>
//                 <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:''}}>
//                     <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input type="checkbox"/> {t('serial')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('orderNo')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('details')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('total')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('totalPrice')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('orderDate')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('status')}</TableHeaderCell>
//                     <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
//                 </TableRow>
//             </TableHead>
           
//             <TableBody style={{height:'100%',backgroundColor:""}} >
               
//                 {dataset.map((item,index) => (
//                     <TableRow key={index} style={{borderColor:'#595959',maxHeight:'auto',height:'10rem'}}>
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
//                             {item.total_quantity}
                              
//                             </Text>
//                         </TableCell>

//                         <TableCell>
//                           <Text> €{item.status === 'approved'? item.totalPrice:''}</Text>
//                         </TableCell>

//                         <TableCell>
//                            <Text>{moment(item.order_date).format('YYYY-MM-DD')}</Text>
//                         </TableCell>

//                         <TableCell>
//                                 <span className={item.status==='pending'? "!text-[#FFA526]" : item.status==='approved'? "!text-[#12B262]":item.status==='canceled'? "!text-[#E55245]":item.status==='processing'? "!text-[#0080FF]":''}>{convertString(item?.status)}</span>
//                         </TableCell>


//                         <TableCell >
//                             <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
//                             <FontAwesomeIcon icon={faEllipsisVertical} />
//                             {showedit &&  <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%',zIndex:'9999999' ,height:'4rem',display:( index === showeditindex) ?'flex':'none'}}>
//                             <Editopstions 
//                              getdata={getaction} edittext={'Edit'}/> 
                             
//                             </div>}
//                             </div>
                        
//                         </TableCell>

//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     </Card>:<Nodatafound btn_text={'Request order'}  tittle_head={'No Order List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onbuttonclicked}/>}

  
    
    
    
    
    
    
    
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
// </div>
//   )
// }


// export default SimRequestAgentpage



import React, { useState, useEffect } from 'react';
import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
import {
    Badge,
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
import { useDisclosure, Button } from "@chakra-ui/react";
import Popnotification from '../PopNotification/Popnotification.jsx';
import Editopstions from '../EditFunctionality/Editopstions.jsx';
import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
import Addnewsimrequest from './Addnewsimrequest.jsx';
import Nodatafound from '../NoDataFound/Nodatafound.jsx';
import AlertBox from '../AlertBox/AlertBox.jsx';
import { useAuth } from "../../Context/AuthInfo.jsx";
import { convertString } from "../commonFunctions/StringConversion.jsx";
import { useTranslation } from "react-i18next";
import { dummyOperators } from '../InventoryTable/dataset.jsx';
import { dummySimRequests } from './simrequestdata.jsx';
import moment from 'moment';


const SimRequestAgentpage = () => {
    const { t } = useTranslation();
    const { user, changeLoad } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const [showAlert, setShowAlert] = useState(false);
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [showedit, setshowedit] = useState(false);
    const [showeditindex, setshoweditindex] = useState(null);
    const [selecteditem, setselecteditem] = useState(null);
    const [actiontype, setactiontype] = useState(false);
    const [loader, setloader] = useState(false);
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('success');
    const [showpopoupmsg, setshowpopupmsg] = useState('');
    const [pageview, setpageview] = useState('initial');
    const [dataset, setdataset] = useState([]);

    const getaction = (e) => {
        if (e.type === 'edit') {
            setactiontype(true);
            onOpen();
        } else if (e.type === 'delete') {
            setactiontype(false);
            setAlertType('');
            setAlertText('Are you sure you want to delete this order?');
            setAlertButtonText(t('yesDel'));
            setAlertButtonTextSecond(t('cancel'));
            onAlertOpen();
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
                total_quantity: order.details.reduce((sum, item) => sum + item.amount, 0),
                totalPrice: order.status === 'approved' ? order.details.reduce((sum, item) => sum + item.amount * 10, 0) : 0 // Mock price calculation
            }));
            setdataset(xdata);
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

    const getstatus = (e) => {
        if (e === 'true') {
            getorderlist();
            changeLoad();
        }
    };

    const alertFunc = () => {
        onAlertClose();
    };

    useEffect(() => {
        getorderlist();
    }, []);

    return (
        <div className="flex justify-center h-full w-full items-center md:items-start bg-[#303038] rounded-[7px]">
            <Addnewsimrequest
                isOpen={isOpen}
                onClose={onClose}
                data={selecteditem}
                action={actiontype}
                alertOpen={onAlertOpen}
                getstatus={getstatus}
            />
            {showpopoup && <Popnotification msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} />}
            {loader && <LoadingSoS />}
            <AlertBox
                isOpen={isAlertOpen}
                onOpen={onAlertOpen}
                onClose={onAlertClose}
                type={alertType || 'success'}
                text={alertType ? alertText : 'Your request has been successfully placed.'}
                buttonText={alertType ? alertButtonText : 'Back to inventory'}
                seconDbuttonText={alertType ? alertButtonTextSecond : ''}
                exFunc={alertType ? () => deleteOrder(selecteditem) : alertFunc}
            />
            {dataset.length > 0 ? (
                <Card
                    className="bg-[#303038] text-white h-full w-[95%]"
                    style={{ border: 'none', borderStyle: 'none', boxShadow: 'none', gap: '2rem', display: 'flex', flexDirection: 'column', backgroundColor: '' }}
                >
                    <div className="flex justify-between items-center">
                        <Title className="text-4xl">{t('requestOrder')}</Title>
                        <div className="flex justify-between items-center gap-3">
                            <TextInput className="rounded-[5px] !bg-[#444444] border border-[#595959] w-[17rem]" icon={SearchIcon} placeholder={t('search')} />
                            <button onClick={() => callbox()} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded-[4px] w-[8rem]">
                                Add new
                            </button>
                        </div>
                    </div>
                    <Table className="mt-5 h-[80vh]">
                        <TableHead>
                            <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{ margin: '0px 4px', backgroundColor: '' }}>
                                <TableHeaderCell style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', borderRight: '2px solid #303038' }}>
                                    <input type="checkbox" checked={isAllSelected} onChange={() => setIsAllSelected(!isAllSelected)} /> {t('serial')}
                                </TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('orderNo')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('details')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('total')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('totalPrice')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('orderDate')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('status')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>Action</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ height: '100%', backgroundColor: "" }}>
                            {dataset.map((item, index) => (
                                <TableRow key={index} style={{ borderColor: '#595959', maxHeight: 'auto', height: '10rem' }}>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(item.order_no)}
                                            onChange={() => {
                                                setSelected(prev =>
                                                    prev.includes(item.order_no)
                                                        ? prev.filter(id => id !== item.order_no)
                                                        : [...prev, item.order_no]
                                                );
                                            }}
                                            style={{ backgroundColor: '#2B2B33' }}
                                        />
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
                                    <TableCell>
                                        <span
                                            className={
                                                item.status === 'pending'
                                                    ? "!text-[#FFA526]"
                                                    : item.status === 'approved'
                                                    ? "!text-[#12B262]"
                                                    : item.status === 'canceled'
                                                    ? "!text-[#E55245]"
                                                    : item.status === 'processing'
                                                    ? "!text-[#0080FF]"
                                                    : ''
                                            }
                                        >
                                            {convertString(item.status)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: "100%",
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'column'
                                            }}
                                            onClick={() => {
                                                setshowedit(index === showeditindex ? false : true);
                                                setshoweditindex(index === showeditindex ? null : index);
                                                setselecteditem(item);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                            {showedit && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        width: '8rem',
                                                        right: '50%',
                                                        top: '1%',
                                                        zIndex: '9999999',
                                                        height: '4rem',
                                                        display: index === showeditindex ? 'flex' : 'none'
                                                    }}
                                                >
                                                    <Editopstions getdata={getaction} edittext={'Edit'} />
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            ) : (
                <Nodatafound
                    btn_text={'Request order'}
                    tittle_head={'No Order List Found'}
                    title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}
                    buttonclicked={onbuttonclicked}
                />
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

export default SimRequestAgentpage;