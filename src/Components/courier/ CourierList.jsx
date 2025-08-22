import React, {useEffect, useState} from 'react';
import AddCargoOrder from "./AddCargoOrder.jsx";
import CouriereTable from "./CouriereTable.jsx";
import axios from "axios";
import config from "../../config.jsx";
import {useAuth} from "../../Context/AuthInfo.jsx";

const CourierList = () => {
    const[list, setList] = useState(true)
    const [ tableData, setTableData ] = useState([])
    const [nodata, setNodata] = useState(false);
    const [loader, setLoader] = useState(false);
    const { user , token } = useAuth();
    const [formType, setFormType] = useState('Italy goods');
    const [courierForm, setCourierForm] = useState(getInitialFormState(formType));


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
                country: "Italy",
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
                        },
                    ],
                    serviceCharge: null,
                    totalAgentCommision: null,
                    totalWithHomeDeliveryCharge: null,
                    totalAmount: null,
                },
            };
        } else if (formType === 'International goods') {
            return {
                ...commonState,
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
                orderDetails: {
                    commissionRow: [
                        {
                            productDescription: "",
                            weight: null,
                            perKg: null,
                            charge: null,
                            total: null,
                        },
                    ],
                    serviceCharge: null,
                    totalAgentCommision: null,
                    deliveryCharge: null,
                    totalWithHomeDeliveryCharge: null,
                },
            };
        } else {
            return {
                ...commonState,
                deliveryDetails: {
                    deliveryCondition: "",
                    dhakaAddress: "",
                    deliveryCharge: null,
                    productDetailsFileName: "",
                    productDetailsFileUrl: "",
                },
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
                        },
                    ],
                    serviceCharge: null,
                    totalCusCha: null,
                    totalWeight: null,
                    totalGValue: null,
                    totalIAmount: null,
                    totalCharge: null,
                    totalPerKg: null,

                    totalAgentCommision: null,
                    deliveryCharge: null,
                    totalWithHomeDeliveryCharge: null,
                },
            };
        }
    }

    console.log("edit on --->", list)
    const courierList = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`${config.apiUrl}/api/courier`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:---------->courier', response.data.couriers);
            setTableData(response.data.couriers);
            setNodata(response?.data?.couriers.length <= 0);
            setLoader(false);
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false);
            throw error;
        }
    };




    useEffect(() => {
        courierList()
    }, [list]);
    return (
        <div className="flex justify-center h-full w-full items-center md:items-start rounded-[7px]" style={list?{backgroundColor : '#303038'} : {backgroundColor : ''}}>
            {list? <CouriereTable setList={setList} setTableData={setTableData} tableData={tableData} nodata={nodata} loader={loader} setLoader={setLoader} setNodata={setNodata} setCourierForm={setCourierForm} courierList={courierList}/> : <AddCargoOrder setList={setList} getData={courierList} formType={formType} setFormType={setFormType} courierForm={courierForm} setCourierForm={setCourierForm} getInitialFormState={getInitialFormState}/>}
        </div>
    );
};

export default CourierList;