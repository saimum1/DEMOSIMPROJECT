import React, {useState} from 'react';
import {Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import deleteIcon from "../../../assets/static/delete-01.png";
import addIcon from "../../../assets/static/Add Box.png";
import {useTranslation} from "react-i18next";

const OrderDetailsBd = ({courierForm, setCourierForm, courierTypes, formType}) => {
    const {t} = useTranslation()
    const [preview, setPreview] = useState(false)


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
            const {
                totalCusCha,
                totalWeight,
                totalGValue,
                totalIAmount,
                totalCharge,
                totalPerKg,
                totalAgentCommision,
                totalBoxNo,
                totalWithHomeDeliveryCharge
            } = prevState.orderDetails;

            let updatedTotalCusCha = totalCusCha || 0;
            let updatedTotalWeight = totalWeight || 0;
            let updatedTotalGValue = totalGValue || 0;
            let updatedTotalIAmount = totalIAmount || 0;
            let updatedTotalCharge = totalCharge || 0;
            let updatedTotalPerKg = totalPerKg || 0;
            let updatedTotalBoxNo = totalBoxNo || 0;
            let updatedtotalAgentCommision = totalAgentCommision || 0;
            let updatedtotalWithHomeDeliveryCharge = totalWithHomeDeliveryCharge || 0;

            const updatedRows = prevState.orderDetails.commissionRow.map((row) => {
                if (row.rowId === rowId) {
                    let updatedRow = { ...row, [field]: value };

                    if (field === 'weight') {
                        const numericValue = parseFloat(value);
                        if (isNaN(numericValue) || numericValue === 0) {
                            updatedRow.perKg = 0;
                            updatedRow.charge = 0;
                            updatedRow.cusCha = 0;
                            updatedRow.gValue = 0;
                            updatedRow.iAmount = 0;
                            updatedRow.total = 0;
                            updatedRow.totalCommission = 0;
                        } else {
                            const selectedCourierType = courierTypes.find(courierType => courierType.courierTypeName === formType);

                            if (selectedCourierType) {
                                const selectedCommissionRow = selectedCourierType.commissionRow.find(item => {
                                    if (item.weight.includes('-')) {
                                        const [min, max] = item.weight.split('-').map(parseFloat);
                                        return numericValue >= min && numericValue <= max;
                                    } else {
                                        return parseFloat(item.weight) === numericValue;
                                    }
                                });

                                if (selectedCommissionRow) {
                                    updatedRow.perKg = selectedCommissionRow.amount || 0;
                                    updatedRow.total = (selectedCommissionRow.amount || 0) * numericValue;
                                    updatedRow.totalCommission = selectedCommissionRow.agentCommission || 0;
                                }
                            }
                        }
                    }

                    // Calculate total for all fields
                    const numericCharge = parseFloat(updatedRow.charge || 0);
                    const numericCusCha = parseFloat(updatedRow.cusCha || 0);
                    const numericGValue = parseFloat(updatedRow.gValue || 0);
                    const numericIAmount = parseFloat(updatedRow.iAmount || 0);
                    const numericPerKg = parseFloat(updatedRow.perKg || 0);
                    const numericWeight = parseFloat(updatedRow.weight || 0);
                    const numericBoxNo = parseFloat(updatedRow.boxNo || 0);

                    updatedRow.total = (isNaN(numericCharge) ? 0 : numericCharge)
                        + (isNaN(numericCusCha) ? 0 : numericCusCha)
                        + (isNaN(numericGValue) ? 0 : numericGValue)
                        + (isNaN(numericIAmount) ? 0 : numericIAmount) + (numericPerKg * numericWeight);

                    console.log('Updated total:', updatedRow.total);

                    const prevCusCha = parseFloat(row.cusCha || 0);
                    const prevWeight = parseFloat(row.weight || 0);
                    const prevGValue = parseFloat(row.gValue || 0);
                    const prevIAmount = parseFloat(row.iAmount || 0);
                    const prevCharge = parseFloat(row.charge || 0);
                    const prevPerKg = parseFloat(row.perKg || 0);
                    const prevTotal = parseFloat(row.total || 0);
                    const prevBoxNo = parseFloat(row.boxNo || 0);
                    const prevTotalCommission = parseFloat(row.totalCommission || 0);

                    updatedTotalCusCha -= isNaN(prevCusCha) ? 0 : prevCusCha;
                    updatedTotalCusCha += isNaN(parseFloat(updatedRow.cusCha || 0)) ? 0 : parseFloat(updatedRow.cusCha || 0);

                    updatedTotalWeight -= isNaN(prevWeight) ? 0 : prevWeight;
                    updatedTotalWeight += isNaN(parseFloat(updatedRow.weight || 0)) ? 0 : parseFloat(updatedRow.weight || 0);

                    updatedTotalGValue -= isNaN(prevGValue) ? 0 : prevGValue;
                    updatedTotalGValue += isNaN(parseFloat(updatedRow.gValue || 0)) ? 0 : parseFloat(updatedRow.gValue || 0);

                    updatedTotalIAmount -= isNaN(prevIAmount) ? 0 : prevIAmount;
                    updatedTotalIAmount += isNaN(parseFloat(updatedRow.iAmount || 0)) ? 0 : parseFloat(updatedRow.iAmount || 0);

                    updatedTotalCharge -= isNaN(prevCharge) ? 0 : prevCharge;
                    updatedTotalCharge += isNaN(parseFloat(updatedRow.charge || 0)) ? 0 : parseFloat(updatedRow.charge || 0);

                    updatedTotalPerKg -= isNaN(prevPerKg) ? 0 : prevPerKg;
                    updatedTotalPerKg += isNaN(parseFloat(updatedRow.perKg || 0)) ? 0 : parseFloat(updatedRow.perKg || 0);

                    updatedtotalAgentCommision -= isNaN(prevTotalCommission) ? 0 : prevTotalCommission;
                    updatedtotalAgentCommision += isNaN(parseFloat(updatedRow.totalCommission || 0)) ? 0 : parseFloat(updatedRow.totalCommission || 0);

                    updatedTotalBoxNo -= isNaN(prevBoxNo) ? 0 : prevBoxNo;
                    updatedTotalBoxNo += isNaN(parseFloat(updatedRow.boxNo || 0)) ? 0 : parseFloat(updatedRow.boxNo || 0);

                    updatedtotalWithHomeDeliveryCharge -= isNaN(prevTotal) ? 0 : prevTotal;
                    updatedtotalWithHomeDeliveryCharge += isNaN(parseFloat(updatedRow.total || 0)) ? 0 : parseFloat(updatedRow.total || 0);

                    console.log('Updated row:', updatedRow);
                    return updatedRow;
                }
                return { ...row };
            });

            console.log('Updated totals:', {
                updatedTotalCusCha,
                updatedTotalWeight,
                updatedTotalGValue,
                updatedTotalIAmount,
                updatedTotalCharge,
                updatedTotalPerKg,
                updatedtotalAgentCommision,
                updatedtotalWithHomeDeliveryCharge
            });

            return {
                ...prevState,
                orderDetails: {
                    ...prevState.orderDetails,
                    commissionRow: updatedRows,
                    totalCusCha: updatedTotalCusCha,
                    totalWeight: updatedTotalWeight,
                    totalGValue: updatedTotalGValue,
                    totalIAmount: updatedTotalIAmount,
                    totalCharge: updatedTotalCharge,
                    totalPerKg: updatedTotalPerKg,
                    totalAgentCommision: updatedtotalAgentCommision,
                    totalBoxNo: updatedTotalBoxNo,
                    totalWithHomeDeliveryCharge : updatedtotalWithHomeDeliveryCharge,
                    totalAmount: updatedtotalWithHomeDeliveryCharge
                },
            };
        });
    };



    const addRow = () => {
        setCourierForm((prevState) => {
            const {
                totalCusCha,
                totalWeight,
                totalGValue,
                totalIAmount,
                totalCharge,
                totalPerKg,
                totalAgentCommision,
                totalWithHomeDeliveryCharge
            } = prevState.orderDetails;

            const newRow = {
                rowId: prevState.orderDetails.commissionRow.length + 1,
                productDescription: "",
                weight: null,
                perKg: null,
                charge: null,
                cusCha: null,
                gValue: null,
                iAmount: null,
                total: null,
                totalCommission: null
            };

            const updatedRows = [...prevState.orderDetails.commissionRow, newRow];

            return {
                ...prevState,
                orderDetails: {
                    ...prevState.orderDetails,
                    commissionRow: updatedRows,
                    totalCusCha,
                    totalWeight,
                    totalGValue,
                    totalIAmount,
                    totalCharge,
                    totalPerKg,
                    totalAgentCommision,
                    totalWithHomeDeliveryCharge
                },
            };
        });
    };

    const deleteRow = (rowId) => {
        setCourierForm((prevState) => {
            const {
                totalCusCha,
                totalWeight,
                totalGValue,
                totalIAmount,
                totalCharge,
                totalPerKg,
                totalAgentCommision,
                totalWithHomeDeliveryCharge
            } = prevState.orderDetails;

            const updatedRows = prevState.orderDetails.commissionRow.filter(row => row.rowId !== rowId);

            // If all rows are deleted, reset to one empty row
            if (updatedRows.length === 0) {
                updatedRows.push({
                    rowId: 1,
                    productDescription: "",
                    weight: null,
                    perKg: null,
                    charge: null,
                    cusCha: null,
                    gValue: null,
                    iAmount: null,
                    total: null,
                    totalCommission: null,
                });
            }

            let updatedTotalCusCha = totalCusCha;
            let updatedTotalWeight = totalWeight;
            let updatedTotalGValue = totalGValue;
            let updatedTotalIAmount = totalIAmount;
            let updatedTotalCharge = totalCharge;
            let updatedTotalPerKg = totalPerKg;
            let updatedtotalAgentCommision = totalAgentCommision;
            let updatedtotalWithHomeDeliveryCharge = totalWithHomeDeliveryCharge;

            const deletedRow = prevState.orderDetails.commissionRow.find(row => row.rowId === rowId);

            if (deletedRow) {
                updatedTotalCusCha -= parseFloat(deletedRow.cusCha || 0);
                updatedTotalWeight -= parseFloat(deletedRow.weight || 0);
                updatedTotalGValue -= parseFloat(deletedRow.gValue || 0);
                updatedTotalIAmount -= parseFloat(deletedRow.iAmount || 0);
                updatedTotalCharge -= parseFloat(deletedRow.charge || 0);
                updatedTotalPerKg -= parseFloat(deletedRow.perKg || 0);
                updatedtotalAgentCommision -= parseFloat(deletedRow.totalCommission || 0);
                updatedtotalWithHomeDeliveryCharge -= parseFloat(deletedRow.total || 0);
            }

            return {
                ...prevState,
                orderDetails: {
                    ...prevState.orderDetails,
                    commissionRow: updatedRows,
                    totalCusCha: updatedTotalCusCha,
                    totalWeight: updatedTotalWeight,
                    totalGValue: updatedTotalGValue,
                    totalIAmount: updatedTotalIAmount,
                    totalCharge: updatedTotalCharge,
                    totalPerKg: updatedTotalPerKg,
                    totalAgentCommision: updatedtotalAgentCommision,
                    totalWithHomeDeliveryCharge: updatedtotalWithHomeDeliveryCharge,
                    totalAmount: updatedtotalWithHomeDeliveryCharge,
                },
            };
        });
    };


    return (
        <div style={{
            background: '#2B2B33',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.625rem',
            height: '30.5rem',
            width: '100%'
        }}>
            <div style={{ maxHeight: '9rem', overflow: 'auto' }}>
                {courierForm?.orderDetails?.commissionRow?.map((item, key) => (
                    <div key={key} className="flex items-center gap-2 justify-between mb-4">
                        <FormControl style={{ width: '8%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Box No.</FormLabel> : null}
                            <Input disabled={preview}
                                   value={item?.boxNo}
                                   onChange={(e) => handleChange('boxNo', e.target.value, item?.rowId)}
                                   type="number" style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border: '1px solid #595959',
                                background: '#404040'
                            }} placeholder='' />
                        </FormControl>

                        <FormControl style={{ width: '6%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Type</FormLabel> : null}
                            <Input disabled={preview}
                                   value={item?.type}
                                   onChange={(e) => handleChange('type', e.target.value, item?.rowId)}
                                   type="test" style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border: '1px solid #595959',
                                background: '#404040'
                            }} placeholder='' />
                        </FormControl>

                        <FormControl style={{ width: '17%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Product Description</FormLabel> : null}
                            <Input disabled={preview}
                                   value={item?.productDescription}
                                   onChange={(e) => handleChange('productDescription', e.target.value, item?.rowId)}
                                   type="email" style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border: '1px solid #595959',
                                background: '#404040'
                            }} placeholder='product description' />
                        </FormControl>

                        <FormControl style={{ width: '6%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Weight</FormLabel> : null}
                            <Input disabled={preview}
                                   value={item?.weight}
                                   onChange={(e) => handleChange('weight', e.target.value, item?.rowId)}
                                   style={{
                                       outline: 'none !important',
                                       boxShadow: 'none',
                                       border: '1px solid #595959',
                                       background: '#404040'
                                   }} placeholder='' />
                        </FormControl>

                        <FormControl style={{ width: '10%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Cus. Cha.</FormLabel> : null}
                            <Input disabled={preview}
                                   value={item?.cusCha}
                                   onChange={(e) => handleChange('cusCha', e.target.value, item?.rowId)}
                                   style={{
                                       outline: 'none !important',
                                       boxShadow: 'none',
                                       border: '1px solid #595959',
                                       background: '#404040'
                                   }} placeholder='' />
                        </FormControl>

                        <FormControl style={{ width: '8%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Per KG</FormLabel> : null}
                            <Input disabled={true}
                                   value={item?.perKg}
                                   onChange={(e) => handleChange('perKg', e.target.value, item?.rowId)}
                                   style={{
                                       outline: 'none !important',
                                       boxShadow: 'none',
                                       border: '1px solid #595959',
                                       background: '#404040'
                                   }} placeholder='' />
                        </FormControl>

                        <FormControl style={{ width: '6%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Charge</FormLabel> : null}
                            <Input
                                value={item?.charge}
                                onChange={(e) => handleChange('charge', e.target.value, item?.rowId)}
                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border: '1px solid #595959',
                                    background: '#404040'
                                }} placeholder='' />
                        </FormControl>

                        <FormControl style={{ width: '6%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>G.VALUE</FormLabel> : null}
                            <Input disabled={preview}
                                   value={item?.gValue}
                                   onChange={(e) => handleChange('gValue', e.target.value, item?.rowId)}
                                   style={{
                                       outline: 'none !important',
                                       boxShadow: 'none',
                                       border: '1px solid #595959',
                                       background: '#404040'
                                   }} placeholder='' />
                        </FormControl>

                        <FormControl style={{ width: '10%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>I.AMOUNT</FormLabel> : null}
                            <Input disabled={preview}
                                   value={item?.iAmount}
                                   onChange={(e) => handleChange('iAmount', e.target.value, item?.rowId)}
                                   style={{
                                       outline: 'none !important',
                                       boxShadow: 'none',
                                       border: '1px solid #595959',
                                       background: '#404040'
                                   }} placeholder='' />
                        </FormControl>

                        <FormControl style={{ width: '12%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>{t('total')}</FormLabel> : null}
                            <Input disabled={true}
                                   value={item?.total}
                                   onChange={(e) => handleChange('total', e.target.value, item?.rowId)}
                                   style={{
                                       outline: 'none !important',
                                       boxShadow: 'none',
                                       border: '1px solid #595959',
                                       background: '#404040'
                                   }} placeholder='' />
                        </FormControl>

                        <FormControl style={{ width: '10%' }}>
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>‎ </FormLabel> : null}
                            <div className="flex items-center justify-between">
                                <Button onClick={() => deleteRow(item?.rowId)} colorScheme='red' variant='outline'>
                                    <img src={deleteIcon} alt="Delete" />
                                </Button>

                                <Button onClick={addRow} bg='#29CC79' variant='solid'>
                                    <img src={addIcon} alt="Add" />
                                </Button>
                            </div>
                        </FormControl>
                    </div>
                ))}
            </div>

            <div className="w-[32%]">
                <FormLabel style={{fontWeight: 'bold'}}>Service Charge/Delivery Charge</FormLabel>
                <Input disabled={preview}
                       value={courierForm?.orderDetails?.serviceCharge}
                       onChange={(e) => handleChangeTwo('serviceCharge', e.target.value)}
                       type="number"
                       style={{
                           outline: 'none !important',
                           boxShadow: 'none',
                           border: '1px solid #595959',
                           background: '#404040'
                       }} placeholder='service charge'/>
            </div>
            <br/>
            <br/>

            <div className="flex items-center gap-2 justify-between mb-4">
                <FormControl style={{ width: '33%' }}>
                    <Input disabled={true}
                           value={courierForm?.orderDetails?.totalBoxNo}
                           type="number" style={{
                        outline: 'none !important',
                        boxShadow: 'none',
                        border: '1px solid #595959',
                        background: '#404040'
                    }} placeholder='' />
                </FormControl>

                <FormControl style={{ width: '6%' }}>
                    <Input disabled={true}
                           value={courierForm?.orderDetails?.totalWeight}
                           type="number" style={{
                        outline: 'none !important',
                        boxShadow: 'none',
                        border: '1px solid #595959',
                        background: '#404040'
                    }} placeholder='' />
                </FormControl>

                <FormControl style={{ width: '10%' }}>
                    <Input disabled={true}
                           value={courierForm?.orderDetails?.totalCusCha}
                           type="email" style={{
                        outline: 'none !important',
                        boxShadow: 'none',
                        border: '1px solid #595959',
                        background: '#404040'
                    }} placeholder='' />
                </FormControl>

                <FormControl style={{ width: '6%' }}>
                    <Input disabled={true}
                           value={courierForm?.orderDetails?.totalPerKg}
                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='' />
                </FormControl>

                <FormControl style={{ width: '6%' }}>
                    <Input disabled={true}
                           value={courierForm?.orderDetails?.totalCharge}
                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='' />
                </FormControl>



                <FormControl style={{ width: '6%' }}>
                    <Input disabled={true}
                           value={courierForm?.orderDetails?.totalGValue}
                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='' />
                </FormControl>

                <FormControl style={{ width: '10%' }}>
                    <Input disabled={true}
                           value={courierForm?.orderDetails?.totalIAmount}
                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='' />
                </FormControl>

                <FormControl style={{ width: '22%' }}>
                    <Input disabled={true}
                           value={courierForm?.orderDetails?.totalAmount}
                           style={{
                               outline: 'none !important',
                               boxShadow: 'none',
                               border: '1px solid #595959',
                               background: '#404040'
                           }} placeholder='' />
                </FormControl>
            </div>

            <div className="flex justify-end">
                <div className="flex flex-col items-end justify-start w-5/12">
                    <FormControl className="flex gap-2 mb-2">
                        <FormLabel style={{fontWeight: 'bold'}} className="w-full">{t('total')} {t('agentCommission')} : </FormLabel>
                        <Input disabled={true}
                               value={courierForm?.orderDetails?.totalAgentCommision}
                               onChange={(e) => handleChangeTwo('totalAgentCommision', e.target.value)}
                               className="w-1/2"
                               style={{
                                   outline: 'none !important',
                                   boxShadow: 'none',
                                   border: '1px solid #595959',
                                   background: '#404040'
                               }} placeholder=''/>
                    </FormControl>

                    <FormControl className="flex gap-2 mb-2">
                        <FormLabel style={{fontWeight: 'bold'}} className="w-full">Delivery Charge : </FormLabel>
                        <Input disabled={true}
                               value={courierForm?.orderDetails?.deliveryCharge}
                               onChange={(e) => handleChangeTwo('deliveryCharge', e.target.value)}
                               style={{
                                   outline: 'none !important',
                                   boxShadow: 'none',
                                   border: '1px solid #595959',
                                   background: '#404040'
                               }} placeholder=''/>
                    </FormControl>

                    <FormControl className="flex gap-2">
                        <FormLabel style={{fontWeight: 'bold', color: '#45E594'}} className="w-full">Total with home delivery charge : </FormLabel>
                        <Input disabled={true}
                               value={courierForm?.orderDetails?.totalWithHomeDeliveryCharge}
                               onChange={(e) => handleChangeTwo('totalWithHomeDeliveryCharge', e.target.value)}
                               style={{
                                   outline: 'none !important',
                                   boxShadow: 'none',
                                   border: '1px solid #595959',
                                   background: '#404040'
                               }} placeholder=''/>
                    </FormControl>
                </div>
            </div>

            <style jsx>
                {`
                  ::-webkit-scrollbar {
                    width: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 0.5rem;
                  }

                  ::-webkit-scrollbar-thumb {
                    background-color: #999;
                    border-radius: 0.1875rem;
                  }

                  scrollbar {
                    width: 0.75rem;
                  }

                  scrollbar-thumb {
                    background-color: #999;
                    border-radius: 0.1875rem;
                  }

                  FormLabel {
                    font-size: 0.8125rem;
                  }
                `}
            </style>
        </div>
    );
};




export default OrderDetailsBd;