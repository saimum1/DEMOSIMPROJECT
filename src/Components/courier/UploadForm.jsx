import React, {useState} from 'react';
import {Toaster} from "react-hot-toast";
import Popnotification from "../PopNotification/Popnotification.jsx";
import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import TickForm from "../TickForm/TickForm.jsx";
import uploimg from "../../assets/static/Upload.svg";
import VideoUploader from "../PopNotification/VideoUploader.jsx";
import axios from "axios";
import config from "../../config.jsx";
import {useAuth} from "../../Context/AuthInfo.jsx";
import {useTranslation} from "react-i18next";

const UploadForm = ({isOpen, onClose, setselecteditem, selecteditem, getData}) => {
    const { user , token } = useAuth();
    const {t} = useTranslation()
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileKey, setselectedFileKey] = useState(null);
    const [selectedFileUrlKey, setselectedFileUrlKey] = useState(null);
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('success');
    const [showpopoupmsg, setshowpopupmsg] = useState('');
    const [courierForm, setCourierForm] = useState({
        ...selecteditem,
        orderDetails: {
            ...selecteditem?.orderDetails,
            labelFileName: selecteditem?.orderDetails?.labelFileName || '',
            labelFileUrl: selecteditem?.orderDetails?.labelFileUrl || ''
        }
    });


    console.log("Lllllllllllllllll", selecteditem)

    const geturl = (e) => {
        console.log("urlbody", e);
        let url = e?.data?.fileUrl;

        setselecteditem(prevState => ({
            ...prevState,
            orderDetails: {
                ...prevState.orderDetails,
                [selectedFileUrlKey]: url
            }
        }));
    }

    const handleFile = (e, filekey, urlkey) => {
        let file = document.getElementById(e).files[0];
        let filename = file?.name;
        setSelectedFile(file);
        setselectedFileKey(filekey);
        setselectedFileUrlKey(urlkey);
        setselecteditem(prevState => ({
            ...prevState,
            orderDetails: {
                ...prevState.orderDetails,
                [filekey]: filename,
            }
        }));
        console.log("file", filename);
    }

    const handleUpdate = async () => {
        try {

            console.log("PPPPPPPPPPPPPPP", selecteditem)
            const response = await axios.put(`${config.apiUrl}/api/courier/${selecteditem?.id}/update/label`, selecteditem, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            await onClose();
            await getData();

            console.log('Response:', response);
            setshowpopupmsg(' Uploaded successfully!');
            setshowpopupstatus('success');
            setshowpopup(true);

            console.log('Before setTimeout');

            // Wait for the popup to display before updating state
            setTimeout(() => {
                console.log('Inside setTimeout');
                setshowpopup(false);
                // Fetch updated data
                // Reset form state
            }, 1500);

        } catch (error) {
            console.error('Error:', error);
            setshowpopupmsg(error.response?.data?.error || 'An error occurred');
            setshowpopupstatus('fail');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false);
            }, 1500);
        }
    };

    return (
        <div>
            <VideoUploader filex={selectedFile} geturl={geturl}/>
            {showpopoup &&  <Popnotification msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color: 'white'}}>
                    <ModalHeader>Upload Label</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={4} mb={8}>
                            <FormLabel style={{fontWeight: 'bold'}}>Upload file*</FormLabel>

                            <input type="file" className="hidden" id="labelFile"
                                   onChange={() => handleFile('labelFile', 'labelFileName', 'labelFileUrl')}/>
                            <label style={{border: '1px solid #595959'}} htmlFor={'labelFile'}
                                   className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <span className="flex items-center justify-between p-0">
                                    <span className="flex items-center gap-1">
                                        <img alt='' src={uploimg} style={{width: '20px', height: '20px'}}/>
                                        {selecteditem?.orderDetails?.labelFileName ?
                                            <span style={{color: global_css.success_text_bg, margin: '0 2px'}}>
                                                {selecteditem?.orderDetails?.labelFileName?.slice(0, 20)}...
                                            </span> : 'upload file here...'}
                                    </span>
                                    <span className="bg-amber-50 text-black px-2 py-1 mr-[-2%] rounded-[4px] hover:bg-amber-100">
                                        {t('chooseFile')}
                                    </span>
                                </span>
                            </label>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='white' variant='outline' onClick={onClose}>Close</Button>
                        <Button onClick={handleUpdate} style={{background: "#27CF7A", color: 'white'}} ml={3}>
                            Add
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
                        font-size: 15px;
                      }

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

export default UploadForm;
