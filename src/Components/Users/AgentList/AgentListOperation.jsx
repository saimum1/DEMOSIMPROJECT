import React, {useEffect, useState} from 'react';
import AddOperator from "../../InventoryTable/AddOperator.jsx";
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
import config from "../../../config.jsx";
import Editopstions from "../../EditFunctionality/Editopstions.jsx";
import {Button, useDisclosure} from "@chakra-ui/react";
import Nodatafound from "../../NoDataFound/Nodatafound.jsx";
import editicon from '../../../assets/static/edit.svg';
import resetIcon from '../../../assets/static/reselIcon.svg';
import NewEditOption from "../../EditFunctionality/NewEditOption.jsx";
import AddNewAgent from "./AddNewAgent.jsx";
import axios from "axios";
import {useAuth} from "../../../Context/AuthInfo.jsx";
import CustomEditors from "../../EditFunctionality/CustomEditors.jsx";
import {convertString} from "../../commonFunctions/StringConversion.jsx";
import {useTranslation} from "react-i18next";

const AgentListOperation = () => {
    const {t} = useTranslation()
    const { user , token } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const { isOpen , onOpen, onClose } = useDisclosure()
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [nodata, setNodata] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [actiontype,setactiontype]=useState(false)
    const [filterOpen, setFilterOpen] = useState(false);
    const [now , setNow] = useState('')
    const [searchText , setSearchText] = useState('')
    const [tableData , setTableData] = useState([])
    const [preview , setPreview] = useState(false)
    const [menu, setMenu] = useState([
        {

        "icon" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 14 12" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.10791 6.0354C9.10791 7.1994 8.16391 8.14273 6.99991 8.14273C5.83591 8.14273 4.89258 7.1994 4.89258 6.0354C4.89258 4.87073 5.83591 3.9274 6.99991 3.9274C8.16391 3.9274 9.10791 4.87073 9.10791 6.0354Z" stroke= {now === 'preview'? '#27CF7A' : '#F5F5F5'} strokeLinecap="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6.99932 10.9033C9.53798 10.9033 11.86 9.07793 13.1673 6.03527C11.86 2.9926 9.53798 1.16727 6.99932 1.16727H7.00198C4.46332 1.16727 2.14132 2.9926 0.833984 6.03527C2.14132 9.07793 4.46332 10.9033 7.00198 10.9033H6.99932Z" stroke={`${now === 'preview' ? '#27CF7A' : '#F5F5F5'}`} strokeLinecap="round"/>
        </svg>,
        "text" : "Preview",
        "type" : 'preview'
    }  ,      {

        "icon" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 16 16" fill='none'>
            <g clipPath="url(#clip0_1080_37754)">
                <path d="M9.38117 2.58997C9.87797 2.05173 10.1264 1.78261 10.3903 1.62563C11.0272 1.24685 11.8114 1.23507 12.459 1.59455C12.7273 1.74354 12.9833 2.00509 13.4954 2.52818C14.0074 3.05127 14.2635 3.31282 14.4093 3.58696C14.7612 4.24842 14.7497 5.04953 14.3789 5.70014C14.2252 5.96978 13.9618 6.22353 13.4349 6.73101L7.16577 12.7692C6.16729 13.7309 5.66803 14.2118 5.04407 14.4555C4.42011 14.6992 3.73417 14.6813 2.36227 14.6454L2.17562 14.6405C1.75797 14.6296 1.54915 14.6241 1.42776 14.4863C1.30637 14.3486 1.32294 14.1359 1.35609 13.7105L1.37409 13.4795C1.46737 12.282 1.51401 11.6833 1.74784 11.1451C1.98166 10.6069 2.38499 10.17 3.19165 9.29601L9.38117 2.58997Z" stroke={now === 'edit'? '#27CF7A' : '#F5F5F5'} strokeLinejoin="round"/>
                <path d="M8.66797 2.66699L13.3346 7.33366" stroke={now === 'edit'? '#27CF7A' : '#F5F5F5'} strokeLinejoin="round"/>
                <path d="M9.33203 14.667H14.6654" stroke={now === 'edit'? '#27CF7A' : '#F5F5F5'} strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_1080_37754">
                    <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>,
        "text" : "Edit",
        "type" : 'edit'
    },{

        "icon" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.99936 3.92667C7.39788 3.92667 6.85292 4.0186 6.36304 4.16556C6.09852 4.24492 5.8198 4.09484 5.74044 3.83034C5.66108 3.56584 5.8112 3.2871 6.07568 3.20775C6.65248 3.03472 7.29416 2.92667 7.99936 2.92667C11.218 2.92667 13.8327 5.51312 13.8327 8.71332C13.8327 11.9136 11.218 14.5 7.99936 14.5C4.78064 14.5 2.16602 11.9136 2.16602 8.71332C2.16602 7.52312 2.53133 6.413 3.1515 5.49372C3.30593 5.2648 3.6167 5.2044 3.84562 5.35884C4.07452 5.51328 4.13492 5.82404 3.9805 6.05296C3.46733 6.81364 3.16602 7.73024 3.16602 8.71332C3.16602 11.3531 5.32472 13.5 7.99936 13.5C10.674 13.5 12.8327 11.3531 12.8327 8.71332C12.8327 6.07356 10.674 3.92667 7.99936 3.92667Z" fill={now === 'reset'? '#27CF7A' : '#F5F5F5'}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.43898 1.58052C7.67062 1.73079 7.73662 2.04042 7.58634 2.27209L6.73942 3.5778L8.0575 4.42624C8.2897 4.57568 8.35674 4.88508 8.2073 5.11728C8.05782 5.34948 7.74842 5.41656 7.51626 5.26708L5.77626 4.14708C5.6645 4.07516 5.58598 3.96168 5.55806 3.83174C5.5301 3.70179 5.55506 3.56608 5.62738 3.45457L6.74738 1.7279C6.89766 1.49623 7.2073 1.43024 7.43898 1.58052Z" fill={now === 'reset'? '#27CF7A' : '#F5F5F5'}/>
        </svg>,
        "text" : "Reset",
        "type" : 'reset'
    }, {

        "icon" : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.99936 3.92667C7.39788 3.92667 6.85292 4.0186 6.36304 4.16556C6.09852 4.24492 5.8198 4.09484 5.74044 3.83034C5.66108 3.56584 5.8112 3.2871 6.07568 3.20775C6.65248 3.03472 7.29416 2.92667 7.99936 2.92667C11.218 2.92667 13.8327 5.51312 13.8327 8.71332C13.8327 11.9136 11.218 14.5 7.99936 14.5C4.78064 14.5 2.16602 11.9136 2.16602 8.71332C2.16602 7.52312 2.53133 6.413 3.1515 5.49372C3.30593 5.2648 3.6167 5.2044 3.84562 5.35884C4.07452 5.51328 4.13492 5.82404 3.9805 6.05296C3.46733 6.81364 3.16602 7.73024 3.16602 8.71332C3.16602 11.3531 5.32472 13.5 7.99936 13.5C10.674 13.5 12.8327 11.3531 12.8327 8.71332C12.8327 6.07356 10.674 3.92667 7.99936 3.92667Z" fill={now === 'reset'? '#27CF7A' : '#F5F5F5'}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.43898 1.58052C7.67062 1.73079 7.73662 2.04042 7.58634 2.27209L6.73942 3.5778L8.0575 4.42624C8.2897 4.57568 8.35674 4.88508 8.2073 5.11728C8.05782 5.34948 7.74842 5.41656 7.51626 5.26708L5.77626 4.14708C5.6645 4.07516 5.58598 3.96168 5.55806 3.83174C5.5301 3.70179 5.55506 3.56608 5.62738 3.45457L6.74738 1.7279C6.89766 1.49623 7.2073 1.43024 7.43898 1.58052Z" fill={now === 'reset'? '#27CF7A' : '#F5F5F5'}/>
        </svg>,
        "text" : "Reset",
        "type" : 'reset'
    }

    ]);
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selectedItem,setselecteditem]=useState(null)
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

        if(e.type === 'edit'){

            setactiontype(true)
            setPreview(false)

            onOpen()
        }else if(e.type === 'delete'){
            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText(t('yesDel'))
            setAlertButtonTextSecond(t('cancel'))
            setactiontype(false)
        }else if (e.type === 'profile'){
            setPreview(true)
            setactiontype(true)
            onOpen()
        }

    }

    const deleteAgent = async (id) => {
        try {
          const res =  await axios.delete(`${config.apiUrl}/api/agents/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("resdele",res)
            await AgeentList()
            await onAlertClose()
            setshowpopupmsg('Delete Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        } catch (error) {
            console.error('Error deleting operator:', error.response?.data?.error);
            setshowpopupmsg(error.response?.data?.error)
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
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
            console.log('Response:', response);
            setTableData(response.data.agents)
            setNodata(response?.data?.agents.length <= 0)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };

    useEffect(() => {
        AgeentList()
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
    return (
        <div   className="border-none h-full w-full">
            <AddNewAgent isOpen={isOpen} onClose={onClose} actionType={actiontype} getData={AgeentList} data={selectedItem} preview={preview}/>
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType}
                      deleteId={selectedItem}
                      text={alertText} buttonText={alertButtonText}
                      seconDbuttonText={alertButtonTextSecond}
                      exFunc={deleteAgent}

            />
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            {!nodata?  <Card  className="w-full h-full text-white mb-12" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,  boxShadow : 'none'}}>
                <div className="flex justify-between items-center mb-14">
                    <Title className="text-4xl">{t('agentList')}</Title>
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
                        <button onClick={() => {onOpen(); setPreview(false); setactiontype(false)}} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-3/12">Add new</button>
                    </div>
                </div>
                <Table onClick={() =>setFilterOpen(false)} className="mt-8 h-[80vh]">
                    <TableHead>
                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                            <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                     onChange={handleSelectAll} type="checkbox"/> UID</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('agentName')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('email')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('mobile')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('contactPerson')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('status')}</TableHeaderCell>
                            <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{minHeight : '300px' , overflow : 'auto'}}>
                        {tableData?.map((item, index) => (
                            <TableRow key={index} style={{borderColor:'#595959'}}>
                                <TableCell>
                                    <input checked={selected.includes(item.id)}
                                           onChange={() => handleSelect(item.id)}
                                           type="checkbox"
                                           id={`my-checkbox-${index}`}/>
                                    <span className="ml-5">{item.user?.uid}</span>
                                </TableCell>
                                <TableCell>
                                    <Text className="flex gap-3">{item.user?.name}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.user?.email}</Text>
                                </TableCell>


                                <TableCell>
                                    <Text>{item.user?.mobile}</Text>
                                </TableCell>

                                <TableCell>
                                    <Text>{item.contactPerson}</Text>
                                    <Text></Text>
                                </TableCell>

                                <TableCell>
                                    <Text className={item.status==='inactive' || item.status===''? "!text-red-600" : "!text-white"}>{convertString(item.user?.status)}</Text>
                                </TableCell>

                                <TableCell>
                                    <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {/* {showedit &&  <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%',zIndex:'9999999' ,height:'4rem',display:( index === showeditindex) ?'flex':'none'}}>
                                    <Editopstions
                                        getdata={getaction} edittext={'Edit'}/>

                                </div>} */}

                                        {showedit &&  <div style={{position:'absolute',width:'9rem',right:'50%',top:'1%' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                            <CustomEditors
                                                getdata={getaction} selected={['profile','edit','reset','delete']}/>

                                        </div>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Card>:<Nodatafound btn_text={'Add Agent'}  tittle_head={'No Agent List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onOpen}/>}
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

export default AgentListOperation;