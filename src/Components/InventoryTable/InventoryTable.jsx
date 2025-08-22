
import React, { useEffect, useRef, useState } from 'react';
import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
import {
    Badge,
    Card,
    Icon,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    TextInput,
    Title
} from "@tremor/react";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { dummyOperators } from "./dataset.jsx";
import { useDisclosure } from "@chakra-ui/react";
import AddOperator from "./AddOperator.jsx";
import { global_css } from "../../GlobalCss/GlobalCSS.js";
import toast from "react-hot-toast";
import Editopstions from "../EditFunctionality/Editopstions.jsx";
import SearchDialouge from "../SearchComponent/SearchDialouge.jsx";
import AlertBox from "../AlertBox/AlertBox.jsx";
import Nodatafound from "../NoDataFound/Nodatafound.jsx";
import LoadingSoS from "../LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
import CustomEditors from "../EditFunctionality/CustomEditors.jsx";
import { convertString } from "../commonFunctions/StringConversion.jsx";
import { useTranslation } from "react-i18next";
import { useAuth } from '../../Context/AuthInfo.jsx';

const InventoryTable = () => {
    const { user, token, profileInfo } = useAuth();
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tableData, setTableData] = useState(dummyOperators);
    const [bulkIds, setBulkIds] = useState([]);
    const [showedit, setshowedit] = useState(false);
    const [showeditindex, setshoweditindex] = useState(null);
    const [selecteditem, setselecteditem] = useState(null);
    const [actiontype, setactiontype] = useState(false);
    const [status, setStatus] = useState('');
    const [isOpenD, setIsOpenD] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [operatorForEdit, setOperatorForEdit] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [nodata, setNodata] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('success');
    const [showpopoupmsg, setshowpopupmsg] = useState('');
    const dropdownRef = useRef(null);

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

    const getaction = (e) => {
        if (e.type === 'edit') {
            GetOperatorForUpdate(selecteditem.id);
            onOpen();
        } else if (e.type === 'delete') {
            onAlertOpen();
            setAlertType('');
            setAlertText(t('areyousureDelOperators'));
            setAlertButtonText(t('yesDel'));
            setAlertButtonTextSecond(t('cancel'));
            setactiontype(false);
        }
    };

    const callbox = () => {
        setactiontype(false);
        onOpen();
    };

    const GetOperators = async () => {
        try {
            setTableData(dummyOperators);
            setNodata(dummyOperators.length <= 0);
            setLoader(false);
        } catch (error) {
            console.error('Error:', error);
            setLoader(false);
            setNodata(true);
            throw error;
        }
    };

    const GetOperatorForUpdate = async (id) => {
        try {
            const operator = dummyOperators.find(op => op.id === id);
            if (operator) {
                setOperatorForEdit(operator);
                setactiontype(true);
            } else {
                throw new Error('Operator not found');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to fetch operator');
            throw error;
        }
    };

    const deleteOperator = async (id) => {
        try {
            const index = dummyOperators.findIndex(op => op.id === id);
            if (index !== -1) {
                dummyOperators.splice(index, 1);
                await GetOperators();
                onAlertClose();
                setshowpopupmsg('Delete Success');
                setshowpopupstatus('success');
                setshowpopup(true);
                setTimeout(() => {
                    setshowpopup(false);
                }, 1500);
            } else {
                throw new Error('Operator not found');
            }
        } catch (error) {
            console.error('Error deleting operator:', error);
            setshowpopupmsg('Delete Failed');
            setshowpopupstatus('failed');
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 1500);
        }
    };

    const UpdateBulk = async () => {
        try {
            dummyOperators.forEach((op, index) => {
                if (selected.includes(op.id)) {
                    dummyOperators[index].status = status;
                }
            });
            await GetOperators();
            setBulkIds([]);
            onAlertClose();
            setshowpopupmsg('Update Success');
            setshowpopupstatus('success');
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 1500);
        } catch (error) {
            console.error('Error:', error);
            setshowpopupmsg('Update Failed');
            setshowpopupstatus('failed');
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 1500);
            throw error;
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setshoweditindex(null);
        }
    };

    useEffect(() => {
        setLoader(true);
        GetOperators();
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="border-none h-full w-full">
            <AddOperator
                isOpen={isOpen}
                onClose={onClose}
                actionType={actiontype}
                GetOperators={GetOperators}
                operatorForEdit={operatorForEdit}
            />
            <AlertBox
                isOpen={isAlertOpen}
                onOpen={onAlertOpen}
                onClose={onAlertClose}
                type={alertType}
                deleteId={selecteditem}
                text={alertText}
                buttonText={alertButtonText}
                seconDbuttonText={alertButtonTextSecond}
                exFunc={alertType === 'warning' ? UpdateBulk : deleteOperator}
            />
            {loader && <LoadingSoS />}
            {showpopoup && <Popnotification msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} />}
            {!nodata ? (
                <Card className="w-full h-full text-white mb-12" style={{ borderRadius: global_css.card_border_radius, backgroundColor: global_css.primary_card_bg, boxShadow: 'none' }}>
                    <div className="flex justify-between items-center mb-14">
                        <Title className="text-4xl">{t('operators')}</Title>
                        <div className="flex justify-end items-center gap-3 w-4/12">
                            <label style={{ border: '1px solid #595959', position: 'relative', display: 'inline-block', zIndex: '1' }} htmlFor="file-input" className="w-8/12 h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <span onClick={() => setFilterOpen(!filterOpen)} className="flex items-center justify-between p-0">
                                    <span className="flex items-center">
                                        <Icon size="sm" icon={SearchIcon} />{t('search')}
                                    </span>
                                    <span><FontAwesomeIcon icon={faChevronDown} /></span>
                                </span>
                                {filterOpen && <SearchDialouge setFilterOpen={setFilterOpen} setTableData={setTableData} type={'operator'} />}
                            </label>
                            <button onClick={() => { onOpen(); setactiontype(false); }} className="py-2 px-2 bg-[#27CF7A] text-white font-bold rounded rounded-1xl w-3/12">Add New</button>
                        </div>
                    </div>
                    <Table onClick={() => setFilterOpen(false)} className="mt-8 h-[60vh]">
                        <TableHead>
                            <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                                <TableHeaderCell style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', borderRight: '2px solid #303038' }}>
                                    <input checked={isAllSelected} onChange={handleSelectAll} type="checkbox" /> {t('serial')}
                                </TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('operators')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('operatorCode')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>{t('status')}</TableHeaderCell>
                                <TableHeaderCell style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>Action</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ minHeight: '300px', overflow: 'auto' }}>
                            {tableData?.map((item, index) => (
                                <TableRow key={index} style={{ borderColor: '#595959' }}>
                                    <TableCell>
                                        <input
                                            checked={selected.includes(item.id)}
                                            onChange={() => handleSelect(item.id)}
                                            type="checkbox"
                                            id={`my-checkbox-${index}`}
                                        />
                                        <span className="ml-5">{(index + 1).toString().padStart(2, '0')}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Text className="flex gap-3">
                                            <img style={{ height: '24px', width: '24px' }} src={item.logo} alt="" />
                                            <span>{item.name}</span>
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{item.code}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text className={item.status === 'not_available' ? "!text-red-600" : "!text-white"}>{convertString(item.status)}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            style={{ position: 'relative', width: "100%", cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                                            onClick={() => {
                                                setshowedit(index === showeditindex ? false : true);
                                                setshoweditindex(index === showeditindex ? null : index);
                                                setselecteditem(item);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                            {(showeditindex !== null) ? (
                                                <div style={{ position: 'absolute', width: '8rem', right: '50%', top: '1%', height: 'fit-content', display: (index === showeditindex) ? 'flex' : 'none' }}>
                                                    <CustomEditors getdata={getaction} selected={['edit', 'delete']} />
                                                </div>
                                            ) : ''}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="max-w-sm mt-5 flex items-center">
                        <select
                            style={{ border: '1px solid #595959' }}
                            className="w-full cursor-pointer bg-[#404040] h-10 hover:bg-[#545454] text-[#9CA3AF] py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                        >
                            <option value="">{t('selectStatus')}</option>
                            <option value="available">Available</option>
                            <option value="not_available">Not Available</option>
                        </select>
                        <Button
                            onClick={() => {
                                onAlertOpen();
                                setAlertType('warning');
                                setAlertText('Are you sure you want to change the status?');
                                setAlertButtonTextSecond('Cancel');
                                setAlertButtonText('Yes, Update');
                            }}
                            variant='outline'
                            style={{ border: "1px solid #27CF7A", color: '#27CF7A', marginTop: '-0.1%' }}
                            ml={3}
                        >
                            Apply
                        </Button>
                    </div>
                </Card>
            ) : (
                <Nodatafound btn_text={'Add Operator'} tittle_head={'No Operator List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onOpen} />
            )}
            <style jsx>{`
                input[type="checkbox"] {
                    appearance: none;
                    width: 15px;
                    height: 15px;
                    border: 2px solid #ddd;
                    border-radius: 3px;
                    background-color: transparent;
                }
                input[type="checkbox"]:checked {
                    background-color: #4CAF50;
                }
                .checkbox-box {
                    display: none;
                }
                ::-webkit-scrollbar {
                    width: 12px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: #999;
                    border-radius: 3px;
                }
                scrollbar {
                    width: 12px;
                }
                scrollbar-thumb {
                    background-color: #999;
                    border-radius: 3px;
                }
            `}</style>
        </div>
    );
};

export default InventoryTable;