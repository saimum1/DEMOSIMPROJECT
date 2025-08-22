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
    Input, background, Textarea
} from "@chakra-ui/react";
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import axios from "axios";
import config from "../../config.jsx";
import OperatorDropDown from '../CustomDropDown/OperatorDropDown.jsx';
import StatusDropDown from "../Users/StatusDropDown.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
import moment from "moment";
import {convertString, revertString} from "../commonFunctions/StringConversion.jsx";
import { useAuth } from '../../Context/AuthInfo.jsx';
import {useTranslation} from "react-i18next";

const AddnewOfferCenter = ({isOpen, onClose ,action,getdata, data}) => {
    const {t} = useTranslation()
 
    const { user, token } = useAuth();
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [permission_module,setpermission_module]=useState(['Sim Inventory','Offer Center','Sales & Activation','User and Operators','Settings','Reports','Financial Statement','Courier'])
    const [grouplistx,setgrouplistx]=useState(['Sales','Admin','Sales & Activation','Account','Marketing'])
    const[clicked,setclicked]=useState(false)

    const [datalist,setdatalist]=useState({
        
        operator:'',
        offer_details:'',
        default_price:'',
        agent_price:'',
        entry_date:'',
        iban:null,
        status:'',
        offer_name:'',
        offer_valid_for:'',
        cost_per_month:'',
        total_recharge:'',
        free_internet_pack:'',
        free_minutes_for_local_operator:'',
        free_minutes_for_local_international:'',
        unlimited_minutes_to:'',
        international_minutes_valid_for:'' ,
        others_information:''


          
        
    })


    const[selectedOperator,SetselectedOperator]=useState({})

    const[selectedlang,Setselectedlang]=useState(null)
    const[selected,SetSelected]=useState( false)
console.log("ppppppppppppppp", selectedlang)
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


    const handleStatusChange = (isChecked) => {
        const newStatus = isChecked ? 'active' : 'inactive';
        setdatalist(prevState => ({
            ...prevState,
            status: newStatus
        }));
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
    };



    const convertToBoolean = (str) => {
        if (str === 'true') return true;
        if (str === 'false') return false;
        if (str === '') return '';
        return str; 
      };

    const SaveOperator = async () => {
        try {
            const data = {
                operatorId: selectedOperator.id,
                offerDetails : datalist.offer_name,
                defaultPrice : parseInt(datalist.default_price),
                agentPrice : parseInt(datalist.agent_price),
                entryDate : new Date(datalist.entry_date).toISOString(),
                iban :convertToBoolean(datalist.iban),
                status : revertString(selectedlang?.name),
                offerName : datalist.offer_name,
                offerValidFor : datalist.offer_valid_for,
                costPerMonth : datalist.cost_per_month,
                totalRecharge : datalist.total_recharge,
                freeInternetPack : datalist.free_internet_pack,
                freeMinutesForLocalOperator : datalist.free_minutes_for_local_operator,
                freeMinutesForLocalInternational : datalist.free_minutes_for_local_international,
                unlimitedMinutesTo : datalist.unlimited_minutes_to,
                internationalMinutesValidFor : datalist.international_minutes_valid_for,
                othersInformation : datalist.others_information
            }
            console.log("================data", data)

            const response = await axios.post(`${config.apiUrl}/api/offer`, data,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Response:user:===', response);
            await getdata()
            onClose()
            setdatalist({

                operator:'',
                offer_details:'',
                default_price:'',
                agent_price:'',
                entry_date:'',
                iban:'',
                status:'',
                offer_name:'',
                offer_valid_for:'',
                cost_per_month:'',
                total_recharge:'',
                free_internet_pack:'',
                free_minutes_for_local_operator:'',
                free_minutes_for_local_international:'',
                unlimited_minutes_to:'',
                international_minutes_valid_for:'' ,
                others_information:''
            })
            Setselectedlang({})
            SetselectedOperator({})
            await getdata()
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
    };

    const handleUpdate = async () => {
        try {
            const datak = {
                operatorId: selectedOperator.id,
                offerDetails : datalist.offer_name,
                defaultPrice : parseInt(datalist.default_price),
                agentPrice : parseInt(datalist.agent_price),
                entryDate : new Date(datalist.entry_date).toISOString(),
                iban : convertToBoolean(datalist.iban),
                status : revertString(selectedlang?.name),
                offerName : datalist.offer_name,
                offerValidFor : datalist.offer_valid_for,
                costPerMonth : datalist.cost_per_month,
                totalRecharge : datalist.total_recharge,
                freeInternetPack : datalist.free_internet_pack,
                freeMinutesForLocalOperator : datalist.free_minutes_for_local_operator,
                freeMinutesForLocalInternational : datalist.free_minutes_for_local_international,
                unlimitedMinutesTo : datalist.unlimited_minutes_to,
                internationalMinutesValidFor : datalist.international_minutes_valid_for,
                othersInformation : datalist.others_information
            }
            console.log("================data", data)

            const response = await axios.put(`${config.apiUrl}/api/offer/${data.id}`, datak,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Response:', response);


            setdatalist({

                operator:'',
                offer_details:'',
                default_price:'',
                agent_price:'',
                entry_date:'',
                iban:'',
                status:'',
                offer_name:'',
                offer_valid_for:'',
                cost_per_month:'',
                total_recharge:'',
                free_internet_pack:'',
                free_minutes_for_local_operator:'',
                free_minutes_for_local_international:'',
                unlimited_minutes_to:'',
                international_minutes_valid_for:'' ,
                others_information:''
            })
            Setselectedlang({})
            SetselectedOperator({})
            setshowpopupmsg('Updated Successfully');
            setshowpopupstatus('success');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            onClose();
            await getdata()
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

    };

    useEffect(() => {
    
        if (action && data) {
            SetSelected(data.status)
            SetselectedOperator(data.operator)
            setdatalist(prevState => ({
                ...prevState,

                operator:data.operator.id,
                offer_details:data.offerDetails,
                default_price:data.defaultPrice,
                agent_price:data.agentPrice,
                entry_date:moment(data.entryDate).format('YYYY-MM-DD'),
                iban:data.iban,
                status:convertString(data.status),
                offer_name:data.offerName,
                offer_valid_for:data.offerValidFor,
                cost_per_month:data.costPerMonth,
                total_recharge:data.totalRecharge,
                free_internet_pack:data.freeInternetPack,
                free_minutes_for_local_operator:data.freeMinutesForLocalOperator,
                free_minutes_for_local_international:data.freeMinutesForLocalInternational,
                unlimited_minutes_to:data.unlimitedMinutesTo,
                international_minutes_valid_for:data.internationalMinutesValidFor ,
                others_information:data.othersInformation
            }) )


        }else{

            setdatalist({

                operator:'',
                offer_details:'',
                default_price:'',
                agent_price:'',
                entry_date:'',
                iban:'',
                status:'',
                offer_name:'',
                offer_valid_for:'',
                cost_per_month:'',
                total_recharge:'',
                free_internet_pack:'',
                free_minutes_for_local_operator:'',
                free_minutes_for_local_international:'',
                unlimited_minutes_to:'',
                international_minutes_valid_for:'' ,
                others_information:''
            })
            Setselectedlang({})
            SetselectedOperator({})
        }
    }, [isOpen, onClose ,action,getdata,data]);

    return (
        <div>
            <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> 
            <Modal
                isOpen={isOpen}
                onClose={onClose}


            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader >{action ?'Edit Offer':t('addNewOffer')} </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                 

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>Operator</FormLabel>
                           <div style={{width:'100%'}}> <OperatorDropDown setclicked={setclicked} clicked={clicked} selectedOperator={selectedOperator} SetselectedOperator={SetselectedOperator}/></div>

                        </FormControl>


                        <FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('offerName')} <span style={{color:'red'}}>*</span></FormLabel>
                            <Textarea  style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',
                                // height:'9rem'
                            }} onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            offer_name: e.target.value
                                                             }))}
                                   value={datalist.offer_name}
                                   placeholder='Enter offer details ...'/>
                        </FormControl>





                        <div className="flex items-center gap-2 justify-between mt-5">

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>{t('costPerMo')} <span style={{color:'red'}}>*</span></FormLabel>
                                 <Input type='number' style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                    }} onChange={(e) => setdatalist(prevState => ({
                                                                ...prevState,
                                                                cost_per_month: e.target.value
                                                                }))}
                                    value={datalist.cost_per_month}
                                        placeholder='Ex. $19.99 '/> 
                        </FormControl>

                      
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>{t('totalRecharge')} <span style={{color:'red'}}>*</span></FormLabel>
                                   <Input type='number' style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                    }} onChange={(e) => setdatalist(prevState => ({
                                                                ...prevState,
                                                                total_recharge: e.target.value
                                                                }))}
                                    value={datalist.total_recharge}
                                        placeholder='Ex. $19.99'/> 
                        </FormControl>

                        </div>

                        <div className="flex items-center gap-2 justify-between mt-5">

                            <FormControl>
                                <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>{t('defaultPrice')} <span style={{color:'red'}}>*</span></FormLabel>
                                    <Input type='number' style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border : '1px solid #595959',
                                        background : '#404040'
                                        }} onChange={(e) => setdatalist(prevState => ({
                                                                    ...prevState,
                                                                    default_price: e.target.value
                                                                    }))}
                                        value={datalist.default_price}
                                            placeholder='Ex. $19.99 '/> 
                            </FormControl>


                            <FormControl>
                                <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>{t('agentPrice')} <span style={{color:'red'}}>*</span></FormLabel>
                                    <Input type='number' style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border : '1px solid #595959',
                                        background : '#404040'
                                        }} onChange={(e) => setdatalist(prevState => ({
                                                                    ...prevState,
                                                                    agent_price: e.target.value
                                                                    }))}
                                        value={datalist.agent_price}
                                            placeholder='Ex. $19.99'/> 
                            </FormControl>

                            </div>

                         <FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('offerValidFor')}</FormLabel>
                             <Input style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}
                             onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            offer_valid_for: e.target.value
                                                             }))}
                                   value={datalist.offer_valid_for}
                                   placeholder='Ex. Unlimited'/> 
                        </FormControl>





                        <div className="flex items-center gap-2 justify-between mt-5">

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>{t('freeGBOff')} <span style={{color:'red'}}>*</span></FormLabel>
                                 <Input  style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                    }} onChange={(e) => setdatalist(prevState => ({
                                                                ...prevState,
                                                                free_internet_pack: e.target.value
                                                                }))}
                                    value={datalist.free_internet_pack}
                                        placeholder='Ex. GIGA Illuminati '/> 
                        </FormControl>

                      
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>IBAN <span style={{color:'red'}}>*</span></FormLabel>
                              <select 

                              onChange={(e) => setdatalist(prevState => ({
                                ...prevState,
                                iban: e.target.value
                                }))}
                                 value={datalist.iban} style={{border : '1px solid #595959'}} className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                                        <option value=""    onChange={(e) => setdatalist(prevState => ({
                                ...prevState,
                                iban: ''
                                }))}>
                                        Select
                                    </option>
                                    <option value={true}>
                                        Yes
                                    </option>
                                    <option value={false}>
                                        No
                                    </option>
                                </select>
                        </FormControl>

                        </div>



                        <div className="flex items-center gap-2 justify-between mt-5" style={{backgroundColor:'',width:'100%',}}>
                                <FormControl >
                                    <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('freeMinOffLoco')}</FormLabel>
                                    <Input   style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border : '1px solid #595959',
                                        background : '#404040',fontSize:'13px',
                                        placeholder:'Ex. Unlimited'
                                        
                                    }}  onChange={(e) => setdatalist(prevState => ({
                                        ...prevState,
                                        free_minutes_for_local_operator: e.target.value
                                        }))}    value={datalist.free_minutes_for_local_operator} /> 
                                </FormControl>

                                <FormControl >
                                    <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('freeMinOffInt')} <span style={{color:'red'}}>*</span></FormLabel>
                                    <Input  name='entry_date'  style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border : '1px solid #595959',
                                        background : '#404040',fontSize:'13px',
                                        placeholder:'Ex. No'
                                        
                                    }}  onChange={(e) => setdatalist(prevState => ({
                                        ...prevState,
                                        free_minutes_for_local_international: e.target.value
                                        }))}    value={datalist.free_minutes_for_local_international} /> 
                                </FormControl>

                    </div>

                    <div className="flex items-center gap-2 justify-between mt-5" style={{backgroundColor:'',width:'100%',}}>
                                <FormControl >
                                    <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('unlimitedTo')} <span style={{color:'red'}}>*</span></FormLabel>
                                    <Input name='entry_date'  style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border : '1px solid #595959',
                                        background : '#404040',fontSize:'13px',
                                        placeholder:'Ex. Unlimited'
                                        
                                    }}  onChange={(e) => setdatalist(prevState => ({
                                        ...prevState,
                                        unlimited_minutes_to: e.target.value
                                        }))}    value={datalist.unlimited_minutes_to} /> 
                                </FormControl>

                                <FormControl >
                                    <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('intValid')}     </FormLabel>
                                    <Input  name='entry_date'  style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border : '1px solid #595959',
                                        background : '#404040',fontSize:'13px',
                                        placeholder:'Ex. No'
                                        
                                    }}  onChange={(e) => setdatalist(prevState => ({
                                        ...prevState,
                                        international_minutes_valid_for: e.target.value
                                        }))}    value={datalist.international_minutes_valid_for} /> 
                                </FormControl>

                    </div>

                    <FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('otherInfo')}</FormLabel>
                            <Textarea  style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',
                                // height:'9rem'
                            }} onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            others_information: e.target.value
                                                             }))}
                                   value={datalist.others_information}
                                   placeholder=''/>
                        </FormControl>



                        <div className="flex items-center gap-1 justify-between mt-2" style={{backgroundColor:'',width:'100%',}}>
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>Entry date <span style={{color:'red'}}>*</span></FormLabel>
                            <Input name='entry_date' 
                            onChange={(e) => setdatalist(prevState => ({
                                ...prevState,
                                entry_date: e.target.value
                                 }))}
                              value={datalist.entry_date}
                             type='date' style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',fontSize:'13px'
                                
                            }}    />
                        </FormControl>

                            <FormControl >
                                <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('status')} <span style={{color:'red'}}>*</span></FormLabel>
                                <StatusDropDown selected={selected} SetSelected={SetSelected} action={action} selectedlang={selectedlang} Setselectedlang={Setselectedlang} option={'offer'}/>


                            </FormControl>

                    </div>


                    </ModalBody>

                    <ModalFooter >

                        <Button  onMouseDown={(e) => {
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
                                            }}  onClick={action? handleUpdate: SaveOperator} style={{background: "#27CF7A", color: 'white'}} ml={3}>
                                        {action?'Update' : 'Save'}
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

export default AddnewOfferCenter