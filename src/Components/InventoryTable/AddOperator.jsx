
import React, { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import { global_css } from "../../GlobalCss/GlobalCSS.js";
import toast, { Toaster } from "react-hot-toast";
import Popnotification from "../PopNotification/Popnotification.jsx";
import TickForm from '../TickForm/TickForm.jsx';
import VideoUploader from '../PopNotification/VideoUploader.jsx';
import { useTranslation } from "react-i18next";
import { useAuth } from '../../Context/AuthInfo.jsx';
import { dummyOperators } from './dataset.jsx';
// import { dummyOperators } from './dataset/operators';

const AddOperator = ({ isOpen, onClose, GetOperators, actionType, operatorForEdit }) => {
    const { user, token, profileInfo } = useAuth();
    const { t } = useTranslation();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [operatorName, setOperatorName] = useState('');
    const [operatorCode, setOperatorCode] = useState('');
    const [operatorStatus, setOperatorStatus] = useState(false);
    const [url, setURL] = useState('');
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('success');
    const [showpopoupmsg, setshowpopupmsg] = useState('');
    const [logourlFromPrev, setLogourlFromPrev] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const SaveOperator = async () => {
        try {
            // Check if operator code already exists
            const operatorExists = dummyOperators.some(
                op => op.code === operatorCode && (!operatorForEdit || op.id !== operatorForEdit.id)
            );

            if (operatorExists) {
                throw { response: { status: 403 } };
            }

            const newOperator = {
                id: dummyOperators.length + 1,
                name: operatorName,
                code: operatorCode,
                logo: url,
                status: operatorStatus ? 'available' : 'not_available'
            };

            // Add to dummy data
            dummyOperators.push(newOperator);

            // Update parent component
            await GetOperators();
            onClose();
            resetForm();
            
            setshowpopupmsg('Save Success');
            setshowpopupstatus('success');
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 1500);
        } catch (error) {
            handleError(error);
        }
    };

    const UpdateOperator = async () => {
        try {
            const operatorExists = dummyOperators.some(
                op => op.code === operatorCode && op.id !== operatorForEdit.id
            );

            if (operatorExists) {
                throw { response: { status: 403 } };
            }

            // Update existing operator
            const index = dummyOperators.findIndex(op => op.id === operatorForEdit.id);
            if (index !== -1) {
                dummyOperators[index] = {
                    ...dummyOperators[index],
                    name: operatorName,
                    code: operatorCode,
                    logo: url,
                    status: operatorStatus ? 'available' : 'not_available'
                };
            }

            await GetOperators();
            onClose();
            resetForm();
            
            setshowpopupmsg('Update Success');
            setshowpopupstatus('success');
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 1500);
        } catch (error) {
            handleError(error);
        }
    };

    const resetForm = () => {
        setURL('');
        setOperatorStatus(false);
        setOperatorCode('');
        setOperatorName('');
        setSelectedFile(null);
    };

    const handleError = (error) => {
        if (error.response?.status === 403) {
            setshowpopupmsg('Operator already exists');
            setshowpopupstatus('fail');
        } else {
            setshowpopupmsg(actionType ? 'Update Failed' : 'Save Failed');
            setshowpopupstatus('fail');
        }
        setshowpopup(true);
        setTimeout(() => {
            setshowpopup(false);
        }, 1500);
    };

    useEffect(() => {
        if (actionType && operatorForEdit) {
            setOperatorName(operatorForEdit?.name || '');
            setOperatorCode(operatorForEdit?.code || '');
            setOperatorStatus(operatorForEdit?.status === 'available');
            setLogourlFromPrev(operatorForEdit?.logoUrl || '');
        } else {
            resetForm();
        }
    }, [actionType, operatorForEdit]);

    const handleCheckboxChange = () => {
        setOperatorStatus(!operatorStatus);
    };

    const geturl = (e) => {
        let url = e?.data?.fileUrl;
        setURL(url);
    };

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <VideoUploader filex={selectedFile} geturl={geturl} />
            {showpopoup && <Popnotification msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} />}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={global_css.modal_bg} style={{ color: 'white' }}>
                    <ModalHeader>{actionType ? 'Edit Operator' : 'Add new operator'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel style={{ fontWeight: 'bold' }}>Operator Name</FormLabel>
                            <Input
                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border: '1px solid #595959',
                                    background: '#404040'
                                }}
                                onChange={(e) => setOperatorName(e.target.value)}
                                value={operatorName}
                                placeholder='Operator Name'
                            />
                        </FormControl>

                        <FormControl mt={4} mb={8}>
                            <FormLabel>Operator Logo</FormLabel>
                            <Input type="file" id="file-input" className="hidden" onChange={handleFileChange} />
                            <label
                                style={{ border: '1px solid #595959' }}
                                htmlFor="file-input"
                                className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <span className="flex items-center justify-between p-0">
                                    <span className="flex items-center">
                                        <svg className="mr-2 mb-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M6.1579 7.4871H5.3804C3.68457 7.4871 2.30957 8.8621 2.30957 10.5579L2.30957 14.6204C2.30957 16.3154 3.68457 17.6904 5.3804 17.6904H14.6554C16.3512 17.6904 17.7262 16.3154 17.7262 14.6204V10.5496C17.7262 8.85876 16.3554 7.4871 14.6646 7.4871H13.8787" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M10.0177 1.82618V11.8604" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M7.58838 4.26562L10.0175 1.82562L12.4475 4.26562" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        {selectedFile ? `${selectedFile.name.slice(0, 20)}...` : 'Choose File'}
                                    </span>
                                    <span className="bg-amber-50 text-black px-2 py-1 mr-[-3%] rounded-[4px] hover:bg-amber-100">Choose File</span>
                                </span>
                            </label>
                        </FormControl>
                        <div className="flex items-center gap-2 justify-between">
                            <FormControl className="mt-16">
                                <FormLabel style={{ fontWeight: 'bold' }}>Operator Code <span style={{ color: 'red' }}>*</span></FormLabel>
                                <Input
                                    value={operatorCode}
                                    style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border: '1px solid #595959',
                                        background: '#404040'
                                    }}
                                    onChange={(e) => setOperatorCode(e.target.value)}
                                    placeholder='Ex. +88'
                                />
                            </FormControl>

                            <FormControl className="mt-5">
                                <FormLabel style={{ fontWeight: 'bold' }}>Status <span style={{ color: 'red' }}>*</span></FormLabel>
                                <label
                                    style={{ border: '1px solid #595959', transition: 'all 300ms' }}
                                    className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex gap-2 items-center"
                                >
                                    <input
                                        type="checkbox"
                                        checked={operatorStatus}
                                        onChange={(e) => setOperatorStatus(e.target.checked)}
                                        style={{ display: 'none' }}
                                    />
                                    <div style={{ width: '18px', height: '18px' }}>
                                        <TickForm status={operatorStatus} />
                                    </div>
                                    <span>Available</span>
                                </label>
                            </FormControl>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='white' variant='outline' onClick={onClose}>Cancel</Button>
                        <Button
                            onClick={actionType ? UpdateOperator : SaveOperator}
                            style={{ background: "#27CF7A", color: 'white' }}
                            ml={3}
                        >
                            {actionType ? 'Update' : 'Save'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <style jsx>{`
                .custom-file-upload {
                    padding: 4px 2px;
                    cursor: pointer;
                    font-size: 15px;
                }
                .custom-file-upload:active {
                    background-color: white;
                    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
                }
                input:focus {
                    outline: none;
                }
            `}</style>
        </div>
    );
};

export default AddOperator;
