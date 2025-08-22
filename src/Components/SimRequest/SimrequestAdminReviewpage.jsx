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
import {useDisclosure, Button} from "@chakra-ui/react";
import Addnewsimcard from '../SimList/Addnewsimcard.jsx';
import Popnotification from '../PopNotification/Popnotification.jsx';
import Editopstions from '../EditFunctionality/Editopstions.jsx';
import { removeItem } from '../SimList/simlistdataset.jsx';
import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
import Nodatafound from '../NoDataFound/Nodatafound.jsx';
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
import AlertBox from "../AlertBox/AlertBox.jsx";
import { global_css } from '../../GlobalCss/GlobalCSS.js';
import { dataset } from './simrequestdatalist.jsx';
import { addedsimlistadmin } from './simrequestdatalist.jsx';
import { getselectedsimlistdata } from './simrequestdatalist.jsx';
import SimrequestFilter from './SimrequestFilter.jsx';
import { useAuth } from '../../Context/AuthInfo.jsx';
import {useTranslation} from "react-i18next";
const SimrequestAdminReviewpage = ({actioncallset,orderid}) => {
    const { user , token } = useAuth();
    const {t} = useTranslation()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [simList,setSimList]=useState([])
    const [simListfilter,setsimListfilter]=useState([])
    const [simList2,setSimList2]=useState([])
    const [simForEdit,setSimForEdit]=useState({})
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [status, setStatus]=useState('')
    const [ bulkIds, setBulkIds ] = useState([])
    const [ allTrue, setAllTrue ] = useState(false)
    const [ oneTrue, setOneTrue ] = useState(false)
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [sim_selected, setsim_selected] = useState([]);
    const [orderitemx, setorderitemx] = useState([]);
    const [showfilter, setshowfilter] = useState(false);
    const [loader,setloader]=useState(false)


    console.log("ssssssssssss", status)

    const handleSelect = async(value) => {
          
            console.log("asdada value",value)
            setSelected((prevSelected) => {
                if (prevSelected.includes(value.id)) {
                    let xx=prevSelected.filter((item) => item !== value.id);
                    return xx;
                } else {
                    return [...prevSelected, value.id];
                }
            });


            setIsAllSelected(selected.length === simList.length);
            console.log("isalllselec",selected)

    };


  

    const handleSelectAll = () => {
        setSelected(isAllSelected ? [] : simList.map((option) => option.id));
        setIsAllSelected(!isAllSelected);
    
    };


    const getaction=(e)=>{
        console.log('actionccccccccvcvc',selecteditem,orderitemx)
        if(e.type === 'edit'){
            GetSimForUpdate(selecteditem)


                
                onOpen()
        }else if(e.type === 'delete'){
            deleteOperator(selecteditem.id)
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


    const getorderitem=()=>{
       
        const order_item=JSON.parse(localStorage.getItem('orderitem'))
        console.log("oirdsfsf",order_item)
        if (order_item.order_id === orderid) {
            setorderitemx(order_item.data);
            console.log("cdcdcdcd",order_item.data)
        }
       
    }




    const GetSimList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/sim`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:ccc', response);
            setSimList(response.data.SIMCards)
            setsimListfilter(response.data.SIMCards)
            setSimList2(response.data.SIMCards)
            setloader(false)
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
            setloader(false)
        }
    };



    const GetSimForUpdate = async (id) => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/sim/${id.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:====', response);
            setSimForEdit(response.data.SIMCard)
            await setactiontype(true)
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };
    const deleteOperator = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/sim/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle successful deletion
            console.log('Operator deleted successfully');
            toast.success('Operator deleted successfully');
           await GetSimList()
        } catch (error) {
            console.error('Error deleting operator:', error);
            toast.error('Failed to delete operator');
        }
    };

    const UpdateBulk = async () => {
        try {

            const data ={
                simCardIds: selected,
                status: status
            }
            console.log("ssssssssssssssssssssssss", data)
            const response = await axios.put(`${config.apiUrl}/api/sim/update/bulk`, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            await GetSimList()
             onAlertClose()
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };

    const getselecteddata=()=>{
    
        const storedItemx =JSON.parse( localStorage.getItem('selected_sim_list'));
        let storedItem=parseInt(storedItemx?.order_no) === orderid? storedItemx.data : [];
        console.log("storeditem",storedItem,orderid)
        
          
        if (storedItem) {
            try {

            


            const parsedItem = storedItem;
            console.log("shoing dataaa",parsedItem)
            const operatorCounts = [];
            // const selectediid =[]
            parsedItem.forEach((sim) => {
                selected.push(sim.id)
            const operatorName = sim.operator?.name;
            const buyingPrice = parseFloat(sim.buyingPrice); // Assuming buyingPrice is a string representing a number

            if (operatorName) {
                const existingOperator = operatorCounts.find((op) => op.operator === operatorName);

                if (existingOperator) {
                existingOperator.total++;
                existingOperator.totalPrice += buyingPrice;
                } else {
                operatorCounts.push({ operator: operatorName, total: 1, totalPrice: buyingPrice });
                }
            }
            });
            
                console.log("sdfsdfsvv",operatorCounts)
            setsim_selected(operatorCounts);
            } catch (error) {
            // Handle parsing errors if the item is not valid JSON
            console.error('Error parsing item from localStorage:', error);
            }
        }
    }


    const countPrice=()=>{
        console.log("sdadasd",selected,simList)
        const da=simList?.filter((n)=>selected?.includes(n.id))
        // console.log("sdasd",da)
       const totalBuyingPrice = da
        .filter(item => selected.includes(item.id))
        .reduce((total, item) => total + parseFloat(item.buyingPrice || 0), 0)
        .toFixed(2);
        console.log("sdasd",sim_selected,da)

        return totalBuyingPrice
    }


    const addsimlistfnc =async()=>{
            const dataitems=simList?.filter((n)=> selected.includes(n.id))
            // addedsimlistadmin(dataitems)
            const dataobj={'order_no':orderid,'data':dataitems}
            localStorage.setItem('selected_sim_list',JSON.stringify(dataobj))
            await getselecteddata()
           
            console.log("showing filter",dataitems)
            // getselecteddata()
    }

    const filterdata=(e)=>{
        console.log("filter",e,simList)
        let val=e
        if(val !== ''){
            const df=simListfilter?.filter((n)=>n.operator.name === val)
            // console.log("filter",e,df)
            setSimList(df.length>0?df:[])
        }else{ 
            setSimList(simList2)
            console.log("filter",'emty')
        }
    }


    useEffect(() => {
        setloader(true)
        GetSimList()
        getselecteddata()
        getorderitem()
    }, []);

    return (
        <div  className="flex flex-col justify-center h-full w-full items-center md:items-start   rounded-[7px] " >
            <Addnewsimcard isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype}/>
            {loader &&   <LoadingSoS  /> } 


            <Card className="bg-[#303038]  text-white h-[20%] w-full " style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',borderRadius:global_css.card_border_radius}}>
               <div style={{flex:'50%',display:'flex',alignItems:'center',textAlign:'center',flexDirection:'column'}}>
                  <div  style={{width: '100%',display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',transition:'all 300ms',height:'100%', justifyContent:'center',alignItems:'center',flexDirection:'column',cursor:'pointer',backgroundColor:'',overflowY:'auto'}}>

                            {orderitemx?.map((item,index)=>{
                                console.log("showing item",item)

                                return (
                                    <div   style={{width:'100%',gap:"4px",padding:'7px',borderRadius:'5px' ,height:'100%', transition: 'all 300ms',display:'flex' ,alignItems:'center' ,justifyContent:'space-between'}} 
                                 
                                        >
                                       <span style={{width:"5rem",display:'flex',justifyContent:'flex-start',textAlign:'left',alignItems:'center',gap:'11rem'}}>{item?.name}</span>
                                       <span style={{width:"10px"}}>:</span>
                                       <span style={{width:"4rem",display:'flex',justifyContent:'flex-start',textAlign:'left',alignItems:'center'}}>{item?.amount}pcs</span>
                                        </div>
                                )
                            })}

                            </div>                    
               </div>
               <div style={{height:'95%',width:"4px",backgroundColor:"#3D8EFE"}}></div>

               <div style={{flex:'20%',display:'flex',alignItems:'flex-start',textAlign:'left',flexDirection:'column',color:'#8390A3',width:'100%'}}>
                 <span style={{fontWeight:'500',fontStyle:'normal',fontSize:'.8rem'}}>Total SIM</span>
                 <span style={{fontWeight:'600',fontStyle:'normal',fontSize:'1.5rem',fontFamily:'Lexand'}}>{orderitemx?.reduce((total, sim) => total + sim?.amount, 0)}</span>
               </div>

               <div style={{height:'95%',width:"4px",backgroundColor:"#3D8EFE"}}></div>

               <div style={{flex:'20%',display:'flex',alignItems:'flex-start',textAlign:'left',flexDirection:'column',color:'#8390A3',width:'100%'}}>
                <span style={{fontWeight:'500',fontStyle:'normal',fontSize:'.8rem'}}>Total Amount</span>
                <span style={{fontWeight:'600',fontStyle:'normal',fontSize:'1.5rem',fontFamily:'Lexand'}}>$ {countPrice()}
                    {/* {selected?.filter((n,index)=>selected?.indexOf(n) === index)?.length} */}
                    {/* {sim_selected?.reduce((total, sim) => total + parseFloat(sim.totalPrice || 0), 0).toFixed(2)} */}
                    {/* {sim_selected?.filter((sim)=>selected?.includes(sim.id))?.reduce((total, sim) => total + parseFloat(sim.totalPrice || 0), 0).toFixed(2)} */}
                    </span>
               </div>

               <div style={{flex:'10%',display:'flex',alignItems:'center',textAlign:'center'}}>
               <button
                onMouseDown={(e) => {
                    e.target.style.backgroundColor = '#1EAB5E'; 
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = '#27CF7A'; 
                  }} onClick={()=> {addsimlistfnc(),actioncallset('confirm',orderid);}} className="py-3 px-3 bg-[#27CF7A] text-white  rounded-[4px] w-[9rem]" style={{fontSize:'13px'}}>Order Review</button>

               </div>
            </Card>
           
           {simList2.length>0?
           <Card className="bg-[#303038]  text-white h-[80%] w-full" style={{border:'none',marginTop:'1.5px',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column'}}>
           <div className="flex justify-between items-center ">
             <div style={{display:'flex',justifyContent:'center',alignItems:"center",gap:"1rem"}}> <Title className="text-4xl">{t('simList')}</Title>   <span style={{color:'#27CF7A',fontSize:"1.3rem"}}>(Added SIM-{selected?.filter((n,index)=>selected?.indexOf(n) === index)?.length})</span></div>
               <div className="flex justify-between items-center gap-3">

               <div style={{ position: 'relative', display: 'inline-block' }}>
                <TextInput onChange={(e)=>filterdata(e.target.value)} className="rounded-[5px] !bg-[#444444] border border-[#595959] w-[17rem]" icon={SearchIcon} placeholder={t('search')} style={{ transition: 'all 300ms' }} />
                <span style={{ position: 'absolute', width: '2rem',height:"2rem", right: '0', top: '20%', zIndex: '99999999', transition: 'all 300ms',cursor:'pointer' }}  onClick={()=>setshowfilter(!showfilter)}>
                <FontAwesomeIcon rotation={180} icon={faAngleUp} />
                </span>
                <div style={{ position: 'absolute', width: '17rem', right: '0', top: '100%', zIndex: '9999999', transition: 'all 300ms',display:showfilter === true? 'flex':'none' }}>
                    <SimrequestFilter  getfnc={filterdata} />
                </div>
            </div>

             
              
                   {/* <button  onMouseDown={(e) => {
                    e.target.style.backgroundColor = '#999999'; 
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = '#FFFFFF'; 
                  }}
                   onClick={()=>addsimlistfnc()} 
                   className="py-2 px-2 bg-[#FFFFFF] text-[#999999] font-bold  rounded-[4px] w-[8rem]">Add SIM</button> */}
               </div>
           </div>
           <Table className="mt-5 h-[80vh]">
               <TableHead>
                   <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:'red'}}>
                       <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                onChange={handleSelectAll} type="checkbox"/> {t('serial')}</TableHeaderCell>
                       <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('operators')}</TableHeaderCell>
                       <TableHeaderCell style={{borderRight:'2px solid #303038'}}>ICCICD number</TableHeaderCell>
                       <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('simNumber')}</TableHeaderCell>
                       <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Price</TableHeaderCell>
                       <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Entry date</TableHeaderCell>
                       <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>{t('status')}</TableHeaderCell>
                   </TableRow>
               </TableHead>
              
               <TableBody  >
                  
                   {simList?.filter((item)=> item.status === 'available').map((item,index) => (
                       <TableRow key={item.id} style={{borderColor:'#595959'}}>
                           <TableCell>
                               <input checked={selected.includes(item.id)}
                                      onChange={() => {handleSelect(item);}}
                                      type="checkbox"
                                      id={`my-checkbox-${index}`}/>
                                <span className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                           </TableCell>

                           <TableCell>
                               <Text className="flex gap-3"><img style={{height : '24px', width : '24px'}} src={`${config.apiUrl}${item?.operator.logoUrl}`} alt=""/> <span>{item?.operator.name}</span> </Text>

                           </TableCell>

                           <TableCell>
                               <Text>{item.iccidNumber}</Text>
                           </TableCell>
                        

                           <TableCell>
                               <Text>{item.simCardNumber}</Text>
                           </TableCell>

                           <TableCell>
                             <Text>{item.buyingPrice}</Text>
                           </TableCell>

                           <TableCell>
                              <Text>{moment(item.entryDate).format("YYYY-MM-DD")}</Text>
                           </TableCell>

                           <TableCell>
                             <Text className={item.status==='Inactive'? "!text-red-600" : "!text-[#27CF7A]"}>{item.status}</Text>
                           </TableCell>

                         

                       </TableRow>
                   ))}
               </TableBody>
           </Table>

           {/* <div className="max-w-sm mt-5  flex items-center">
               <select style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>
                   <option value="Available">
                       Available
                   </option>
                   <option value="Inactive">
                       Inactive
                   </option>
               </select>
               <Button onClick={onAlertOpen} variant='outline'  style={{border: "1px solid #27CF7A", color: '#27CF7A', marginTop : '-0.1%'}} ml={3}>
                   Apply
               </Button>

           </div> */}
       </Card>
            
            :
            
            <Card className="bg-[#303038]  text-white h-[80%] w-full" style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column',borderRadius:global_css.card_border_radius}}> 
              <Nodatafound btn_text={t('addNewSim')}  tittle_head={'No available Sim found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onbuttonclicked}/>  </Card>}
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
  }`}
            </style>
        </div>
    );
};

export default SimrequestAdminReviewpage