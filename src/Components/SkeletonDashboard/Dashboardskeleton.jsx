import React,{useState,useEffect} from 'react'
import { global_css } from '../../GlobalCss/GlobalCSS'
// import style from '../../GlobalCss/global.css'
import LineIcon from '../../assets/static/Line.svg'
import InventoryTable from '../InventoryTable/InventoryTable'
import { dataset } from './Skeletonlistitem'
import Nodatafound from '../NoDataFound/Nodatafound'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faL } from '@fortawesome/free-solid-svg-icons'
import LoadingSoS from '../LoadingScreen/LoadingSoS'
import SimLis from '../SimList/SimLis'
import SimRequest from '../SimRequest/SimRequest'
import {useAuth} from "../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../config.jsx";
import GroupList from '../Users/GropuList/GroupList.jsx'
import AgentListOperation from "../Users/AgentList/AgentListOperation.jsx";
import AgentRequestList from "../Users/AgentRequest/AgentRequestList.jsx";
import UserList from '../Users/UserList/UserList.jsx'
import OfferCenter from '../OfferCenter/OfferCenter.jsx'
import SimSell from '../SimSell/SimList/SimSell.jsx'
import ActivationList from '../SimSell/SimActivation/ActivationList.jsx'
import CourierList from "../courier/ CourierList.jsx";
import PriceAndCommision from "../courier/PriceAndCommision.jsx";
import MainSettingsPage from "../Settings/MainSettingsPage.jsx";
import MainDashboard from '../MainDashboard/MainDashboard.jsx'
import Transactionlist from '../Transaction/Transactionlist.jsx'
import MainFilterComponent from "../ReportComponents/MainFilterComponent.jsx";
import BalanceSheet from '../BalanceSheet/BalanceSheet.jsx'
import BalanceSheetRouting from '../BalanceSheet/BalanceSheetRouting.jsx'
import Contactus from "../ContactUs/Contactus.jsx";
import { jwtDecode } from 'jwt-decode'
import { generateAgentPermissions } from './grouporderpermission.jsx'
const Dashboardskeleton = () => {

    const {user, token, valuek, changeR, changeLoad, dataReload ,valueLo} = useAuth();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedIndex, setselectedIndex] = useState(null);
    const [HoveredIndexInner, setHoveredIndexInner] = useState(null);
    const [selectedIndexOuter, setselectedIndexOuter] = useState(null);
    const [ordercount, setordercount] = useState(0);
    const [offerCount, setOfferCount] = useState(0);
    const [simcount, setsimcount] = useState(0);

    const [showcomponent, setshowcomponent] = useState( 0)
    const [showcomponentouter, setshowcomponentouter] = useState('')
    const [permissions, setpermission] = useState([])

    const [agent_permission,setagent_permission] = useState(['Sim request','Offer Center', 'SIM List', 'Dashboard', 'Sim Inventory', 'Settings', 'Agent Request', 'Users', 'Sell sim card', 'Sim list','Courier','Finance report','Balance sheet', 'Report & History','Contact Us'])
    const [agent_sub_menu_permission,setagent_sub_menu_permission] = useState(['Sim request', 'SIM List', 'Sell sim card', 'Sim list','Activation','Agent Request','Balance sheet', 'Courier list'])
   
    const admin_permission = ['Sim request','Offer Center', 'SIM List', 'Dashboard', 'Sim Inventory', 'Settings', 'Agent Request', 'Users', 'Activation','Courier','Transaction', 'Report & History','Finance report', 'Contact Us']
    const admin_sub_menu_permission = ['Sim request', 'SIM List',  'Activation','Operators','Group List','User List','Agent List','Agent Request','Courier list','Price & Commission','Transection','Balance sheet']

    const [pageview, setpageview] = useState(true)
    const [isPageChanging, setIsPageChanging] = useState(false)
