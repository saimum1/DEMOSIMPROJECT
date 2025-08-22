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
import AddnewGroup from './AddnewGroup.jsx';
import {revertString} from "../../commonFunctions/StringConversion.jsx";
import {useTranslation} from "react-i18next";
import { useAuth } from '../../../Context/AuthInfo.jsx';

const GroupList = () => {
        const { user , token ,profileInfo} = useAuth();
    
    const {t} = useTranslation()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [groupList,setgroupList]=useState([{
        group:'User Management',
        role_permissions:['Sim Inventory', 'User and Operators', 'Agent'],
        status:'active',
        code:1
    },{
        group:'Sim Manage',
        role_permissions:['Sim Inventory', 'User and Operators'],
        status:'active',
        code:2
    },{
        group:'Agent Manage',
        role_permissions:['User and Operators', 'Agent'],
        status:'active',
        code:3
    },{
        group:'Sim Manage',
        role_permissions:['Sim Inventory', 'User and Operators', 'Agent'],
        status:'active',
        code:4
    }])
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
    console.log("ssssssssssss", status)

    const handleSelect = (value) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((item) => item !== value);
            } else {
                return [...prevSelected, value];
            }
        });

        setIsAllSelected(selected.length === groupList.length);
    };

    const handleSelectAll = () => {
        setSelected(isAllSelected ? [] : groupList.map((option) => option.id));
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
            console.log("seleceted===",selecteditem)
            onAlertOpen();
            setAlertType('')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText(t('yesDel'))
            setAlertButtonTextSecond(t('cancel'))
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




    useEffect(() => {
        // setLoader(true)
        GetgroupList()
    }, []);



    const GetgroupList = async () => {
        try {
            setLoader(true)
            const response = await axios.get(`${config.apiUrl}/api/group`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);
            setgroupList(response.data.allGroups)
            setNodata(response?.data?.allGroups.length <= 0)
            setLoader(false)

        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false)
            throw error;
        }
    };



    const GetSimForUpdate = async (id) => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/group/${id.id}`,{
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
    const deleteGroup = async (id) => {
        try {
            console.log("wsdsdsds=============================", id)
            await axios.delete(`${config.apiUrl}/api/group/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle successful deletion
            console.log('Group deleted successfully', id);
           await GetgroupList()
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
    //         await GetgroupList()
    //         await onAlertClose()
    //         setshowpopupmsg('Update Success')
    //         setshowpopupstatus('success')
    //         setshowpopup(true)
    //         setTimeout(() => {
    //             setshowpopup(false)
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
        const updatedGroupList = groupList.map(item => {
            if (item.code === e.code) {
                return e; // Replace the item with the new data
            }
            return item;
        });
        setgroupList(updatedGroupList);
        setshowpopupmsg('Update Success')
        setshowpopupstatus('success')
        setshowpopup(true)
        setTimeout(() => {
            setshowpopup(false)

        }, 2500);
    }else{
        groupList.push(e)
        setshowpopupmsg('Data added successfully')
        setshowpopupstatus('success')
        setshowpopup(true)
        setTimeout(() => {
            setshowpopup(false)

        }, 2500);
    }
 
}
const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  return (

    <div  className="flex justify-center h-full w-full items-center md:items-start bg-[#303038]  rounded-[7px]" >
    <AddnewGroup  isOpen={isOpen} onClose={onClose} data={selecteditem} action={actiontype}  getdata={GetgroupList}/>
    <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem?.group} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={deleteGroup}/>
    {/* <LoadingSoS/> */}

    {loader &&  <LoadingSoS  /> }
    {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
   
   {!nodata?
    <Card className="bg-[#303038]  text-white h-full w-[100%]" style={{border:'none',borderStyle:'none',boxShadow:'none',gap:'2rem',display:'flex',flexDirection:'column'}}>
        <div className="flex justify-between items-center">
        <Title className="text-4xl">{t('groupList')}</Title>
        <div className="flex justify-end items-center ">
             
                <button onClick={()=>callbox()} className="py-2 px-3.5 bg-[#27CF7A] text-white font-bold  rounded-[4px]">{t('addNewGroup')}</button>
            </div>
        </div>
        <Table className="mt-5 h-[80vh]">
            <TableHead>
                <TableRow className="!bg-[#444444] !rounded !rounded-1xl" style={{margin:'0px 4px',backgroundColor:'red'}}>
                    <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                             onChange={handleSelectAll} type="checkbox"/> {t('serial')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('group')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('rolePermission')}</TableHeaderCell>
                    <TableHeaderCell style={{borderRight:'2px solid #303038'}}>{t('status')}</TableHeaderCell>
                    <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                </TableRow>
            </TableHead>
           
            <TableBody  >
               
                {groupList?.map((item,index) => (
                    <TableRow key={item.group.id} style={{borderColor:'#595959'}}>
                        <TableCell>
                            <input checked={selected.includes(item.group.id)}
                                   onChange={() => handleSelect(item.group.id)}
                                   type="checkbox"
                                   id={`my-checkbox-${index}`}/>
                            <span className="ml-2">{(index + 1).toString().padStart(2, '0')}</span>
                        </TableCell>

                      

                        <TableCell>
                            <Text>{item.group?.name}</Text>
                        </TableCell>
                     

                        {/* <TableCell>
                            <Text style={{display:'flex', justifyContent:'center',alignItems:'center',gap:'5px',width:'2rem',height:'auto'
                            }}>{item?.group?.permissions?.map((n,key)=>{
                                return (<span> {n.name} {(item?.permissions?.length - 1) !== key?<span>,</span>:''}</span> )
                            })}</Text>
                        </TableCell> */}


<TableCell style={{ width: '40%', padding: '8px' }}>
  <Text
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
      width: '100%',
      height: 'auto',
      textAlign: 'center',
    }}
  >
    {item?.group?.permissions &&
      chunkArray(item.group?.permissions?.map((n) => n.name), 7).map((chunk, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '5px' }}>
          {chunk.map((word, wordIndex) => (
            <span key={wordIndex}>
              {word}
              {wordIndex < chunk.length - 1 && ','}
            </span>
          ))}
        </div>
      ))}
  </Text>
</TableCell>




                        <TableCell>
                          <Text className={item?.group?.status? revertString(item?.group?.status)==='inactive'? "!text-red-600" : "!text-white" : ''}>{item.group.status}</Text>
                        </TableCell>

                        <TableCell>
                            <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index === showeditindex? false :true);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                {showedit &&  <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%',zIndex:'9999999' ,height:'4rem',display:( index === showeditindex) ?'flex':'none'}}>
                                    <Editopstions
                                        getdata={getaction} edittext={'Edit'}/>

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
    </Card>:<Nodatafound btn_text={t('addNewGroup')}  tittle_head={'No Group List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={onbuttonclicked}/>}
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


        `}
    </style>
</div>
  
    )


}

export default GroupList