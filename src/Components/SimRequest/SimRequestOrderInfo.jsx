import React, { useState ,useEffect} from 'react';
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
    Text, TextInput,
    Title,

} from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {useDisclosure,Button} from "@chakra-ui/react";
import Addnewsimcard from '../SimList/Addnewsimcard.jsx';
import Popnotification from '../PopNotification/Popnotification.jsx';
import Editopstions from '../EditFunctionality/Editopstions.jsx';
import { removeItem } from '../SimList/simlistdataset.jsx';
import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
import Nodatafound from '../NoDataFound/Nodatafound.jsx';
import { global_css } from '../../GlobalCss/GlobalCSS.js';
import companylogo from '../../assets/static/companylogo.svg'
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
import SimrequestFilter from './SimrequestFilter.jsx';
import AlertBox from '../AlertBox/AlertBox.jsx';
import Addnewsimrequest from './Addnewsimrequest.jsx';
import {useAuth} from "../../Context/AuthInfo.jsx";
import {useTranslation} from "react-i18next";

const SimRequestOrderInfo = ({actioncallset,orderid}) => {
    const { user , token } = useAuth();
    const {t} = useTranslation()

    const [actiontype,setactiontype]=useState(false)

    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [pageview,setpageview]=useState('initial')
    const [loader,setloader]=useState(false)

    const[dataset,setdataset]=useState()
    const[simcount,setsimcount]=useState('')
    const[SimList,setSimList]=useState([])

    const getorderlist=async(e)=>{
         try {
             // ${config.apiUrl}/${item.logoUrl}
             const response = await axios.get(`${config.apiUrl}/api/order/${e}`, {
                 headers: {
                     Authorization: `Bearer ${token}`
                 }
             });
             console.log('Response:for get order cvcvcv', response.data.order);
            
             setdataset(response?.data?.order)
             setsimcount(response?.data?.order?.simCards?.length)
             setloader(false)
             
         } catch (error) {
            setloader(false)
             console.error('Error++++:', error);
             toast.error(error)
             throw error;
         
         }
      
       }

    //    const GetSimList = async () => {
    //     try {
    //         const response = await axios.get(`${config.apiUrl}/api/sim`);
    //         console.log('Response:', response);
    //         setSimList(response.data.SIMCards)
    //     } catch (error) {
    //         console.error('Error++++:', error);
    //         toast.error(error)
    //         throw error;
    //     }
    // };


    // const getoperator=(e)=>{
    //     let dat=SimList?.filter((n)=> {
    //         if( parseInt(n.operatorId) === parseInt(e)){
    //              console.log("wewewv",n,e)

    //             return n.operator.name
    //         }
    //       })
    //     return dat
    // }

       useEffect(() => { 
        // setloader(true)
        // GetSimList()
        getorderlist(orderid)
    }, [])
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className="flex justify-center h-full w-[100%] items-center md:items-start   rounded-[7px]" >
    {/* <Addnewsimrequest isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype}/> */}
    {/* {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
    {loader &&   <LoadingSoS  /> }  */}


 
   
    <Card className="bg-[#303038]  text-white h-[97%] w-[55%]" style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column',backgroundColor:'',borderRadius:global_css.card_border_radius}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div ><img src={companylogo} style={{width:'10rem',height:'100%'}}/>
            </div>
            <div style={{display:'flex',justifyContent:"center",alignItems:'flex-end',flexDirection:'column',fontSize:'12px'}}>
                <span style={{fontSize:'26px' ,fontWeight:"500"}}>{t('simList')} ({simcount})</span>
                <span style={{fontSize:'14px' ,fontWeight:"600"}}>{t('agentName')}</span>
                <span>Order no. {orderid}</span>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><span>hi@gmail.com</span> <span>|</span> <span>+9890934</span></div>
            </div>
        
        </div>

      
        <Table className="mt-5" >
            <TableHead>
                <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 0px',backgroundColor:'',fontWeight:'200'}}>
                    <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038',fontWeight:'400'}}> {t('serial')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038',fontWeight:'400'}}>{t('operators')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038',fontWeight:'400'}}>ICCID number</TableHeaderCell>
                    <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px',fontWeight:'400'}}>{t('simNumber')}</TableHeaderCell>
                </TableRow>
            </TableHead>
        
            <TableBody style={{backgroundColor:""}} >
               
                {dataset?.simCards?.map((item,index) => (
                    <TableRow key={index} >
                        <TableCell>
                            <span style={{backgroundColor:'#2B2B33'}} className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                        </TableCell>

                        <TableCell>
                          
                                  <Text>{item.operator?.name}</Text>
                     
                           
                        </TableCell>

                        <TableCell>
                            <Text >
                                {item.iccidNumber}</Text>
                        </TableCell>
                     

                        <TableCell>
                            <Text>
                            {item.simCardNumber}
                            </Text>
                        </TableCell>


                    </TableRow>
                ))}
            </TableBody>
            
        </Table>
    </Card>

  
    
    
    
    
  
    </div>
  )
}

export default SimRequestOrderInfo