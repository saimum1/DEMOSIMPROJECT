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
import {useTranslation} from "react-i18next";
const BalanceSheet = ({actioncallset}) => {
    const {t} = useTranslation()
    const { user , token } = useAuth();
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [status, setStatus]=useState('SIM') 
    const [nodata, setNodata] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')


    const [totalDueSim, settotalDueSim] = useState(0);
    const [totalDueCourier, settotalDueCourier] = useState(0);
    const [totalDueCourierCommisionDue, settotalDueCourierCommisionDue] = useState(0);
    const [agentFinancialData, setagentFinancialData] = useState(null);
    const [agentFinancialDataCourier, setagentFinancialDataCourier] = useState(null);
    const [agentFinancialDataF, setagentFinancialDataF] = useState(null);
    const [agentFinancialDataCourierF, setagentFinancialDataCourierF] = useState(null);



    useEffect(() => {
        setLoader(true)
        getTotaldue()
        getAllAgentFinancail()
    }, []);



    const getTotaldue = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/financial/sim/totalDue`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:due', response);
            settotalDueSim(response.data?.totalDue)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }




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


    const getAllAgentFinancail = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/financial/sim/agents`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:setagentFinancialData', response);
            setagentFinancialData(response.data?.allAgentFinanceDetails)
            setagentFinancialDataF(response.data?.allAgentFinanceDetails)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }




        try {
            const response = await axios.get(`${config.apiUrl}/api/financial/courier/agents`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:setagentFinancialDataCourier', response);
            setagentFinancialDataCourier(response.data?.allAgentFinanceDetails)
            setagentFinancialDataCourierF(response.data?.allAgentFinanceDetails)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };




    const getdetails =(e)=>{
        actioncallset('payment',e,status )

    }



    // const handlefilter=(e)=>{
    //     console.log("filter",e)
    //     let val=e.target.value
    //     if(val !== ''){
    //         const df=agentFinancialData?.filter((n)=>n.order_no === parseInt(val))
    //         setagentFinancialData(df.length>0?df:[])

    //         const dfcou=agentFinancialDataCourier?.filter((n)=>n.order_no === parseInt(val))
    //         setagentFinancialDataCourier(dfcou.length>0?dfcou:[])
    //     }else{ 
    //         setdataset(dataset2)
    //         console.log("filter",'emty')
    //     }
       
    // }


    const handlefilter = (e) => {
        console.log("filter", e);
        let val = e.target.value.trim().toLowerCase(); // Normalize input
        if (val !== "") {
            // Generic search function
            const filterData = (data) => {
                return data.filter((item) => {
                    return Object.values(item).some((field) => {
                        if (typeof field === "string" || typeof field === "number") {
                            // Check for substring match or closest number
                            return (
                                field.toString().toLowerCase().includes(val) || // Substring match
                                (!isNaN(val) && Math.abs(field - parseFloat(val)) < 10) // Closest number match (tolerance: 10)
                            );
                        }
                        return false;
                    });
                });
            };
    
            // Apply filtering to agentFinancialData
            const filteredAgentData = filterData(agentFinancialDataF);
            setagentFinancialData(filteredAgentData.length > 0 ? filteredAgentData : []);
    
            // Apply filtering to agentFinancialDataCourier
            const filteredCourierData = filterData(agentFinancialDataCourierF);
            setagentFinancialDataCourier(filteredCourierData.length > 0 ? filteredCourierData : []);
        } else {
            // Reset data if input is empty
            setdataset(dataset2);
            console.log("filter", "empty");
        }
    };
    


    return (
        <div  className=" h-full w-full  border-none" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1.2rem'}}>
        

            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }


            <div style={{flex:3,padding:"1rem",height:'100%',display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',color:'white',borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg}}>
              
                <div style={{display:'flex',justifyContent:"space-between",alignItems:"space-between",flexDirection:'column',height:'100%'}}>
                    <span >{t('balanceSheet')} - ({status})</span>
                    <span>
                        <FormControl>
                                <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>{t('balanceType')}</FormLabel>
                            <div style={{width:'100%'}}> 
                            <select style={{border : '1px solid #595959'}} className="w-[17rem] h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>
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
                </div>


                <div style={{display:'flex',justifyContent:"space-between",alignItems:"flex-end",flexDirection:'column',height:'100%',gap:'1rem'}}>
                <div style={{display:"flex",width:'100%',gap:"4%"}}> 
                    {status === 'Courier' && 
                    <span style={{border:'1px solid white',borderRadius : global_css.card_border_radius,borderColor:'#fff9',height:'100%',width:'17rem',padding:'.1rem',display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <span>Total Commission Amount</span>
                        <span style={{fontSize:'30px',fontWeight:'700',color:'#29CC79'}}>€ {totalDueCourierCommisionDue && totalDueCourierCommisionDue}</span>
                    </span>
                    }
                    <span style={{border:'1px solid white',borderRadius : global_css.card_border_radius,borderColor:'#fff9',height:'100%',width:'17rem',padding:'.1rem',display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <span>Total Due</span>
                        <span style={{fontSize:'30px',fontWeight:'700',color:'#FFA526'}}>€ {status === 'SIM'? totalDueSim:totalDueCourier}</span>
                    </span>
                </div>
                <span >
                    <div className="flex justify-between items-center gap-3">
                                    <TextInput type='number' onChange={(e)=>handlefilter(e)} className="rounded-[5px]  !bg-[#444444] border border-[#595959] w-[17rem]" icon={SearchIcon} placeholder={t('search')}/>
                                </div>
                    {/* <FormControl>
                        <div style={{width:'100%'}}> 
                        <select style={{border : '1px solid #595959'}} className="w-[17rem] h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>
                                    <option value="">
                                        SIM
                                    </option>
                                    <option value="available">
                                        Courier
                                    </option>
                                    <option value='not_available'>
                                        
                                    </option>
                                </select>
                            </div>

                        </FormControl> */}
                </span>
                </div>


            </div>
            <div style={{flex:7,height:'100%',display:'flex',width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:''}}>
                    {!nodata?
                        <Card className="bg-[#303038]  " style={{color:'white',borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,gap:'2rem',display:'flex',flexDirection:'column',boxShadow : 'none'}}>
                           
                            <Table className="mt-5 h-[45vh]">
                                <TableHead>

                                    {status === 'SIM'? 
                                    <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:'red'}}>
                                          
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('lastTransactionDate')}</TableHeaderCell>
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('agentId')}</TableHeaderCell>
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('agentName')} </TableHeaderCell>
                                        <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('dueAmount')}</TableHeaderCell>
                                        {user?.role === 'ADMIN' ?   <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>:''}
                                    </TableRow>
                                   :
                                          <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:'red'}}>
                                          
                                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('date')}</TableHeaderCell>
                                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('agentId')}</TableHeaderCell>
                                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('agentName')} </TableHeaderCell>
                                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Total Due</TableHeaderCell>
                                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Total Commission Amount</TableHeaderCell>
                                            {user?.role === 'ADMIN' ?   <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>:''}
                                        </TableRow>
                                   }
                                </TableHead>
                                {status === 'SIM'? 
                                <TableBody  >
                                
                                    {agentFinancialData?.map((item,index) => (
                                        <TableRow key={item.id} style={{borderColor:'#595959'}}>
                                          

                                            <TableCell>
                                                <Text>{status === 'SIM'
                                                    ? item?.lastSIMTransactionDate
                                                        ? moment(item.lastSIMTransactionDate).format('MM/DD/YY')
                                                        : 'No transaction yet'
                                                    : item?.lastCourierTransactionDate
                                                        ? moment(item.lastCourierTransactionDate).format('MM/DD/YY')
                                                        : 'No transaction yet'}
                                                </Text>
                                            </TableCell>
                                        

                                            <TableCell>
                                                <Text>{item?.agentId}</Text>
                                            </TableCell>

                                            <TableCell>
                                            <Text>{item?.agentName}</Text>
                                            </TableCell>

                                            <TableCell>
                                            <Text>€{ status === 'SIM'? item?.simDueAmount : item?.courierCommissionDueAmount}</Text>
                                            </TableCell>

                                           
                                        {user?.role === 'ADMIN' ? 
                                            <TableCell>
                                                <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                                     <button onClick={()=>getdetails(item?.agentId)} style={{borderRadius : global_css.card_border_radius,width:'100%',height:'100%',backgroundColor:'',border:'1px solid #999',fontSize:"12px",padding:".7rem"}}
                                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}>
                                                         {t('viewDetails')}
                                                    </button> 
                                                </div>
                                            </TableCell>
                                        :''}

                                        </TableRow>
                                    ))}
                                </TableBody>

                                :
                                <TableBody  >
                                
                                {agentFinancialDataCourier?.map((item,index) => (
                                    <TableRow key={item.id} style={{borderColor:'#595959'}}>
                                      

                                        <TableCell>
                                            <Text>{moment(item?.lastCourierTransactionDate).format(' MM/DD/YY')}</Text>
                                        </TableCell>
                                    

                                        <TableCell>
                                            <Text>{item?.agentId}</Text>
                                        </TableCell>

                                        <TableCell>
                                        <Text>{item?.agentName}</Text>
                                        </TableCell>

                                        <TableCell>
                                        <Text>€{item?.courierDueAmount}</Text>
                                        </TableCell>

                                        <TableCell>
                                        <Text>€{item?.courierCommissionDueAmount}</Text>
                                        </TableCell>

                                       
                                    {user?.role === 'ADMIN' ? 
                                        <TableCell>
                                            <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                                 <button onClick={()=>getdetails(item?.agentId)} style={{borderRadius : global_css.card_border_radius,width:'100%',height:'100%',backgroundColor:'',border:'1px solid #999',fontSize:"12px",padding:".7rem"}}
                                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}>
                                                     {t('viewDetails')}
                                                </button> 
                                            </div>
                                        </TableCell>
                                    :''}

                                    </TableRow>
                                ))}
                            </TableBody>
                                }
                            </Table>
                        </Card>:<Nodatafound 
                    
                        
                        tittle_head={'No data Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} />}

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

export default BalanceSheet