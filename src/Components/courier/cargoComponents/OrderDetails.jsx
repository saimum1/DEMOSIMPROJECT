import React, {useState} from 'react';
import {Button, FormControl, FormLabel, Input} from "@chakra-ui/react";

import deleteIcon from '../../../assets/static/delete-01.png'
import addIcon from '../../../assets/static/Add Box.png'
import {useTranslation} from "react-i18next";

const OrderDetails = ({courierForm, setCourierForm, courierTypes, formType}) => {
    const [preview, setPreview] = useState(false)

    const {t} = useTranslation()
    const handleChangeTwo = (field, value) => {
        setCourierForm(prevState => {
            let updatedOrderDetails = {
                ...prevState.orderDetails,
                [field]: value
            };

            // If the serviceCharge field is being updated
            if (field === 'serviceCharge') {
                updatedOrderDetails.deliveryCharge = value; // Set deliveryCharge to serviceCharge
            }

            // Calculate totalWithHomeDeliveryCharge
            if (field === 'deliveryCharge' || field === 'serviceCharge') {
                const oldDeliveryCharge = parseFloat(prevState.orderDetails.deliveryCharge || 0);
                const newDeliveryCharge = parseFloat(value || 0);
                const currentTotal = parseFloat(prevState.orderDetails.totalWithHomeDeliveryCharge || 0);

                updatedOrderDetails.totalWithHomeDeliveryCharge =
                    currentTotal - oldDeliveryCharge + newDeliveryCharge;
            }

            console.log("check delivery charge", updatedOrderDetails.deliveryCharge);
            console.log("check total with home delivery", updatedOrderDetails.totalWithHomeDeliveryCharge);

            return {
                ...prevState,
                orderDetails: updatedOrderDetails
            };
        });
    };
    const handleChange = (field, value, rowId) => {
        setCourierForm((prevState) => {
            const updatedRows = prevState.orderDetails.commissionRow.map((row) => {
                if (row.rowId === rowId) {
                    let updatedRow = { ...row, [field]: value };

                    if (field === 'weight') {
                        if (!value || parseFloat(value) === 0) {
                            updatedRow.perKg = 0;
                            updatedRow.charge = 0;
                            updatedRow.total = 0;
                            updatedRow.totalCommission = 0;
                        } else {
                            const weight = parseFloat(value);

                            const selectedCourierType = courierTypes.find(courierType => courierType.courierTypeName === formType);

                            if (selectedCourierType) {
                                const selectedCommissionRow = selectedCourierType.commissionRow.find(item => {
                                    if (item.weight.includes('-')) {
                                        const [min, max] = item.weight.split('-').map(parseFloat);
                                        return weight >= min && weight <= max;
                                    } else {
                                        return parseFloat(item.weight) === weight;
                                    }
                                });

                                if (selectedCommissionRow) {
                                    updatedRow.perKg = selectedCommissionRow.amount;
                                    updatedRow.total = selectedCommissionRow.amount * weight;
                                    updatedRow.totalCommission = selectedCommissionRow.agentCommission;
                                }
                            }

                            updatedRow.total = parseFloat(updatedRow.charge || 0) + (updatedRow.perKg * weight);
                        }
                    }

                    if (field === 'perKg' || field === 'charge') {
                        const weight = parseFloat(updatedRow.weight || 0);
                        updatedRow.total = (parseFloat(updatedRow.perKg || 0) * weight) + parseFloat(updatedRow.charge || 0);
                    }

                    return updatedRow;
                }
                return { ...row };
            });

            const totalAgentCommision = updatedRows.reduce((sum, row) => {
                return sum + (row.totalCommission ? parseFloat(row.totalCommission) : 0);
            }, 0);

            const totalCharge = updatedRows.reduce((sum, row) => {
                return sum + (row.total ? parseFloat(row.total) : 0);
            }, 0);

            return {
                ...prevState,
                orderDetails: {
                    ...prevState.orderDetails,
                    commissionRow: updatedRows,
                    totalAgentCommision: totalAgentCommision,
                    totalWithHomeDeliveryCharge: totalCharge,
                },
            };
        });
    };




    const addRow = () => {
        setCourierForm((prevState) => {
            const newRow = {
                rowId: prevState.orderDetails.commissionRow.length + 1,
                productDescription: "",
                weight: null,
                perKg: null,
                charge: null,
                totalCommission: null,
                total: null,
            };

            return {
                ...prevState,
                orderDetails: {
                    ...prevState.orderDetails,
                    commissionRow: [...prevState.orderDetails.commissionRow, newRow],
                },
            };
        });
    };


    const deleteRow = (rowId) => {
        setCourierForm((prevState) => {
            console.log("Deleting row with rowId:", rowId);

            // Filter out the row with the given rowId
            let updatedRows = prevState.orderDetails.commissionRow.filter(row => row.rowId !== rowId);
            console.log("Filtered rows:", updatedRows);

            // If all rows are deleted, reset to one empty row
            if (updatedRows.length === 0) {
                updatedRows = [{
                    rowId: 1,
                    productDescription: "",
                    weight: null,
                    perKg: null,
                    charge: null,
                    total: null,
                    totalCommission: null
                }];
            }

            // Recalculate totalAgentCommision
            const totalAgentCommision = updatedRows.reduce((sum, row) => {
                return sum + (row.totalCommission ? parseFloat(row.totalCommission) : 0);
            }, 0);

            const totalWith = updatedRows.reduce((sum, row) => {
                return sum + (row.total ? parseFloat(row.total) : 0);
            }, 0);
            console.log("totalAgentCommision:", totalAgentCommision);

            // Calculate totalWithHomeDeliveryCharge
            const totalWithHomeDeliveryCharge =
                parseFloat(prevState.orderDetails.deliveryCharge || 0) +
                totalWith;
            console.log("totalWithHomeDeliveryCharge:", totalWithHomeDeliveryCharge);

            // Update the state with the new commissionRow and totals
            const newState = {
                ...prevState,
                orderDetails: {
                    ...prevState.orderDetails,
                    commissionRow: updatedRows,
                    totalAgentCommision: totalAgentCommision,
                    totalWithHomeDeliveryCharge: totalWithHomeDeliveryCharge
                },
            };
            console.log("New state:", newState);
            return newState;
        });
    };




    return (
        <div style={{
            background: '#2B2B33',
            color: 'white',
            paddingLeft: '15px',
            paddingRight: '15px',
            paddingTop: '15px',
            paddingBottom: '40px',
            borderRadius: '10px',
            height: '30.5rem',
            width: '100%'
        }}>
            <div style={{maxHeight : '200px', overflow : 'auto'}}>
            {courierForm?.orderDetails?.commissionRow?.map((item, key) => <div key={key}
                                                                               className="flex items-center gap-2 justify-between mb-4">
                <div className="w-7/12">

                    {key === 0 ? <FormLabel style={{fontWeight: 'bold'}}>Product Description</FormLabel> : null}
                    <Input disabled={preview}
                           value={item?.productDescription}
                           onChange={(e) => handleChange('productDescription', e.target.value, item?.rowId)}

                           type="email" style={{
                        outline: 'none !important',
                        boxShadow: 'none',
                        border: '1px solid #595959',
                        background: '#404040'
                    }} placeholder='product description'/>


                </div>
                <div className="w-6/12 flex items-center gap-2 justify-between">
                    <FormControl>
                        {key === 0 ? <FormLabel style={{fontWeight: 'bold'}}>Weight</FormLabel> : null}

                        <Input disabled={preview}
                               value={item?.weight}
                               onChange={(e) => handleChange('weight', e.target.value, item?.rowId)}


                               style={{
                                   outline: 'none !important',
                                   boxShadow: 'none',
                                   border: '1px solid #595959',
                                   background: '#404040'
                               }} placeholder='90 kg'/>
                    </FormControl>

                    <FormControl>
                        {key === 0 ? <FormLabel style={{fontWeight: 'bold'}}>Per KG</FormLabel> : null}

                        <Input disabled={true}
                               value={item?.perKg}
                               onChange={(e) => handleChange('perKg', e.target.value, item?.rowId)}


                               style={{
                                   outline: 'none !important',
                                   boxShadow: 'none',
                                   border: '1px solid #595959',
                                   background: '#404040'
                               }} placeholder=''/>
                    </FormControl>

                    <FormControl>
                        {key === 0 ? <FormLabel style={{fontWeight: 'bold'}}>Charge</FormLabel> : null}

                        <Input
                               value={item?.charge}
                               onChange={(e) => handleChange('charge', e.target.value, item?.rowId)}


                               style={{
                                   outline: 'none !important',
                                   boxShadow: 'none',
                                   border: '1px solid #595959',
                                   background: '#404040'
                               }} placeholder=''/>
                    </FormControl>

                    <FormControl>
                        {key === 0 ? <FormLabel style={{fontWeight: 'bold'}}>{t('total')}</FormLabel> : null}

                        <Input disabled={true}
                               value={item?.total}
                               onChange={(e) => handleChange('total', e.target.value, item?.rowId)}


                               style={{
                                   outline: 'none !important',
                                   boxShadow: 'none',
                                   border: '1px solid #595959',
                                   background: '#404040'
                               }} placeholder=''/>
                    </FormControl>

                    <FormControl>
                        {key === 0 ? <FormLabel style={{fontWeight: 'bold'}}>‎ </FormLabel> : null}
                        <div className="flex items-center justify-between">
                            <Button onClick={() => deleteRow(item?.rowId)} colorScheme='red' variant='outline'>
                                <img src={deleteIcon}/>
                            </Button>

                            <Button onClick={addRow} bg='#29CC79' variant='solid'>
                                <img src={addIcon}/>
                            </Button>
                        </div>
                    </FormControl>
                </div>
            </div>)}
            </div>

            <div className="w-1/4">
                <FormLabel style={{fontWeight: 'bold'}}>Service Charge/Delivery Charge</FormLabel>

                <Input disabled={preview}
                       value={courierForm?.orderDetails?.serviceCharge}
                       onChange={(e) =>handleChangeTwo('serviceCharge', e.target.value) }

                        type="number"
                       style={{
                           outline: 'none !important',
                           boxShadow: 'none',
                           border : '1px solid #595959',
                           background : '#404040'
                       }} placeholder='service charge'/>
            </div>
            <br/>
            <br/>
<div className="flex justify-end">
            <div className="flex flex-col items-end justify-start w-5/12">
                <FormControl className="flex gap-2 mb-2">
                    <FormLabel style={{fontWeight: 'bold'}} className="w-full">{t('total')} {t('agentCommission')} : </FormLabel>

                    <Input disabled={true}
                           value={courierForm?.orderDetails?.totalAgentCommision}
                           onChange={(e) =>handleChangeTwo('totalAgentCommision', e.target.value) }
                           className="w-1/2"

                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border : '1px solid #595959',
                               background : '#404040'
                           }} placeholder=''/>
                </FormControl>

                <FormControl className="flex gap-2 mb-2">
                    <FormLabel style={{fontWeight: 'bold'}} className="w-full">Delivery Charge : </FormLabel>

                    <Input disabled={true}
                           value={courierForm?.orderDetails?.deliveryCharge}
                           onChange={(e) =>handleChangeTwo('deliveryCharge', e.target.value) }


                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border : '1px solid #595959',
                               background : '#404040'
                           }} placeholder=''/>
                </FormControl>

                <FormControl className="flex gap-2">
                    <FormLabel style={{fontWeight: 'bold', color: '#45E594'}} className="w-full">Total with home delivery charge :  </FormLabel>

                    <Input disabled={true}
                           value={courierForm?.orderDetails?.totalWithHomeDeliveryCharge}
                           onChange={(e) =>handleChangeTwo('totalWithHomeDeliveryCharge', e.target.value) }

                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border : '1px solid #595959',
                               background : '#404040'
                           }} placeholder=''/>
                </FormControl>

            </div>
</div>
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


export default OrderDetails;