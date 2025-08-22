import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import ScrollbarContent from "../SimList/SellSimComponents/ScrollbarContent.jsx";
import {convertString, revertString} from "../../commonFunctions/StringConversion.jsx";
import axios from "axios";
import config from "../../../config.jsx";
import ActivationList from "../SimActivation/ActivationList.jsx";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../../Context/AuthInfo.jsx";
import Popnotification from "../../PopNotification/Popnotification.jsx";
import RejectionComponent from "../SimList/SellSimComponents/RejectionComponent.jsx";
import moment from 'moment';
import { faL } from '@fortawesome/free-solid-svg-icons';



const ViewClientInfo = ({isOpen, onClose, saveOpen, oid, setstatusx, type, activationList, statusx}) => {

    const {token, changeR, user} = useAuth();
    const [data, setData] = useState({})
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [popuptype,setpopuptype]=useState('')
    
    const { isOpen : isRejectOpen, onOpen: onRejectOpen, onClose: onRejectClose } = useDisclosure()





  






    // const errorchecker=(data)=>{


    //             if(data){

    //          console.log("datacc",data)

	// 			const ar=['date_birth' ,'top_up' ,'old_photo_sim_url' ,'taxcodeimage_url' ,'mandatory_taxcode_img_url']


	// 			const namear=['Date of birth' ,'Top up' ,'Upload the photo of the old SIM' ,
    //             'Upload Original and Photocopy Tax Code',
    //             'No one portability without a copy of the mandatory tax code?']

	// 			let xx = [];
	// 			for (let i = 0; i <= ar.length; i++) {
	// 				if(	data[ar[i]] === ''){
	// 					xx.push(namear[i])
	// 				}
	// 			}

    //             console.log("err0rr",xx)
	// 			// setcustomerrormsg(`please fill: ${xx}`)
    //         }
    // }

    const errorchecker = (data) => {
        let res=false
        setpopuptype('')
        if (data) {
            const ar = ['date_birth', 'top_up', 'old_photo_sim_url', 'taxcodeimage_url', 'mandatory_taxcode_img_url'];
            const namear = ['Date of birth', 'Top up', 'Upload the photo of the old SIM', 'Upload Original and Photocopy Tax Code', 'No one portability without a copy of the mandatory tax code?'];
            
            const xx = [];
            
            // Loop through each key in ar to check for missing values
            for (let i = 0; i < ar.length; i++) {
                // Check if the key exists in the data object and its value is empty
                if (!data.hasOwnProperty(ar[i]) || data[ar[i]] === '') {
                    // If the key doesn't exist or the value is empty, push the corresponding error message to xx
                    xx.push(namear[i]);
                }
            }
            
            console.log("Errors:", xx);
            // setcustomerrormsg(`please fill: ${xx}`)
            

            

            if(xx?.length >0){
                res =true
                setshowpopupmsg(`please fill : ${xx}`)
                setpopuptype('')
                setshowpopupstatus('fail')
                setshowpopup(true)
                setTimeout(() => {
                    setshowpopup(false)

                }, 4000);
            }else{
                res= false
            }

        }
        return res
    };

    const saveInfo = async () => {
        let xerr=errorchecker(data)
        if (xerr !== true){

        try {

            console.log("Data object:", data);  // Add this line

            const documentFiles = [];

            // Push each file object into the documentFiles array
            for (let i = 1; i <= 6; i++) {
                const fileUrlKey = `file_${i}_url`;
                const fileFileKey = `file_${i}_file`;

                // Log each key and its corresponding value
                console.log(`Checking key: ${fileUrlKey}, value: ${data[fileUrlKey]}`);

                if (data[fileUrlKey]) {
                    documentFiles.push({
                        fileUrl: data[fileUrlKey],
                        originalFilename: data[fileFileKey]
                    });
                }
            }

            console.log("Document files array:", documentFiles);
            const sending = {

                firstName: data?.first_name,
                lastName: data?.last_name,
                gender: data?.gender,
                dateOfBirth:moment(data?.date_birth).toISOString(),
                taxIdCode: data?.tax_code,
                nationality: data?.nationality,
                email: data?.email,
                documentNumber: data?.docNumber,
                placeOfIssue: data?.placeOfIssue,
                documentIssueDate: moment(data?.docIssueDate).toISOString(),
                documentExpirationDate: moment(data?.docExpireDate).toISOString(),
                clientAddress: data?.client_address,
                location: data?.location,
                prov: data?.prov,
                postalCode: data?.postalcode,
                telephone: data?.tel,
                topUp: data?.top_up,
                simId: oid,
                offerId: data?.offerid,
                oldOperatorId: data?.old_operator?.id,
                oldICCIDNumber: data?.old_iccn,
                oldSIMNumber: data?.old_sim_number,
                oldSIMFileURL: {
                    "fileUrl": data?.old_photo_sim_url,
                    "originalFilename": data?.old_photo_sim_file
            },

                originalAndPhotocopyTaxCodeFileURL: {
                    "fileUrl": data?.taxcodeimage_url,
                    "originalFilename": data?.taxcodeimage_file
            },
                copyOfMandatoryTaxCodeFileURL: {
                "fileUrl": data?.mandatory_taxcode_img_url,
                    "originalFilename": data?.mandatory_taxcode_img_file
            },
                note: data?.note,
                documentFileURLs: documentFiles




        }
            console.log("================data", sending)

            const response = await axios.post(`${config.apiUrl}/api/sales`, sending, {
                headers: {
                    Authorization: `Bearer ${token}`
                }});
            console.log('Response:user:===', response);
            await setData({})
            await onClose()
            await localStorage.removeItem('saleId');
            setshowpopupmsg('Save Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)
                changeR('Activation')

            }, 1500);
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg(error?.response?.data?.error)
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }

    }
    };

    const editInfo = async () => {
        let xerr=errorchecker(data)
        if (xerr !== true){

      
        try {

            console.log("Data object:", data);  // Add this line

            const documentFiles = [];

            // Push each file object into the documentFiles array
            for (let i = 1; i <= 6; i++) {
                const fileUrlKey = `file_${i}_url`;
                const fileFileKey = `file_${i}_file`;

                // Log each key and its corresponding value
                console.log(`Checking key: ${fileUrlKey}, value: ${data[fileUrlKey]}`);

                if (data[fileUrlKey]) {
                    documentFiles.push({
                        fileUrl: data[fileUrlKey],
                        originalFilename: data[fileFileKey]
                    });
                }
            }

            console.log("Document files array:", documentFiles);
            const sending = {

                firstName: data?.first_name,
                lastName: data?.last_name,
                gender: data?.gender,
                dateOfBirth:new Date(data?.date_birth).toISOString(),
                taxIdCode: data?.tax_code,
                nationality: data?.nationality,
                email: data?.email,
                documentNumber: data?.docNumber,
                placeOfIssue: data?.placeOfIssue,
                documentIssueDate: new Date(data?.docIssueDate).toISOString(),
                documentExpirationDate: new Date(data?.docExpireDate).toISOString(),
                clientAddress: data?.client_address,
                location: data?.location,
                prov: data?.prov,
                postalCode: data?.postalcode,
                telephone: data?.tel,
                topUp: data?.top_up,
                simId: oid,
                offerId: data?.offerid,
                oldOperatorId: data?.old_operator?.id,
                oldICCIDNumber: data?.old_iccn,
                oldSIMNumber: data?.old_sim_number,
                oldSIMFileURL: {
                    "fileUrl": data?.old_photo_sim_url,
                    "originalFilename": data?.old_photo_sim_file
            },

                originalAndPhotocopyTaxCodeFileURL: {
                    "fileUrl": data?.taxcodeimage_url,
                    "originalFilename": data?.taxcodeimage_file
            },
                copyOfMandatoryTaxCodeFileURL: {
                "fileUrl": data?.mandatory_taxcode_img_url,
                    "originalFilename": data?.mandatory_taxcode_img_file
            },
                note: data?.note,
                documentFileURLs: documentFiles




        }
            console.log("================data", sending, data?.sales_id)

            const response = await axios.put(`${config.apiUrl}/api/sales/${data?.sales_id}`, sending, {
                headers: {
                    Authorization: `Bearer ${token}`
                }});
            console.log('Response:sale:update:===', response);
            await setData({})
            await onClose()
            await changeStaus(data?.sales_id)
            
            await localStorage.removeItem('saleId');
            setshowpopupmsg('Update Success')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)
                 changeR('Activation')
            }, 1500);
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
    }
    };
    const handleModalClose = () => {
        localStorage.removeItem('saleId');
    }



    const changeStaus = async (id) =>{
        try{
        const datak = {
            'status' : `pending`
        }
        console.log('tessssssssssst', id, datak)
        const response = await axios.put(`${config.apiUrl}/api/sales/${id}/update/status`, datak, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Response:change', response);


} catch (error) {
    console.error('Error++++:status', error);
    setshowpopupmsg(error?.response?.data?.error)
    setshowpopupstatus('fail')
    setshowpopup(true)
    throw error;
}}




useEffect(() => {
    let locaStoragedatax=JSON.parse(localStorage.getItem('saleId')) || []
    let locaStoragedataxy=locaStoragedatax?.filter(n=> n.id === oid)
    let locaStoragedata=locaStoragedataxy[0]?.data
    setData(locaStoragedata)
    
    // console.log("localdatauc122", oid,locaStoragedata)
   console.log("dsfsdf",oid,locaStoragedatax)
}, [oid,isOpen]);


    return (


        <div>
            <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} type={popuptype} /> 
            {/* {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } */}
            <RejectionComponent activationList={activationList}  isOpen={isRejectOpen} onClose={onRejectClose} oid={oid} type={'activation'}/>
            <Modal
                isOpen={isOpen}
                onClose={() => { onClose(); handleModalClose(); }}

            >


                <ModalOverlay/>
                <ModalContent  bg={global_css.modal_bg} style={{color: 'white', maxHeight : '50rem'}} maxW="50%">
                    <ModalHeader>Client Name </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6} >

                        <ScrollbarContent>
                        <FormControl>
                            <FormLabel style={{
                                fontWeight: 'bold',
                                display: "flex",
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px'
                            }}>{data?.first_name} {data?.last_name}</FormLabel>
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
                                        }}>Operator</span>
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
                                        }}>Sim Number</span>
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
                                        }}>Status</span>
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
                            <div style={{display: 'flex', alignItems: 'flex-start', gap : '13rem'}}>

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
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>First Name</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.first_name}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Last Name</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.last_name}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Gender</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.gender? convertString(data?.gender) : ''}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Date of birth</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.date_birth}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>TaxId</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.tax_code}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Nationality</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.nationality}</span>
                                    </div>

