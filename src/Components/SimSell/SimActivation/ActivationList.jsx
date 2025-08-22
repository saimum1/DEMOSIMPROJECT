import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../Context/AuthInfo.jsx";
import {useDisclosure} from "@chakra-ui/react";
import axios from "axios";
import config from "../../../config.jsx";
import AddAgentReques from "../../Users/AgentRequest/AddAgentReques.jsx";
import AlertBox from "../../AlertBox/AlertBox.jsx";
import LoadingSoS from "../../LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../../PopNotification/Popnotification.jsx";
import {
    Card,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    Title
} from "@tremor/react";
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import {SearchIcon} from "@heroicons/react/outline";
import Dropdown from "../../Dropdown/Dropdown.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import NewEditOption from "../../EditFunctionality/NewEditOption.jsx";
import Nodatafound from "../../NoDataFound/Nodatafound.jsx";
import moment from "moment";
import CustomEditors from "../../EditFunctionality/CustomEditors.jsx";
import ViewClientInfo from '../ViewClient/ViewClientInfo.jsx';
import {convertString, revertString} from "../../commonFunctions/StringConversion.jsx";
import RejectionComponent from "../SimList/SellSimComponents/RejectionComponent.jsx";
import SaveSell from "../SimList/SaveSell.jsx";
import { toTitleCase } from '../../StringConvertions/StringCoversion.jsx';
import SearchDialouge from "../../SearchComponent/SearchDialouge.jsx";
import {useTranslation} from "react-i18next";

