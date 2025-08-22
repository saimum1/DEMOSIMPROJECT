import React, {useState} from 'react';
import {useAuth} from "../../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../../config.jsx";
import Popnotification from "../../PopNotification/Popnotification.jsx";
import {Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import VideoUploader from "../../PopNotification/VideoUploader.jsx";
import uploimg from "../../../assets/static/Upload.svg";
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import {useTranslation} from "react-i18next";

const SenderInformationSave = ({courierForm, setCourierForm}) => {
    const {t} = useTranslation()
    const[preview, setPreview] = useState(false)
    const[selected,SetSelected]=useState( false)
    const [selectedFile,setSelectedFile]=useState(null)
    const [selectedFileKey,setselectedFileKey]=useState(null)
    const [selectedFileUrlKey,setselectedFileUrlKey]=useState(null)


    const handleChange = (field, value) => {
        setCourierForm(prevState => ({
            ...prevState,
            senderInfo: {
                ...prevState.senderInfo,
                [field]: value
            }
        }));
    };

    const geturl=(e)=>{
        console.log("urlbody",e)
        let url=e?.data?.fileUrl

        setCourierForm(prevState => ({
            ...prevState,
            senderInfo: {
                ...prevState.senderInfo,
                [selectedFileUrlKey]:url
            }
        }));

    }

    const handleFile = (e,filekey,urlkey) => {

        let file =document.getElementById(e).files[0]
        let filename=file?.name
        setSelectedFile(file)
        setselectedFileKey(filekey)
        setselectedFileUrlKey(urlkey)
        setCourierForm(prevState => ({
            ...prevState,
            senderInfo: {
                ...prevState.senderInfo,
                [filekey]:filename,
            }
        }));

        console.log("file",filename)



    }


    return (
        <div style={{
            background: '#2B2B33',
            color: 'white',
            paddingLeft: '15px',
            paddingRight: '15px',
            paddingTop: '15px',
            paddingBottom: '40px',
            borderRadius: '10px',
            height: '45.5rem',
            width: '100%'
        }}>
            <VideoUploader filex={selectedFile} geturl={geturl}/>

            <FormControl className="mb-4">
                <FormLabel style={{fontWeight: 'bold'}}>Sender Type</FormLabel>
                <select

                    onChange={(e) => handleChange('senderType', e.target.value)}
                    value={courierForm?.senderInfo?.senderType} style={{border: '1px solid #595959'}}
                    className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <option value="">
                        Select
                    </option>
                    <option value="New Sender">
                        New Sender
                    </option>
                </select>
            </FormControl>
            <div className="flex items-center gap-2 justify-between mb-4">
                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>First Name</FormLabel>
                    <Input disabled={preview}
                           value={courierForm?.senderInfo?.firstName}
                           onChange={(e) => handleChange('firstName', e.target.value)}

                           type="email" style={{
                        outline: 'none !important',
                        boxShadow: 'none',
                        border: '1px solid #595959',
                        background: '#404040'
                    }} placeholder='jhon'/>
                </FormControl>

                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>Last Name</FormLabel>

                    <Input disabled={preview}
                           value={courierForm?.senderInfo?.lastName}
                           onChange={(e) => handleChange('lastName', e.target.value)}


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='Doe'/>
                </FormControl>
            </div>
            <div className="flex items-center gap-2 justify-between mb-4">
                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>Document No.</FormLabel>
                    <Input disabled={preview}
                           value={courierForm?.senderInfo?.documentNo}
                           onChange={(e) => handleChange('documentNo', e.target.value)}


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='Document Number'/>
                </FormControl>

                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>Codice Fiscale</FormLabel>

                    <Input disabled={preview}

                           value={courierForm?.senderInfo?.codiceFiscale}
                           onChange={(e) => handleChange('codiceFiscale', e.target.value)}

                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='Codice Fiscale'/>
                </FormControl>
            </div>
            <div className="flex items-center gap-2 justify-between mb-4">
                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>{t('mobile')}</FormLabel>
                    <Input disabled={preview}

                           value={courierForm?.senderInfo?.phone}
                           onChange={(e) => handleChange('phone', e.target.value)}


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='Ex. +88'/>
                </FormControl>

                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>{t('email')}</FormLabel>

                    <Input disabled={preview}
                           value={courierForm?.senderInfo?.email}
                           onChange={(e) => handleChange('email', e.target.value)}


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='example@mail.com'/>
                </FormControl>
            </div>
            <div className="flex items-center gap-2 justify-between mb-4">
                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>City</FormLabel>
                    <Input disabled={preview}
                           value={courierForm?.senderInfo?.city}
                           onChange={(e) => handleChange('city', e.target.value)}


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='city'/>
                </FormControl>

                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>State</FormLabel>

                    <Input disabled={preview}

                           value={courierForm?.senderInfo?.state}
                           onChange={(e) => handleChange('state', e.target.value)}

                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='state'/>
                </FormControl>
            </div>
            <div className="flex items-center w-1/2 gap-2 justify-between mb-4">


                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>Postal Code</FormLabel>

                    <Input disabled={preview}

                           value={courierForm?.senderInfo?.postalCode}
                           onChange={(e) => handleChange('postalCode', e.target.value)}

                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='postal code'/>
                </FormControl>
            </div>
            <FormControl>
                <FormLabel style={{fontWeight: 'bold'}}>{t('address')}</FormLabel>
                <Input disabled={preview}

                       value={courierForm?.senderInfo?.address}
                       onChange={(e) => handleChange('address', e.target.value)}


                       style={{
                           outline: 'none !important',
                           boxShadow: 'none',
                           border: '1px solid #595959',
                           background: '#404040'
                       }} placeholder='address'/>
            </FormControl>
            <FormControl mt={4} mb={8}>
                <FormLabel style={{fontWeight : 'bold'}}>Upload file*</FormLabel>

                <input type="file" className="hidden" id="uploadedFile"
                       onChange={() => handleFile('uploadedFile', 'uploadedFileNameSender', 'uploadedFileUrlSender')}/>
                <label style={{border: '1px solid #595959'}} htmlFor={'uploadedFile'}
                       className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                            <span className="flex items-center justify-between p-0">
                                                                <span className="flex items-center gap-1">
                                                                    <img alt='' src={uploimg}
                                                                         style={{width: '20px', height: '20px'}}/>
                                                                    {courierForm?.senderInfo?.uploadedFileNameSender?
                                                                        <span style={{
                                                                            color: global_css.success_text_bg,
                                                                            margin: '0 2px'
                                                                        }}>{courierForm?.senderInfo?.uploadedFileNameSender.slice(0, 20)}... </span> : 'upload file here...'}
                                                                </span>
                                                                <span
                                                                    className="bg-amber-50 text-black px-2 py-1 mr-[-2%] rounded-[4px] hover:bg-amber-100">{t('chooseFile')}</span>
                                                            </span>
                </label>
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

                      FormLabel {
                        font-size: 13px;
                      }


                    `
                }

            </style>
        </div>
    );
};

export default SenderInformationSave;
