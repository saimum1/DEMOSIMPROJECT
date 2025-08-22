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
import axios from "axios";
import config from "../../../config.jsx";
import { v4 as uuidv4 } from 'uuid';
import StatusDropDown from "../StatusDropDown.jsx";
import {convertString, revertString} from "../../commonFunctions/StringConversion.jsx";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../Context/AuthInfo.jsx";

const AddNewAgent = ({isOpen, onClose ,actionType, data, getData, preview}) => {
    const {t} = useTranslation()
    const { user , token, changeLoad } = useAuth();
    const [url, setURL] = useState('');
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const[selectedlang,Setselectedlang]=useState(null)
    const[selected,SetSelected]=useState( false)
    const [agent, setAgent] = useState({
        uid: uuidv4().slice(-8),
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
        const data =    {
                "taxIdCode": agent.taxIdCode,
                "vatNumber": agent.vatNumber,
                "pecId": agent.pecId,
                "codiceUnivoco": agent.codiceUnivoco,
                "address": agent.address,
                "city": agent.city,
                "referenceCode": agent.referenceCode,

                "uid": agent.uid,
                "contactPerson" : agent.contactPerson,
                "name": agent.name,
                "username": agent.username,
                "email": agent.email,
                "mobile": agent.phone,
                "dateOfBirth": "1990-05-15T12:30:00Z",
                "password": "securepassword",
                "status": selectedlang?.name? revertString(selectedlang?.name) : ''
            }


            const response = await axios.post(`${config.apiUrl}/api/agents`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);


            setAgent({
                uid: uuidv4().slice(-8),
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
            Setselectedlang({})
            setshowpopupmsg('Agent successfully addded!');
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

                "uid": agent.uid,
                "contactPerson" : agent.contactPerson,
                "name": agent.name,
                "username": agent.username,
                "email": agent.email,
                "mobile": agent.phone,
                "dateOfBirth": "1990-05-15T12:30:00Z",
                "password": "securepassword",
                "status": revertString(selectedlang?.name)
            }


            const response = await axios.put(`${config.apiUrl}/api/agents/${data.id}`, datak, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);


            setAgent({
                uid: uuidv4().slice(-8),
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
            Setselectedlang({})
            setshowpopupmsg('Agent successfully Updated!');
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
        console.log("agentAction",actionType)
        if (actionType) {
            console.log("kkkk", data.user?.status)
            SetSelected(convertString(data?.user?.status))

            setAgent(prevState => ({
                ...prevState,
                email: data?.user?.email,
                uid: data?.user?.uid,
                phone: data?.user?.mobile,
                name: data.user?.name,
                username: data.user?.username,
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
            setAgent(prevState => ({
                ...prevState,
                uid:  uuidv4().slice(-8),
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
            }));
            Setselectedlang({})
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
                    <ModalHeader >{actionType ?'Edit Agent':'Add new agent'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} style={{maxHeight : '500px', overflow : 'auto'}}>
                        <FormControl className="mb-4">
                            <FormLabel style={{fontWeight :'bold'}}>Agent UID <span className="px-1 py-0.5 bg-[#27CF7AFF] rounded-2xl text-[10px]">Auto</span></FormLabel>
                            <Input
                                disabled
                                value={agent.uid}
                                onChange={(e) => handleChange('uid', e.target.value)}
                                style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}

                                   placeholder=''/>
                        </FormControl>

                        <FormControl className="mb-4">
                            <FormLabel style={{fontWeight :'bold'}}>{t('agentName')}</FormLabel>
                            <Input
                                value={agent.name}
                                onChange={(e) => handleChange('name', e.target.value)}

                                style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}

                                   placeholder={t('agentName')}/>
                        </FormControl>
                        <div className="flex items-center gap-2 justify-between mb-4">
                            <FormControl>
                                <FormLabel style={{fontWeight :'bold'}}>{t('email')}</FormLabel>
                                <Input
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

                                <Input
                                    value={agent.username}
                                    onChange={(e) => handleChange('username', e.target.value)}

                                    style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder={t('userName')}/>
                            </FormControl>
                        </div> <div className="flex items-center gap-2 justify-between mb-4">
                            <FormControl>
                                <FormLabel style={{fontWeight :'bold'}}>{t('mobile')}</FormLabel>
                                <Input
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

                                <Input

                                    value={agent.contactPerson}
                                    onChange={(e) => handleChange('contactPerson', e.target.value)}
                                    style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder={t('contactPerson')}/>
                            </FormControl>
                        </div> <div className="flex items-center gap-2 justify-between mb-4">
                            <FormControl>
                                <FormLabel style={{fontWeight :'bold'}}>Tax ID Code</FormLabel>
                                <Input

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

                                <Input
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
                                <Input
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

                                <Input

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
                                <Input

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

                                <Input

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
                                <Input

                                    value={agent.referenceCode}
                                    onChange={(e) => handleChange('referenceCode', e.target.value)}


                                    style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='reference code'/>
                            </FormControl>


                                <FormControl >
                                    <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px'}}>{t('status')}</FormLabel>
                                    <StatusDropDown selected={selected} SetSelected={SetSelected} action={actionType} selectedlang={selectedlang} Setselectedlang={Setselectedlang}/>


                                </FormControl>

                        </div>
                    </ModalBody>

                  <ModalFooter>

                      {preview? null :<Button colorScheme='white' variant='outline' onClick={onClose}>{t('cancel')}</Button>}
                      {preview? null :<Button onClick={actionType? handleUpdate : handleSubmit}  style={{background: "#27CF7A", color: 'white'}} ml={3}>
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

export default AddNewAgent;