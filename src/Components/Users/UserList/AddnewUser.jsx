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

import { v4 as uuidv4 } from 'uuid';
import {TextInput} from "@tremor/react";
import toast from "react-hot-toast";
import StatusDropDown from "../StatusDropDown.jsx";
import Popnotification from "../../PopNotification/Popnotification.jsx";
import moment from 'moment';
import {convertString, revertString} from "../../commonFunctions/StringConversion.jsx";
import {useTranslation} from "react-i18next";
import { useAuth } from '../../../Context/AuthInfo.jsx';

const AddnewUser = ({isOpen, onClose ,action,getdata,data, preview, setPreview}) => {

    const {t} = useTranslation()
       const { user , token ,profileInfo} = useAuth();
   
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [permission_module,setpermission_module]=useState(['Sim Inventory','Offer Center','Sales & Activation','User and Operators','Settings','Reports','Financial Statement','Courier'])
    const [grouplistx,setgrouplistx]=useState([])
    const[selectedlang,Setselectedlang]=useState(null)
    const[selected,SetSelected]=useState( false)

    const [datalist,setdatalist]=useState({
        
        uid:uuidv4().slice(-8),
        full_name:'',
        group_name:'',
        mobile:'',
        email:'',
        dateOfBirth :'',
        username:'',
        password:'',

        
    })
    console.log('grrouuuuuppppp', preview);
    

    

    const handleCheckboxChange = (permission) => {
        console.log("eewr",permission)
        const updatedPermissions = datalist.role_permissions.includes(permission)
            ? datalist.role_permissions.filter(p => p !== permission)
            : [...datalist.role_permissions, permission];
            console.log("Updated permissions:", updatedPermissions);
            setdatalist(prevState => ({
            ...prevState,
            role_permissions: updatedPermissions
        }));
    };


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
    };

    // const SaveOperator = async () => {
    //     getdata(datalist)
    //     onClose()
    //     setdatalist({
    //
    //
    //         uid:uuid,
    //         full_name:'',
    //         group_name:'',
    //         mobile:'',
    //         email:'',
    //         date:'',
    //         status:''
    //
    //
    //     })
    // };


    const SaveOperator = async (logo) => {
        try {
            const data = {
                        uid: datalist.uid,
                        name:datalist.full_name,
                        groupId:datalist.group_name,
                        mobile:datalist.mobile,
                        email: datalist.email,
                        dateOfBirth: new Date(datalist.dateOfBirth).toISOString(),
                        status:revertString(selectedlang?.name),
                        username : datalist.username,
                        password : datalist.password

            }
            console.log("================data", data)

            const response = await axios.post(`${config.apiUrl}/api/users`, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:user:===', response);
            await getdata()
            onClose()
            setdatalist({

                uid:uuidv4().slice(-8),
                full_name:'',
                group_name:'',
                mobile:'',
                email:'',
                dateOfBirth:'',
                username : '',
                password : ''


            })
            Setselectedlang({})
            setshowpopupmsg('Save Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg(error.response.data.error)

            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }
    };
// const UpdateOperator = async () => {
//         try {


//             const data = {
//                 "name": operatorName,
//                 'code': operatorCode,
//                 "logo": logo,
//                 "status": operatorStatus ? 'available' : ''
//             }

//             const response = await axios.put(`${config.apiUrl}/api/operator/${operatorForEdit.id}`, data);
//             console.log('Response:', response);
//             toast.success(response.statusText)
//             await GetOperators()
//             onClose()
//             setOperatorStatus(false)
//             setOperatorCode('')
//             setOperatorName('')
//             setSelectedFile(null)
//             setshowpopupmsg('Update Success')
//             setshowpopupstatus('success')
//             setshowpopup(true)
//             setTimeout(() => {
//                 setshowpopup(false)

//             }, 1500);


//         } catch (error) {
//             console.error('Error++++:', error);
//             setshowpopupmsg('Update Failed')
//             setshowpopupstatus('fail')
//             setshowpopup(true)
//             setTimeout(() => {
//                 setshowpopup(false)

//             }, 1500);
//             throw error;
//         }
//     };



//     useEffect(() => {
//
//         if (action && data) {
//             setdatalist(prevState => ({
//                 ...prevState,
//                 uid:data?.uid,
//                 full_name:data?.full_name,
//                 group_name:data?.group_name,
//                 mobile:data?.mobile,
//                 email:data?.email,
//                 date:data?.date,
//                 status:data?.status
//             }));
//         }else{
// console.log("sfsdfsdf")
//             setdatalist({
//
//                 uid:uuidv4().slice(0,8),
//                 full_name:'',
//                 group_name:'',
//                 mobile:'',
//                 email:'',
//                 date:'',
//                 status:''
//
//
//             })
//         }
//     }, [isOpen, onClose ,action,getdata,data]);
    useEffect(() => {
        if (action) {
            console.log("kkkk", data)
            SetSelected(convertString(data?.status))
            setdatalist(prevState => ({
                ...prevState,
                email: data?.email,
                uid: data?.uid,
                mobile: data?.mobile,
                full_name: data?.name,
                group_name: data?.groupId,
                username: data?.username,
                password: '',
                dateOfBirth: moment(data?.dateOfBirth).format('YYYY-MM-DD'),

            }))


        }else{
            setdatalist({

                uid:uuidv4().slice(-8),
                full_name:'',
                group_name:'',
                mobile:'',
                email:'',
                dateOfBirth:'',
                username : '',
                password : ''


            })
            Setselectedlang({})
        }
        GetgroupList()
    }, [action, data]);



    const GetgroupList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/group`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);
            setgrouplistx(response.data.allGroups)


        } catch (error) {
            console.error('Error++++:', error);

            throw error;
        }
    };


    const UpdateOperator = async () => {
        try {


            const datak = {
                uid: datalist.uid,
                name:datalist.full_name,
                groupId:datalist.group_name,
                mobile:datalist.mobile,
                email: datalist.email,
                dateOfBirth: new Date(datalist.dateOfBirth).toISOString(),
                status:revertString(selectedlang?.name),
                username : datalist.username,
                password : datalist.password

            }
            const response = await axios.put(`${config.apiUrl}/api/users/${data.id}`, datak,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);
            await getdata()
            onClose()
            setdatalist({

                uid:uuidv4().slice(-8),
                full_name:'',
                group_name:'',
                mobile:'',
                email:'',
                dateOfBirth:'',
                username : '',
                password : ''


            })
            Setselectedlang({})
            setshowpopupmsg('Update Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);


        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg(error.response.data.error)
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }
    };


    return (
        <div>
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            <Modal
                isOpen={isOpen}
                onClose={onClose}


            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader >{action ?'Edit User':'Add new User'} </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <div className="flex items-center gap-2 justify-between">

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>UID <span style={{padding:'0.1rem .4rem',color:'white',backgroundColor:global_css.primary_btn,borderRadius:'10px',fontSize:'11px'}}>Auto</span></FormLabel>
                            <Input disabled={true} style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }} 
                                   value={datalist.uid}
                                  />
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>{t('group')}</FormLabel>
                            <select onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            group_name: e.target.value
                                                             }))} value={datalist?.group_name} style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-[.55rem] px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                                <option  value="">
                                    select group
                                </option>

                                  {grouplistx?.map((n, index) => (
                                        <option key={index} value={n.group?.id}>
                                            {n.group?.name}
                                        </option>
                                    ))}
                                   
                            </select>
                        </FormControl>

                        </div>


                        <FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold'}}>{t('fullName')}</FormLabel>
                            <Input style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }} onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            full_name: e.target.value
                                                             }))}
                                   value={datalist.full_name}
                                   placeholder='Enter full name'/>
                        </FormControl>





                        <div className="flex items-center gap-2 justify-between mt-5">

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>{t('email')}</FormLabel>
                                   <Input type='email' style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                    }} onChange={(e) => setdatalist(prevState => ({
                                                                ...prevState,
                                                                email: e.target.value
                                                                }))}
                                    value={datalist.email}
                                        placeholder='Enter email '/>
                        </FormControl>

                      
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>{t('mobile')}</FormLabel>
                                   <Input type='text' style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                    }} onChange={(e) => setdatalist(prevState => ({
                                                                ...prevState,
                                                                mobile: e.target.value
                                                                }))}
                                    value={datalist.mobile}
                                        placeholder='Enter mobile '/>
                        </FormControl>

                        </div>



                        <div className="flex items-center gap-2 justify-between mt-5" style={{backgroundColor:'',width:'100%',}}>
                        <FormControl >
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>{t('dateOfBirth')}</FormLabel>
                            <Input name='entry_date' type='date' style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',fontSize:'13px'
                                
                            }}  onChange={(e) => setdatalist(prevState => ({
                                ...prevState,
                                dateOfBirth: e.target.value
                                }))}    value={datalist.dateOfBirth} />
                        </FormControl>

                        <FormControl >
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>{t('status')}</FormLabel>
                            <StatusDropDown selected={selected} SetSelected={SetSelected} action={action} selectedlang={selectedlang} Setselectedlang={Setselectedlang}/>

                         
                        </FormControl>

                    </div>
                        {preview? null : <FormControl style={{marginTop:'5%'}}>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>Username & Password Type</FormLabel>
                            <div style={{display : 'flex', gap : '5%'}}>
                            <div>
                                <label className="checkbox-container">
                                    <input checked={true} type="checkbox"/>
                                    <span className="checkbox-checkmark"></span>
                                </label>

                                <span>{t('manual')}</span>
                            </div>          <div>
                                <label className="checkbox-container">
                                    <input disabled type="checkbox"/>
                                    <span className="checkbox-checkmark"></span>
                                </label>

                                <span>{t('automatic')}</span>
                            </div>
                            </div>
                        </FormControl>}

                        {preview? null :  <div className="flex items-center gap-2 justify-between mt-5" style={{backgroundColor:'',width:'100%',}}>
                        <FormControl >
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>{t('userName')}</FormLabel>
                            <Input name='entry_date' type='text' style={{
                                outline: 'none !important',boxShadow: 'none',
                                border : '1px solid #595959',
                                 background : '#404040',fontSize:'13px'

                            }}  onChange={(e) => setdatalist(prevState => ({
                                ...prevState,
                                username: e.target.value
                                }))} placeholder="username"    value={datalist.username} />
                        </FormControl>

                        <FormControl >
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>Password </FormLabel>
                            <TextInput name="password" type='password' className="rounded-[8px] border-zinc-600 bg-[#444444]" style={{height:'40px',fontFamily:'inter',width:'100%',color:'rgba(255, 255, 255, 0.85)', outline: 'none !important'}} placeholder="password"  onChange={(e) => setdatalist(prevState => ({
                                ...prevState,
                                password: e.target.value
                            }))}    value={datalist.password}/>


                        </FormControl>

                    </div>}
                    </ModalBody>

                    <ModalFooter >

                        {!preview?<><Button  onMouseDown={(e) => {
                                e.target.style.backgroundColor = '#999999'; 
                            }}
                            onMouseUp={(e) => {
                                e.target.style.backgroundColor = ''; 
                            }} colorScheme='white' variant='outline' onClick={onClose}>{t('cancel')}</Button>
                                    <Button  onMouseDown={(e) => {
                                                e.target.style.backgroundColor = '#1EAB5E'; 
                                            }}
                                            onMouseUp={(e) => {
                                                e.target.style.backgroundColor = '#27CF7A'; 
                                            }}  onClick={action? UpdateOperator : SaveOperator} style={{background: "#27CF7A", color: 'white'}} ml={3}>
                                        {action?'Update' : 'Save'}
                        </Button></>
                            :
                            <Button  onMouseDown={(e) => {
                            e.target.style.backgroundColor = '#1EAB5E';
                        }}
                        onMouseUp={(e) => {
                            e.target.style.backgroundColor = '#27CF7A';
                        }}  onClick={() => setPreview(false)} style={{background: "#27CF7A", color: 'white'}} ml={3}>
                        Edit
                    </Button>}

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

                      input[type="checkbox"] {
                        opacity: 0; /* Hide the visually */
                        position: absolute; /* Remove from layout */
                      }
                      .checkbox-container {
                        display: inline-block;
                        position: relative;
                        padding-left: 25px; /* Adjust for checkbox size */
                      }

                      .checkbox-checkmark {
                        position: absolute;
                        top: -14px;
                        left: 0.5px;
                        height: 15px; /* Adjust for checkbox size */
                        width: 15px; /* Adjust for checkbox size */
                        border: 1px solid #ccc; /* Adjust border color */
                        border-radius: 3px;
                      }

                      input[type="checkbox"]:checked + .checkbox-checkmark {
                        background-color: #27CF7A; /* Checked state color */
                      }



                    `
                }

            </style>
        </div>
    );
};
export default AddnewUser