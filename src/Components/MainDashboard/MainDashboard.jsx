import React, { useState ,useEffect} from 'react';
import AlertBox from '../AlertBox/AlertBox'
import Popnotification from '../PopNotification/Popnotification'
import LoadingSoS from '../LoadingScreen/LoadingSoS'
import moment from "moment";
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
import { global_css } from '../../GlobalCss/GlobalCSS';
import { useDisclosure } from '@chakra-ui/react';
import { useAuth } from '../../Context/AuthInfo';
import axios from 'axios';
import config from '../../config';
import ChatAi from '../ChatBot/ChatAi';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Bar,ComposedChart, BarChart , Line, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,LabelList,CartesianGrid,
  PieChart,
  Pie,
  Area
} from "recharts"
import CircularProgress from './CircularProgress';
import CircularPieChart from './CircularPieChart';
import { convertString, NumberSystem, revertString } from '../commonFunctions/StringConversion';
import {useTranslation} from "react-i18next";


const MainDashboard = () => {
    const {t} = useTranslation()
    const { user , token, profileInfo ,changeR} = useAuth();
    const role =user.role
    const proInfo =profileInfo
    console.log('xsxsxxs',user,profileInfo)


    const [nodata, setNodata] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [copied, setCopied] = useState(false);
    const [selcetdIndex, setselcetdIndex] = useState();
    const [selecteditem,setselecteditem ] = useState("SIM");
    const [selectedsimitem,setselectedsimitem ] = useState("Monthly");
    const [selectedcourieritem,setselectedcourieritem ] = useState("Monthly");
    const [selectedtransectionitem,setselectedtransectionitem ] = useState("SIM");
    const currentDate = moment().format("DD MMM, YYYY");


    const [totalDueSim, settotalDueSim] = useState(0);
    const [totalDueCourier, settotalDueCourier] = useState(0);
    const [totalSimSold, settotaleSimSold] = useState(0);
    const [totalCourierSold, settotalCourierSold] = useState(0);

    const [totalDueCourierCommisionDue, settotalDueCourierCommisionDue] = useState(0);
    const [totoalSimCount, settotoalSimCount] = useState(0);
    const [totoalAvailableSimCount, settotoalAvailableSimCount] = useState(0);
    const [totoalAgentlistCount, settotoalAgentlistCount] = useState(0);
    const [totoalUserlistCount, settotoalUserlistCount] = useState(0);
    const [agnetuserpercentage, setagnetuserpercentage] = useState(totoalAgentlistCount === 0 && totoalUserlistCount === 0  ? 0
      : (totoalAgentlistCount / (totoalAgentlistCount + totoalUserlistCount)) * 100);

    const [isVisible, setIsVisible] = useState(true); 
    const [bannerImage, setbannerImage] = useState(null); 
    const [dahboarddata, setdahboarddata] = useState(null); 
    const [last7dahboarddatasim, setlast7dahboarddatasim] = useState([]); 
    const [last12dahboarddatasim, setlast12dahboarddatasim] = useState([]); 
    const [last7dahboarddatacourier, setlast7dahboarddatacourier] = useState([]); 
    const [last12dahboarddatacourier, setlast12dahboarddatacourier] = useState([]); 
    const[transactions,settransactions]=useState([])


    const [simTransectiondetails, setsimTransectiondetails] = useState([]); 
    const [courierTransectiondetails, setcourierTransectiondetails] = useState([]); 






    const closeBanner = () => {
      setIsVisible(false);
    };



    const getBanner = async (v) => {
        try {
          
            const response = await axios.get(`${config.apiUrl}/api/banner`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:banner', response?.data?.imageUrl);
            setbannerImage(response?.data?.imageUrl)
           
        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    };


   



  const getAgentFinancail = async () => {
    http://localhost:4000/
      try {

        if(role === 'ADMIN'){
          var response = await axios.get(`${config.apiUrl}/api/dashboard/sim/transactions/latest`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        }else{
        
          var response = await axios.get(`${config.apiUrl}/api/dashboard/sim/transactions/latest/${profileInfo?.agentId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
            });


           
          
        }
          console.log('Response:setagentFinancialDataOne', response);
          setsimTransectiondetails(response?.data?.simTransactions)
          setLoader(false)
          if(selectedtransectionitem === 'SIM'){
            settransactions(response?.data?.simTransactions)
          }

      } catch (error) {
          console.error('Error++++:', error);
          setLoader(false)
          throw error;
      }


      try {

        if(role === 'ADMIN'){
          var response = await axios.get(`${config.apiUrl}/api/dashboard/courier/transactions/latest`,{
              headers: {
                  Authorization: `Bearer ${token}`
              }
        });
      
      }else{

        var response = await axios.get(`${config.apiUrl}/api/dashboard/courier/transactions/latest/${profileInfo?.agentId}`,{
          headers: {
              Authorization: `Bearer ${token}`
          }
         });

        }
        console.log('setagentFinancialDataOneCourier', response);
        setcourierTransectiondetails(response?.data?.courierTransactions)
        if(selectedtransectionitem === 'Courier'){
          settransactions(response?.data?.courierTransactions)
        }
        setLoader(false)

    } catch (error) {
        console.error('Error++++:', error);
        setLoader(false)
        throw error;
    }
     
  };




//   const getAgentFinancail = async (e) => {
//     console.log("profileInfoasdasd", e);
//     try {
//         // Wait until `e` is ready (non-null/undefined or meets a condition)
//         while (!proInfo) {
//             console.log("Waiting for `e` to be ready...");
//             await new Promise((resolve) => setTimeout(resolve, 100)); // Add a small delay to avoid blocking
//         }

//         let response;
//         if (role === 'ADMIN') {
//             response = await axios.get(`${config.apiUrl}/api/dashboard/sim/transactions/latest`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//         } else {
//             response = await axios.get(
//                 `${config.apiUrl}/api/dashboard/sim/transactions/latest/${proInfo?.agentId}`,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//         }

//         console.log('Response:setagentFinancialDataOne', response); 
//         setsimTransectiondetails(response?.data?.simTransactions);
//         setLoader(false);

//         if (selectedtransectionitem === 'SIM') {
//             settransactions(response?.data?.simTransactions);
//         }

//         // Fetch courier transactions
//         if (role === 'ADMIN') {
//             response = await axios.get(
//                 `${config.apiUrl}/api/dashboard/courier/transactions/latest`,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//         } else {
//             response = await axios.get(`${config.apiUrl}/api/dashboard/courier/transactions/latest/${proInfo?.agentId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//         }

//         console.log('setagentFinancialDataOneCourier', response);
//         setcourierTransectiondetails(response?.data?.courierTransactions);

//         if (selectedtransectionitem === 'Courier') {
//             settransactions(response?.data?.courierTransactions);
//         }

//         setLoader(false);
//     } catch (error) {
//         console.error('Error++++:', error);
//         setLoader(false);
//         throw error;
//     }
// };




  const getTotaldue = async () => {

    if(role ==='ADMIN'){
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
                  setLoader(false)

              } catch (error) {
                  console.error('Error++++:', error);
                  setLoader(false)
                  throw error;
              }

    }else{
      var response = await axios.get(`${config.apiUrl}/api/financial/sim/agents/${profileInfo?.agentId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
        });   
        console.log('Response:setagentFinancialDataOneNewOne', response);
        settotalDueCourierCommisionDue(response?.data?.courierCommissionDueAmount)
        settotalDueCourier(response.data?.courierDueAmount)
        settotalDueSim(response.data?.simDueAmount)



    }
  };





  const getdashboarddata = async () => {
    console.log("asdasdaagent",user,proInfo,role)
    try {
      if(role==='ADMIN'){
          var response = await axios.get(`${config.apiUrl}/api/dashboard`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
      }else{
        var response = await axios.get(`${config.apiUrl}/api/dashboard/${profileInfo?.agentId}`,{
          headers: {
              Authorization: `Bearer ${token}`
          }

      });
      console.log('dashboarddatasaf3SimAgent', response);

      }
        console.log('dashboarddata', response);
        setdahboarddata(response?.data)
        const simdatapro=processSIMCardData(response?.data?.SIMCard)
        setlast7dahboarddatasim(simdatapro?.last7Days)
        setlast12dahboarddatasim(simdatapro?.last12Months)
        const courierdatapro=processSIMCardData(response?.data?.Courier)
        setlast7dahboarddatacourier(courierdatapro?.last7Days)
        setlast12dahboarddatacourier(courierdatapro?.last12Months)
        console.log("asdataprpce",courierdatapro?.last12Months)
        setLoader(false)

    } catch (error) {
        console.error('Error++++:', error);
        setLoader(false)
        throw error;
    }
    
};


const processSIMCardData = (data) => {


  const processedLast7Days = data?.last7Days?.map((item) => ({
    ...item,
    time: new Date(item.date).toLocaleString("default", { weekday: "short" }), // Convert date to short day name
  }));

  console.log("showingasda",processedLast7Days)


  // Convert last12Months array
  const processedLast12Months = data?.last12Months?.map((item) => ({
    ...item,
    time: new Date(2000, item.month - 1).toLocaleString("default", { month: "short" }), // Convert month number to short month name
  }));




  return {
    last7Days: processedLast7Days,
    last12Months: processedLast12Months,
  };
};

      const GetSimList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/sim`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:simXC@', response);
            settotoalSimCount(response?.data?.SIMCards?.length)
            const pendingRequests = response.data?.SIMCards?.filter(request => request.status === (role ==='ADMIN'? 'available':'assigned'));
            const soloutsim = response.data?.SIMCards?.filter(request => request.status === 'sold_out');
            const pendingCount = pendingRequests?.length;
            const soloutsimcountCount = soloutsim?.length;
            console.log("solldoursim",soloutsim)
            console.log("pednfigcount",pendingCount)
            settotoalAvailableSimCount(pendingCount);
            settotaleSimSold(soloutsimcountCount)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };


    const courierList = async () => {
      try {
          setLoader(true);
          const response = await axios.get(`${config.apiUrl}/api/courier`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          console.log('Response:---------->courier', response.data.couriers);
          settotalCourierSold(response?.data?.couriers?.length);
          setLoader(false);
      } catch (error) {
          
          throw error;
      }
  };




    const AgeentList = async () => {
      try {
          setLoader(true)
          const response = await axios.get(`${config.apiUrl}/api/agents`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
          console.log('Response:agent', response);
          settotoalAgentlistCount(response?.data?.agents?.length)
          setLoader(false)

      } catch (error) {
          console.error('Error++++:', error);
          setLoader(false)
          throw error;
      }
  };

      const GetuseerList = async () => {
        try {
            setLoader(true)
            const response = await axios.get(`${config.apiUrl}/api/users`,{
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
            console.log('Response:', response);
            settotoalUserlistCount(response?.data?.users?.length)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };




   const handletransectionitem=(e)=>{
    console.log("ererere",e)
    setselectedtransectionitem(e)
    if(e==='SIM'){
          settransactions(simTransectiondetails)
    }else if(e==='Courier'){
      settransactions(courierTransectiondetails)

    }
   }

    






   const handleComponentChanger = (e) => {
    changeR(e)
};


   useEffect(() => {
    getBanner()
    getTotaldue()
    GetSimList()
    GetuseerList()
    AgeentList()
    getdashboarddata()
    courierList()
    getAgentFinancail()
  
}, [profileInfo])

  return (
    <div  className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px]" >
    {loader &&  <LoadingSoS  /> }
    {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
   
   {!nodata?
    <Card className="bg-[#303038]  text-white h-full w-[100%]" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,boxShadow : 'none',gap:'2rem',display:'flex',flexDirection:'column'}}>
        
          <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <ChatAi/>

          <div
            className="banner-container"
            style={{
              position: 'fixed',
              top: '14rem',
              left: '60%',
              transform: 'translate(-50%, -50%)',
              width: 'auto',
              height: 'auto', // Adjust height as necessary
              maxWidth: '30rem',
              maxHeight: '13rem',
              backgroundColor: 'white',
              // border: '1px solid #ddd',
              borderRadius: '5px',
              boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
              opacity: isVisible ? 1 : 0, // Conditionally set opacity
              visibility: isVisible ? 'visible' : 'hidden', // Conditionally set visibility
              transition: 'opacity 0.4s ease-in-out, visibility 0.4s ease-in-out', // Smooth transition for both opacity and visibility
              zIndex: 9999
            }}
          >
            <div
              className="banner-content"
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                boxShadow:'0px 0px 10px  whitesmoke'
              }}
            >
              {bannerImage && (
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover' // Ensures the image covers the entire div without distortion
                  }}
                  className="banner-image"
                  src={`${config.apiUrl}${bannerImage}`}
                  alt="Banner"
                />
              )}


{bannerImage &&
              <button

             
                className="close-button"
                onClick={closeBanner}
                style={{
                  top: '-10px',
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  fontSize: '34px',
                  cursor: 'pointer',
                  color: 'black',
                  outline: 'none',
                  fontWeight: '200'
                }}
              >
                &times;
              </button>}
            </div>
                    </div>







   <div style={{ width: "100%", height: "100%",  color: "#fff", overflowY:'auto',}}>
         
          
            <div
        style={{
         
          display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',margin: "0 0 20px",
        }}
      >

        <span style={{fontSize:'30px',color:"#FFF",fontWeight:"700",width:'100%'}}>{t('hello')}, {profileInfo && profileInfo?.name || role}</span>
        
        <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',height:'100%',gap:'8px',width:'100%'}}>
                  <span style={{display:'inline-flex',padding:'5px 8px',width:'fit-content',borderRadius:'8px',border:" 1px solid #595959",backgroundColor:'',fontSize:'14px',}}>
                    Today data showing: {currentDate}
                  </span>

             </div>
            </div>

      {/* Summary Cards */}
            <div style={{ display: "flex", justifyContent: "space-between",gap:"4px",height:'15rem',padding:'4px 0' }}>
            
            
              <div style={{ border: '1px solid var(--Base-Color-Dark-Light, #595959)', background: "#202026", padding: "20px", borderRadius: "8px", flex: 1,display: "flex", justifyContent: "space-between",gap:"1%",flexDirection:'column',position:'relative' }}>
                
              <select
                value={selecteditem}
                onChange={(e) => setselecteditem(e.target.value)} 
                style={{
                  position: 'absolute',
                  right: '2%',
                  border: '1px solid #595959',
                  fontSize:'12px'
                }}
                className="w-[5rem] h-[1.3rem] cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <option value="SIM">SIM</option>
                <option value="Courier">Courier</option>
              </select>

            


                  <svg style={{backgroundColor:'#29CC79',padding:"10px",width:'fit-content',height:'fit-content',borderRadius:'50%'}} xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 32 33" fill="none">
                    <path d="M4.46094 22.0968L21.5663 4.99158M24.8421 15.2408L21.9095 18.1735M19.4065 20.6466L18.1016 21.9515" stroke="white" stroke-width="2.625" stroke-linecap="round"/>
                    <path d="M4.23292 22.0214C2.14461 19.9332 2.14461 16.5473 4.23292 14.459L13.9591 4.73286C16.0474 2.64455 19.4332 2.64455 21.5215 4.73286L27.7671 10.9785C29.8555 13.0668 29.8555 16.4526 27.7671 18.5409L18.041 28.267C15.9527 30.3554 12.5669 30.3554 10.4786 28.267L4.23292 22.0214Z" stroke="white" stroke-width="2.625"/>
                    <path d="M5.33331 29.8334H26.6666" stroke="white" stroke-width="2.625" stroke-linecap="round"/>
                  </svg>


                <span style={{fontSize:'30px'}}>€ {selecteditem === 'SIM'?NumberSystem(totalDueSim || 0) :selecteditem === 'Courier'?NumberSystem(totalDueCourier || 0) :''}</span>
                  <p>Total Due Amount</p>
                </div>

          {role!=='ADMIN'
           &&(
              <div style={{ border: '1px solid var(--Base-Color-Dark-Light, #595959)', background: "#202026", padding: "20px", borderRadius: "8px", flex: 1,display: "flex", justifyContent: "space-between",gap:"1%",flexDirection:'column',position:'relative' }}>
                
            
  
                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'7px'}}>
                    <svg style={{backgroundColor:'#29CC79',padding:"10px",width:'fit-content',height:'fit-content',borderRadius:'50%'}} xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 32 33" fill="none">
                      <path d="M4.46094 22.0968L21.5663 4.99158M24.8421 15.2408L21.9095 18.1735M19.4065 20.6466L18.1016 21.9515" stroke="white" stroke-width="2.625" stroke-linecap="round"/>
                      <path d="M4.23292 22.0214C2.14461 19.9332 2.14461 16.5473 4.23292 14.459L13.9591 4.73286C16.0474 2.64455 19.4332 2.64455 21.5215 4.73286L27.7671 10.9785C29.8555 13.0668 29.8555 16.4526 27.7671 18.5409L18.041 28.267C15.9527 30.3554 12.5669 30.3554 10.4786 28.267L4.23292 22.0214Z" stroke="white" stroke-width="2.625"/>
                      <path d="M5.33331 29.8334H26.6666" stroke="white" stroke-width="2.625" stroke-linecap="round"/>
                    </svg>

                    <div style={{display:'flex',justifyContent:"flex-start",alignItems:'flex-start',flexDirection:'column'}}>
                      <span>Total Courier</span>
                      <span>Commission</span>
                      
                       </div>

                </div>
  
                  <span style={{fontSize:'30px'}}>€ {totalDueCourierCommisionDue}</span>
                    <p>Total Pending Amount</p>
                  </div>)

               }<div style={{ border: '1px solid var(--Base-Color-Dark-Light, #595959)', background: "#202026", padding: "20px", borderRadius: "8px", flex: 1,display: "flex", justifyContent: "space-between",gap:"1%",flexDirection:'column',position:'relative' }}>
                
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',}}>
                  <span>SIM Available</span>
                  <span onClick={()=>handleComponentChanger('Sim list')} style={{cursor:'pointer',display:'inline-flex',padding:'5px 8px',borderRadius:'8px',border:" 1px solid #595959",backgroundColor:'#2B2B33',fontSize:'14px',}}>
                  View Reports
                  </span>
                </div>

                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
              
                      <CircularProgress 
                      value={totoalAvailableSimCount}
                      maxValue={totoalSimCount}

                      // value={totoalSimCount}
                      // maxValue={totoalAvailableSimCount}
                      size={150}
                      strokeWidth={20}
                      label="SIM Available"
                      />
              
                </div>
                </div>
          
{role === 'ADMIN' && 

                <div style={{  border: '1px solid var(--Base-Color-Dark-Light, #595959)',background: "#202026", padding: "20px", borderRadius: "8px", flex: 1,display: "flex", justifyContent: "space-between",gap:"1%",flexDirection:'column',position:'relative' }}>
                
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',}}>
                  <span style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <p>Total No of Agents</p>
                    <p>and users</p>
                    </span>
                    <span style={{display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'flex-end'}}>
                          <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'8px',width:"100%",color:'#60646C'}}> 
                            <span style={{width:'5px',height:'5px',backgroundColor:'#FFF',borderRadius:'50%'}}></span>
                            <span>Agent: {totoalAgentlistCount || 0}</span>
                          </div>

                          <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'8px',width:"100%",color:'#60646C'}}> 
                            <span style={{width:'5px',height:'5px',backgroundColor:'#29CC79',borderRadius:'50%'}}></span>
                            <span >User  : {totoalUserlistCount || 0}</span>
                          </div>
                    </span>
                </div>

                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
                    <CircularPieChart
                    agentCount={totoalAgentlistCount} userCount={totoalUserlistCount} size={150} 
                    />
                </div>
                </div>

}
            </div>





            <div style={{marginTop:'.4rem', display: "flex", justifyContent: "space-between",gap:"4px",height:'20rem',padding:'4px 0' }}>
            
            

            <div style={{ border: '1px solid var(--Base-Color-Dark-Light, #595959)', background: "#202026", padding: "20px", borderRadius: "8px", flex: 1,display: "flex", justifyContent: "space-between",gap:"1%",flexDirection:'column',position:'relative' }}>
              
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',}}>
              <span style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'8px',width:"100%",}}> 
                            <span>Total SIM Sold </span>
                            <span style={{width:'5px',height:'5px',backgroundColor:'#29CC79',borderRadius:'50%'}}></span>
                            <span style={{color:'#FFA526'}}>{totalSimSold}</span>
                          </div>
                    <p style={{color:'#60646C'}}>{selectedsimitem}</p>
                    </span>
              
              

                  <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',gap:'8px'}}>
                        <span onClick={()=>handleComponentChanger('Activation')} style={{cursor:'pointer',display:'inline-flex',padding:'5px 8px',borderRadius:'8px',border:" 1px solid #595959",backgroundColor:'#2B2B33',fontSize:'14px',}}>
                        View Reports
                        </span>

                        <select
                        value={selectedsimitem}
                        onChange={(e) => setselectedsimitem(e.target.value)} 
                        style={{
                          display:'inline-flex',
                          right: '2%',
                          border: '1px solid #595959',
                          fontSize:'14px', 
                          padding:'6px 14px',
                          borderRadius:'8px'
                        }}
                        className=" cursor-pointer bg-[#2B2B33] hover:bg-[#545454] text-[#9CA3AF]  rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                         {/* <option value="Today">Today</option> */}
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Yearly</option>
                      </select>
                  </div>
              </div>

              <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
            

              <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={selectedsimitem === 'Monthly'? last12dahboarddatasim:last7dahboarddatasim}>
                    <CartesianGrid stroke="#333" vertical={false} /> {/* Clean horizontal lines */}
                    <XAxis dataKey="time" tick={{ fill: '#fff' }} />
                    {/* <YAxis tick={{ fill: '#fff' }} /> */}
                    <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                    <Bar
                      dataKey="soldCount"
                      fill="#22C55E"
                      radius={[10, 10, 0, 0]}
                      barSize={40} 
                    />
                  </BarChart>
                </ResponsiveContainer>


            
              
              </div>
              </div>



              <div style={{  border: '1px solid var(--Base-Color-Dark-Light, #595959)',background: "#202026", padding: "20px", borderRadius: "8px", flex: 1,display: "flex", justifyContent: "space-between",gap:"1%",flexDirection:'column',position:'relative' }}>
              
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',}}>
              <span style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'8px',width:"100%",}}> 
                            <span>Total Courier </span>
                            <span style={{width:'5px',height:'5px',backgroundColor:'#29CC79',borderRadius:'50%'}}></span>
                            <span style={{color:'#FFA526'}}>{totalCourierSold}</span>
                          </div>
                    <p style={{color:'#60646C'}}>{selectedcourieritem}</p>
                    </span>
              
              

                  <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',gap:'8px'}}>
                        <span onClick={()=>handleComponentChanger('Courier list')} style={{cursor:'pointer',display:'inline-flex',padding:'5px 8px',borderRadius:'8px',border:" 1px solid #595959",backgroundColor:'#2B2B33',fontSize:'14px',}}>
                        View Reports
                        </span>

                        <select
                        value={selectedcourieritem}
                        onChange={(e) => setselectedcourieritem(e.target.value)} 
                        style={{
                          display:'inline-flex',
                          right: '2%',
                          border: '1px solid #595959',
                          fontSize:'14px', 
                          padding:'6px 14px',
                          borderRadius:'8px'
                        }}
                        className=" cursor-pointer bg-[#2B2B33] hover:bg-[#545454] text-[#9CA3AF]  rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {/* <option value="Today">Today</option> */}
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Yearly</option>
                      </select>
                  </div>
              </div>

              <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
            
              <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={selectedcourieritem === 'Monthly'? last12dahboarddatacourier:last7dahboarddatacourier}>
                    <CartesianGrid stroke="#333" vertical={false} /> {/* Clean horizontal lines */}
                    <XAxis dataKey="time" tick={{ fill: '#fff' }} />
                    {/* <YAxis tick={{ fill: '#fff' }} /> */}
                    <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                    <Bar
                      dataKey="soldCount"
                      fill="#22C55E"
                      radius={[10, 10, 0, 0]}
                      barSize={40} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              
              </div>
              </div>

          </div>

            <div
              style={{
                marginTop:'.6rem',
                background: "#202026",
                borderRadius: "12px",
                padding: "20px",
                overflow: "hidden",
                color: "#fff",
                fontFamily: "Arial, sans-serif",
                border: '1px solid var(--Base-Color-Dark-Light, #595959)'
              }}
            >
              {/* Title */}
              <div
                style={{
                  display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',margin: "0 0 20px",
                }}
              >

                <span style={{ 
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: "18px",}}>{t('transactions')}</span>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',gap:'8px'}}>
                          <span onClick={()=>handleComponentChanger('balance')} style={{cursor:'pointer',display:'inline-flex',padding:'5px 8px',borderRadius:'8px',border:" 1px solid #595959",backgroundColor:'#2B2B33',fontSize:'14px',}}>
                          View Reports
                          </span>
        
                          <select
                          value={selectedtransectionitem}
                          onChange={(e) =>  handletransectionitem(e.target.value)} 
                          style={{
                            display:'inline-flex',
                            right: '2%',
                            border: '1px solid #595959',
                            fontSize:'14px', 
                            padding:'6px 14px',
                            borderRadius:'8px'
                          }}
                          className=" cursor-pointer bg-[#2B2B33] hover:bg-[#545454] text-[#9CA3AF]  rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <option value="SIM">SIM</option>
                          <option value="Courier">Courier</option>
                        </select>
                    </div>
              </div>

              

              {/* Scrollable Table Container */}
              <div
                style={{
                  overflowY: "auto",
                  maxHeight: "300px",
                  borderRadius: "8px",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                  }}
                >
                  {/* Table Header */}
                  <thead>
                    <tr style={{ background: "#404040", fontSize: "14px" }}>
                      <th
                        style={{
                          padding: "12px 16px",
                          color: "#A1A1A1",
                          fontWeight: "500",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                          {t('date')}
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          color: "#A1A1A1",
                          fontWeight: "500",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        User ID
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          color: "#A1A1A1",
                          fontWeight: "500",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                          {t('userName')}
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          color: "#A1A1A1",
                          fontWeight: "500",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        Payment Type
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          color: "#A1A1A1",
                          fontWeight: "500",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                          {t('transactions')} ID
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          color: "#A1A1A1",
                          fontWeight: "500",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                          Amount
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {transactions?.map((tx, index) => (
                      <tr
                        key={index}
                        style={{
                          background: "#1A1A1A" ,
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {tx?.updatedAt && moment(tx?.updatedAt).format('d/m/YY')}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {tx?.agentFinance.agentId}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {tx.agentFinance.agentName}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        > 
                           {convertString(tx.paymentType || '')}  
                                 
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {tx.transactionId}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {tx.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>




    
         </div>


        </div>
       
    </Card>
    


    :<Nodatafound btn_text={'Add New Offer'}  tittle_head={'No Offer List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} />}
    <style jsx>
        {`
        
   
        
        
        
        
        
        
        body::-webkit-scrollbar {
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




        .my-component {
            position: relative;
            
        }
        
        .uid {
            position: relative;
            cursor: pointer;
            
        }
        
        .tooltip {
            visibility: hidden;
            width: auto;
            background-color: #000;
            color: #fff;
            text-align: center;
            padding: 5px;
            border-radius: 6px;
            position: absolute;
            z-index: 1;
            top: 0;
            white-space: nowrap;
        }
        
        .uid:hover .tooltip {
            visibility: visible;
        }

        .copied-message {
            position: absolute;
            top: 0%;
            left: 40%;
            transform: translate(-50%, -50%);
            background-color: #000;
            color: #fff;
            padding: 5px;
            border-radius: 4px;
            z-index: 9999; /* Ensure the message is on top */
        }







        h1, h2, h3, p, table {
  margin: 0;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  padding: 8px;
  border-bottom: 1px solid #333;
}











        

        `}
    </style>
</div>
  )
}

export default MainDashboard


