import React, {useState} from 'react';
import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const ReceiverInformation = ({courierForm, setCourierForm}) => {
    const {t} = useTranslation()
        const[preview, setPreview] = useState(false)
        const[selected,SetSelected]=useState( false)
        const [selectedFile, setSelectedFile] = useState(null);


        const handleChange = (field, value) => {
            setCourierForm(prevState => ({
                ...prevState,
                receiverInfo: {
                    ...prevState.receiverInfo,
                    [field]: value
                }
            }));
        };

        const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
            console.log(event.target.files[0])
        };


        return (
            <div style={{background : '#2B2B33', color : 'white', paddingLeft : '15px', paddingRight : '15px', paddingTop : '15px', paddingBottom : '40px', borderRadius : '10px', width : '100%', height : '45.5rem'}}>

                <FormControl className="mb-4">
                    <FormLabel style={{fontWeight: 'bold'}}>Receiver Type</FormLabel>
                    <select

                        onChange={(e) =>handleChange('receiverType', e.target.value) }
                        value={courierForm?.receiverInfo?.receiverType} style={{border: '1px solid #595959'}}
                        className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <option value="">
                            Select
                        </option>
                        <option value="New Receiver">
                            New Receiver
                        </option>
                    </select>
                </FormControl>
                <div className="flex items-center gap-2 justify-between mb-4">
                    <FormControl>
                        <FormLabel style={{fontWeight: 'bold'}}>First Name</FormLabel>
                        <Input disabled={preview}
                               value={courierForm?.receiverInfo?.firstName}
                               onChange={(e) =>handleChange('firstName', e.target.value) }

                               type="email"  style={{
                            outline: 'none !important',
                            boxShadow: 'none',
                            border : '1px solid #595959',
                            background : '#404040'
                        }} placeholder='jhon'/>
                    </FormControl>

                    <FormControl>
                        <FormLabel style={{fontWeight: 'bold'}}>Last Name</FormLabel>

                        <Input disabled={preview}
                               value={courierForm?.receiverInfo?.lastName}
                               onChange={(e) =>handleChange('lastName', e.target.value) }


                               style={{
                                   outline: 'none !important',
                                   boxShadow: 'none',
                                   border : '1px solid #595959',
                                   background : '#404040'
                               }} placeholder='Doe'/>
                    </FormControl>
                </div> <div className="flex items-center gap-2 justify-between mb-4">
                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>{t('mobile')}</FormLabel>
                    <Input disabled={preview}

                           value={courierForm?.receiverInfo?.phone}
                           onChange={(e) =>handleChange('phone', e.target.value) }


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border : '1px solid #595959',
                               background : '#404040'
                           }} placeholder='Ex. +88'/>
                </FormControl>

                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>Optional Phone</FormLabel>

                    <Input disabled={preview}
                           value={courierForm?.receiverInfo?.optionalPhone}
                           onChange={(e) =>handleChange('optionalPhone', e.target.value) }


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border : '1px solid #595959',
                               background : '#404040'
                           }} placeholder='Ex. +88'/>
                </FormControl>
            </div> <div className="flex items-center gap-2 justify-between mb-4">
                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>City</FormLabel>
                    <Input disabled={preview}
                           value={courierForm?.receiverInfo?.city}
                           onChange={(e) =>handleChange('city', e.target.value) }


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border : '1px solid #595959',
                               background : '#404040'
                           }} placeholder='city'/>
                </FormControl>

                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>Postal Code(CAP)</FormLabel>
                    <Input disabled={preview}
                           value={courierForm?.receiverInfo?.postalCodeCAP}
                           onChange={(e) =>handleChange('postalCodeCAP', e.target.value) }


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border : '1px solid #595959',
                               background : '#404040'
                           }} placeholder='postal Code'/>
                </FormControl>


            </div> <div className="flex items-center gap-2 justify-between mb-4">

                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>State</FormLabel>

                    <Input disabled={preview}

                           value={courierForm?.receiverInfo?.state}
                           onChange={(e) =>handleChange('state', e.target.value) }

                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border : '1px solid #595959',
                               background : '#404040'
                           }} placeholder='state'/>
                </FormControl>

                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>Country</FormLabel>

                    <Input disabled={preview}

                           value={courierForm?.receiverInfo?.country}
                           onChange={(e) =>handleChange('country', e.target.value) }

                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border : '1px solid #595959',
                               background : '#404040'
                           }} placeholder='country'/>
                </FormControl>
            </div>
                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>{t('address')}</FormLabel>
                    <Input disabled={preview}

                           value={courierForm?.receiverInfo?.address}
                           onChange={(e) =>handleChange('address', e.target.value) }


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040',
                               height : '5rem'
                           }} placeholder='Address'/>
                </FormControl>


                <style jsx>
                    {
                        `
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
                      FormLabel{
                        font-size: 13px;
                      }
                        
                    
                    `
                    }

                </style>
            </div>
        );
    };


    export default ReceiverInformation;