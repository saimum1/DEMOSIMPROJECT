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
    Input, background,
    EditableTextarea
} from "@chakra-ui/react";
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import axios from "axios";
import config from "../../config.jsx";
import { v4 as uuidv4 } from 'uuid';
import {Textarea, TextInput} from "@tremor/react";
import toast from "react-hot-toast";
import moment from 'moment';
import StatusDropDown from '../Users/StatusDropDown.jsx';
import { useAuth } from '../../Context/AuthInfo.jsx';


const AddNewTransaction = ({isOpen, onClose ,action,getdata,data, preview, setPreview}) => {

 
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
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>Transection ID</FormLabel>
                            <Input disabled={true} style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }} 
                                   value={datalist.uid}
                                  />
                        </FormControl>

                        <FormControl >
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>Date</FormLabel>
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

                        </div>


                        <FormControl >
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>User</FormLabel>
                            <StatusDropDown selected={selected} SetSelected={SetSelected} action={action} selectedlang={selectedlang} Setselectedlang={Setselectedlang}/>

                         
                        </FormControl>


                    





                        <div className="flex items-center gap-2 justify-between mt-5">

                       
                          

                      
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>Phone</FormLabel>
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

                        <FormControl >
                            <FormLabel style={{fontWeight :'bold'}}>Location</FormLabel>
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

                        </div>


                        <div className="flex items-center gap-2 justify-between mt-5">

                       
                          

                      
<FormControl>
    <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>Due</FormLabel>
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

<FormControl >
    <FormLabel style={{fontWeight :'bold'}}>Communication</FormLabel>
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

</div>

<FormControl >
    <FormLabel style={{fontWeight :'bold'}}>Payment</FormLabel>
    <Input type='number' style={{
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



<FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>Note</FormLabel>
                            <Textarea
                              style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',
                                // height:'9rem'
                            }} onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            offer_name: e.target.value
                                                             }))}
                                   value={datalist.full_name}
                                   placeholder='Enter offer details ...'/>
                        </FormControl>

                   


                    </ModalBody>

                    <ModalFooter >

                        {!preview?<><Button  onMouseDown={(e) => {
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

export default AddNewTransaction