<div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Email</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '10rem'
                                        }}>{data?.email}</span>
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
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                        // flexDirection: 'row'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '9rem'
                                        }}>Date & Time</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '20rem'
                                        }}>{data?.old_operator?.dateTime}</span>
                                    </div>
     <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            // flexDirection: 'column'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '9rem'
                                        }}>Document Number</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '20rem'
                                        }}>{data?.docNumber}</span>
                                    </div> <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            // flexDirection: 'column'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '9rem'
                                        }}>Place of issue</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '20rem'
                                        }}>{data?.placeOfIssue}</span>
                                    </div>
<div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            // flexDirection: 'column'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '9rem'
                                        }}>Document issue date</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '20rem'
                                        }}>{data?.docIssueDate}</span>
                                    </div><div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            // flexDirection: 'column'
                                        }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '9rem'
                                        }}>Document expiration date</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            width: '20rem'
                                        }}>{data?.docExpireDate}</span>
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

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                    flexDirection : 'column',
                                    marginBottom : '2rem'
                                }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Full Address</span>
                                    <span style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '10rem'
                                    }}>{data?.client_address}</span>
                                </div>
                            <div style={{display: 'flex',gap : '13rem', alignItems: 'flex-start'}}>

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
                                        }}>Location</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.location}</span>
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
                                        }}>City</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.location}</span>
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
                                        }}>Post Code</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.postalcode}</span>
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
                                        }}>TelePhone</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.tel}</span>
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
                                        }}>Top up</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.top_up}</span>
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
                                        }}>Old operator</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.old_operator?.name}</span>
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
                                        }}>Old ICCID numbe</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.old_iccn}</span>
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
                                        }}>Old Sim number</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.old_sim_number}</span>
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
                        {/*222*/}
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
                                        }}>Old sim photo</span>
                                        <span title={data?.old_photo_sim_file} style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.old_photo_sim_file? data?.old_photo_sim_file.length  > 18? data?.old_photo_sim_file.slice(0, 18) : data?.old_photo_sim_file : ''}{data?.old_photo_sim_file && data?.old_photo_sim_file.length > 18? '...' : ''}</span>
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
                                        }}>Original & photocopy tax code</span>
                                        <span title={data?.taxcodeimage_file} style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.taxcodeimage_file? data?.taxcodeimage_file.length > 18? data?.taxcodeimage_file.slice(0, 18) : data?.taxcodeimage_file : ''}{data?.taxcodeimage_file && data?.taxcodeimage_file.length > 18? '...' : ''}</span>
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
                                        }}>Mandatory tax code?</span>
                                        <span title={data?.mandatory_taxcode_img_file} style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{data?.mandatory_taxcode_img_file? data?.mandatory_taxcode_img_file.length > 18? data?.mandatory_taxcode_img_file.slice(0, 18) : data?.mandatory_taxcode_img_file : ''}{data?.mandatory_taxcode_img_file && data?.mandatory_taxcode_img_file.length > 18? '...' : ''}</span>
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
                                        }}>Document 1</span>
                                        <span title={data?.file_1_file} style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{ data?.file_1_file?data?.file_1_file.length > 18? data?.file_1_file.slice(0, 18) : data?.file_1_file : ''}{data?.file_1_file && data?.file_1_file.length > 18? '...' : ''}</span>
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
                                        }}>Document 2</span>
                                        <span title={data?.file_2_file} style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{ data?.file_2_file?data?.file_2_file.length > 18? data?.file_2_file.slice(0, 18) : data?.file_2_file : ''}{data?.file_2_file && data?.file_2_file.length > 18? '...' : ''}</span>
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
                                        }}>Document 3</span>
                                        <span title={data?.file_3_file} style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{ data?.file_3_file?data?.file_3_file.length > 18? data?.file_3_file.slice(0, 18) : data?.file_3_file : ''}{data?.file_3_file && data?.file_3_file.length > 18? '...' : ''}</span>
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
                                        }}>Document 4</span>
                                        <span title={data?.file_4_file} style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{ data?.file_4_file?data?.file_4_file.length > 18? data?.file_4_file.slice(0, 18) : data?.file_4_file : ''}{data?.file_4_file && data?.file_4_file.length > 18? '...' : ''}</span>
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
                                        }}>Document 5</span>
                                        <span title={data?.file_5_file} style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{ data?.file_5_file?data?.file_5_file.length > 18? data?.file_5_file.slice(0, 18) : data?.file_5_file : ''}{data?.file_5_file && data?.file_5_file.length > 18? '...' : ''}</span>
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
                                        }}>Document 6</span>
                                        <span title={data?.file_6_file} style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '10rem'
                                        }}>{ data?.file_6_file?data?.file_6_file.length > 18? data?.file_6_file.slice(0, 18) : data?.file_6_file : ''}{data?.file_6_file && data?.file_6_file.length > 18? '...' : ''}</span>
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
                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>

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
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                        flexDirection: 'column'
                                    }}>
                                        <span style={{
                                            color: '#29CC79',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '9rem'
                                        }}>Note</span>
                                        <span style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            width: '100%'
                                        }}>{data?.note}</span>
                                    </div>


                                </div>


                            </div>
                        </FormControl>
                        </ScrollbarContent>

                    </ModalBody>

                    <ModalFooter>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            {type === 'activation' && user.role === 'ADMIN'?<Button onMouseDown={(e) => {
                                e.target.style.backgroundColor = '#E55245';
                            }}
                                                           onMouseUp={(e) => {
                                                               e.target.style.backgroundColor = '#E55245';
                                                           }} onClick={() => {
                                                               onClose();
                                                               onRejectOpen();
                            }} style={{background: "#E55245", color: 'white'}}
                                                           ml={3}>
                                Reject
                            </Button> : user.role === 'AGENT' && statusx > 0?<Button style={{color: '#27CF7A'}} onMouseDown={(e) => {
                                e.target.style.backgroundColor = '#999999';
                            }}
                                    onMouseUp={(e) => {
                                        e.target.style.backgroundColor = '';
                                    }} colorScheme='#27CF7A' variant='outline' onClick={() => {
                                onClose();
                                saveOpen();
                                setstatusx(0)
                            }}>Edit</Button> : <p>‎</p>}
                            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Button style={{color: '#999999'}} onMouseDown={(e) => {
                                    e.target.style.backgroundColor = '#999999';
                                }}
                                        onMouseUp={(e) => {
                                            e.target.style.backgroundColor = '';
                                        }} colorScheme='white' variant='outline' onClick={() => {
                                    onClose();
                                    type === 'activation'? handleModalClose() : setstatusx(0)
                                }}>Cancel</Button>

                                {user.role === "ADMIN" || (user.role === "AGENT" && type === 'activation')? 
                                <Button onMouseDown={(e) => {
                                    e.target.style.backgroundColor = '#1EAB5E';
                                }}
                                        onMouseUp={(e) => {
                                            e.target.style.backgroundColor = '#27CF7A';
                                        }} onClick={() => data?.edit? editInfo() : saveInfo()} style={{background: "#27CF7A", color: 'white'}}
                                        ml={3}>
                                    DownLoad
                                </Button> 
                                 : <Button onMouseDown={(e) => {
                                    e.target.style.backgroundColor = '#1EAB5E';
                                }}
                                        onMouseUp={(e) => {
                                            e.target.style.backgroundColor = '#27CF7A';
                                        }} onClick={() => data?.edit? editInfo() : saveInfo()} style={{background: "#27CF7A", color: 'white'}}
                                        ml={3}>
                                    {data?.edit? 'Resubmit' : 'Submit'}
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


export default ViewClientInfo;