const ActivationList = () => {
    const {t} = useTranslation()
    const [showAlert, setShowAlert] = useState(false);
    const { isOpen , onOpen, onClose } = useDisclosure()
    const { isOpen:isOpenEdit , onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure()
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [selected, setSelected] = useState([]);
    const [selectedItem, setselecteditem] = useState({});
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [nodata, setNodata] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [actiontype,setactiontype]=useState(false)
    const [filterOpen, setFilterOpen] = useState(false);
    const [now , setNow] = useState('')
    const [preview , setPreview] = useState(false)
    const [searchText , setSearchText] = useState('')
    const [opData , setOPData] = useState([])
    const { isOpen : isClientOpen, onOpen: onClientOpen, onClose: onClientClose } = useDisclosure()

    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [currentselecteddata,setcurrentselecteddata]=useState(null)

    const { user , token, changeR, valuek ,valuePass , valueLo } = useAuth();

    const { isOpen : isRejectOpen, onOpen: onRejectOpen, onClose: onRejectClose } = useDisclosure()
console.log("iwjeiwjeiwewijeiwejwie", valuek)

    const handleSelect = (value) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((item) => item !== value);
            } else {
                return [...prevSelected, value];
            }
        });

        setIsAllSelected(selected.length === tableData.length);
    };

    const handleSelectAll = () => {
        setSelected(isAllSelected ? [] : tableData.map((option) => option.id));
        setIsAllSelected(!isAllSelected);
    };
    
    const GetOperators = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:=-=-=-=-=', response);
            setOPData(response.data.operators)
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };


    const dataConversion = (selectedItem) =>{
        let idx=selectedItem?.simCard?.id
        console.log("selecteditems",selectedItem)
        // setcurrentselecteddata(selectedItem)

        let dataarr=[]
        let dataObj={
            id:idx,
            data:{
                "first_name": selectedItem?.firstName,
                "last_name": selectedItem?.lastName,
                "buying_price": selectedItem?.simCard?.buyingPrice,
                "iccid": selectedItem?.simCard?.iccidNumber,
                "operator_name": opData.filter(id => id.id === selectedItem?.simCard?.operatorId)[0]?.name,
                "status": opData.filter(id => id.id === selectedItem?.simCard?.operatorId)[0]?.status,
                "gender": selectedItem?.gender,
                "date_birth": moment(selectedItem?.dateOfBirth).format('YYYY-MM-DD'),
                "tax_code": selectedItem?.taxIdCode,
                "nationality": selectedItem?.nationality,
                "email": selectedItem?.email,
                "docNumber": selectedItem?.documentNumber,
                "placeOfIssue": selectedItem?.placeOfIssue,
                "docIssueDate": moment(selectedItem?.documentIssueDate).format('YYYY-MM-DD'),
                "docExpireDate": moment(selectedItem?.documentExpirationDate).format('YYYY-MM-DD'),
                "client_address": selectedItem?.clientAddress,
                "location": selectedItem?.location,
                "prov": selectedItem?.prov,
                "postalcode": selectedItem?.postalCode,
                "tel": selectedItem?.telephone,
                "top_up": selectedItem?.topUp,
                "sim_number": selectedItem?.simCard?.simCardNumber,
                "offerid": selectedItem?.simCard?.offerId,
                "old_operator": {id : selectedItem?.oldOperator?.id},
                'oldoperattbb':selectedItem?.oldOperator?.id,        
                "old_iccn": selectedItem?.oldICCIDNumber,
                "old_sim_number": selectedItem?.oldSIMNumber,
                "old_photo_sim_file": selectedItem?.oldSIMFileURL?.originalFilename,
                "old_photo_sim_url": selectedItem?.oldSIMFileURL?.fileUrl,
                "taxcodeimage_url": selectedItem?.originalAndPhotocopyTaxCodeFileURL?.fileUrl,
                "taxcodeimage_file": selectedItem?.originalAndPhotocopyTaxCodeFileURL?.originalFilename,
                "mandatory_taxcode_img_url": selectedItem?.copyOfMandatoryTaxCodeFileURL?.fileUrl,
                "mandatory_taxcode_img_file": selectedItem?.copyOfMandatoryTaxCodeFileURL?.originalFilename,
                "note": selectedItem?.note,
                "rejection_note": selectedItem?.simCard?.rejectionNote,
                "edit": true,

                'file_1_file':selectedItem?.documentFileURLs[0]?.originalFilename,
                'file_1_url': selectedItem?.documentFileURLs[0]?.fileUrl,

                'file_2_file':selectedItem?.documentFileURLs[1]?.originalFilename,
                'file_2_url': selectedItem?.documentFileURLs[1]?.fileUrl,

                'file_3_file':selectedItem?.documentFileURLs[2]?.originalFilename,
                'file_3_url': selectedItem?.documentFileURLs[2]?.fileUrl,

                'file_4_file':selectedItem?.documentFileURLs[3]?.originalFilename,
                'file_4_url': selectedItem?.documentFileURLs[3]?.fileUrl,

                'file_5_file':selectedItem?.documentFileURLs[4]?.originalFilename,
                'file_5_url': selectedItem?.documentFileURLs[4]?.fileUrl,

                'file_6_file':selectedItem?.documentFileURLs[5]?.originalFilename,
                'file_6_url': selectedItem?.documentFileURLs[5]?.fileUrl,
                'sales_id': selectedItem?.id,

            }

        }


        let locaStoragedata=JSON.parse(localStorage.getItem('saleId')) || [];
        console.log("local dataxddxxx",locaStoragedata)
        let actualDatax=locaStoragedata?.filter(n=>n.id === idx)



        if (actualDatax.length === 0) { // Check if actualDatax array is empty
            locaStoragedata.push(dataObj);
            console.log("Data added");
            localStorage.setItem('saleId', JSON.stringify(locaStoragedata));
            console.log("selected item", selectedItem);} else {
            console.log("Data already exists");
        }
    }




 
    const convertData = (e) => {
        return {
            amount: Number(e?.simCard?.buyingPrice) || 0, 
            date: moment().toISOString(), 
            operators: [e?.oldOperator?.name ],
            simNumbers: [e?.simCard?.simCardNumber] || [],
            details: e?.note 
        };
    };
    const SaveOperator = async (e) => {
        try {

          
            const convertedData = convertData(e)
            console.log("asdasdascasc",convertedData)
            const response = await axios.post(`${config.apiUrl}/api/financial/sim/agents/${e?.simCard?.agentId}/simSell`, convertedData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('xre', response);
            
            setshowpopupmsg('Save Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false) 

            }, 1500);

           return '200' 
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg('Save Failed')
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            
            throw '404';

        }
    };

    const getaction=async(e)=>{

        console.log('action cccc',e)
        if(e.type === 'edit'){
            // console.log("seleceted",selectedItem)
            // // GetSimForUpdate(selecteditem)
            dataConversion(selectedItem)
            setactiontype(true)
            onOpenEdit()


        }else if(e.type === 'delete'){
            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText(t('yesDel'))
            setAlertButtonTextSecond(t('cancel'))
            setactiontype(false)
            AgeentList()
        }else if(e.type === 'view'){
            dataConversion(selectedItem)

            onClientOpen()
            // onAlertOpen();
            // setAlertType('')
            // setAlertText('Are you sure you want to delete this data?');
            // setAlertButtonText('Yes, Delete')
            // setAlertButtonTextSecond('Cancel')
            // setactiontype(false)
        }else if(e.type === 'note'){
            dataConversion(selectedItem)

            onRejectOpen()
            // onAlertOpen();
            // setAlertType('')
            // setAlertText('Are you sure you want to delete this data?');
            // setAlertButtonText('Yes, Delete')
            // setAlertButtonTextSecond('Cancel')
            // setactiontype(false)
        }else if (e.type === 'addxt'){
           const d=await SaveOperator(selectedItem)
           console.log("dasdasd",d)
           if(d==='200'){
            setTimeout(() => {
                setshowpopup(false)
                let xdata={
                    'agentid':selectedItem?.simCard?.agentId,
                    'pageview':'payment',
                    'transtype':'SIM',
                    'data':selectedItem
                     }
                valuePass(xdata)
                changeR('balance')
            }, 1600);
             
           }else{

           }
           

        }

    }


    const deleteOperator = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/sales/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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

    const AgeentList = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`${config.apiUrl}/api/sales`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response: 34545dfdrr--------', response.data.sales);
            setTableData(response.data.sales);
            setNodata(response?.data?.sales.length <= 0);
            setLoader(false);
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false);
            throw error;
        }
    };

 

    const changeStaus = async (value) =>{
        try{
        const datak = {
            'status' : `${revertString(value)}`
        }
        console.log('tessssssssssst', selectedItem.id)
        const response = await axios.put(`${config.apiUrl}/api/sales/${selectedItem?.id}/update/status`, datak, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response);

        setshowpopupmsg('Status successfully Updated');
        setshowpopupstatus('success');
        setshowpopup(true);

        setTimeout(() => {
            setshowpopup(false)

        }, 1500);
        onClose();
        await AgeentList()


} catch (error) {
    console.error('Error++++:', error);
    setshowpopupmsg(error?.response?.data?.error)
    setshowpopupstatus('fail')
    setshowpopup(true)
    setTimeout(() => {
        setshowpopup(false)

    }, 1500);
    throw error;
}}


    const getselecteditem = (e) => {

            if(revertString(e.lang) === 'rejected'){
                dataConversion(selectedItem)
                onRejectOpen()

            }else {
                changeStaus(e.lang)
            }}


            useEffect(() => {
                AgeentList()
                GetOperators()
            }, []);
        

    return (
        <div   className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px]">
            <ViewClientInfo   isOpen={isClientOpen} onClose={onClientClose} oid={selectedItem?.simCard?.id}   type={'activation'} activationList={AgeentList}/>
            <RejectionComponent onSaveOpen={onOpenEdit} activationList={AgeentList}  isOpen={isRejectOpen} onClose={onRejectClose} oid={selectedItem?.simCard?.id} type={'rejection'}/>
            <SaveSell isOpen={isOpenEdit} onOpen={onOpenEdit} onClose={onCloseEdit} data={selectedItem?.simCard} action={actiontype} GetSimList={AgeentList}/>

            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType}
                      deleteId={selectedItem}
                      text={alertText} buttonText={alertButtonText}
                      seconDbuttonText={alertButtonTextSecond}
                      exFunc={deleteOperator}

            />
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            {!nodata? 
            
            <Card  className="bg-[#303038]  text-white h-full w-[100%]" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,boxShadow : 'none',gap:'2rem',display:'flex',flexDirection:'column'}}>
                <div className="flex justify-between items-center mb-14">
                    <Title className="text-4xl">Sim Sale List</Title>
                    <div  className="flex justify-end  items-center gap-3 w-4/12">
                        <label  style={{border : '1px solid #595959', position: 'relative', display: 'inline-block', zIndex : '1' }} htmlFor="file-input" className="w-8/12 h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span onClick={() => {
            if(!filterOpen){setFilterOpen(true) }else{setFilterOpen(false)}
        }} className="flex items-center justify-between p-0">
            <span  className="flex items-center">
                <Icon size="sm" icon={SearchIcon} />{t('search')}

              </span> <span ><FontAwesomeIcon icon={faChevronDown} /></span>
        </span>
                            {filterOpen && (<SearchDialouge  setFilterOpen={setFilterOpen} setTableData={setTableData} type={'sales'}/>)}
                        </label>
                       {user.role === 'AGENT' &&  <button onClick={() => changeR('Sim list')} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-[8rem] mr-[2%]">Add new</button>}
                    </div>
                </div>
                <Table onClick={() =>setFilterOpen(false)} className="mt-5 h-[80vh]">
                    <TableHead>
                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                            <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                     onChange={handleSelectAll} type="checkbox"/> {t('serial')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('operators')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('simNumber')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>ICCID number</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Order by</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Sales date</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('status')}</TableHeaderCell>
                            <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{height:'100%',backgroundColor:"",transition: "all 300ms"}} className='transition-all[300ms]'>
                        {tableData?.map((item, index) => (
                            <TableRow key={index} style={{borderColor:'#595959',transition: "all 300ms"}}>
                                <TableCell>
                                    <input checked={selected.includes(item.id)}
                                           onChange={() => handleSelect(item.id)}
                                           type="checkbox"
                                           id={`my-checkbox-${index}`}/>
                                    <span className="ml-2">{(index + 1).toString().padStart(2, '0')}</span>
                                </TableCell>
                                <TableCell>
                                    <Text className="flex gap-3"><img style={{height : '24px', width : '24px'}} src={`${config.apiUrl}/${opData?.filter(id => id.id === item?.simCard?.operatorId)[0]?.logoUrl}`} alt=""/> <span>{opData?.filter(id => id.id === item?.simCard?.operatorId)[0]?.name}</span> </Text>

                                </TableCell>
                                <TableCell>
                                    <Text>{item?.simCard?.simCardNumber}</Text>
                                </TableCell>


                                <TableCell>
                                    <Text>{item?.simCard?.iccidNumber}</Text>
                                </TableCell>

                                <TableCell>
                                    <Text>{item?.firstName} {item?.lastName}</Text>
                                </TableCell>

                                <TableCell>
                                    <Text>{moment(item?.simCard?.entryDate).format(("YYYY-MM-DD"))}</Text>
                                </TableCell>

                                {user.role === 'AGENT'?
                                    <TableCell>
                                        <Text>
                                            <span style={{color:item?.simCard?.agentStatus === 'ready_to_use'?'#27CF7A':item?.simCard?.agentStatus === 'rejected'?'#E55245':item?.simCard?.agentStatus === 'processing'?'#0080FF':item?.simCard?.agentStatus === 'pending'?'#FFA526':""}}>{ convertString(item?.simCard?.agentStatus)}</span>

                                            </Text>
                                    </TableCell> :

                                    <TableCell onClick={()=>setselecteditem(item)} style={{backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>

                                        {/* <div style={{width:"9rem",backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                                             <Dropdown dropType={'sales'} getdata={getselecteditem}  order_status={item?.simCard?.agentStatus}/>
                                             </div> */}


                              <div style={{backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',position:'relative', transition: "all 300ms",width:'8.5rem'}}>
                              <Dropdown dropType={'sales'} getdata={getselecteditem}  order_status={item?.simCard?.agentStatus}/>

                              </div>
                                    </TableCell>}

                                <TableCell>
                                    <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index !== showeditindex);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {showedit &&  <div style={{position:'absolute',width:'9rem',right:'50%',top:'1%',zIndex:'9999999' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                            <CustomEditors
                                                getdata={getaction} selected={item?.simCard?.agentStatus==='rejected' ?user.role === 'AGENT'?['edit','note', 'delete'] : ['view','note','addxt', 'delete'] : user.role === 'AGENT'? item?.simCard?.agentStatus==='rejected'?['view', 'edit', 'delete'] : ['view','addxt', 'delete']:['view','addxt', 'delete']}/>

                                        </div>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/*<div className="max-w-sm mt-5  flex items-center">*/}
                {/*    <select style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] h-10 hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onChange={(e) => setStatus(e.target.value)} value={status}>*/}
                {/*        <option value="">*/}
                {/*            Select Status*/}
                {/*        </option>*/}
                {/*        <option value="Available">*/}
                {/*            Available*/}
                {/*        </option>*/}
                {/*        <option value="Inactive">*/}
                {/*            Inactive*/}
                {/*        </option>*/}
                {/*    </select>*/}
                {/*    <Button onClick={()=>{onAlertOpen(); setAlertType('warning'); setAlertText('Are you sure you want to change the status?'); setAlertButtonTextSecond('Cancel'); setAlertButtonText('Yes, Update')}} variant='outline'  style={{border: "1px solid #27CF7A", color: '#27CF7A', marginTop : '-0.1%'}} ml={3}>*/}
                {/*        Apply*/}
                {/*    </Button>*/}

                {/*</div>*/}
            </Card>:<Nodatafound  tittle_head={'No sim sale List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onOpen}/>}
            <style jsx>
                {
                    ` input[type="checkbox"] {
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
              

              `
                }
            </style>
        </div>
    );
};

export default ActivationList;