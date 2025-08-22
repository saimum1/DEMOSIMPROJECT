import React, {useEffect, useState} from 'react';
import {Button, useDisclosure} from "@chakra-ui/react";
import AddNewAgent from "../AgentList/AddNewAgent.jsx";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import SearchDialouge from "../../SearchComponent/SearchDialouge.jsx";
import NewEditOption from "../../EditFunctionality/NewEditOption.jsx";
import Nodatafound from "../../NoDataFound/Nodatafound.jsx";
import Dropdown from "../../Dropdown/Dropdown.jsx";
import {requpdateItemstatus} from "../../SimRequest/simrequestdatalist.jsx";
import axios from "axios";
import config from "../../../config.jsx";
import {useAuth} from "../../../Context/AuthInfo.jsx";
import AddAgentReques from "./AddAgentReques.jsx";
import {convertString, revertString} from "../../commonFunctions/StringConversion.jsx";
import {useTranslation} from "react-i18next";

const AgentRequestList = () => {
    const {t} = useTranslation()
    const { user , token, changeLoad} = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const { isOpen , onOpen, onClose } = useDisclosure()
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
    const [menu, setMenu] = useState(
      user.role === 'ADMIN'?
        [
        {

            "icon" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 14 12" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.10791 6.0354C9.10791 7.1994 8.16391 8.14273 6.99991 8.14273C5.83591 8.14273 4.89258 7.1994 4.89258 6.0354C4.89258 4.87073 5.83591 3.9274 6.99991 3.9274C8.16391 3.9274 9.10791 4.87073 9.10791 6.0354Z" stroke= {now === 'preview'? '#27CF7A' : '#F5F5F5'} strokeLinecap="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6.99932 10.9033C9.53798 10.9033 11.86 9.07793 13.1673 6.03527C11.86 2.9926 9.53798 1.16727 6.99932 1.16727H7.00198C4.46332 1.16727 2.14132 2.9926 0.833984 6.03527C2.14132 9.07793 4.46332 10.9033 7.00198 10.9033H6.99932Z" stroke={`${now === 'preview' ? '#27CF7A' : '#F5F5F5'}`} strokeLinecap="round"/>
            </svg>,
            "text" : "Preview",
            "type" : 'preview'
        }  ,{

            "icon" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 17 16" fill="none">
                <path d="M13.5417 3.6665L13.1113 10.3499C13.0013 12.0574 12.9464 12.9112 12.5006 13.5251C12.2801 13.8286 11.9963 14.0847 11.6672 14.2772C11.0015 14.6665 10.1104 14.6665 8.32826 14.6665C6.54383 14.6665 5.6516 14.6665 4.98545 14.2764C4.65611 14.0836 4.37222 13.827 4.15186 13.523C3.70617 12.9082 3.6524 12.0532 3.54487 10.3433L3.125 3.6665" stroke="#F5F5F5" strokeLinecap="round"/>
                <path d="M14.5835 3.6665H2.0835" stroke="#F5F5F5" strokeLinecap="round"/>
                <path d="M11.1522 3.66634L10.6781 2.72749C10.3632 2.10385 10.2058 1.79202 9.93418 1.59755C9.8739 1.55441 9.81015 1.51603 9.74341 1.48281C9.44265 1.33301 9.08168 1.33301 8.35973 1.33301C7.61966 1.33301 7.24959 1.33301 6.94387 1.48909C6.87609 1.52368 6.81143 1.56361 6.75054 1.60845C6.47577 1.81081 6.3223 2.13404 6.01534 2.78051L5.59473 3.66634" stroke="#F5F5F5" strokeLinecap="round"/>
            </svg>,
            "text" : "Delete",
            "type" : 'delete'
        }

    ] : [
        {

            "icon" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 14 12" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.10791 6.0354C9.10791 7.1994 8.16391 8.14273 6.99991 8.14273C5.83591 8.14273 4.89258 7.1994 4.89258 6.0354C4.89258 4.87073 5.83591 3.9274 6.99991 3.9274C8.16391 3.9274 9.10791 4.87073 9.10791 6.0354Z" stroke= {now === 'preview'? '#27CF7A' : '#F5F5F5'} strokeLinecap="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6.99932 10.9033C9.53798 10.9033 11.86 9.07793 13.1673 6.03527C11.86 2.9926 9.53798 1.16727 6.99932 1.16727H7.00198C4.46332 1.16727 2.14132 2.9926 0.833984 6.03527C2.14132 9.07793 4.46332 10.9033 7.00198 10.9033H6.99932Z" stroke={`${now === 'preview' ? '#27CF7A' : '#F5F5F5'}`} strokeLinecap="round"/>
            </svg>,
            "text" : "Preview",
            "type" : 'preview'
        }  ,{

            "icon" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 16 16" fill="none">
                <g clipPath="url(#clip0_1025_23454)">
                    <path d="M9.38117 2.58997C9.87797 2.05173 10.1264 1.78261 10.3903 1.62563C11.0272 1.24685 11.8114 1.23507 12.459 1.59455C12.7273 1.74354 12.9833 2.00509 13.4954 2.52818C14.0074 3.05127 14.2635 3.31282 14.4093 3.58696C14.7612 4.24842 14.7497 5.04953 14.3789 5.70014C14.2252 5.96978 13.9618 6.22353 13.4349 6.73101L7.16577 12.7692C6.16729 13.7309 5.66803 14.2118 5.04407 14.4555C4.42011 14.6992 3.73417 14.6813 2.36227 14.6454L2.17562 14.6405C1.75797 14.6296 1.54915 14.6241 1.42776 14.4863C1.30637 14.3486 1.32294 14.1359 1.35609 13.7105L1.37409 13.4795C1.46737 12.282 1.51401 11.6833 1.74784 11.1451C1.98166 10.6069 2.38499 10.17 3.19165 9.29601L9.38117 2.58997Z" stroke="#29CC79" strokeLinejoin="round"/>
                    <path d="M8.66797 2.66699L13.3346 7.33366" stroke="#29CC79" strokeLinejoin="round"/>
                    <path d="M9.33203 14.667H14.6654" stroke="#29CC79" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                    <clipPath id="clip0_1025_23454">
                        <rect width="16" height="16" fill="white"/>
                    </clipPath>
                </defs>
            </svg>,
            "text" : "Edit",
            "type" : 'edit'
        } ,{

            "icon" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 17 16" fill="none">
                <path d="M13.5417 3.6665L13.1113 10.3499C13.0013 12.0574 12.9464 12.9112 12.5006 13.5251C12.2801 13.8286 11.9963 14.0847 11.6672 14.2772C11.0015 14.6665 10.1104 14.6665 8.32826 14.6665C6.54383 14.6665 5.6516 14.6665 4.98545 14.2764C4.65611 14.0836 4.37222 13.827 4.15186 13.523C3.70617 12.9082 3.6524 12.0532 3.54487 10.3433L3.125 3.6665" stroke="#F5F5F5" strokeLinecap="round"/>
                <path d="M14.5835 3.6665H2.0835" stroke="#F5F5F5" strokeLinecap="round"/>
                <path d="M11.1522 3.66634L10.6781 2.72749C10.3632 2.10385 10.2058 1.79202 9.93418 1.59755C9.8739 1.55441 9.81015 1.51603 9.74341 1.48281C9.44265 1.33301 9.08168 1.33301 8.35973 1.33301C7.61966 1.33301 7.24959 1.33301 6.94387 1.48909C6.87609 1.52368 6.81143 1.56361 6.75054 1.60845C6.47577 1.81081 6.3223 2.13404 6.01534 2.78051L5.59473 3.66634" stroke="#F5F5F5" strokeLinecap="round"/>
            </svg>,
            "text" : "Delete",
            "type" : 'delete'
        }

    ]


    );
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
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


    const getaction=(e)=>{

        if(e.type === 'delete'){
            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText(t('yesDel'))
            setAlertButtonTextSecond(t('cancel'))
            setactiontype(false)
        }else if (e.type === 'preview'){
            setPreview(true)
            setactiontype(true)
            onOpen()
        }

        else if (e.type === 'edit'){
            setshowedit(true)
            setPreview(false)
            setactiontype(true)
            onOpen()
        }

    }

    const deleteOperator = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/agentRequests/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            await AgeentList()
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

    const handleSearch = async (v) => {
        try {
            setLoader(true);
            setSearchText(v);
            const response = await axios.get(`${config.apiUrl}/api/agentRequests?q=${v}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data.agentRequests);
            setTableData(response.data.agentRequests);
            setNodata(response?.data?.agentRequests.length <= 0);
            setLoader(false);
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false);
            throw error;
        }
    };
    const AgeentList = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`${config.apiUrl}/api/agentRequests`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data.agentRequests);
            setTableData(response.data.agentRequests);
            setNodata(response?.data?.agentRequests.length <= 0);
            setLoader(false);
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false);
            throw error;
        }
    };

    useEffect(() => {
        AgeentList()
    }, []);


const getselecteditem = async (e) => {
    try {
        console.log('Response:------------status');
        const datak = {
        'status' : `${revertString(e.lang)}`
    }

        const response = await axios.put(`${config.apiUrl}/api/agentRequests/${selectedItem.id}/update/status`, datak, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Response:------------status', response);
        await changeLoad()
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
        setshowpopupmsg('Update Failed')
        setshowpopupstatus('fail')
        setshowpopup(true)
        setTimeout(() => {
            setshowpopup(false)

        }, 1500);
        throw error;
    }}

    return (
        <div   className="border-none h-full w-full">
            <AddAgentReques isOpen={isOpen} onClose={onClose} actionType={actiontype} data={selectedItem} preview={preview} getData={AgeentList}/>
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType}
                deleteId={selectedItem}
                      text={alertText} buttonText={alertButtonText}
                      seconDbuttonText={alertButtonTextSecond}
                exFunc={deleteOperator}

            />
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            {!nodata?  <Card  className="w-full h-full text-white mb-12" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,  boxShadow : 'none'}}>
                <div className="flex justify-between items-center mb-14">
                    <Title className="text-4xl">{t('agentRequest')}</Title>
                    <div  className="flex justify-end  items-center gap-3 w-4/12">
                        <label  style={{border : '1px solid #595959', position: 'relative', display: 'inline-block', zIndex : '1' }} htmlFor="file-input" className="w-8/12 h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span onClick={() => {
            if(!filterOpen){setFilterOpen(true) }else{setFilterOpen(false)}
        }} className="flex items-center justify-between p-0">
            <span  className="flex items-center">
                <Icon size="sm" icon={SearchIcon} />{searchText === ''? t('search') : ''}
                <input onChange={(e) => handleSearch(e.target.value) }  style={{background : 'none', outline : 'none', border : 'none'}} type='text'/>
              </span>
        </span>

                        </label>
                        {user.role === 'ADMIN'? null : <button onClick={() => {onOpen(); setactiontype(false)}} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-3/12">Add new</button>}
                    </div>
                </div>
                <Table onClick={() =>setFilterOpen(false)} className="mt-8 h-[80vh]">
                    <TableHead>
                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                            <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                     onChange={handleSelectAll} type="checkbox"/> {t('serial')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('agentName')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('email')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('mobile')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('contactPerson')}</TableHeaderCell>
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
                                    <Text className="flex gap-3">{item.agentName}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.email}</Text>
                                </TableCell>


                                <TableCell>
                                    <Text>{item.phone}</Text>
                                </TableCell>

                                <TableCell>
                                    <Text>{item.contactPerson}</Text>
                                </TableCell>

                                {user.role === 'AGENT'?
                                    <TableCell>
                                        <Text className={item.status==='pending'? "!text-[#FFA526]" : item.status==='approved'? "!text-[#12B262]":item.status==='canceled'? "!text-[#E55245]":item.status==='processing'? "!text-[#0080FF]":''}>{convertString(item.status)}</Text>
                                    </TableCell> :


                                    <TableCell onClick={()=>setselecteditem(item)} style={{backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',position:'relative', transition: "all 300ms"}}>

                                        <div style={{backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center',position:'relative', transition: "all 300ms",width:'8.5rem'}}> <Dropdown dropType={'agent'} getdata={getselecteditem}  order_status={item.status}/></div>


                                    </TableCell>

                                    
                                    }

                                <TableCell>
                                    <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index !== showeditindex);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {showedit &&  <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%',zIndex:'9999999' ,height:`${menu.length + 4}rem`,display:( index === showeditindex) ?'flex':'none'}}>
                                            <NewEditOption setNow={setNow} now={now}
                                                           getdata={getaction} optionList={menu}/>

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
            </Card>:<Nodatafound btn_text={'Add Agent Request'}  tittle_head={'No Agent Request List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onOpen}/>}
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

export default AgentRequestList;