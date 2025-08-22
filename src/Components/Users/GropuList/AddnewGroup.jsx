import React, {useState,useEffect} from 'react';
import {
    chakra,
    FormControl,
    FormLabel, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Input, background
} from "@chakra-ui/react";
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import axios from "axios";
import config from "../../../config.jsx";
import toast from "react-hot-toast";
import Popnotification from "../../PopNotification/Popnotification.jsx";
import TickForm from "../../TickForm/TickForm.jsx";
import StatusDropDown from "../StatusDropDown.jsx";
import {convertString, revertString} from "../../commonFunctions/StringConversion.jsx";
import {useTranslation} from "react-i18next";
import { useAuth } from '../../../Context/AuthInfo.jsx';

const AddnewGroup = ({isOpen, onClose ,action,getdata,data}) => {
    const { user , token ,profileInfo} = useAuth();

    const generateUniqueId = () => {
        const timestamp = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 1000000); // Change the upper limit based on your requirement
        return `${timestamp}${randomNumber}`;
    };
    const {t} = useTranslation()
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [groupName,setGroupName]=useState(true)
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [permission_module,setpermission_module]=useState([])
    const [datalist,setdatalist]=useState({
        
            group:'',
            role_permissions:[],
            role_permissionsid:[]
        
    })
    const[selectedlang,Setselectedlang]=useState(null)
    const[selected,SetSelected]=useState( false)

    
    
