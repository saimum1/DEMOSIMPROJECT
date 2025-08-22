import React, { useState ,useEffect} from 'react';
import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
import {
    Badge,
    Card, Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text, TextInput,
    Title,

} from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {useDisclosure, Button, FormControl, FormLabel} from "@chakra-ui/react";
import Popnotification from '../PopNotification/Popnotification.jsx';
import Editopstions from '../EditFunctionality/Editopstions.jsx';
import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
import Nodatafound from '../NoDataFound/Nodatafound.jsx';
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
import AlertBox from "../AlertBox/AlertBox.jsx";
import SearchDialouge from "../SearchComponent/SearchDialouge.jsx";
import VideoUploader from '../PopNotification/VideoUploader.jsx';
import CustomEditors from '../EditFunctionality/CustomEditors.jsx';
import {convertString} from "../commonFunctions/StringConversion.jsx";
import { useAuth } from '../../Context/AuthInfo.jsx';
import { global_css } from '../../GlobalCss/GlobalCSS.js';
import AddedPayment from './AddedPayment.jsx';
import AddTransaction from './AddTransaction.jsx';
import AddedPaymentCourier from './AddedPaymentCourier.jsx';
import AddTransactionCourier from './AddTransactionCourier.jsx';
import {useTranslation} from "react-i18next";


