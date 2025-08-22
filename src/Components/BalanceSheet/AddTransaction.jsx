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
import OperatorDropDownMultiple from '../CustomDropDown/OperatorDropDownMultiple.jsx';
import {useTranslation} from "react-i18next";

const AddTransaction =({isOpen, onClose ,action,getdata, data,agentId,statustype}) => {

    const {t} = useTranslation()
    const { user, token } = useAuth();
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const[clicked,setclicked]=useState(false)
    const [selectedType, setSelectedType] = useState('Sell'); // Track which type is selected

    const handleCheckboxChange = (type) => {
        console.log("typefsdf",type)
      setSelectedType(type); // Update state to the selected type
    };
    
    const [datalist,setdatalist]=useState({
            'paymentid':'',
            'id':agentId,
            "amount": '',
            "date": "",
            "operators": [],
            "simNumbers": [], 
            "details": ""
        
     
        
    })

    const xSetselectedOperator=(e)=>{
        console.log("opeee",e)

        setdatalist((prevState) => {
            const updatedState = {
              ...prevState,
              "operators": e,
            };
            console.log("Updated datalist:", updatedState); // Check if updatedState is as expected
            return updatedState;
          });
        };
        
    


      const convertData = () => {
        return {
            amount: Number(datalist.amount) || 0, // Convert amount to a number
            date: moment(datalist.date).toISOString(), // Convert date to ISO 8601 format
            operators: datalist.operators , // Default to "cash" if empty
            simNumbers: datalist.simNumbers || [], // Keep attachments as is
            details: datalist.details  // Default details if empty
        };
    };
    const SaveOperator = async () => {
        try {

            console.log("daraliststransactiojn",datalist)
            const convertedData = convertData()
            console.log("asdasdascasc",convertedData)
            const response = await axios.post(`${config.apiUrl}/api/financial/sim/agents/${agentId}/${selectedType === 'Sell'? 'simSell':'others'}`, convertedData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('xre', response);
            getdata('update')
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
    };

    const handleUpdate = async () => {
        try {
            const convertedData = convertData()
            console.log("updatedata",convertedData)
            const response = await axios.put(`${config.apiUrl}/api/financial/sim/agents/${agentId}/${selectedType === 'Sell'? 'simSell':'others'}/${datalist?.paymentid}`, convertedData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Response:', response);
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
        console.log("seleecec",data)
        if (action && data) {
            if(statustype === 'sellHistory'){
                setSelectedType('Sell')
            }else{
                setSelectedType('Others')
            }
            setdatalist(prevState => ({
                ...prevState,
                'paymentid':data?.id,
                'id':agentId,
                "amount": data?.amount,
                "date": data?.date,
                "operators":data?.operators,
                "simNumbers": data?.simNumbers,
                "details":data?.details
            }) )


        }else{

            setdatalist({
                'paymentid':'',
                'id':agentId,
                "amount": '',
                "date": "",
                "operators": [],
                "simNumbers": [],
                "details": ""
            
            })
        }
    }, [isOpen, onClose ,action,getdata,agentId,data]);




    return (
        <div>
            <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> 
            <Modal
                isOpen={isOpen}
                onClose={onClose}


            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader >Add Transaction</ModalHeader>
                    <div style={{height:'1px',backgroundColor:'#404040',width:'90%',alignSelf:'center'}}></div>

                    <ModalCloseButton />
                    <ModalBody pb={6}>



                <FormControl style={{marginTop:'5%'}}>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>Transaction Type</FormLabel>
                            
                            <div style={{ display: 'flex', gap: '5%' }}>
                                    {/* Sell Checkbox */}
                                    <div style={{ display: 'flex', gap: '5%' }}>
                                    <label className="checkbox-container">
                                        <input
                                        type="checkbox"
                                        checked={selectedType === 'Sell'} // Check if 'Sell' is selected
                                          onChange={() => handleCheckboxChange('Sell')} // Update state
                                        />
                                        <span className="checkbox-checkmark"></span>
                                    </label>
                                    <span>Sell</span>
                                    </div>
                                    
                                    {/* Others Checkbox */}
                                    <div style={{ display: 'flex', gap: '5%' }}>
                                    <label className="checkbox-container">
                                        <input
                                        type="checkbox"
                                         checked={selectedType === 'Others'} // Check if 'Sell' is selected
                                         onChange={() => handleCheckboxChange('Others')} // Update state
                                        />
                                        <span className="checkbox-checkmark"></span>
                                    </label>
                                    <span>Others</span>
                                    </div>
                                </div>
                            
                </FormControl>

                        <div className="flex items-center gap-2 justify-between mt-5">

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>User ID</FormLabel>
                                 <Input disabled type='number' style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                    }}
                                    value={agentId}
                                        placeholder='Ex. $19.99 '/> 
                        </FormControl>

                      
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('date')}</FormLabel>
                            <Input name='date' 
                            onChange={(e) => {
                                const isoDate = e.target.value; // Date from <input type="date"> is in YYYY-MM-DD
                                setdatalist(prevState => ({
                                    ...prevState,
                                    date: moment(isoDate).format('YYYY-MM-DDTHH:mm')
                                    // date: isoDate // Convert back to MM/DD/YY for storage
                                }));
                            }}
                            value={moment(datalist?.date).format('YYYY-MM-DD')} // Convert MM/DD/YY to YYYY-MM-DD for input field
                            type='date' 
                            style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border: '1px solid #595959',
                                background: '#404040',
                                fontSize: '13px'
                            }}  />
                        </FormControl>

                        </div>



                        <FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>{t('operators')}</FormLabel>
                           <div style={{width:'100%'}}> 
                            {/* <OperatorDropDown setclicked={setclicked} clicked={clicked} selectedOperator={'datalist.old_operator'} SetselectedOperator={xSetselectedOperator}/> */}
                            <OperatorDropDownMultiple setclicked={setclicked} clicked={clicked} selectedOperator={datalist?.operators} SetselectedOperator={xSetselectedOperator}/>
                              
                          {/* <OperatorDropDown  setclicked={setclicked} clicked={clicked} selectedOperator={datalist.old_operator} SetselectedOperator={xSetselectedOperator}/> */}

                            </div>

                        </FormControl>

                                <FormControl className="mt-5">
                                <FormLabel style={{ fontWeight: 'bold', fontSize: '12px' }}>Add Sim No.</FormLabel>
                                <Input
                                    style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border: '1px solid #595959',
                                    background: '#404040',
                                    }}
                                    onChange={(e) => {
                                    const input = e.target.value;
                                    const numbersArray = input.split(',').map((num) => num.trim()); // Split by comma and trim spaces
                                    setdatalist((prevState) => ({
                                        ...prevState,
                                        simNumbers: numbersArray, // Save the array of numbers
                                    }));
                                    }}
                                    value={datalist.simNumbers?.join(', ') || ''} // Display as comma-separated values
                                    placeholder="Ex. Unlimited"
                                />
                                </FormControl>




                        <FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>Sell Amount</FormLabel>
                             <Input style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}
                             onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            amount: e.target.value
                                                             }))}
                                   value={datalist.amount}
                                   placeholder='Ex. Unlimited'/> 
                        </FormControl>



                        <FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('details')}</FormLabel>
                            <Textarea  style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',
                                // height:'9rem'
                            }} onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            details: e.target.value
                                                             }))}
                                   value={datalist.details}
                                   placeholder='Enter offer details ...'/>
                        </FormControl>





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

export default AddTransaction