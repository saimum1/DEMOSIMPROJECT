import React, {useEffect, useRef, useState} from 'react';
import AddOperator from "../InventoryTable/AddOperator.jsx";
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
import {SearchIcon} from "@heroicons/react/outline";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import SearchDialouge from "../SearchComponent/SearchDialouge.jsx";
import config from "../../config.jsx";
import {convertString} from "../commonFunctions/StringConversion.jsx";
import CustomEditors from "../EditFunctionality/CustomEditors.jsx";
import {Button, useDisclosure} from "@chakra-ui/react";
import Nodatafound from "../NoDataFound/Nodatafound.jsx";
import AddPriceAndCommission from "./AddPriceAndCommission.jsx";
import axios from "axios";
import {useAuth} from "../../Context/AuthInfo.jsx";
import CourierList from "./ CourierList.jsx";
import {useTranslation} from "react-i18next";

const PriceAndCommision = () => {
    const {t} = useTranslation()
    const { user , token } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ tableData, setTableData ] = useState([])
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [filterOpen, setFilterOpen] = useState(false);
    const [operatorForEdit, setOperatorForEdit] = useState({});
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
    const [formType,setFormType]=useState('')
    const [commissionForm,setCommissionForm]=useState(formType==='International goods'?{
        courierTypeName : 'International goods',
        commissionRow : [
            {
                weight : null,
                amount : null,
                agentCommission : null,
                length : null,
                width : null,
                height : null,
            }
        ],
        exceedsLimit : false,
        commissionWhenExceedsLimit : {
            weight: null,
            amount: null,
            agentCommission: null,
            length : 65,
            width : 776,
            height : 76,

        }
    } : {
        courierTypeName : '',
        commissionRow : [
            {
                weight : null,
                amount : null,
                agentCommission : null
            }
        ],
        exceedsLimit : false,
        commissionWhenExceedsLimit : {
            weight: null,
            amount: null,
            agentCommission: null

        }
    })




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
            setCommissionForm(selecteditem)
            setactiontype(true)


            onOpen()
        }else if(e.type === 'delete'){
            console.log("tessssssssssssssssssssssssst==========>", selecteditem)
            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText(t('yesDel'))
            setAlertButtonTextSecond(t('cancel'))
            setactiontype(false)
        }

    }
    const commissionList = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`${config.apiUrl}/api/courierType`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data.courierTypes);
            setTableData(response.data.courierTypes);
            setNodata(response?.data?.courierTypes.length <= 0);
            setLoader(false);
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false);
            throw error;
        }
    };

    const deleteOperator = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/courierType/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle successful deletion
            console.log('Operator deleted successfully');
            await commissionList()
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

    useEffect(() => {
        commissionList()
    }, []);

    return (
        <div   className="border-none h-full w-full">
            <AddPriceAndCommission isOpen={isOpen} onClose={onClose} actionType={actiontype} tableData={tableData} getData={commissionList} commissionForm={commissionForm} setCommissionForm={setCommissionForm} setFormType={setFormType}/>
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={deleteOperator}/>
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            {!nodata?  <Card  className="w-full h-full text-white mb-12" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,  boxShadow : 'none'}}>
                <div className="flex justify-between items-center mb-14">
                    <Title className="text-4xl">{t('priceAndCommission')}</Title>
                    <div  className="flex justify-end  items-center gap-3 w-4/12">

                        <button onClick={() => {onOpen(); setactiontype(false)}} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-6/12">€ Set Price</button>
                    </div>
                </div>
                <Table onClick={() =>setFilterOpen(false)} className="mt-8 h-[60vh]">
                    <TableHead>
                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                            <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                     onChange={handleSelectAll} type="checkbox"/> {t('serial')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('orderCourierType')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('weightType')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('weightAndPrice')}</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('agentCommission')}</TableHeaderCell>
                            <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{minHeight : '300px' , overflow : 'auto'}}>
                        {tableData?.map((item, index) => (
                            <TableRow key={index} style={{borderColor:'#595959'}}
                            >
                                <TableCell>
                                    <input checked={selected.includes(item.id)}
                                           onChange={() => handleSelect(item.id)}
                                           type="checkbox"
                                           id={`my-checkbox-${index}`}/>
                                    <span className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                                </TableCell>
                                <TableCell>
                                    <Text>{item?.courierTypeName}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>Kg</Text>
                                </TableCell>

                                <TableCell>
                                    {item?.commissionRow.map(k => <Text>{k?.weight} Kg = € {k?.amount}</Text>)}
                                </TableCell>
                                <TableCell>
                                    {item?.commissionRow.map(k => <Text>{k?.weight} Kg = € {k?.agentCommission}</Text>)}

                                </TableCell>

                                <TableCell>
                                    <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}
                                         onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}

                                    >
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {(showeditindex !== null)? <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%' ,height:'fit-content',display:( index === showeditindex) ?'flex':'none'}}>
                                            {/* <Editopstions
                                                getdata={getaction} edittext={'Edit'}/> */}
                                            <CustomEditors
                                                getdata={getaction} selected={['edit', 'delete']}/>

                                        </div>:''}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Card>:<Nodatafound btn_text={'€ Set Price'}  tittle_head={'No Price and Commission List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onOpen}/>}
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


export default PriceAndCommision;