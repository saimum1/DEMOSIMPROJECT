import React, {useEffect, useState} from 'react';
import {useAuth} from "../../Context/AuthInfo.jsx";
import {useDisclosure} from "@chakra-ui/react";
import axios from "axios";
import config from "../../config.jsx";
import AddPriceAndCommission from "./AddPriceAndCommission.jsx";
import AlertBox from "../AlertBox/AlertBox.jsx";
import LoadingSoS from "../LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
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
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import CustomEditors from "../EditFunctionality/CustomEditors.jsx";
import Nodatafound from "../NoDataFound/Nodatafound.jsx";
import {SearchIcon} from "@heroicons/react/outline";
import SearchDialouge from "../SearchComponent/SearchDialouge.jsx";
import moment from "moment";
import Dropdown from "../Dropdown/Dropdown.jsx";
import {convertString, revertString} from "../commonFunctions/StringConversion.jsx";
import NewEditOption from "../EditFunctionality/NewEditOption.jsx";
import ViewOfferCenter from "../OfferCenter/ViewOfferCenter.jsx";
import ViewCourier from "./cargoComponents/ViewCourier.jsx";
import labelIcon from './../../assets/static/label_download.png'
import uploimg from "../../assets/static/Upload.svg";
import UploadForm from "./UploadForm.jsx";
import orderDetails from "./cargoComponents/OrderDetails.jsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const CouriereTable = ({setList,tableData, setTableData,setCourierForm, loader, setLoader,  setNodata, nodata, courierList}) => {
    const {t} = useTranslation()
    const { user , token,valuePass,changeR } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen : isOpenoff, onOpen : onOpenoff , onClose: onCloseoff} = useDisclosure()
    const { isOpen : isOpenUp, onOpen : onOpenUp , onClose: onCloseUp} = useDisclosure()
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [filterOpen, setFilterOpen] = useState(false);
    const [operatorForEdit, setOperatorForEdit] = useState({});
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [view, setView] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');

    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [now , setNow] = useState('')
    const [invoice , setInvoice] = useState(false)
    const navigate = useNavigate()

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




      const convertData = (e) => {
            return {
                "amount": Number(e?.orderDetails?.totalWithHomeDeliveryCharge) || 0,
                "date": moment().toISOString(),
                "details": e?.orderNote,
                "commissionAmount": Number(e?.orderDetails?.totalAgentCommision) || 0,
                "courierOrderNo":(e?.id).toString(),
            };
        };

       const  getuserid =async (e) => {

        return new Promise((resolve, reject) => {

            axios.get(`${config.apiUrl}/api/agents`)
                .then((response) => {
                    const datax=response?.data?.agents

                    const getid=datax?.filter((n)=>n.userId === e)
                    console.log("useriddd",datax,e)
                    if (getid[0]?.id !== null) {
                        resolve(getid[0]?.id);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
        }
    const getuserid3=async(e)=>{
        try {

            const response = await axios.get(`${config.apiUrl}/api/agents`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:agentlist', response);
            const datax=response?.data?.agents

            const getid=datax?.filter((n)=>n.userId === e)

            return getid[0]?.id || null

        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    }

    const SaveOperator = async (e) => {
        try {
console.log("showing value",e)

            const convertedData = convertData(e)
            console.log("asdasdascasc",convertedData)
            const xid=await getuserid(e?.userId)
            console.log("dataid",xid)
            const response = await axios.post(`${config.apiUrl}/api/financial/courier/agents/${xid}/courierSell`, convertedData,{
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

        if(e.type === 'edit'){
            setCourierForm(selecteditem)
            setList(false)

            setView(false)
        }else if(e.type === 'delete'){
            console.log("tessssssssssssssssssssssssst==========>", selecteditem)
            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText(t('yesDel'))
            setAlertButtonTextSecond(t('cancel'))
            setactiontype(false)
        }else if(e.type === 'view'){
            onOpenoff()
            setView(true)
            setInvoice(false)
        }else if(e.type === 'invoice'){
            onOpenoff()
            setView(true)
            setInvoice(true)
        }else if(e.type === 'labelDownload'){
            if(selecteditem?.orderDetails?.labelFileUrl){
                openInNewTab(`${config.apiUrl}${selecteditem?.orderDetails?.labelFileUrl}`)

            }


        }else if (e.type === 'addxt'){
            console.log("asdasd4",selecteditem)
           const d=await SaveOperator(selecteditem)
           console.log("dasdasd",d)
           if(d==='200'){
            setTimeout(() => {
                setshowpopup(false)
                let xdata={
                    'agentid':10,
                    'pageview':'payment',
                    'transtype':'Courier',
                    'data':selecteditem
                     }
                valuePass(xdata)
                changeR('balance')
            }, 1600);

           }
        }
    }

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }



    const deleteOperator = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/courier/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle successful deletion
            console.log('Courier deleted successfully');
            await courierList()
            await onAlertClose()
            setshowpopupmsg('Delete Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            // Update UI to reflect deletion, e.g., remove the operator from a list
        } catch (error) {
            console.error('Error deleting operator:', error);
            setshowpopupmsg('Delete Failed')
            setshowpopupstatus('failed')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        }
    };




    const getselecteditem = async (e) => {
        try {
            console.log('cheeeeeeeeeeeeeekkkkkkkkkk----------:')
            const datak = {
                'status' : `${revertString(e.lang)}`
            }

            console.log("testing id:", selecteditem)

            const response = await axios.put(`${config.apiUrl}/api/courier/${selecteditem.id}/update/status`, datak, {
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
            await courierList()
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg('Update Failed')
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);

            throw error;
        }}
    useEffect(() => {
        if (tableData.length <= 0){setNodata(true)}
    }, []);

    return (
        <div   className="border-none h-full w-[82vw]">
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={deleteOperator}/>
            <ViewCourier setCourierForm={setCourierForm} isOpen={isOpenoff} onClose={onCloseoff} data={selecteditem} action={actiontype} setList={setList} view={view} setView={setView} invoice={invoice}/>
            <UploadForm isOpen={isOpenUp} onClose={onCloseUp} selecteditem={selecteditem} setselecteditem={setselecteditem} getData={courierList}/>

            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            {!nodata?  <Card  className="w-full h-full text-white mb-12" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,  boxShadow : 'none'}}>
                <div className="flex justify-between items-center mb-14">
                    <Title className="text-4xl">Courier List</Title>
                    <div  className="flex justify-end  items-center gap-3 w- 10/12">
                        <label  style={{border : '1px solid #595959',width : '28.5rem', position: 'relative', display: 'inline-block', zIndex : '1' }} htmlFor="file-input" className="w-8/12 h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span onClick={() => {
            if(!filterOpen){setFilterOpen(true) }else{setFilterOpen(false)}
        }} className="flex items-center justify-between p-0">
            <span  className="flex items-center">
                <Icon size="sm" icon={SearchIcon} />Search

              </span> <span ><FontAwesomeIcon icon={faChevronDown} /></span>
        </span>
                            {filterOpen && (<SearchDialouge  setFilterOpen={setFilterOpen} setTableData={setTableData} type={'courier'}/>)}
                        </label>

                        {user.role === 'AGENT'? <button onClick={() => {setList(false); setactiontype(false)}} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-4/12">Add New Courier</button>  : null}
                    </div>
                </div>
                <div className="overflow-x-auto" style={{ overflowX:'auto' }}>
                    <Table className="mt-8 h-[60vh] w-full" style={{ minWidth: '1000px' }}>
                        <TableHead>
                            <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                                <TableHeaderCell style={{width: '100px', borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}>
                                    <input checked={isAllSelected} onChange={handleSelectAll} type="checkbox"/> Invoice
                                </TableHeaderCell>
                                { user.role ==='ADMIN' && <TableHeaderCell style={{width: '120px', borderRight:'2px solid #303038'}}>Order No.</TableHeaderCell> }
                                { user.role ==='ADMIN' && <TableHeaderCell style={{width: '100px', borderRight:'2px solid #303038'}}>Order Type</TableHeaderCell> }
                                <TableHeaderCell style={{width: '150px', borderRight:'2px solid #303038'}}>{user.role ==='ADMIN'? 'Customer' : 'Name'}</TableHeaderCell>
                                {user.role !=='ADMIN' && <TableHeaderCell style={{width: '120px', borderRight:'2px solid #303038'}}>Courier Type</TableHeaderCell>}
                                {user.role !=='ADMIN' && <TableHeaderCell style={{width: '80px', borderRight:'2px solid #303038'}}>Weight</TableHeaderCell>}
                                <TableHeaderCell style={{width: '150px', borderRight:'2px solid #303038'}}>Entry Date</TableHeaderCell>
                                <TableHeaderCell style={{width: '100px', borderRight:'2px solid #303038'}}>Total Price</TableHeaderCell>
                                { user.role ==='ADMIN' && <TableHeaderCell style={{width: '80px', borderRight:'2px solid #303038'}}>Agent Com.</TableHeaderCell> }
                                { user.role ==='ADMIN' && <TableHeaderCell style={{width: '80px', borderRight:'2px solid #303038'}}>Label</TableHeaderCell> }
                                <TableHeaderCell style={{width: '100px', borderRight:'2px solid #303038'}}>Status</TableHeaderCell>
                                { user.role ==='ADMIN' && <TableHeaderCell style={{width: '100px', borderRight:'2px solid #303038'}}>Agent</TableHeaderCell> }
                                <TableHeaderCell style={{width: '80px', borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{minHeight : '300px'}}>
                            {tableData?.map((item, index) => (
                                <TableRow key={index} style={{borderColor:'#595959'}}>
                                    <TableCell style={{width: '100px', whiteSpace: 'nowrap'}}>
                                        <input checked={selected.includes(item.id)}
                                               onChange={() => handleSelect(item.id)}
                                               type="checkbox"
                                               id={`my-checkbox-${index}`}/>
                                        <span className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                                    </TableCell>
                                    { user.role ==='ADMIN' && <TableCell style={{width: '120px', whiteSpace: 'nowrap'}}>{item?.orderId}</TableCell> }
                                    { user.role ==='ADMIN' && <TableCell style={{width: '100px'}}>{item?.courierType?.courierTypeName}</TableCell> }
                                    <TableCell style={{width: '150px'}}>{item?.senderInfo?.firstName} {item?.senderInfo?.lastName}</TableCell>
                                    {user.role !=='ADMIN' && <TableCell style={{width: '120px'}}>{item?.courierType?.courierTypeName}</TableCell>}
                                    {user.role !=='ADMIN' && <TableCell style={{width: '80px'}}>{item.orderDetails.commissionRow.reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0)}</TableCell>}
                                    <TableCell style={{width: '150px', whiteSpace: 'nowrap'}}>{moment(item?.createdAt).format("YYYY-MM-DD, hh:mm A")}</TableCell>
                                    <TableCell style={{width: '100px'}}>€{item?.orderDetails?.totalWithHomeDeliveryCharge}</TableCell>
                                    { user.role ==='ADMIN' && <TableCell style={{width: '80px'}}>€{item?.orderDetails?.totalAgentCommision}</TableCell> }
                                    { user.role ==='ADMIN' &&
                                        <TableCell style={{width: '80px'}}>
                                            <Text className="flex flex-col items-center justify-center cursor-pointer">
                                                <img onClick={() => { setselecteditem(item); onOpenUp() }} alt='' src={uploimg}/>
                                                <span title={item?.orderDetails?.labelFileName || 'Upload'}>
                  {item?.orderDetails?.labelFileName ? item?.orderDetails?.labelFileName?.slice(0, 8) + '...' : 'Upload'}
                </span>
                                            </Text>
                                        </TableCell>
                                    }
                                    <TableCell style={{width: '100px'}}>
                                        {user.role === 'AGENT' ?
                                            <Text className={`!text-[${item.status==='pending'?'#FFA526':item.status==='approved'?'#12B262':item.status==='canceled'?'#E55245':item.status==='processing'?'#0080FF':''}]`}>
                                                {convertString(item.status)}
                                            </Text> :
                                            <div onClick={() => setselecteditem(item)} style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative', transition: "all 300ms",width:'8.5rem'}}>
                                                <Dropdown dropType={'sim'} getdata={getselecteditem} order_status={item.status}/>
                                            </div>
                                        }
                                    </TableCell>
                                    { user.role ==='ADMIN' && <TableCell style={{width: '100px'}}>{item?.user?.name}</TableCell> }
                                    {/*<TableCell style={{width: '80px'}}>*/}
                                    {/*    <div style={{position:'relative',width:"100%",cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}*/}
                                    {/*         onClick={()=>{setshowedit(index !== showeditindex);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>*/}
                                    {/*        <FontAwesomeIcon icon={faEllipsisVertical} />*/}
                                    {/*        {showedit && index === showeditindex &&*/}
                                    {/*            <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%',zIndex:'9999999' ,height:`${menu.length + 4}rem`,display:'flex'}}>*/}
                                    {/*                <NewEditOption setNow={setNow} now={now} getdata={getaction} optionList={menu}/>*/}
                                    {/*            </div>*/}
                                    {/*        }*/}
                                    {/*    </div>*/}
                                    {/*</TableCell>*/}
                                    <TableCell>
                                        <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                            {showedit &&  <div style={{position:'absolute',width:'9rem',right:'50%',top:'1%',zIndex:'99999' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                                <CustomEditors
                                                    getdata={getaction} selected={['view','delete','edit', 'labelDownload', 'invoice']}/>

                                            </div>}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

            </Card>:<Nodatafound btn_text={user.role === 'ADMIN'? '' : 'Add New Courier'}  tittle_head={'No Courier List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={() => setList(false)}/>}
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
                      height: 12px; /* Height of the horizontal scrollbar */
                      width: 12px; /* Width of the vertical scrollbar */
                    }

                    ::-webkit-scrollbar-thumb {
                      background-color: #888;
                      border-radius: 6px;
                      border: 3px solid #f1f1f1;
                    }

                    ::-webkit-scrollbar-track {
                      background-color: #f1f1f1;
                    }

                    /* Styles for Firefox */
                    * {
                      scrollbar-width: thin;
                      scrollbar-color: #888 #f1f1f1;
                    }
              

              `
                }
            </style>
        </div>
    );
};


export default CouriereTable;