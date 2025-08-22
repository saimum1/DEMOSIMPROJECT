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
import deleteicon from '../../assets/static/Delete.svg'
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
import SimrequestFilter from './SimrequestFilter.jsx';
import AlertBox from '../AlertBox/AlertBox.jsx';
import {useAuth} from "../../Context/AuthInfo.jsx";
import {useTranslation} from "react-i18next";
import {convertString} from "../commonFunctions/StringConversion.jsx";

const SimRequestADminConfirmpage = ({actioncallset,orderid}) => {
    const {t} = useTranslation()
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const { user , token } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const[dataset,setdataset]=useState([])
    const[datasetfilter,setdatasetfilter]=useState([])
    const[dataset2,setdataset2]=useState([])
    const [sim_selected, setsim_selected] = useState([]);
    const [status, setStatus]=useState('')
    const [loader,setloader]=useState(false)
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [orderitemx, setorderitemx] = useState([]);
    const [showfilter, setshowfilter] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');




    const handleSelect = (value) => {
        console.log("asdada value",value)
        setSelected((prevSelected) => {
            if (prevSelected.includes(value.id)) {
                return prevSelected.filter((item) => item !== value.id);
            } else {
                return [...prevSelected, value.id];
            }
        });

        setIsAllSelected(selected.length === simList.length);

        console.log("isalllselec",selected)
    };

    const handleSelectAll = () => {
        setSelected(isAllSelected ? [] : dataset.map((option) => option.id));
        setIsAllSelected(!isAllSelected);
    };



    const getaction=(e)=>{
        console.log('action',selecteditem)
        if(e.type === 'edit'){
                setactiontype(true)
                
                onOpen()
        }else if(e.type === 'delete'){
            removeItem(selecteditem)
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



    const getselecteddata=()=>{
    
        const storedItemx = JSON.parse(localStorage.getItem('selected_sim_list'));
        const storedItem=storedItemx?.order_no === orderid? storedItemx?.data:[];

        // If the item exists, parse it if it's a complex data type:
        if (storedItem) {
            try {
            const parsedItem = storedItem;
            setdataset(parsedItem)
            setdatasetfilter(parsedItem)
            setdataset2(parsedItem)
            console.log("shoing dataaa confirmpage",parsedItem)
            const operatorCounts = [];
            parsedItem.forEach((sim) => {
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
            setloader(false)
            } catch (error) {
            // Handle parsing errors if the item is not valid JSON
            console.error('Error parsing item from localStorage:', error);
            setloader(false)
            }
        }
    }


    const addsimlistfnc =async()=>{
            const dataitems=simList?.filter((n)=> selected.includes(n.id))
            const dataobj={'order_no':orderid,'data':dataitems}

      
            localStorage.setItem('selected_sim_list',JSON.stringify(dataobj))
            await getselecteddata()
           
            console.log("showing filter",dataitems)
            // getselecteddata()
    }

    const deleteitem=async(e)=>{
        console.log("showinfg item to delete",e)

        // const dataitems=dataset?.filter((n)=> selected.includes(n.id))
            const dataitems=dataset?.filter((n)=> n.id !== e.id)
            const dataobj={'order_no':orderid,'data':dataitems}

            // addedsimlistadmin(dataitems)
            localStorage.setItem('selected_sim_list',JSON.stringify(dataobj))
            await getselecteddata()
    }

    const confirmorder=async()=>{


        console.log("showundataset",dataset)

        if(dataset?.length>0){

            try{


            

      

        setloader(true)
        let orderItems={simCardIds:[]}
        for(const i of dataset){
    
         console.log("aord",i)
    
          orderItems.simCardIds.push(i.id)
        }
    
        console.log("asdadccc===",orderItems,'idddsudo ', orderid)
          const response = await axios.put(`${config.apiUrl}/api/order/${orderid}/confirm`,orderItems, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
    
          console.log('sadasda order',response.status)
          setloader(false)
          if(response.status === 200){
            setloader(false)

            onAlertOpen();
            setAlertType('success')
            setAlertText('Your order list has been successfully created, download your PDF file.');
            setAlertButtonText('Download PDF')
            setAlertButtonTextSecond('Back to sim request')
            localStorage.removeItem('selected_sim_list')
            localStorage.removeItem('orderitem')
        }else{
            setloader(false)

            setshowpopup(true)
            setshowpopupmsg('could not confirmed order')
            setTimeout(() => {
            setshowpopup(false)
            }, 3000);
        }


    }catch{
        setloader(false)

        setshowpopup(true)
        setshowpopupmsg('server error')
        setTimeout(() => {
        setshowpopup(false)
        }, 3000);
    }

    }else{
        setloader(false)

        setshowpopup(true)
        setshowpopupmsg('no sim is selected')
        setTimeout(() => {
        setshowpopup(false)
        }, 3000);
    }
        //   return response.status
    }


    const getorderitem=()=>{
       
        const order_item=JSON.parse(localStorage.getItem('orderitem'))
        
        if (order_item.order_id === orderid) {
            setorderitemx(order_item.data);
            console.log("cdcdcdcd",order_item.data)
        }
    }

    const filterdata=(e)=>{
        console.log("filter",e,dataset)
        let val=e
        if(val !== ''){
            const df=datasetfilter?.filter((n)=>n.operator.name === val)
            // console.log("filter",e,df)
            setdataset(df.length>0?df:[])
        }else{ 
            setdataset(dataset2)
            console.log("filter",'emty')
        }
    }

    const leftbtn =()=>{
        console.log("3434",'ll')
       
        if(alertType === 'success'){
            onAlertClose()
            actioncallset('initial',orderid)
           
        }else if(alertType === 'delete'){
            onAlertClose()

        }
       
    }

    const rightbtn=async()=>{
    //    =dataset?.filter((n)=> n.id !== e.id)
    if(alertType === 'delete'){
       const dataitems= dataset?.filter(item1 => !selected.some(item2 => item2 === item1.id));
        const dataobj={'order_no':orderid,'data':dataitems}
        localStorage.setItem('selected_sim_list',JSON.stringify(dataobj))
        await getselecteddata()
        await onAlertClose() }else if(alertType === 'success'){
            onAlertClose()
            actioncallset('initial',orderid)
        }
    }

    const makedelete=()=>{
        if(selected?.length >0){

        console.log("ssssss",'s')
        setAlertType('delete');
        setAlertButtonTextSecond('Cancel'); 
        setAlertButtonText('Delete');
        setAlertText('Are you sure you want to delete this data?');
        onAlertOpen()
    }else{
        setshowpopup(true)
        setshowpopupmsg('no sim is selected to delete')
        setTimeout(() => {
        setshowpopup(false)
        }, 3000);

    }

    }

    useEffect(() => {
        setloader(true)
        getselecteddata()
        getorderitem()
        console.log("ordrrrrr",user)


    }, [])
    
  
    return (
        <div  className="flex flex-col justify-center h-full w-full items-center md:items-start   rounded-[7px]" >
            <Addnewsimcard isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype}/>
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={leftbtn} type={alertType} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={rightbtn} />
            {loader &&   <LoadingSoS  /> } 

            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 


            <Card className="bg-[#303038]  text-white h-[20%] w-full " style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',borderRadius:global_css.card_border_radius}}>
               <div style={{flex:'50%',display:'flex',alignItems:'center',textAlign:'center',flexDirection:'column'}}>
                  <div  style={{width: '100%',display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',transition:'all 300ms',height:'100%', justifyContent:'center',alignItems:'center',flexDirection:'column',cursor:'pointer',backgroundColor:'',overflowY:'auto',scrollbarWidth: '1px', scrollbarColor: '#555 transparent'}}>

                         {sim_selected?.map((item,index)=>{
                                return (
                                    <div   style={{width:'100%',gap:"4px",padding:'7px',borderRadius:'5px' ,height:'100%', transition: 'all 300ms',display:'flex' ,alignItems:'center' ,justifyContent:'space-between'}} 
                                 
                                        >
                                       <span style={{width:"5rem",display:'flex',justifyContent:'center',textAlign:'center',alignItems:'center',gap:'11rem'}}>{item.operator}</span>
                                       <span style={{width:"10px"}}>:</span>
                                       <span style={{width:"4rem",display:'flex',justifyContent:'flex-start',textAlign:'left',alignItems:'center'}}>{item.total} pcs</span>
                                        </div>
                                )
                            })}

                            </div>                    
               </div>
               <div style={{height:'95%',width:"4px",backgroundColor:"#FFFFFF"}}></div>

               <div style={{flex:'20%',display:'flex',alignItems:'flex-start',textAlign:'left',flexDirection:'column',color:'#8390A3',width:'100%'}}>
                 <span style={{fontWeight:'500',fontStyle:'normal',fontSize:'.8rem'}}>Total SIM</span>
                 <span style={{fontWeight:'600',fontStyle:'normal',fontSize:'1.5rem',fontFamily:'Lexand',color:'#FFA526'}}>{sim_selected?.reduce((total, sim) => total + sim.total, 0)}</span>
               </div>

               <div style={{height:'95%',width:"4px",backgroundColor:"#FFFFFF"}}></div>

               <div style={{flex:'20%',display:'flex',alignItems:'flex-start',textAlign:'left',flexDirection:'column',color:'#8390A3',width:'100%'}}>
                <span style={{fontWeight:'500',fontStyle:'normal',fontSize:'.8rem'}}>Total Amount</span>
                <span style={{fontWeight:'600',fontStyle:'normal',fontSize:'1.5rem',fontFamily:'Lexand',color:'#FFA526'}}>$ {sim_selected?.reduce((total, sim) => total + parseFloat(sim.totalPrice || 0), 0).toFixed(2)}</span>
               </div>

               <div style={{height:'95%',width:"4px",backgroundColor:"#FFFFFF"}}></div>


               <div style={{flex:'10%',display:'flex',alignItems:'flex-start',textAlign:'left',flexDirection:'column',color:'#8390A3',width:'100%'}}>
                <span style={{fontWeight:'500',fontStyle:'normal',fontSize:'.8rem'}}>Order number</span>
                <span style={{fontWeight:'600',fontStyle:'normal',fontSize:'1.5rem',fontFamily:'Lexand',color:'#FFA526'}}>{orderid && orderid}</span>
               </div>
            </Card>
           
          
            <Card className="bg-[#303038]  text-white h-[80%] w-full " style={{border:'none',marginTop:'1.5px',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column',borderRadius:global_css.card_border_radius}}>
                <div className="flex justify-between items-center ">
                <Title className="text-3xl flex justify-center align-middle gap-2"><span style={{cursor:'pointer'}} onClick={()=>actioncallset('review',orderid)}><FontAwesomeIcon rotation={270} icon={faAngleUp}  style={{}}/></span> <span>{user && user?.name}</span></Title>
                    <div className="flex justify-between items-center gap-3">
                        {/* <TextInput className="rounded-[5px]  !bg-[#444444] border border-[#595959] w-[17rem]" icon={SearchIcon} placeholder="Search..." /> */}
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <TextInput onChange={(e)=>filterdata(e.target.value)} className="rounded-[5px] !bg-[#444444] border border-[#595959] w-[17rem]" icon={SearchIcon} placeholder={t('search')} style={{ transition: 'all 300ms' }} />
                            <span style={{ position: 'absolute', width: '2rem',height:"2rem", right: '0', top: '20%', zIndex: '99999999', transition: 'all 300ms',cursor:'pointer' }}  onClick={()=>setshowfilter(!showfilter)}>
                            <FontAwesomeIcon rotation={180} icon={faAngleUp} />
                            </span>
                            <div style={{ position: 'absolute', width: '17rem', right: '0', top: '100%', zIndex: '9999999', transition: 'all 300ms',display:showfilter === true? 'flex':'none' }}>
                                <SimrequestFilter  getfnc={filterdata} />
                            </div>
                        </div>
                        <button  onMouseDown={(e) => {
                    e.target.style.backgroundColor = '#1EAB5E'; 
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = '#27CF7A'; 
                  }} className="py-2 px-2 bg-[#27CF7A] text-white font-normal rounded-[4px] w-[8rem]" onClick={()=>confirmorder()}>Confirm order</button>
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
                       <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('status')}</TableHeaderCell>
                       <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
               
                   </TableRow>
               </TableHead>
              
               <TableBody  >
                  
                   {dataset.map((item,index) => (
                       <TableRow key={item.id} style={{borderColor:'#595959'}}>
                           <TableCell>
                               <input checked={selected.includes(item.id)}
                                      onChange={() => handleSelect(item)}
                                      type="checkbox"
                                      id={`my-checkbox-${index}`}/>
                                <span className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                           </TableCell>

                           <TableCell>
                               <Text className="flex gap-3"><img style={{height : '24px', width : '24px'}} src={`${config.apiUrl}${item?.operator?.logoUrl}`} alt=""/> <span>{item?.operator.name}</span> </Text>

                           </TableCell>

                           <TableCell>
                               <Text>{item.iccidNumber}</Text>
                           </TableCell>
                        

                           <TableCell>
                               <Text>{item.simCardNumber}</Text>
                           </TableCell>

                           <TableCell>
                             <Text>€{item.buyingPrice}</Text>
                           </TableCell>

                           <TableCell>
                              <Text>{moment(item.entryDate).format("YYYY-MM-DD")}</Text>
                           </TableCell>

                           <TableCell>
                             <span style={{color:item.status==='assigned'? "!text-[!text-white]" :item.status==="sold_out"? "#27CF7A" : ""}}>
                                    {item.status==='sold_out'? t('soldOut') :item.status==='assigned'? t('assigned') : (convertString(item.status))}
                                    </span>
                           </TableCell>


                            <TableCell onClick={()=>deleteitem(item)} style={{display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}} >
                            <img src={deleteicon} />
                            

                            </TableCell>

                         

                       </TableRow>
                   ))}
               </TableBody>
           </Table>

           <div className="max-w-sm mt-5  flex items-center">
               {/* <select style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>
                   <option value="Available">
                       Available
                   </option>
                   <option value="Inactive">
                       Inactive
                   </option>
               </select> */}
               <Button
               onMouseDown={(e) => {
                e.target.style.backgroundColor = '#E66986'; 
              }}
              onMouseUp={(e) => {
                e.target.style.backgroundColor = '#E55245'; 
              }}  onClick={()=>makedelete()}   style={{ width:'8rem',color: '#FFFFFF', marginTop : '-0.1%',backgroundColor:'#E55245'}} ml={3}>
                   Delete   
               </Button>

           </div>
            </Card>
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

export default SimRequestADminConfirmpage