console.log("keuuuu", valuek)
    const getorderlist = async () => {
        let xdata = []
        try {
            const response = await axios.get(`${config.apiUrl}/api/order`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log('Response:for get order', response.data.orders);
            const oc = response?.data?.orders?.filter((n) => n.status == 'pending')
            console.log('Respssss', oc);
            setordercount(oc?.length)

        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;

        }

    }


    const AgeentList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/agentRequests`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const pendingRequests = response.data.agentRequests.filter(request => request.status === 'pending');
            const pendingCount = pendingRequests.length;

            console.log('Response:=======skeleton agent', response.data.agentRequests);
            console.log('Pending Requests Count:', pendingCount);

            setOfferCount(pendingCount);
        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    };



    const simlistavailable = async () => {
      try {
          const response = await axios.get(`${config.apiUrl}/api/sim`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });

          console.log("asdsSIm", response.data.SIMCards)
          const pendingRequests = response.data?.SIMCards?.filter(request => request.status === 'available');
          const pendingCount = pendingRequests?.length;
          setsimcount(pendingCount);

      } catch (error) {
          console.error('Error++++:', error);
          throw error;
      }
  };



    const renderComponent = () => {
  console.log(":operatorr",showcomponentouter)
    switch (showcomponent) {
        case 0:
        return <MainDashboard/>
        // <Nodatafound btn_text={'Add New Sim'}  tittle_head={'No Dashboard Item Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>;
        case 1:
              if(showcomponentouter === 'Operators'){
                return <InventoryTable /> ;
              }else if(showcomponentouter === 'SIM List'){
                return <SimLis />
              }
              else if(showcomponentouter === 'Sim request'){
                return <SimRequest />
              } else{
                  return '';
              }
        
        case 2:
         if(showcomponentouter === 'Courier list'){
            return <CourierList /> ;
        }else if(showcomponentouter === 'Price & Commission') {
             return <PriceAndCommision/>
         }
        else{
            return '';
        }
        case 3:
        return <Nodatafound btn_text={'Add Agent'}  tittle_head={'No Agent List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>
        case 4:

            if(showcomponentouter === 'Group List'){
              return <GroupList /> ;
            }else if(showcomponentouter === 'User List'){
              return <UserList />
            }
            else if(showcomponentouter === 'Agent List'){
              return <AgentListOperation/>
            } 
            else if(showcomponentouter === 'Agent Request'){
              return <AgentRequestList/>
            }  else{
                return '';
            }
        
        case 5:
        return <MainSettingsPage/>

        case 6:
        return <OfferCenter />


        case 7:
        
            if(showcomponentouter === 'Sim list'){
              return <SimSell /> ;
            }else if(showcomponentouter === 'Activation'){
              return <ActivationList/>
            } else{
                return '';
            }

       case 8:
            return <ActivationList/>

        case 9:

        if(showcomponentouter === 'Balance sheet'){
          return <BalanceSheetRouting payloaddata={valueLo}/> 
        }else if(showcomponentouter === 'Transection'){
          return <Transactionlist/>
        } else{
            return '';
        }
        
        case 10:
        return <MainFilterComponent/>

        case 11:
        return <Contactus/>


      default:
        return null;
    }
  }

  
  const settransition=()=>{
      setpageview(false)
      setIsPageChanging(true);
     
      setTimeout(() => {
          setIsPageChanging(false);
          setpageview(true)
        }, 200);
  }

  const [isValuekProcessed, setIsValuekProcessed] = useState(false);





  const normalizeText = (text) => {
    return text
      .split("_") // Split words by underscore
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join words with a space
  };
  

  

  useEffect(() => {

    if (user.actualRole === "OPERATOR" ){
    const decodedToken = jwtDecode(token);
    const permissiondata=decodedToken?.permissions
    setpermission(permissiondata)
    // console.log("ssssssdf333434",permissiondata)
    // console.log("Matching Agent Permissions:",normalizedPermissions, matchingPermissions,matchingSubMenuPermissions);
    console.log("sdfsdfsdfsdfdsf",user.role)
    const { agent_permission, agent_sub_menu_permission } =
    generateAgentPermissions(permissiondata);
    console.log("Agent Permissions:", agent_permission);
    console.log("Agent Sub-Menu Permissions:", agent_sub_menu_permission);
      setagent_permission(agent_permission)
      setagent_sub_menu_permission(agent_sub_menu_permission)
    }
    getorderlist(token)
      AgeentList()
      simlistavailable()
      if (valuek ) {
        selectBD(valuek);
    }
  }, [showcomponent,ordercount, offerCount, valuek, changeR, dataReload, changeLoad])


    const selectBD = (valuek) =>{
   

        // console.log("lllllllllllll", valuek)
        let findCode = 7
        // setshowcomponent(findCode)
        if(valuek ==='Settings'){
            setshowcomponent(5)
            
            setselectedIndex(null)
            settransition()
            setIsValuekProcessed(true);
            changeR(null)
        }else if (valuek ==='balance'){
          setshowcomponent(9)
          setshowcomponentouter('Balance sheet')
            setselectedIndex(null)
            settransition()
            setIsValuekProcessed(true);
            changeR(null)

        }else if (valuek ==='Sim list' || valuek ==='Activation'){
            setshowcomponent(7)
            setshowcomponentouter(valuek)
            setselectedIndex(null)
            settransition()
            setIsValuekProcessed(true);
            changeR(null)
            
        }else if (valuek ==='Courier list'){
          setshowcomponent(2)
          setshowcomponentouter(valuek)
          setselectedIndex(null)
          settransition()
          setIsValuekProcessed(true);
          changeR(null)
      }
        else{
          setshowcomponentouter(valuek)
          setselectedIndex(null)
          settransition()
          setIsValuekProcessed(true);
          changeR(null)
        }
       

      
    }
  
  return (
    <div   style={{height : 'calc(100vh - 4.5rem)', width:'100%', backgroundColor:global_css.primary_bg,display:'flex' ,justifyContent:'center',alignItems:'flex-start',paddingTop:'2px',overflow:'hidden'}}>
        
            <div style={{flex:'16%' ,backgroundColor:global_css.primary_card_bg,height:'98.5%',width:'100%',display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

                <div style={{flex:'55%',height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center',paddingTop:'1rem',transition:'all 300ms',gap:'2px'}}>

                        {dataset &&  dataset.filter((n) =>  (user.actualRole === 'AGENT' || user.actualRole === 'OPERATOR') ? agent_permission.includes(n.name) : user.actualRole === 'ADMIN' ? admin_permission.includes(n.name) : true).map((n,index)=>{
                            // console.log("index",index)
                            return(<div style={{display:'flex',flexDirection:'column',width:'85%'}}
                            >
                                     <div  
                                        key={index} style={{width:'100%',height:'2.4rem',display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'1rem',backgroundColor: (hoveredIndex === index || selectedIndex === index) ? 'rgba(39, 207, 122, 0.10)' : '',paddingLeft: (hoveredIndex === index || selectedIndex === index) ?'1.2rem':'0.7rem',borderRadius:'6px',cursor:"pointer",transition:'all 300ms',margin:'4px 0px'}}
                                        onMouseEnter={() => {setHoveredIndex(index)}}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={()=>{setshowcomponent(n.code);setselectedIndex(selectedIndex=== index?'':index);setshowcomponentouter('');setselectedIndexOuter('');settransition();  setIsValuekProcessed(true);}}
                                        >
                                          <span><img src={ (hoveredIndex === index || selectedIndex === index) ? n.imgsec : n.img}  style={{width:'100%',height:'100%'}}/></span>                         
                                        <span style={{color: (hoveredIndex === index || selectedIndex === index) ? '#27CF7A':global_css.primary_txt_color ,fontFamily:'Lexend',fontWeight:'400',fontSize:'100%',lineHeight:'24px'}}>{n.name}</span>
                                        {n.menu.length>0?
                                      
                                        <FontAwesomeIcon rotation={selectedIndex === index? 180:''} icon={faAngleUp}  style={{color:(hoveredIndex === index || selectedIndex === index)?'#27CF7A':'white',transition:'all 300ms'}}/>
                                        :''}
                                      </div>

                                
                                      {
                                      (n.menu.length>0)? 
                                      n.menu?.filter((n) => (user.actualRole === 'AGENT' || user.actualRole === 'OPERATOR')? agent_sub_menu_permission.includes(n) :user.actualRole === 'ADMIN' ? admin_sub_menu_permission.includes(n) :  true).map((i,innderindex)=>{
                                        return(
                                              <div  key={innderindex}
                                              style={{margin:(selectedIndex === index || showcomponentouter === i)? '2px 0px':'',width:'100%',height:(selectedIndex === index || showcomponentouter === i) ?'2.4rem':'0rem',display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'10px',backgroundColor: (HoveredIndexInner === innderindex || showcomponentouter === i || selectedIndexOuter === innderindex) ? 'rgba(39, 207, 122, 0.10)' : '',paddingLeft:'30%',borderRadius:'6px',cursor:"pointer",transition:'all 300ms'}}
                                              onMouseEnter={() => {setHoveredIndexInner(innderindex)}}
                                              onMouseLeave={() => setHoveredIndexInner(null)}
                                              onClick={()=>{setshowcomponentouter(i);setselectedIndexOuter(innderindex);settransition();  setIsValuekProcessed(true);}}
                                              >
                                                                
                                            {(selectedIndex === index || showcomponentouter === i)? <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center' ,gap:'4px',width:'100%'}}> <span  style={{color: (HoveredIndexInner === innderindex || showcomponentouter === i || selectedIndexOuter === innderindex) ? '#27CF7A':global_css.primary_txt_color ,fontFamily:'Lexend',fontWeight:'400',fontSize:'16px',lineHeight:'24px'}}>  {i} </span> 
                                             <span >  {i === 'Sim request' || i === 'Agent Request' || i === 'SIM List'? 
                                              <span style={{width:'auto',height:'auto', borderRadius:'12px',padding:"1px 8px" ,color:'#FFFFFF' ,backgroundColor:"#29CC79",display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'500',fontStyle:'normal',fontSize:'12px'}}>
                                                 {i === 'Agent Request'? offerCount :i === 'SIM List'? simcount: ordercount} 
                                                  </span>:''}
                                                   </span> 
                                                   
                                                    </div>:''}

                                            </div>
                                        )
                                      })
                                      :''
                                      }
                                 
                                      </div>
                            )
                        })}
                            

                            
                </div>

                <div style={{flex:'1%',height:'100%',width:'100%',display:'flex',justifyContent:'center' ,alignItems:'center'}}>
                          <img src={LineIcon} style={{width:'85%'}}/>
                </div>

                <div style={{flex:'44%',height:'100%',width:'100%'}}>

                </div>
            </div>
          
          
          
            <div style={{flex:'84%',height:'100%',width:'100%',backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',transition:'all 300ms'}} >
                <div className={`page-transition ${isPageChanging ? 'changing' : ''}`} id='showcomp' style={{height:'96%',width:'97%',display:'flex',justifyContent:'center',alignItems:'center' ,transition:'all 300ms',borderRadius:global_css.card_border_radius,}}>
                     { pageview && renderComponent()}
                </div>
            </div>
            <style jsx>
    {`
   .page-transition {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
  }
  
  .page-transition.changing {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }
    `}
</style>
         
    </div>
  )
}

export default Dashboardskeleton