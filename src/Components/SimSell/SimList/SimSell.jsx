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
import Popnotification from '../../PopNotification/Popnotification';
import Editopstions from '../../EditFunctionality/Editopstions';
import LoadingSoS from '../../LoadingScreen/LoadingSoS';
import Nodatafound from '../../NoDataFound/Nodatafound';
import axios from "axios";
import config from "../../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
import AlertBox from "../../AlertBox/AlertBox.jsx";
import SearchDialouge from "../../SearchComponent/SearchDialouge.jsx";
import CustomEditors from '../../EditFunctionality/CustomEditors.jsx';
import SaveSell from './SaveSell.jsx';
import { toTitleCase } from '../../StringConvertions/StringCoversion.jsx';
import {convertString} from "../../commonFunctions/StringConversion.jsx";
import {useAuth} from "../../../Context/AuthInfo.jsx";
import { global_css } from '../../../GlobalCss/GlobalCSS.js';
import {useTranslation} from "react-i18next";

const SimSell = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [simList,setSimList]=useState([])
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
    const { user , token } = useAuth();
    const {t} = useTranslation()
    console.log("ssssssssssss", status)
    const handleSelect = (value) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((item) => item !== value);
            } else {
                return [...prevSelected, value];
            }
        });

        setIsAllSelected(selected.length === simList.length);
    };

    const handleSelectAll = () => {
        setSelected(isAllSelected ? [] : simList.map((option) => option.id));
        setIsAllSelected(!isAllSelected);
    };


    const getaction=(e)=>{
        console.log('action',selecteditem)
        if(e.type === 'sale'){

            let idx=selecteditem?.id

            let dataarr=[]
            let dataObj={
                id:idx,
                data:{
                    'operator_name':selecteditem?.operator?.name,
                    'operator_logo':selecteditem?.operator?.logoUrl,
                    'iccid':selecteditem?.iccidNumber,
                    'sim_number':selecteditem?.simCardNumber,
                    'offerid':null,
                    'buying_price':selecteditem?.buyingPrice,
                    'status':selecteditem?.status,
                    'operatorId':selecteditem?.operatorId
                }
            }

            let locaStoragedata=JSON.parse(localStorage.getItem('saleId')) || [];
            console.log("local dataxddxxx",locaStoragedata)
            let actualDatax=locaStoragedata?.filter(n=>n.id === idx)
            
            

            if (actualDatax.length === 0) { // Check if actualDatax array is empty
                locaStoragedata.push(dataObj);
                console.log("Data added");
                localStorage.setItem('saleId', JSON.stringify(locaStoragedata)); 
                console.log("selected item", selecteditem);
            } else {
                console.log("Data already exists");
            }
           
           callbox()
                

        }else if(e.type === 'delete'){
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
        setLoader(true)
        GetSimList()
    }, []);



    const GetSimList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/sim`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSimList(response.data.SIMCards)
            console.log('Response:-----------sik', response.data.SIMCards);
            setNodata(response?.data?.SIMCards.length <= 0)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
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
            await onOpen()
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };
    const deleteSim = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/sim/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle successful deletion
            console.log('Operator deleted successfully');
           await GetSimList()
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

    const UpdateBulk = async () => {
        try {

            const data ={
                simCardIds: selected,
                status: status.toLocaleLowerCase()
            }
            console.log("ssssssssssssssssssssssss", data)
            const response = await axios.put(`${config.apiUrl}/api/sim/update/bulk`, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            await GetSimList()
            await onAlertClose()
            setshowpopupmsg('Update Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 2500);
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg('Update Failed')
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 2500);
            throw error;
        }
    };

 

    return (
        <div  className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px]" >
            <SaveSell  simForEdit={simForEdit} isOpen={isOpen} onOpen={onOpen} onClose={onClose} data={selecteditem} action={actiontype} GetSimList={GetSimList}/>
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={alertType==='warning'?UpdateBulk : deleteSim}/>
            {/* <LoadingSoS/> */}

            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
           
           {!nodata?
            <Card className="bg-[#303038]  text-white h-full w-[100%]" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,boxShadow : 'none',gap:'2rem',display:'flex',flexDirection:'column'}}>
                <div className="flex justify-between items-center">
                    <Title className="text-4xl">{t('simList')}</Title>
                    <div className="flex justify-end  items-center gap-3 w-4/12">
                        <label  style={{border : '1px solid #595959', position: 'relative', display: 'inline-block', zIndex : '1' }} htmlFor="file-input" className="w-[22.5rem] h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span onClick={() => {
            if(!filterOpen){setFilterOpen(true) }else{setFilterOpen(false)}
        }} className="flex items-center justify-between p-0">
            <span  className="flex items-center">
                <Icon size="sm" icon={SearchIcon} />{t('search')}

              </span> <span ><FontAwesomeIcon icon={faChevronDown} /></span>
        </span>
                            {filterOpen && (<SearchDialouge  setFilterOpen={setFilterOpen} setTableData={setSimList} type={'simA'}/>)}
                        </label>
                        {/*<button onClick={()=> {*/}
                        {/*    callbox();*/}
                        {/*    setactiontype(false)*/}
                        {/*}} className="py-2 px-2 bg-[#27CF7A] text-white font-bold  rounded-[4px] w-[8rem]">Add new</button>*/}
                    </div>
                </div>
                <Table className="mt-5 h-[80vh]">
                    <TableHead>
                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:'red'}}>
                            <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                     onChange={handleSelectAll} type="checkbox"/> Serial</TableHeaderCell>
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
                       
                        {simList?.map((item, index) => (
                            <TableRow key={item.id} style={{borderColor:'#595959'}}>
                                <TableCell>
                                    <input checked={selected.includes(item.id)}
                                           onChange={() => handleSelect(item.id)}
                                           type="checkbox"
                                           id={`my-checkbox-${index}`}/>
                                     <span className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                                </TableCell>

                                <TableCell>
                                    <Text className="flex gap-3"><img style={{height : '24px', width : '24px'}} src={`${config.apiUrl}${item?.operator?.logoUrl}`} alt=""/> <span>{item?.operator?.name}</span> </Text>

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
                                  <Text >

                                    <span style={{color:item.status==='assigned'? "!text-[!text-white]" :item.status==="sold_out"? "#27CF7A" : ""}}>
                                    {item.status==='sold_out'? t('soldOut') :item.status==='assigned'? t('assigned') : (convertString(item.status))}
                                    </span>
                                    </Text>
                                </TableCell>

                                <TableCell>
                                    {item.status!=="sold_out"?
                                    <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {showedit &&  <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                          
                                                <CustomEditors
                                                         getdata={getaction} selected={['sale']}/>

                                        </div>}
                                    </div>:''}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* <div className="max-w-sm mt-5  flex items-center">
                    <select style={{border : '1px solid #595959'}} className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>
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
            </Card>:<Nodatafound   tittle_head={'No Sim List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onbuttonclicked}/>}
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

export default SimSell