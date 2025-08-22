import React, { useEffect, useState } from 'react';
import SenderInformationSave from "./cargoComponents/SenderInformationSave.jsx";
import { useAuth } from "../../Context/AuthInfo.jsx";
import { Button, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import ReceiverInformation from "./cargoComponents/ReceiverInformation.jsx";
import OrderDetails from "./cargoComponents/OrderDetails.jsx";
import axios from "axios";
import config from "../../config.jsx";
import OrderMeasurements from "./cargoComponents/OrderMeasurements.jsx";
import DeliveryDetails from "./cargoComponents/DeliveryDetails.jsx";
import OrderDetailsBd from "./cargoComponents/OrderDetailsBD.jsx";
import {Title} from "@tremor/react";
import {useTranslation} from "react-i18next";
const AddCargoOrder = ({setList , getData, formType, setFormType, courierForm, setCourierForm, getInitialFormState}) => {
    const {t} = useTranslation()
    const { user, token } = useAuth();
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('success');
    const [showpopoupmsg, setshowpopupmsg] = useState('');
    const [tableData, setTableData] = useState([]);


    useEffect(() => {
        const commissionList = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/api/courierType`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTableData(response.data.courierTypes);
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        };
        commissionList();
        // setCourierForm(getInitialFormState(formType));
    }, []);



    const handleChange = (field, value) => {
        setCourierForm((prevCourier) => ({
            ...prevCourier,
            [field]: value,
        }));
    };

    const handleSelectChange = (e) => {
        const value = e.target.value;
        const selectedItem = tableData.find(item => item.id === parseInt(value));
        if (selectedItem) {
            setFormType(selectedItem.courierTypeName);
            setCourierForm(getInitialFormState(selectedItem.courierTypeName));
        }
        handleChange('courierTypeId', value);
    };

    function getInitialFormState(formType) {
        const commonState = {
            courierTypeId: '',
            senderInfo: {
                senderType: null,
                firstName: "",
                lastName: "",
                documentNo: "",
                codiceFiscale: "",
                phone: "",
                email: "",
                city: "",
                state: "",
                postalCode: "",
                address: "",
                uploadedFileNameSender: "",
                uploadedFileUrlSender: "",
            },
            receiverInfo: {
                receiverType: null,
                firstName: "",
                lastName: "",
                phone: "",
                optionalPhone: "",
                postalCodeCAP: "",
                email: "",
                city: "",
                state: "",
                country: "",
                address: "",
            },
            orderNote: "",
            status: "pending",
        };

        if (formType === 'Italy goods') {
            return {
                ...commonState,
                orderDetails: {
                    commissionRow: [
                        {
                            rowId: 1,
                            productDescription: "",
                            weight: null,
                            perKg: null,
                            charge: null,
                            total: null,
                            totalCommission : null
                        },

                    ],
                    serviceCharge: null,
                    totalAgentCommision: null,
                    totalWithHomeDeliveryCharge: null,
                    totalAmount: null
                },
            };
        } else if (formType === 'International goods') {
            return {
                ...commonState,

                orderDetails: {
                    commissionRow: [
                        {
                            productDescription: "",
                            weight: null,
                            perKg: null,
                            charge: null,
                            total: null,
                            totalCommission : null
                        },
                    ],
                    serviceCharge: null,
                    totalAgentCommision: null,
                    deliveryCharge: null,
                    totalWithHomeDeliveryCharge: null,
                    orderMesurments: [
                        {
                            rowId: 1,
                            boxNo: "",
                            length: "",
                            width: "",
                            height: "",
                            volumetricWeight: ""
                        },
                    ],

                },
            };
        } else {
            return {
                ...commonState,

                orderDetails: {
                    commissionRow: [
                        {
                            boxNo: "",
                            type: "",
                            productDescription: "",
                            weight: null,
                            cusCha: "",
                            perKg: null,
                            charge: null,
                            gValue: null,
                            iAmount: null,
                            total: null,
                            totalCommission : null
                        },
                    ],
                    serviceCharge: null,
                    totalCusCha: null,
                    totalWeight: null,
                    totalGValue: null,
                    totalIAmount: null,
                    totalCharge: null,
                    totalPerKg: null,
                    totalBoxNo: null,

                    totalAgentCommision: null,
                    deliveryCharge: null,
                    totalWithHomeDeliveryCharge: null,
                    deliveryDetails: {
                        deliveryCondition: "",
                        dhakaAddress: "",
                        deliveryCharge: null,
                        productDetailsFileName: "",
                        productDetailsFileUrl: "",
                    },
                },
            };
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${config.apiUrl}/api/courier`, courierForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Response:', response);

            if (response.status === 201) {
                setshowpopupmsg('Courier added successfully!');
                setshowpopupstatus('success');
                setshowpopup(true);

                console.log('Before setTimeout');

                // Wait for the popup to display before updating state
                setTimeout(() => {
                    console.log('Inside setTimeout');
                    setshowpopup(false);
                    getData(); // Fetch updated data
                    setList(true); // Switch to CouriereTable
                    setCourierForm(getInitialFormState(formType)); // Reset form state
                }, 1500);
            } else {
                console.error('Unexpected status:', response.status);
                setshowpopupmsg('Unexpected status');
                setshowpopupstatus('fail');
                setshowpopup(true);

                setTimeout(() => {
                    setshowpopup(false);
                }, 1500);
            }
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

    const handleUpdate = async () => {
        try {

            console.log("call you mine", courierForm)
            const response = await axios.put(`${config.apiUrl}/api/courier/${courierForm?.id}`, courierForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Response:', response);
                setshowpopupmsg('Courier Updated successfully!');
                setshowpopupstatus('success');
                setshowpopup(true);

                console.log('Before setTimeout');

                // Wait for the popup to display before updating state
                setTimeout(() => {
                    console.log('Inside setTimeout');
                    setshowpopup(false);
                    getData(); // Fetch updated data
                    setList(true); // Switch to CouriereTable
                    setCourierForm(getInitialFormState(formType)); // Reset form state
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

    console.log("form----------->0", courierForm)
    return (
        <div style={{ overflow: 'scroll', height: 'calc(100vh - 6.5rem)', width: '100%'}}>
            <Title className="text-3xl text-white px-2 py-5">Add Cargo Order</Title>
            <div
                style={{
                    background: '#2B2B33',
                    color: 'white',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    paddingTop: '15px',
                    paddingBottom: '40px',
                    borderRadius: '15px',
                }}
            >
                <FormControl className="mb-4">
                    <FormLabel style={{ fontWeight: 'bold' }}>Order Type</FormLabel>
                    <select
                        onChange={handleSelectChange}
                        value={courierForm?.courierTypeId}
                        style={{ border: '1px solid #595959' }}
                        className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <option value="">Select</option>
                        {tableData?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.courierTypeName}
                            </option>
                        ))}
                    </select>
                </FormControl>
            </div>
            <br />
            <div style={{ display: 'flex', alignItems: 'start', gap: '1%' }}>
                <SenderInformationSave courierForm={courierForm} setCourierForm={setCourierForm} />
                <ReceiverInformation courierForm={courierForm} setCourierForm={setCourierForm} />
            </div>
            {formType === 'International goods'?<div>
                <br/>
                <OrderMeasurements courierForm={courierForm} setCourierForm={setCourierForm}/>
            </div> : formType === 'Bangladeshi goods'?<div>
                <br/>
                <DeliveryDetails
                    courierForm={courierForm} setCourierForm={setCourierForm}/>
            </div> : null}

            {formType === 'Bangladeshi goods'? <div>
            <br />
            <OrderDetailsBd courierForm={courierForm} setCourierForm={setCourierForm} formType={formType} courierTypes={tableData} /></div> : <div>
            <br />
            <OrderDetails courierForm={courierForm} setCourierForm={setCourierForm} formType={formType} courierTypes={tableData} /></div>}
            <br />
            <div
                style={{
                    background: '#2B2B33',
                    color: 'white',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    paddingTop: '15px',
                    paddingBottom: '40px',
                    borderRadius: '15px',
                }}
            >
                <FormControl>
                    <FormLabel style={{ fontWeight: 'bold', fontSize: '12px' }}>Order note</FormLabel>
                    <Textarea
                        onChange={(e) => handleChange('orderNote', e.target.value)}
                        value={courierForm?.orderNote}
                        style={{
                            outline: 'none !important',
                            boxShadow: 'none',
                            border: '1px solid #595959',
                            background: '#404040',
                        }}
                        placeholder="Enter order note ..."
                    />
                </FormControl>
                <div style={{ marginTop: '1%' }}>
                    <Button
                        onMouseDown={(e) => {
                            e.target.style.backgroundColor = '#999999';
                        }}
                        onMouseUp={(e) => {
                            e.target.style.backgroundColor = '';
                        }}
                        colorScheme="white"
                        variant="outline"

                        onClick={() => {
                            setList(true)
                            setCourierForm(getInitialFormState(formType))

                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        onMouseDown={(e) => {
                            e.target.style.backgroundColor = '#1EAB5E';
                        }}
                        onMouseUp={(e) => {
                            e.target.style.backgroundColor = '#27CF7A';
                        }}
                        style={{ background: '#27CF7A', color: 'white' }}
                        ml={3}
                    onClick={

                            courierForm?.id ? handleUpdate : handleSubmit
                    }

                    >
                        {courierForm?.id? 'Update Order' : t('requestOrder')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddCargoOrder;
