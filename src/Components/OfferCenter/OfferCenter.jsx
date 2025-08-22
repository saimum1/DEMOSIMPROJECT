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
import {useDisclosure, Button} from "@chakra-ui/react";
import Popnotification from '../PopNotification/Popnotification';
import Editopstions from '../EditFunctionality/Editopstions';
import LoadingSoS from '../LoadingScreen/LoadingSoS';
import Nodatafound from '../NoDataFound/Nodatafound';
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
import AlertBox from "../AlertBox/AlertBox.jsx";
import AddnewUser from './AddnewOfferCenter.jsx';
import ViewOfferCenter from './ViewOfferCenter.jsx';
import CustomEditors from '../EditFunctionality/CustomEditors.jsx';
import AddnewOfferCenter from "./AddnewOfferCenter.jsx";
import SearchDialouge from "../SearchComponent/SearchDialouge.jsx";
import fileView from "../../assets/static/file-view.png";
import {convertString} from "../commonFunctions/StringConversion.jsx";
import {useAuth} from "../../Context/AuthInfo.jsx";
import { global_css } from '../../GlobalCss/GlobalCSS.js';
import UploadBanner from './UploadBanner.jsx';
import {useTranslation} from "react-i18next";


const OfferCenter = () =>{
    const {t} = useTranslation()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen : isOpenoff, onOpen : onOpenoff , onClose: onCloseoff} = useDisclosure()
    const { isOpen : isOpenUp, onOpen : onOpenUp , onClose: onCloseUp} = useDisclosure()

    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [offerList,setofferList]=useState([])
    const [simForEdit,setSimForEdit]=useState({})
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [status, setStatus]=useState('')
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
    const [copied, setCopied] = useState(false);
    const [selcetdIndex, setselcetdIndex] = useState();
    const { user , token } = useAuth();


    console.log("ssssssssssss", status)

    const handleSelect = (value) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((item) => item !== value);
            } else {
                return [...prevSelected, value];
            }
        });

        setIsAllSelected(selected.length === offerList.length);
    };

    const handleSelectAll = () => {
        setSelected(isAllSelected ? [] : offerList.map((option) => option.id));
        setIsAllSelected(!isAllSelected);
    };


    const getaction=(e)=>{

        console.log('action cccc',e)
        if(e.type === 'edit'){
            // console.log("seleceted",selecteditem)
            // // GetSimForUpdate(selecteditem)


            setactiontype(true)
            onOpen()


        }else if(e.type === 'delete'){

            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText(t('yesDel'))
            setAlertButtonTextSecond(t('cancel'))
            setactiontype(false)
        }else if(e.type === 'view'){
            console.log("dsfsdfsdfsd")
              onOpenoff()
            // onAlertOpen();
            // setAlertType('')
            // setAlertText('Are you sure you want to delete this data?');
            // setAlertButtonText('Yes, Delete')
            // setAlertButtonTextSecond('Cancel')
            // setactiontype(false)
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




    useEffect(() => {
        // setLoader(true)
        GetofferList()
    }, []);


    const handleSearch = async (v) => {
        try {
            setLoader(true);
            setSearchText(v);
            const response = await axios.get(`${config.apiUrl}/api/agents?q=${v}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data.agents);
            setTableData(response.data.agents);
            setNodata(response?.data?.agents.length <= 0);
            setLoader(false);
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false);
            throw error;
        }
    };
    const GetofferList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/offer`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('offers:====', response);
            setofferList(response.data.offers)
            setNodata(response?.data?.offers.length <= 0)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };



    const GetSimForUpdate = async (id) => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/offer/${id.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:====', response);
            setSimForEdit(response.data.SIMCard)
            await setactiontype(true)
            await onOpen()
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };
    const deleteSim = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/offer/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle successful deletion
            console.log('Operator deleted successfully');
           await GetofferList()
            await onAlertClose()
            setshowpopupmsg('Delete Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
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


 

const getdataforadd=(e)=>{
    if(actiontype === true){
        const updatedofferList = offerList.map(item => {
            if (item.uid === e.uid) {
                return e; // Replace the item with the new data
            }
            return item;
        });
        setofferList(updatedofferList);
        setshowpopupmsg('Update Success')
        setshowpopupstatus('success')
        setshowpopup(true)
        setTimeout(() => {
            setshowpopup(false)

        }, 2500);
    }else{
        offerList.push(e)
        setshowpopupmsg('Data added successfully')
        setshowpopupstatus('success')
        setshowpopup(true)
        setTimeout(() => {
            setshowpopup(false)

        }, 2500);
    }
 
}




 // State to track if UID is copied

const handleCopyUID = (uid) => {
    navigator.clipboard.writeText(uid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
};


const getbanner=(e)=>{
console.log("banneruri",e)
if(e=== 200){
    onCloseUp()
    setshowpopupmsg('Successfully updated banner')
    setshowpopupstatus('success')
    setshowpopup(true)

        setTimeout(() => {
            setshowpopup(false)

        }, 2500);
}
}
  return (

    <div  className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px]" >
    <AddnewOfferCenter  isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype}  getdata={GetofferList}/>

    <ViewOfferCenter   isOpen={isOpenoff} onClose={onCloseoff} data={selecteditem} action={actiontype}  getdata={GetofferList}/>
    <UploadBanner isOpen={isOpenUp} onClose={onCloseUp} item={''} getData={getbanner}/>

    <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={deleteSim}/>
    {/* <LoadingSoS/> */}

    {loader &&  <LoadingSoS  /> }
    {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
   
   {!nodata?
    <Card className="bg-[#303038]  text-white h-full w-[100%]" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,boxShadow : 'none',gap:'2rem',display:'flex',flexDirection:'column'}}>
        <div className="flex justify-between items-center">
        <Title className="text-4xl">{t('offerCenter')}</Title>
            <div className={`flex justify-end items-center gap-3 ${user?.role === 'ADMIN' ? 'w-[42rem]' : 'w-4/12'}`}>
                <label  style={{border : '1px solid #595959', position: 'relative', display: 'inline-block', zIndex : '1' }} htmlFor="file-input" className={`h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    user?.role === 'ADMIN' ? 'w-11/12' : 'w-8/12'
                }`}>
        <span onClick={() => {
            if(!filterOpen){setFilterOpen(true) }else{setFilterOpen(false)}
        }} className="flex items-center justify-between p-0">
            <span  className="flex items-center">
                <Icon size="sm" icon={SearchIcon} />{t('search')}

              </span> <span ><FontAwesomeIcon icon={faChevronDown} /></span>
        </span>
                    {filterOpen && (<SearchDialouge  setFilterOpen={setFilterOpen} setTableData={setofferList} type={'offer'}/>)}
                </label>
                {user?.role==='ADMIN'?<span style={{display:'flex',justifyContent:'center' ,alignItems:'center',gap:'5px',fontSize:'14px'}}> <button onClick={() => {onOpenUp() }} style={{backgroundColor:global_css.primary_card_bg,border:'1px solid #999'}} className="py-2 px-3.5  text-white font-bold  rounded-[4px] w-[10rem]">Upload Banner</button>  <button onClick={()=>callbox()} className="w-[12rem] py-2 px-3.5 bg-[#27CF7A] text-white font-bold  rounded-[4px] ">{t('addNewOffer')}</button> </span>: null}
            </div>

        </div>
        <Table className="mt-5 h-[80vh]">
            <TableHead>
                <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:'red'}}>
                    <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}} ><input checked={isAllSelected}
                                                                                                                                             onChange={handleSelectAll} type="checkbox" /><span className="ml-2">{t('serial')}</span> </TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('operators')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('addNewOffer')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('defaultPrice')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('agentPrice')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('date')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>IBAN</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('status')}</TableHeaderCell>
                    <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                </TableRow>
            </TableHead>
           
            <TableBody  >
               
                {offerList?.map((item,index) => (
                    <TableRow key={index} style={{borderColor:'#595959'}}>
                 
      

                                    <TableCell 
                                    >
                                           <div>
                                        <input checked={selected.includes(item.id)}
                                            onChange={() =>{ handleSelect(item.id);}}
                                            type="checkbox"
                                            id={`my-checkbox-${index}`}/>
                                     
                                              <span className="ml-2">{(index + 1).toString().padStart(2, '0')}</span> 
                                        </div>
                                    </TableCell>

                      

                        <TableCell>
                            <Text className="flex gap-3"><img style={{height : '24px', width : '24px'}} src={`${config.apiUrl}${item?.operator?.logoUrl}`} alt=""/> <span>{item?.operator?.name}</span> </Text>
                        </TableCell>

                        <TableCell style={{ overflowY: 'auto', width:'15rem',maxWidth: '20rem', maxHeight: '10rem' }}>
                                    <Text>
                                        <div style={{ backgroundColor: '', width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
                                            {item.offerName.length>78? item.offerName.slice(0, 76) : item.offerName}{item.offerName.length>76? '...' : null}
                                        </div>
                                    </Text>
                                </TableCell>

                        <TableCell>
                            <Text>€{item.defaultPrice}</Text>
                        </TableCell>

                        <TableCell>
                            <Text>€{item.agentPrice}</Text>
                        </TableCell>

                        <TableCell>
                            <Text>{moment(item.entryDate).format("YYYY-MM-DD")}</Text>
                        </TableCell>

                        <TableCell>
                          <Text className={item.iban===false? "!text-[#E55245]" : "!text-white"}>{item.iban? 'Yes' : 'No'}</Text>
                        </TableCell>


                        <TableCell>
                          <Text className={item.status==='inactive'? "!text-[#E55245]" : item.status==='assigned'? "!text-[#27CF7A]" :item.status==='sold_out'? "!text-red-600" : "!text-white"}>{convertString(item.status)}</Text>
                        </TableCell>

                        {user?.role==='ADMIN'?<TableCell>
                            <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                {showedit &&  <div style={{position:'absolute',width:'9rem',right:'50%',top:'1%' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                    <CustomEditors
                                        getdata={getaction} selected={['view','delete','edit']}/>

                                </div>}
                            </div>
                        </TableCell> : <TableCell style={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                           <img style={{cursor : 'pointer'}} onClick={ () =>{ getaction({type : 'view'}); setselecteditem(item)}} src={fileView} alt="view"/>
                        </TableCell>}

                    </TableRow>
                ))}
            </TableBody>
        </Table>

        {/* <div className="max-w-sm mt-5  flex items-center">
            <select style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>
                <option value="">
                    Select Status
                </option>
                <option value="Available">
                    Available
                </option>
                <option value="Inactive">
                    Inactive
                </option>
            </select>
            <Button onClick={()=>{onAlertOpen(); setAlertType('warning'); setAlertText('Are you sure you want to change the status?'); setAlertButtonTextSecond('Cancel'); setAlertButtonText('Yes, Update')}} variant='outline'  style={{border: "1px solid #27CF7A", color: '#27CF7A', marginTop : '-0.1%'}} ml={3}>
                Apply
            </Button>

        </div> */}
    </Card>:<Nodatafound btn_text={t('addNewOffer')}  tittle_head={'No Offer List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onbuttonclicked}/>}
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
        

        `}
    </style>
</div>
  
    )


}

export default OfferCenter