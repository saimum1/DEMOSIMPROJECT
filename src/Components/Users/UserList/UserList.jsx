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
import CustomEditors from '../../EditFunctionality/CustomEditors.jsx';
import LoadingSoS from '../../LoadingScreen/LoadingSoS';
import Nodatafound from '../../NoDataFound/Nodatafound';
import axios from "axios";
import config from "../../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
import AlertBox from "../../AlertBox/AlertBox.jsx";
import AddnewUser from './AddnewUser.jsx';
import {convertString} from "../../commonFunctions/StringConversion.jsx";
import { useAuth } from '../../../Context/AuthInfo.jsx';
import {useTranslation} from "react-i18next";
import { global_css } from '../../../GlobalCss/GlobalCSS.js';


const UserList = () => {
    const { user, token } = useAuth();
    const {t} = useTranslation()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [preview , setPreview] = useState(false)
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [useerList,setuseerList]=useState([])
    const [userFroEdit,serUserForEdit]=useState({})
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
    console.log("ssssssssssss", preview)

    const handleSelect = (value) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((item) => item !== value);
            } else {
                return [...prevSelected, value];
            }
        });

        setIsAllSelected(selected.length === useerList.length);
    };

    const handleSelectAll = () => {
        setSelected(isAllSelected ? [] : useerList.map((option) => option.id));
        setIsAllSelected(!isAllSelected);
    };


    const getaction=(e)=>{
        console.log('action',selecteditem)
        if(e.type === 'edit'){
            console.log("seleceted",selecteditem)
            // GetSimForUpdate(selecteditem)


            setactiontype(true)
            onOpen()


        }else if(e.type === 'delete'){
                onAlertOpen();
                setAlertType('')
                setAlertText('Are you sure you want to delete this data?');
                setAlertButtonText(t('yesDel'))
                setAlertButtonTextSecond(t('cancel'))
                setactiontype(false)
        }else if(e.type === 'reset'){
            const emailParam = encodeURIComponent(selecteditem?.email);
            window.location.href = `/forgotpass?email=${emailParam}`;
        }else if(e.type === 'profile'){

            setPreview(true)

            setactiontype(true)
            onOpen()
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
        GetuseerList()
    }, []);



    const GetuseerList = async () => {
        try {
            setLoader(true)
            const response = await axios.get(`${config.apiUrl}/api/users`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);
            setuseerList(response.data.users)
            setNodata(response?.data?.users.length <= 0)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };



    const GetUserForUpdate = async (id) => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/users/${id.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:====', response);
            serUserForEdit(response.data.user)
            await setactiontype(true)
            await onOpen()
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${config.apiUrl}/api/users/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle successful deletion
            console.log('Operator deleted successfully');
           await GetuseerList()
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

    // const UpdateBulk = async () => {
    //     try {
    //
    //         const data ={
    //             simCardIds: selected,
    //             status: status.toLocaleLowerCase()
    //         }
    //         console.log("ssssssssssssssssssssssss", data)
    //         const response = await axios.put(`${config.apiUrl}/api/sim/update/bulk`, data);
    //         console.log(response)
    //         await GetuseerList()
    //         await onAlertClose()
    //         setsh  owpopupmsg('Update Success')
    //         setshowpopupstatus('success')
    //             setshowpopup(true)
    //         setTimeout(() => {
    //             setshowpopup (false)
    //
    //         }, 1500);
    //     } catch (error) {
    //         console.error('Error++++:', error);
    //         setshowpopupmsg('Update Failed')
    //         setshowpopupstatus('fail')
    //         setshowpopup(true)
    //         setTimeout(() => {
    //             setshowpopup(false)
    //
    //         }, 1500);
    //         throw error;
    //     }
    // };

 

const getdataforadd=(e)=>{
    if(actiontype === true){
        const updateduseerList = useerList.map(item => {
            if (item.uid === e.uid) {
                return e; // Replace the item with the new data
            }
            return item;
        });
        setuseerList(updateduseerList);
        setshowpopupmsg('Update Success')
        setshowpopupstatus('success')
        setshowpopup(true)
        setTimeout(() => {
            setshowpopup(false)

        }, 2500);
    }else{
        useerList.push(e)
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
  return (

    <div  className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px] p-1" >
    <AddnewUser  isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype}  getdata={GetuseerList} preview={preview} setPreview={setPreview}/>
    <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={deleteUser}/>
    {/* <LoadingSoS/> */}

    {loader &&  <LoadingSoS  /> }
    {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
   
   {!nodata?
    <Card className="bg-[#303038]  text-white h-full w-[100%] overflow-hidden" style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column'}}>
        <div className="flex justify-between items-center">
        <Title className="text-4xl">{t('userList')}</Title>
        <div className="flex justify-end items-center ">
             
                <button onClick={()=>callbox()} className="py-2 px-3.5 bg-[#27CF7A] text-white font-bold  rounded-[4px] ">Add New User</button>
            </div>
        </div>
        <Table className="mt-5  h-[80vh] w-[78vw]"  >
            <TableHead >
                <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:'red '}}>
                    <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}} ><input checked={isAllSelected}
                                                                                                                                             onChange={handleSelectAll} type="checkbox" /><span className="ml-2">UID</span> </TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('fullName')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('groupName')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('mobile')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('email')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('status')}</TableHeaderCell>
                    <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                </TableRow>
            </TableHead>
           
            <TableBody >
               
                {useerList?.map((item,index) => (
                    <TableRow key={item.id} style={{borderColor:'#595959'}}>
                 
      

                                    <TableCell className="my-component" style={{display:'flex',alignItems:'center',justifyContent:'flex-start',gap:'3px'}}>
                                        <input checked={selected.includes(item.uid)}
                                            onChange={() =>{ handleSelect(item.uid);}}
                                            type="checkbox"
                                            id={`my-checkbox-${index}`}/>
                                        <div>
                                            <p>
                                                <span 
                                                    className="uid"
                                                    onClick={() =>{ handleCopyUID(item.uid);setselcetdIndex(index)}} // Pass the UID to the function
                                                >
                                                    {/* {item.uid} */}
                                                    {item.uid}
                                                    <span className="tooltip">{item.uid}</span>
                                                </span>
                                            </p>
                                            {  (index === selcetdIndex && copied=== true)?  <p className="copied-message"> Copied!</p>:''} 
                                        </div>
                                    </TableCell>

                      

                        <TableCell>
                            <Text>{item.name}</Text>
                        </TableCell>

                        <TableCell>
                            <Text>
                                {item.group?.name}

                            </Text>
                        </TableCell>

                        <TableCell>
                            <Text>{item.mobile}</Text>
                        </TableCell>

                        <TableCell>
                            <Text>{item.email}</Text>
                        </TableCell>


                        <TableCell>
                          <Text>{convertString(item.status)}</Text>
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
    </Card>:<Nodatafound btn_text={'Add New User'}  tittle_head={'No User List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onbuttonclicked}/>}
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

export default UserList