import React, {useState} from 'react';
import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import VideoUploader from "../../PopNotification/VideoUploader.jsx";
import uploimg from "../../../assets/static/Upload.svg";
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import {useTranslation} from "react-i18next";

const DeliveryDetails = ({setCourierForm, courierForm}) => {
    const {t} = useTranslation()
    const [preview, setPreview] = useState(false);
    const [selectedFile,setSelectedFile]=useState(null)
    const [selectedFileKey,setselectedFileKey]=useState(null)
    const [selectedFileUrlKey,setselectedFileUrlKey]=useState(null)

    const handleChange = (field, value) => {
        setCourierForm(prevState => ({
            ...prevState,
            orderDetails: {
                ...prevState.orderDetails,
                deliveryDetails: {
                    ...prevState.orderDetails.deliveryDetails,
                    [field]: value
                }
            }
        }));
    };

    const geturl=(e)=>{
        console.log("urlbody",e)
        let url=e?.data?.fileUrl

        setCourierForm(prevState => ({
            ...prevState,
            orderDetails: {
                ...prevState.orderDetails,
                deliveryDetails: {
                    ...prevState.orderDetails.deliveryDetails,
                    [selectedFileUrlKey]:url
                }
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
            orderDetails: {
                ...prevState.orderDetails,
                deliveryDetails: {
                    ...prevState.orderDetails.deliveryDetails,
                    [filekey]:filename,
                }
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
            height: '12.5rem',
            width: '100%'
        }}>
            <VideoUploader filex={selectedFile} geturl={geturl}/>

            <div className="flex items-center gap-2 justify-between mb-4">
                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>Delivery Condition</FormLabel>
                    <select
                        onChange={(e) => handleChange('deliveryCondition', e.target.value)}
                        value={courierForm?.orderDetails?.deliveryDetails?.deliveryCondition} style={{border: '1px solid #595959'}}
                        className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <option value="">
                            {t('select')}
                        </option>
                        <option value="Not a Home Delivery">
                            Not a Home Delivery
                        </option>
                        <option value="Home Delivery">
                            Home Delivery
                        </option>
                    </select>
                </FormControl>

                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>Dhaka Address</FormLabel>
                    <Input disabled={preview}
                           value={courierForm?.orderDetails?.deliveryDetails?.dhakaAddress}
                           onChange={(e) => handleChange('dhakaAddress', e.target.value)}
                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder=''/>
                </FormControl>
            </div>

            <div className="flex items-center gap-2 justify-between">
                <FormControl>
                    <FormLabel style={{fontWeight: 'bold'}}>Delivery Charge</FormLabel>
                    <Input disabled={preview}
                           value={courierForm?.orderDetails?.deliveryDetails?.deliveryCharge}
                           onChange={(e) => handleChange('deliveryCharge', e.target.value)}
                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder=''/>
                </FormControl>

                <FormControl mt={4} mb={8}>
                    <FormLabel style={{fontWeight : 'bold', marginTop : '-3.5%'}}>Product Details/Upload file*</FormLabel>
                    <input type="file"  className="hidden" id="productDetailsFile" onChange={() => handleFile('productDetailsFile', 'productDetailsFileName', 'productDetailsFileUrl')} />
                    <label style={{ border: '1px solid #595959' }} htmlFor={'productDetailsFile'} className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <span className="flex items-center justify-between p-0">
                            <span className="flex items-center gap-1">
                                <img alt='' src={uploimg} style={{ width: '20px', height: '20px' }} />
                                {courierForm?.orderDetails?.deliveryDetails?.productDetailsFileName ? <span style={{color:global_css.success_text_bg,margin:'0 2px'}}>{courierForm?.orderDetails?.deliveryDetails?.productDetailsFileName.slice(0, 20)}... </span> : 'upload file here...'}
                            </span>
                            <span className="bg-amber-50 text-black px-2 py-1 mr-[-2%] rounded-[4px] hover:bg-amber-100">{t('chooseFile')}</span>
                        </span>
                    </label>
                </FormControl>
            </div>
        </div>
    );
};

export default DeliveryDetails;