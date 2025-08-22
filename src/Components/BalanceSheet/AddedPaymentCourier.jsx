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
import Popnotification from "../PopNotification/Popnotification.jsx";
import moment from "moment";
import {convertString, revertString} from "../commonFunctions/StringConversion.jsx";
import VideoUploader from '../PopNotification/VideoUploader.jsx';
import { useAuth } from '../../Context/AuthInfo.jsx';
import config from '../../config.jsx';
import {useTranslation} from "react-i18next";


const AddedPaymentCourier = ({isOpen, onClose ,action,getdata, agentId,data,optiontype}) => {

    const {t} = useTranslation()
    const { user, token } = useAuth();
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [selectedFile,setSelectedFile]=useState(null)
    const [selectedType, setSelectedType] = useState('Regular')
    const [datalist,setdatalist]=useState({
            'paymentid':'',
            'id':agentId,
            "amount": '',
            "date": '',
            "paymentType": "",
            "transactionId": "",
            "attachments": [],
            "details": ""
        
     
        
    })


      const convertData = () => {
        return {
          
            commissionAmount: Number(datalist.amount) || 0, // Convert amount to a number
            amount: Number(datalist.amount) || 0, // added by towhid
            date: moment(datalist.date).toISOString(), // Convert date to ISO 8601 format
            paymentType: datalist.paymentType , // Default to "cash" if empty
            transactionId: datalist.transactionId , // Default if empty
            attachments: datalist.attachments || [], // Keep attachments as is
            details: datalist.details  // Default details if empty
        };
    };
    const SaveOperator = async () => {
        try {

            console.log("daralist",datalist)
            const convertedData = convertData()
            const response = await axios.post(`${config.apiUrl}/api/financial/courier/agents/${agentId}/${selectedType === 'Regular'? 'regularPayment':'commissionPayment'}`, convertedData,{
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
            const response = await axios.put(`${config.apiUrl}/api/financial/courier/agents/${agentId}/${selectedType === 'Regular'? 'regularPayment':'commissionPayment'}/${datalist?.paymentid}`, convertedData,{
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
            setdatalist(prevState => ({
                ...prevState,
                'paymentid':data?.id,
                'id':agentId,
                "amount": data?.amount,
                "date": data?.date,
                "paymentType":data?.paymentType,
                "transactionId": data?.transactionId,
                "attachments": data?.attachments,
                "details": data?.details
            }) )


        }else{

            setdatalist({

                'id':agentId,
                "amount": '',
                "date": '',
                "paymentType": "",
                "transactionId": "",
                "attachments": [],
                "details": ""
            })
        }
    }, [isOpen, onClose ,action,getdata,agentId,data]);


    const geturl=(e)=>{
        console.log("urlbody",e) 
        let url=e?.data?.fileUrl
        setdatalist(prev=>({
          ...prev,
          attachments:[url]

        }))
}

const handleFile = (e) => {

    let file =e.target.files[0]
    setSelectedFile(file)
}


const handleCheckboxChange = (type) => {
    console.log("typefsdf",type)
  setSelectedType(type); // Update state to the selected type
};


    return (
        <div>
            <VideoUploader filex={selectedFile} geturl={geturl}/>

            <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> 
            <Modal
                isOpen={isOpen}
                onClose={onClose}


            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader >Added Payment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>


                    <FormControl style={{marginTop:'5%'}}>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>Payment Type</FormLabel>
                            
                            <div style={{ display: 'flex', gap: '5%' }}>
                                    {/* Sell Checkbox */}
                                    <div style={{ display: 'flex', gap: '5%' }}>
                                    <label className="checkbox-container">
                                        <input
                                        type="checkbox"
                                        checked={selectedType === 'Regular'} // Check if 'Sell' is selected
                                          onChange={() => handleCheckboxChange('Regular')} // Update state
                                        />
                                        <span className="checkbox-checkmark"></span>
                                    </label>
                                    <span>Regular</span>
                                    </div>
                                    
                                    {/* Others Checkbox */}
                                    <div style={{ display: 'flex', gap: '5%' }}>
                                    <label className="checkbox-container">
                                        <input
                                        type="checkbox"
                                         checked={selectedType === 'Commission'} // Check if 'Sell' is selected
                                         onChange={() => handleCheckboxChange('Commission')} // Update state
                                        />
                                        <span className="checkbox-checkmark"></span>
                                    </label>
                                    <span>Commission</span>
                                    </div>
                                </div>
                            
                </FormControl>


                        <div className="flex items-center gap-2 justify-between mt-5">

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>User ID</FormLabel>
                                 <Input type='number' disabled={true} style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                     background : '#404040'
                                    }} 
                                       value={agentId} /> 
                        </FormControl>

                      
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>{t('date')}</FormLabel>
                            <Input 
                                    name='date' 
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
                                    }}
                                />
                        </FormControl>

                        </div>

                        <div className="flex items-center gap-2 justify-between mt-5">

                            <FormControl>
                                <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'12px'}}>Payment type</FormLabel>
                                <select required={true} style={{border : '1px solid #595959'}} className="w-[100%] h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                                onChange={(e) => setdatalist(prevState => ({
                                    ...prevState,
                                    'paymentType': e.target.value
                                     }))}
                                   value={datalist?.paymentType}>
                                               <option value="">
                                                -- select payment type --
                                                </option>
                                                <option value="cash">
                                                 Cash
                                                </option>
                                                <option value="onlineTransfer">
                                                Online Transfer
                                                </option>
                                                <option value='bankTransfer'>
                                                Bank Transfer
                                                </option>
                                                <option value='others'>
                                                Others
                                                </option>
                                            </select>
                            </FormControl>


                            </div>

                         <FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>Payment</FormLabel>
                             <Input type='number' required={true}  style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}
                             onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            amount: e.target.value
                                                             }))}
                                   value={datalist?.amount}
                                   placeholder='Ex. 1423'/> 
                        </FormControl>


                    {datalist?.paymentType !== 'cash' &&                                         
                        <FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>Transaction ID</FormLabel>
                             <Input style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}
                             onChange={(e) => setdatalist(prevState => ({
                                                            ...prevState,
                                                            transactionId: e.target.value
                                                             }))}
                                   value={datalist?.transactionId}
                                   placeholder='Ex. 4azb486abke3'/> 
                        </FormControl>

                    } 

                        <FormControl className='mt-5'>
                            <FormLabel style={{fontWeight :'bold',fontSize:'12px'}}>Transection {t('details')}</FormLabel>
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





                        <FormControl mt={4} mb={8}>
                            {/* File Input */}
                            <input
                                type="file"
                                id="fileUpload"
                                className="hidden"
                                onChange={(e) => handleFile(e)}
                            />

                            {/* Styled Label */}
                            <label
                                htmlFor="fileUpload"
                                className="flex items-center justify-between w-full cursor-pointer p-3"
                                style={{
                                    border: '1px dashed #595959',
                                    background: '#404040',
                                    color: '#9CA3AF',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    textAlign: 'left',
                                }}
                            >
                             <span> { selectedFile? selectedFile?.name : 'Attach your document'}</span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path
                                            d="M10 19.7923C6.89779 19.7923 4.375 17.2695 4.375 14.1673V4.16732C4.375 1.9847 6.15072 0.208984 8.33333 0.208984C10.516 0.208984 12.2917 1.9847 12.2917 4.16732V13.334C12.2917 14.597 11.263 15.6257 10 15.6257C8.73698 15.6257 7.70833 14.597 7.70833 13.334V5.83398C7.70833 5.48893 7.98828 5.20898 8.33333 5.20898C8.67839 5.20898 8.95833 5.48893 8.95833 5.83398V13.334C8.95833 13.9085 9.42546 14.3757 10 14.3757C10.5745 14.3757 11.0417 13.9085 11.0417 13.334V4.16732C11.0417 2.67399 9.82747 1.45898 8.33333 1.45898C6.83919 1.45898 5.625 2.67399 5.625 4.16732V14.1673C5.625 16.5794 7.58789 18.5423 10 18.5423C12.4121 18.5423 14.375 16.5794 14.375 14.1673V5.83398C14.375 5.48893 14.6549 5.20898 15 5.20898C15.3451 5.20898 15.625 5.48893 15.625 5.83398V14.1673C15.625 17.2695 13.1022 19.7923 10 19.7923Z"
                                            fill="white"
                                        />
                                    </svg>
                                </span>
                            </label>
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

export default AddedPaymentCourier