const BalancePaymentHistoryCouruer =  ({actioncallset,agentid,optiontype}) => {
    const {t} = useTranslation()
    const { user , token ,profileInfo} = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen : isOpenUp, onOpen : onOpenUp , onClose: onCloseUp} = useDisclosure()
    const { isOpen : isOpenUpCourier, onOpen : onOpenUpCourier , onClose: onCloseUpCourier} = useDisclosure()
    const { isOpen : isOpenUpCourierTran, onOpen : onOpenUpCourierTran , onClose: onCloseUpCourierTran} = useDisclosure()

    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [simList,setSimList]=useState([])
    const [simForEdit,setSimForEdit]=useState({})
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [status, setStatus]=useState('paymentHistory')
    const [ bulkIds, setBulkIds ] = useState([])
    const [ allTrue, setAllTrue ] = useState(false)
    const [ oneTrue, setOneTrue ] = useState(false)
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [nodata, setNodata] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')


    const [totalDueSim, settotalDueSim] = useState(0);
    const [totalDueCourier, settotalDueCourier] = useState(0);
    const [totalDueCourierCommisionDue, settotalDueCourierCommisionDue] = useState(0);
    const [agentFinancialDataCourier, setagentFinancialDataCourier] = useState(null);




  


    const getaction=(e)=>{
        console.log('action',selecteditem)
        if(e.type === 'edit'){
            if(status === 'paymentHistory'){
                onOpenUpCourier()
                setactiontype(true)
            }else {
                onOpenUpCourierTran()
                setactiontype(true)
            }
        


                

        }else if(e.type === 'delete'){
            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText('Yes, Delete')
            setAlertButtonTextSecond('Cancel')
            setactiontype(false)
        }

    }



    const callbox =()=>{
        setactiontype(false)
        onOpen()
    }

    const onbuttonclicked=(e)=>{
                console.log("eee",e)
                if(e.clicked === true){
                    callbox()
                }
    }

    const deleteSim = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/financial/courier/agents/${selecteditem?.agentFinanceId}/${status === 'paymentHistory'? 'regularPayment':status === 'commissionHistory' ?'commissionPayment':status === 'transectionHistory'? 'courierSell': status === 'othersTransectionHistory'?'others':""}/${selecteditem?.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle successful deletion
            console.log('Operator deleted successfully');
           await getAgentFinancail()
            setshowpopupmsg('Delete Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            onAlertClose()
        } catch (error) {
            console.error('Error deleting operator:', error);
            setshowpopupmsg('Delete Failed')
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        }
    };

    const getTotaldue = async () => {

        try {
            const response = await axios.get(`${config.apiUrl}/api/financial/courier/totalDue`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:due', response);
            settotalDueCourier(response.data?.totalDue)
            settotalDueCourierCommisionDue(response?.data?.totalCommissionDue)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };

    useEffect(() => {
        console.log("agentid",agentid)
        setLoader(true)
        getAgentFinancail()
        getTotaldue()

    }, [isOpenUpCourier,isOpenUpCourierTran]);

    const getAgentFinancail = async () => {
      
        try {
            const response = await axios.get(`${config.apiUrl}/api/financial/courier/agents/${agentid}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('setagentFinancialDataOneCourier', response);
            setagentFinancialDataCourier(response?.data)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };

   

    const getdetails =()=>{
        actioncallset('payment' )

    }


    const updateAll =()=>{
        getAgentFinancail()
    }

    return (
        <div  className=" h-full w-full  border-none" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:''}}>
        
       
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={alertType==='warning'?UpdateBulk : deleteSim}/>
            <AddedPaymentCourier data={selecteditem}  isOpen={isOpenUpCourier} onClose={onCloseUpCourier} agentId={agentid} action={actiontype}  getdata={updateAll} optiontype={optiontype}/>
            <AddTransactionCourier statustype={status} data={selecteditem} isOpen={isOpenUpCourierTran} onClose={onCloseUpCourierTran} agentId={agentid} action={actiontype}  getdata={updateAll} optiontype={optiontype}/>
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }


            <div  style={{padding:".8rem 0",height:'100%',display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',backgroundColor:'',color:'white',borderRadius : global_css.card_border_radius}}>
              
               


                <div style={{display:'flex',justifyContent:"space-between",alignItems:"flex-start",flexDirection:'column',height:'100%',gap:'.7rem'}}>

                    <span style={{fontSize:'32px',fontWeight:700}}>{agentFinancialDataCourier?.agentName}</span>
                    {user.role !== 'ADMIN' && 
                                            <div style={{display:'flex',justifyContent:"space-between",alignItems:"space-between",flexDirection:'column',height:'100%'}}>
                                                                <span >{t('balanceSheet')} - ({status})</span>
                                                                <span>
                                                                    <FormControl>
                                                                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>{t('balanceType')}</FormLabel>
                                                                        <div style={{width:'100%'}}> 
                                                                            <select value={optiontype} style={{border : '1px solid #595959'}} className="w-[17rem] h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => actioncallset('',profileInfo?.agentId,e.target.value)} >
                                                                                <option value="SIM">
                                                                                    SIM
                                                                                </option>
                                                                                <option value="Courier">
                                                                                    Courier
                                                                                </option>
                                                                               
                                                                             </select>
                                                                            </div>
                                            
                                                                        </FormControl>
                                                                </span>
                                                            </div>}
                    
                    
                 {user?.role ===  'ADMIN' &&  <div style={{display:'flex',gap:'1rem'}}>
                 
                    <span style={{border:'1px solid white',borderRadius : global_css.card_border_radius,borderColor:'#fff9',height:'100%',width:'17rem',padding:'.5rem',display:"flex",justifyContent:'center',alignItems:'flex-start',flexDirection:'column'}}>
                        <span>Total Payable Due</span>
                       
                        <span style={{fontSize:'30px',fontWeight:'700',color:'#FFA526'}}>€ {totalDueCourier}</span>
                    </span>
                    <span style={{border:'1px solid white',borderRadius : global_css.card_border_radius,borderColor:'#fff9',height:'100%',width:'17rem',padding:'.5rem',display:"flex",justifyContent:'center',alignItems:'flex-start',flexDirection:'column'}}>
                        <span>Total Comm.</span>
                        <span style={{fontSize:'30px',fontWeight:'700',color:'#FFA526'}}>€ {totalDueCourierCommisionDue}</span>
                    </span>
                    </div> }

                   
                
                </div>
                <div style={{display:'flex',justifyContent:"space-between",alignItems:"center",flexDirection:'column',height:'100%',gap:''}}>
                   
                    <span>Last payment: {moment(agentFinancialDataCourier?.lastSIMTransactionDate).format(' MM/DD/YY')}</span>
                    {user?.role ===  'ADMIN' ?
                    
                    <span  style={{display:'flex',justifyContent:'flex-end',alignItems:'center',flexDirection:'column',gap:'18px',height:"100%"}}>  
                          <button onClick={() => {onOpenUpCourier(); setactiontype(false)}} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-[17rem]">Add payment</button>
                          <button onClick={() => {onOpenUpCourierTran(); setactiontype(false) }} className="py-2 px-2  text-white font-bold rounded rounded-1xl w-[17rem]" style={{border:'1px solid #999'}}>Add Transection</button>
                    </span>:
                        <div style={{display:'flex',gap:'1rem'}}>
                            <span style={{border:'1px solid white',borderRadius : global_css.card_border_radius,borderColor:'#fff9',height:'100%',width:'17rem',padding:'.5rem',display:"flex",justifyContent:'center',alignItems:'flex-start',flexDirection:'column'}}>
                            <span>Total Payable Due</span>
                            
                            <span style={{fontSize:'30px',fontWeight:'700',color:'#FFA526'}}>€ {totalDueCourier}</span>
                        </span>
                        <span style={{border:'1px solid white',borderRadius : global_css.card_border_radius,borderColor:'#fff9',height:'100%',width:'17rem',padding:'.5rem',display:"flex",justifyContent:'center',alignItems:'flex-start',flexDirection:'column'}}>
                            <span>Total Comm.</span>
                            <span style={{fontSize:'30px',fontWeight:'700',color:'#FFA526'}}>€ {totalDueCourierCommisionDue}</span>
                        </span>
                    </div>}
                  
                </div>

            </div>
            <div style={{height:'100%',display:'flex',width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:''}}>
                    {!nodata?
                        <Card className="bg-[#303038]  w-[100%]" style={{color:'white',borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,gap:'2rem',display:'flex',flexDirection:'column',boxShadow : 'none'}}>
                            <span style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                               
                                        <select style={{border : '1px solid #595959'}} className="w-[17rem] h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>
                                                <option value="paymentHistory">
                                                    Payment History
                                                </option>
                                               
                                                <option value="commissionHistory">
                                                    Commission History
                                                </option>
                                                  <option value="transectionHistory">
                                                  Transection History
                                              </option>
                                                
                                                <option value='othersTransectionHistory'>
                                                     Others Transection History
                                                </option>
                                            </select>
                                    

                                  

                                            <button onClick={() => {onOpen(); setactiontype(false)}} className="py-2 px-2 bg-[#595959] text-white font-bold rounded rounded-1xl w-[6rem]">Export</button>

                            </span>
                          { status === 'paymentHistory' || status === 'commissionHistory'?
                            <Table className='h-[45vh]' >
                                <TableHead>
                                    <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:'red'}}>
                                          
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('date')}</TableHeaderCell>
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Payment Type</TableHeaderCell>
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Transaction ID </TableHeaderCell>
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('details')}</TableHeaderCell>
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Paid Amount</TableHeaderCell>
                                        {user?.role === 'ADMIN' ?   <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>:''}
                                    </TableRow>
                                </TableHead>


                               {status === 'paymentHistory' ? 
                                <TableBody  >
                                
                                    {agentFinancialDataCourier?.courierTransactions?.regularPayment?.map((item,index) => (
                                        <TableRow key={item.id} style={{borderColor:'#595959'}}>
                                           

                                            <TableCell>
                                                <Text>{moment(item?.date).format(' MM/DD/YY')}</Text>
                                            </TableCell>
                                        

                                            <TableCell>
                                                <Text>
                                                    { convertString(item?.paymentType)}

                                                </Text>
                                            </TableCell>

                                            <TableCell>
                                                <Text>{item?.transactionId}</Text>
                                            </TableCell>

                                            <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                            <Text>{item?.details}</Text>
                                            </TableCell>

                                            <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                            <Text>€{item?.amount}</Text>
                                            </TableCell>

                                           
                                        {user?.role === 'ADMIN' ? 
                                            <TableCell>
                                                 <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                            {showedit &&  <div style={{position:'absolute',width:'9rem',right:'50%',top:'1%',zIndex:'99999' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                                <CustomEditors
                                                    getdata={getaction} selected={['view','delete','edit','export']}/>

                                            </div>}
                                        </div>
                                            </TableCell>
                                        :''}

                                        </TableRow>
                                    ))}
                                </TableBody>
                                   
                                :


                                <TableBody  >
                                
                                {agentFinancialDataCourier?.courierTransactions?.commissionPayment?.map((item,index) => (
                                    <TableRow key={item.id} style={{borderColor:'#595959'}}>
                                       

                                        <TableCell>
                                            <Text>{moment(item?.date).format(' MM/DD/YY')}</Text>
                                        </TableCell>
                                    

                                        <TableCell>
                                            <Text>
                                                { convertString(item?.paymentType)}

                                            </Text>
                                        </TableCell>

                                        <TableCell>
                                            <Text>{item?.transactionId}</Text>
                                        </TableCell>

                                        <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                        <Text>{item?.details}</Text>
                                        </TableCell>

                                        <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                        <Text>€{item?.commissionAmount}</Text>
                                        </TableCell>

                                       
                                    {user?.role === 'ADMIN' ? 
                                        <TableCell>
                                             <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {showedit &&  <div style={{position:'absolute',width:'9rem',right:'50%',top:'1%',zIndex:'99999' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                            <CustomEditors
                                                getdata={getaction} selected={['view','delete','edit','export']}/>

                                        </div>}
                                    </div>
                                        </TableCell>
                                    :''}

                                    </TableRow>
                                ))}
                            </TableBody>
                                
                                } 
                            </Table>



                           : 
                           status === 'othersTransectionHistory' || status === 'transectionHistory'  ? 


                            <Table className='h-[45vh]' >

                                <TableHead>
                              

                                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:'red'}}>
                                                                                
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Courier Date</TableHeaderCell>
                                      {status !== 'othersTransectionHistory'  && <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('orderNo')}</TableHeaderCell>}
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Amount </TableHeaderCell>
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Commission</TableHeaderCell>
                                        {user?.role === 'ADMIN' ?   <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>:''}
                                        </TableRow>

                                

                                </TableHead>

                            {status === 'transectionHistory'  ?


                                <TableBody  >
                                
                                    { agentFinancialDataCourier?.courierTransactions?.courierSell?.map((item,index) => (
                                        <TableRow key={item.id} style={{borderColor:'#595959'}}>
                                           

                                            <TableCell>
                                                <Text>{moment(item?.date).format(' MM/DD/YY')}</Text>
                                            </TableCell>
                                        

                                          
                                            <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                            <Text>€{item?.courierOrderNo}</Text>
                                            </TableCell>
                                           

                                            <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                            <Text>€{item?.amount}</Text>
                                            </TableCell>

                                            <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                            <Text>€{item?.commissionAmount}</Text>
                                            </TableCell>

                                           
                                        {user?.role === 'ADMIN' ? 
                                            <TableCell>
                                                 <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                            {showedit &&  <div style={{position:'absolute',width:'9rem',right:'50%',top:'1%',zIndex:'99999' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                                <CustomEditors
                                                    getdata={getaction} selected={['view','delete','edit','export']}/>

                                            </div>}
                                        </div>
                                            </TableCell>
                                        :''}

                                        </TableRow>
                                    ))}
                                </TableBody>
                                :
                            status === 'othersTransectionHistory' ?
                            <TableBody  >
                                
                            { agentFinancialDataCourier?.courierTransactions?.others?.map((item,index) => (
                                <TableRow key={item.id} style={{borderColor:'#595959'}}>
                                   

                                    <TableCell>
                                        <Text>{moment(item?.date).format(' MM/DD/YY')}</Text>
                                    </TableCell>
                                

                                    {status !== 'othersTransectionHistory'  &&
                                    <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                    <Text>{item?.courierOrderNo}</Text>
                                    </TableCell>
                                    }

                                    <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                    <Text>€{item?.amount}</Text>
                                    </TableCell>

                                    <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                    <Text>€{item?.commissionAmount}</Text>
                                    </TableCell>

                                   
                                {user?.role === 'ADMIN' ? 
                                    <TableCell>
                                         <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                    {showedit &&  <div style={{position:'absolute',width:'9rem',right:'50%',top:'1%',zIndex:'99999' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                        <CustomEditors
                                            getdata={getaction} selected={['view','delete','edit','export']}/>

                                    </div>}
                                </div>
                                    </TableCell>
                                :''}

                                </TableRow>
                            ))}
                        </TableBody>
                               
                               :
                               
                             status === 'commissionHistory' ?
                             <TableBody  >
                                
                             { agentFinancialDataCourier?.courierTransactions?.commissionPayment?.map((item,index) => (
                                 <TableRow key={item.id} style={{borderColor:'#595959'}}>
                                    
 
                                     <TableCell>
                                         <Text>{moment(item?.date).format(' MM/DD/YY')}</Text>
                                     </TableCell>
                                 
 
                                
                                   
                                     <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                     <Text>€{item?.amount}</Text>
                                     </TableCell>
 
                                     <TableCell style={{color:'#29CC79',fontWeight:400}}>
                                     <Text>€{item?.commissionAmount}</Text>
                                     </TableCell>
 
                                    
                                 {user?.role === 'ADMIN' ? 
                                     <TableCell>
                                          <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                     <FontAwesomeIcon icon={faEllipsisVertical} />
                                     {showedit &&  <div style={{position:'absolute',width:'9rem',right:'50%',top:'1%',zIndex:'99999' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                         <CustomEditors
                                             getdata={getaction} selected={['view','delete','edit','export']}/>
 
                                     </div>}
                                 </div>
                                     </TableCell>
                                 :''}
 
                                 </TableRow>
                             ))}
                         </TableBody>
                             :
                               ''

                            }


                            </Table>

                            :''}
                        </Card>:<Nodatafound 
                    
                        btn_text={user?.role==='ADMIN'?'Add Sim':''} 
                        
                        tittle_head={'No data Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onbuttonclicked}/>}

            </div>
            <style jsx>
                {`body::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge */
  body {
    -ms-overflow-style: none;
  }
  
  /* Hide scrollbar for Firefox */
  body {
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
                  background-color: #4CAF50; /* Green background when checked */
                }

                .checkbox-box {
                  display: none; /* Not needed anymore */
                }

                ::-webkit-scrollbar {
                  width: 12px; /* Width of the scrollbar */
                  border: 1px solid #ddd; /* Border color of the scrollbar */
                  border-radius: 8px;
                }

                ::-webkit-scrollbar-thumb {
                  background-color: #999; /* Color of the thumb */
                  border-radius: 3px; /* Border radius of the thumb */
                }

                /* For Firefox */
                scrollbar {
                  width: 12px; /* Width of the scrollbar */
                }

                scrollbar-thumb {
                  background-color: #999; /* Color of the thumb */
                  border-radius: 3px; /* Border radius of the thumb */
                }


                `}
            </style>
        </div>
    );
};

export default BalancePaymentHistoryCouruer