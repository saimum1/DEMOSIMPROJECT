import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl, FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {global_css} from "../../../../GlobalCss/GlobalCSS.js";
import ScrollbarContent from "./ScrollbarContent.jsx";
import {convertString} from "../../../commonFunctions/StringConversion.jsx";
import axios from "axios";
import config from "../../../../config.jsx";
import {useAuth} from "../../../../Context/AuthInfo.jsx";
import {useTranslation} from "react-i18next";

const RejectionComponent = ({isOpen, onClose, oid, type, activationList, onSaveOpen}) => {
    const [data, setData] = useState({})
    const [note, setNote] = useState('')
    const {token, user} = useAuth();
    const {t} = useTranslation()
    useEffect(() => {

        let locaStoragedatax=JSON.parse(localStorage.getItem('saleId')) || []
        let locaStoragedataxy=locaStoragedatax?.filter(n=> n.id === oid)
        let locaStoragedata=locaStoragedataxy[0]?.data
        setData(locaStoragedata)
        setNote(locaStoragedata?.rejection_note)
        // console.log("localdatauc122", oid,locaStoragedata)
        console.log("dsfsdf",oid,locaStoragedatax)
    }, [oid,isOpen]);


    const saveInfo = async () => {
        try {

            const sending = {
                "status": "rejected",
                "rejectionNote": note
            }
            console.log("================data", sending, data?.sales_id)

            const response = await axios.put(`${config.apiUrl}/api/sales/${data?.sales_id}/update/status`, sending, {
                headers: {
                    Authorization: `Bearer ${token}`
                }});
            console.log('Response:user:===', response);
            await setData({})
            await setNote('')
            await activationList()
            await onClose()
            await localStorage.removeItem('saleId');
        } catch (error) {
            console.error('Error++++:', error);

            throw error;
        }
    };
    const handleModalClose = () => {
        localStorage.removeItem('saleId');
    }
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={() => { onClose(); handleModalClose(); }}

            >


                <ModalOverlay/>
                <ModalContent  bg={global_css.modal_bg} style={{color: 'white', maxHeight : '50rem'}} maxW="50%">
                    <ModalHeader>{data?.first_name} {data?.last_name}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6} >


                            {/*<FormControl>*/}
                            {/*    <FormLabel style={{*/}
                            {/*        fontWeight: 'bold',*/}
                            {/*        display: "flex",*/}
                            {/*        justifyContent: 'flex-start',*/}
                            {/*        alignItems: 'center',*/}
                            {/*        gap: '6px',*/}
                            {/*        fontSize: '12px'*/}
                            {/*    }}>{data?.first_name} {data?.last_name}</FormLabel>*/}
                            {/*</FormControl>*/}


                            <FormControl>
                                <div style={{
                                    width: '100%',
                                    height: '1px',
                                    margin: '0rem 0rem 2rem 0rem',
                                    backgroundColor: '#404040'
                                }}></div>
                            </FormControl>


                            <FormControl>
                                <div style={{display: 'flex', gap : '13rem', alignItems: 'flex-start'}}>

                                    <div style={{
                                        display: 'flex',
                                        justifyItems: 'center',
                                        alignItems: 'flex-start',
                                        flexDirection: 'column',
                                        gap: '1rem'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>{t('operators')}</span>
                                            <span style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                width: '10rem'
                                            }}>{data?.operator_name}</span>
                                        </div>


                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>ICCID</span>
                                            <span style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                width: '10rem'
                                            }}>{data?.iccid}</span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>{t('simNumber')}</span>
                                            <span style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                width: '10rem'
                                            }}>{data?.sim_number}</span>
                                        </div>
                                    </div>


                                    <div style={{
                                        display: 'flex',
                                        justifyItems: 'center',
                                        alignItems: 'flex-start',
                                        flexDirection: 'column',
                                        gap: '1rem'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Price</span>
                                            <span style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                width: '10rem'
                                            }}>$ {data?.buying_price}</span>
                                        </div>


                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>{t('status')}</span>
                                            <span style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                width: '10rem'
                                            }}>{data?.status}</span>
                                        </div>
                                    </div>


                                </div>
                            </FormControl>

                            <FormControl>
                                <div style={{
                                    width: '100%',
                                    height: '1px',
                                    margin: '2rem 0px',
                                    backgroundColor: '#404040'
                                }}></div>
                            </FormControl>






                            <FormControl>
                                <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Rejection note<span style={{color:'red'}}></span></FormLabel>
                                <textarea
                                    disabled={user.role === 'AGENT'}
                                    onChange={(e) => setNote(e.target.value)}
                                    value={note}
                                    style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border : '1px solid #595959',
                                        borderRadius : '5px',
                                        background : '#404040',
                                        minHeight:'4rem',
                                        width:'100%',padding:'1rem'
                                    }}   />

                            </FormControl>


                    </ModalBody>

                    <ModalFooter>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Button style={{color: '#999999'}} onMouseDown={(e) => {
                                    e.target.style.backgroundColor = '#999999';
                                }}
                                        onMouseUp={(e) => {
                                            e.target.style.backgroundColor = '';
                                        }} colorScheme='white' variant='outline' onClick={() => {
                                    onClose();
                                    handleModalClose();
                                }}>{t('cancel')}</Button>

                                {user.role === 'ADMIN'?<Button onMouseDown={(e) => {
                                    e.target.style.backgroundColor = '#1EAB5E';
                                }}
                                        onMouseUp={(e) => {
                                            e.target.style.backgroundColor = '#27CF7A';
                                        }}  style={{background: "#27CF7A", color: 'white'}}
                                        onClick={saveInfo}
                                        ml={3}>
                                    Submit
                                </Button>:<Button onMouseDown={(e) => {
                                    e.target.style.backgroundColor = '#1EAB5E';
                                }}
                                        onMouseUp={(e) => {
                                            e.target.style.backgroundColor = '#27CF7A';
                                        }}  style={{background: "#27CF7A", color: 'white'}}
                                        onClick={() => {onSaveOpen(); onClose()}}
                                        ml={3}>
                                    Edit and Resubmit
                                </Button>}
                            </div>
                        </div>
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

                      input:focus {
                        outline: none;
                      }


                    `
                }

            </style>
        </div>
    );
};

export default RejectionComponent;