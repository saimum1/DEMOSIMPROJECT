import React, {useEffect, useState} from 'react';
import Popnotification from "../../PopNotification/Popnotification.jsx";
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
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import StatusDropDown from "../StatusDropDown.jsx";
import axios from "axios";
import config from "../../../config.jsx";
import {useAuth} from "../../../Context/AuthInfo.jsx";
import {useTranslation} from "react-i18next";

const AddAgentReques = ({isOpen, onClose ,actionType, data, getData, preview}) => {
    const {t} = useTranslation()
    const { user , token, changeLoad } = useAuth();
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const[selected,SetSelected]=useState( false)
    const [agent, setAgent] = useState({
        name: '',
        email: '',
        username: '',
        phone: '',
        contactPerson: '',
        taxIdCode: '',
        vatNumber: '',
        pecId: '',
        codiceUnivoco: '',
        address: '',
        city: '',
        referenceCode: '',
    });

    const handleChange = (field, value) => {
        setAgent((prevAgent) => ({
            ...prevAgent,
            [field]: value,
        }));
    };


    const handleSubmit = async () => {
        try {
            const data = {
                "taxIdCode": agent.taxIdCode,
                "vatNumber": agent.vatNumber,
                "pecId": agent.pecId,
                "codiceUnivoco": agent.codiceUnivoco,
                "address": agent.address,
                "city": agent.city,
                "referenceCode": agent.referenceCode,
                "contactPerson": agent.contactPerson,
                "agentName": agent.name,
                "userName": agent.username,
                "email": agent.email,
                "phone": agent.phone,
            };

            const response = await axios.post(`${config.apiUrl}/api/agentRequests`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);

            setAgent({
                name: '',
                email: '',
                username: '',
                phone: '',
                contactPerson: '',
                taxIdCode: '',
                vatNumber: '',
                pecId: '',
                codiceUnivoco: '',
                address: '',
                city: '',
                referenceCode: '',
            });
            await changeLoad()
            setshowpopupmsg('Agent request added!');
            setshowpopupstatus('success');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false)
            }, 1500);
            onClose();
            await getData()
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
    const handleUpdate = async () => {
        try {
            const datak =    {
                "taxIdCode": agent.taxIdCode,
                "vatNumber": agent.vatNumber,
                "pecId": agent.pecId,
                "codiceUnivoco": agent.codiceUnivoco,
                "address": agent.address,
                "city": agent.city,
                "referenceCode": agent.referenceCode,
                "contactPerson" : agent.contactPerson,
                "agentName": agent.name,
                "userName": agent.username,
                "email": agent.email,
                "phone": agent.phone,

            }


            const response = await axios.put(`${config.apiUrl}/api/agentRequests/${data.id}`, datak, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);


            setAgent({
                name: '',
                email: '',
                username: '',
                phone: '',
                contactPerson: '',
                taxIdCode: '',
                vatNumber: '',
                pecId: '',
                codiceUnivoco: '',
                address: '',
                city: '',
                referenceCode: '',
            });
            await changeLoad()
            setshowpopupmsg('Agent successfully Updated');
            setshowpopupstatus('success');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            onClose();
            await getData()
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
        if (actionType) {
            setAgent(prevState => ({
                ...prevState,
                email: data?.email,
                phone: data?.phone,
                name: data?.agentName,
                username: data?.userName,
                contactPerson: data.contactPerson,
                taxIdCode: data.taxIdCode,
                vatNumber: data.vatNumber,
                pecId: data.pecId,
                codiceUnivoco: data.codiceUnivoco,
                address: data.address,
                city: data.city,
                referenceCode: data.referenceCode



            }))


        }else{
            setAgent({
                name: '',
                email: '',
                username: '',
                phone: '',
                contactPerson: '',
                taxIdCode: '',
                vatNumber: '',
                pecId: '',
                codiceUnivoco: '',
                address: '',
                city: '',
                referenceCode: '',
            });
        }

    }, [actionType, data]);
    return (
        <div>
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            <Modal
                isOpen={isOpen}
                onClose={onClose}


            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader >{actionType ?'Edit agent data':'Add agent data'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} style={{maxHeight : '500px', overflow : 'auto'}}>

                        <FormControl className="mb-4">
                            <FormLabel style={{fontWeight :'bold'}}>{t('agentName')}</FormLabel>
                            <Input disabled={preview}
                                value={agent.name}
                                onChange={(e) => handleChange('name', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}

                                placeholder='Enter agent name'/>
                        </FormControl>
                        <div className="flex items-center gap-2 justify-between mb-4">
                            <FormControl>
                                <FormLabel style={{fontWeight :'bold'}}>{t('email')}</FormLabel>
                                <Input disabled={preview}
                                    value={agent.email}
                                    onChange={(e) => handleChange('email', e.target.value)}

                                    type="email"  style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='example@mail.com'/>
                            </FormControl>

                            <FormControl>
                                <FormLabel style={{fontWeight :'bold'}}>{t('userName')}</FormLabel>

                                <Input disabled={preview}
                                    value={agent.username}
                                    onChange={(e) => handleChange('username', e.target.value)}

                                    style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border : '1px solid #595959',
                                        background : '#404040'
                                    }}  placeholder='username'/>
                            </FormControl>
                        </div> <div className="flex items-center gap-2 justify-between mb-4">
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>{t('mobile')}</FormLabel>
                            <Input disabled={preview}
                                value={agent.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='Ex. +88'/>
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>{t('contactPerson')}</FormLabel>

                            <Input disabled={preview}

                                value={agent.contactPerson}
                                onChange={(e) => handleChange('contactPerson', e.target.value)}
                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder={t('contactPerson')} />
                        </FormControl>
                    </div> <div className="flex items-center gap-2 justify-between mb-4">
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>Tax ID Code</FormLabel>
                            <Input disabled={preview}

                                value={agent.taxIdCode}
                                onChange={(e) => handleChange('taxIdCode', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='tax code'/>
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>VAT number</FormLabel>

                            <Input disabled={preview}
                                value={agent.vatNumber}
                                onChange={(e) => handleChange('vatNumber', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='vat number'/>
                        </FormControl>
                    </div> <div className="flex items-center gap-2 justify-between mb-4">
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>PEC ID</FormLabel>
                            <Input disabled={preview}
                                value={agent.pecId}
                                onChange={(e) => handleChange('pecId', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='pec ID'/>
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>Codice Univoco</FormLabel>

                            <Input disabled={preview}

                                value={agent.codiceUnivoco}
                                onChange={(e) => handleChange('codiceUnivoco', e.target.value)}
                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='codice Univoco'/>
                        </FormControl>
                    </div> <div className="flex items-center gap-2 justify-between mb-4">
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>{t('address')}</FormLabel>
                            <Input disabled={preview}

                                value={agent.address}
                                onChange={(e) => handleChange('address', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder={t('address')}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>City</FormLabel>

                            <Input disabled={preview}

                                value={agent.city}
                                onChange={(e) => handleChange('city', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='city'/>
                        </FormControl>
                    </div> <div className="flex items-center gap-2 justify-between mb-4">
                        <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>Reference code</FormLabel>
                            <Input disabled={preview}

                                value={agent.referenceCode}
                                onChange={(e) => handleChange('referenceCode', e.target.value)}


                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='reference code'/>
                        </FormControl>

                    </div>
                    </ModalBody>

                    <ModalFooter>

                        {preview? null :<Button colorScheme='white' variant='outline' onClick={onClose}>{t('cancel')}</Button>}
                        {preview? null :<Button onClick={actionType?handleUpdate : handleSubmit}  style={{background: "#27CF7A", color: 'white'}} ml={3}>
                            {actionType?'Update' : 'Save'}
                        </Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
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

export default AddAgentReques;