console.log("popop=====", selectedlang)
    

    const handleCheckboxChange = (permission) => {
        console.log("eewr",permission)
        const updatedPermissions = datalist?.role_permissions.includes(permission)
            ? datalist.role_permissions.filter(p => p !== permission)
            : [...datalist.role_permissions, permission];
            console.log("Updated permissions:", updatedPermissions,datalist);
            setdatalist(prevState => ({
            ...prevState,
            role_permissions: updatedPermissions
        }));

        console.log("group extraction",updatedPermissions)
    };


    const handleStatusChange = (isChecked) => {

        setdatalist(prevState => ({
            ...prevState,
            status: isChecked
        }));
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
    };


    // const getSnakeCaseNames = (a, b) => {
    //     return b
    //       .filter(item => a.includes(item.id))
    //       .map(item => item.name.toLowerCase().replace(/\s+/g, "_"));
    //   };


    // const getSnakeCaseNames = (a, b) => {
    //     return b
    //       .filter(item => a.includes(item.id)) // Filter items where id exists in array 'a'
    //       .map(item => 
    //         item.name
    //           .toLowerCase() // Convert to lowercase
    //           .replace(/\s*(?:and|&)\s*/g, "_") // Replace "and" or "&" with "_"
    //           .replace(/\s+/g, "_") // Replace remaining spaces with "_"
    //       );
    //   };



      const getSnakeCaseNames = (a, b) => {
        return b
          .filter(item => a.includes(item.id)) // Filter items where id exists in array 'a'
          .map(item => 
            item.name
              .toLowerCase() // Convert to lowercase
              .replace(/\s*(?:and|&)\s*/g, "_") // Replace "and" or "&" with "_"
              .replace(/\s+/g, "_") // Replace remaining spaces with "_"
          );
      };
      
      
      // Output: ['sales_activation', 'sales_support', 'hello_play']
      

    // const getSnakeCaseNames = (a, b) => {
    //     return Array.from(
    //       b
    //         .filter(item => a.includes(item.id)) // Filter items where id exists in array 'a'
    //         .flatMap(item => 
    //           item.name
    //             .split(/\s*(?:and|&)\s*/i) // Split on "and" or "&", ignoring spaces and case
    //             .map(word => word.toLowerCase().replace(/\s+/g, "_")) // Convert to snake_case
    //         )
    //         .reduce((uniqueWords, word) => uniqueWords.add(word), new Set()) // Remove duplicates
    //     );
    //   };

    const SaveOperator = async () => {
        if (datalist.group ===''){
            setGroupName(false)
        }else{

        try {
            const data = {
                name : datalist.group,
                status : revertString(selectedlang?.name),
                permissionIds : datalist?.role_permissions
            }
            console.log("popop=====1", data)
            console.log("popop=====2", selectedlang.name)
            const response = await axios.post(`${config.apiUrl}/api/group`, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:user:===', response);
            await getdata()
            Setselectedlang({})
            setdatalist({


                group:'',
                role_permissions:[],


            })
            onClose()

            setshowpopupmsg('Save Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg('Save Failed')
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }
        }
    }


    const PErmissionList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/permission`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Responsepermission:', response);
            setpermission_module(response.data.permissions)

        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    };


const UpdateOperator = async () => {
    if (datalist.group ===''){
        setGroupName(false)
    }else{
    try {


        const datak = {
            name : datalist.group,
            status : revertString(selectedlang?.name),
            permissionIds :datalist?.role_permissions
        }
        console.log("========getdata", datalist)
        const response = await axios.put(`${config.apiUrl}/api/group/${data?.group.id}`, datak,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Response:user:===', response);
        await getdata()
        Setselectedlang({})
        setdatalist({


            group:'',
            role_permissions:[],


        })
        onClose()

        setshowpopupmsg('Update Success')
        setshowpopupstatus('success')
        setshowpopup(true)
        setTimeout(() => {
            setshowpopup(false)

        }, 1500);
    } catch (error) {
        console.error('Error++++:', error);
        setshowpopupmsg('Update Failed')
        setshowpopupstatus('fail')
        setshowpopup(true)
        setTimeout(() => {
            setshowpopup(false)

        }, 1500);
        throw error;
    }
    }
    };






    useEffect(() => {
    
        if (action && data) {
            SetSelected(convertString(data?.group.status))
            const ids = data?.group.permissions.map((obj) => obj.uniqueCode);
            setdatalist(prevState => ({
                ...prevState,
                group: data?.group.name,
                role_permissions: ids,
                // status: data?.group.status.toLowerCase(),
                // code:data?.code
            }));
        }else{
            setdatalist({


                group:'',
                role_permissions:[],



            })
            setGroupName(true)
            Setselectedlang({})
        }
        PErmissionList()
    }, [action,data]);

    return (
        <div>
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            <Modal
                isOpen={isOpen}
                onClose={onClose}


            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader >{action ?'Edit Group':t('addNewGroup')} </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>{t('groupName')}</FormLabel>
                            <Input style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }} onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            group: e.target.value
                                                             }))}
                                   value={datalist.group}
                                   placeholder={t('enterGroupName')}/>
                            {!groupName? <p style={{color : 'red', textAlign : 'center'}}>Group name is required</p> : null}
                        </FormControl>

                   
                  
                     

                        <FormControl className="mt-5" >
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',backgroundColor:''}}>{t('modulePermission')}</FormLabel>
                                


                                <div  style={{width: '100%',gap:'.5rem',display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',transition:'all 300ms',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',cursor:'pointer',backgroundColor:'', maxHeight:"150px", overflow:'scroll'}}>

                                {permission_module?.filter(n=>n.name !=='Settings').map((n,index)=>{
                                    return (
                                        <div   style={{width:'100%',gap:"4px" ,height:'100%', transition: 'all 300ms',display:'flex' ,alignItems:'center' ,justifyContent:'flex-start'}}
                                    
                                            >
                                               <span style={{display:'flex',justifyContent:'center',textAlign:'center',alignItems:'center',height:'5px',width:'12px'}}><input type="checkbox" checked={datalist?.role_permissions.includes(n.uniqueCode)} onChange={() => handleCheckboxChange(n.uniqueCode)} style={{cursor:'pointer'}}/></span>
                              
                                                <span style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:"12px"}}>{n.name}</span>
                                            </div>
                                    )
                                })}

                                </div>    
                           
                        </FormControl>



                        {/*<FormControl className="mt-5">*/}
                        {/*    <FormLabel style={{fontWeight :'bold'}}>Status</FormLabel>*/}

                        {/*    <label style={{border : '1px solid #595959',transition:'all 300ms'}} className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex gap-2 items-center">*/}
                        {/*        <input*/}
                        {/*            type="checkbox"*/}
                        {/*            checked={datalist.status}*/}
                        {/*            onChange={(e) => handleStatusChange(e.target.checked)}*/}
                        {/*            style={{ display: 'none' }}*/}
                        {/*        />*/}
                        {/*        <div style={{width:'18px',height:'18px'}}>*/}
                        {/*            <TickForm  status={datalist.status}/>*/}
                        {/*        </div>*/}
                        {/*        <span>Available</span>*/}
                        {/*    </label>*/}
                        {/*</FormControl>*/}

                        <FormControl >
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('status')}</FormLabel>
                            <StatusDropDown selected={selected} SetSelected={SetSelected} action={action} selectedlang={selectedlang} Setselectedlang={Setselectedlang} option={'group'}/>


                        </FormControl>

                    </ModalBody>

                    <ModalFooter className="mt-5">

                        <Button  onMouseDown={(e) => {
                    e.target.style.backgroundColor = '#999999'; 
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = ''; 
                  }} colorScheme='white' variant='outline' onClick={onClose}>Cancel</Button>
                        <Button  onMouseDown={(e) => {
                                    e.target.style.backgroundColor = '#1EAB5E'; 
                                }}
                                onMouseUp={(e) => {
                                    e.target.style.backgroundColor = '#27CF7A'; 
                                }}  onClick={action && data? UpdateOperator : SaveOperator} style={{background: "#27CF7A", color: 'white'}} ml={3}>
                            {action && data? 'Update' : 'Save'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <style jsx>
                {
                    `
                      .custom-file-upload {
                        padding: 4px 2px;
                        cursor: pointer;
                        //background-color: #f5f5f5;
                        font-size: 15px;
                      }

                      //.custom-file-upload:hover {
                      //  background-color: red;
                      //}

                      .custom-file-upload:active {
                        background-color: white;
                        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
                      }

                      input:focus{
                        outline: none;
                      }
                        
                    
                    `
                }

            </style>
        </div>
    );
};
export default AddnewGroup