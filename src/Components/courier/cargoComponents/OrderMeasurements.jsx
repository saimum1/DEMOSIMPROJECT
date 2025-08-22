import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import deleteIcon from "../../../assets/static/delete-01.png";
import addIcon from "../../../assets/static/Add Box.png";

const OrderMeasurements = ({courierForm, setCourierForm}) => {

    const { orderDetails, preview } = courierForm;
    const handleChange = (field, value, rowId) => {
        setCourierForm(prevState => {
            const updatedMeasurements = prevState.orderDetails.orderMesurments.map(item => {
                if (item.rowId === rowId) {
                    return { ...item, [field]: value };
                }
                return item;
            });

            return {
                ...prevState,
                orderDetails: {
                    ...prevState.orderDetails,
                    orderMesurments: updatedMeasurements
                }
            };
        });
    };

    const addRow = () => {
        setCourierForm(prevState => {
            const newRowId = prevState.orderDetails.orderMesurments.length + 1;
            const newRow = {
                rowId: newRowId,
                boxNo: "",
                length: "",
                width: "",
                height: "",
                volumetricWeight: "",
            };

            const updatedMeasurements = [...prevState.orderDetails.orderMesurments, newRow];

            return {
                ...prevState,
                orderDetails: {
                    ...prevState.orderDetails,
                    orderMesurments: updatedMeasurements
                }
            };
        });
    };

    const deleteRow = (rowId) => {
        setCourierForm(prevState => {
            const updatedMeasurements = prevState.orderDetails.orderMesurments.filter(item => item.rowId !== rowId);

            return {
                ...prevState,
                orderDetails: {
                    ...prevState.orderDetails,
                    orderMesurments: updatedMeasurements
                }
            };
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
            height: '13.5rem',
            width: '100%'
        }}>
            <div style={{ maxHeight: '13.5rem', overflow: 'auto' }}>
                {orderDetails.orderMesurments?.map((item, key) => (
                    <div key={key} className="flex items-center gap-2 justify-between mb-4">
                        <div className="w-2/12">
                            {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Box No.</FormLabel> : null}
                            <Input
                                disabled={preview}
                                value={item.boxNo}
                                onChange={(e) => handleChange('boxNo', e.target.value, item.rowId)}
                                type="number"
                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border: '1px solid #595959',
                                    background: '#404040'
                                }}
                                placeholder='Box No.'
                            />
                        </div>
                        <div className="w-10/12 flex items-center gap-2 justify-between">
                            <FormControl>
                                {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Length (CM)</FormLabel> : null}
                                <Input
                                    disabled={preview}
                                    value={item.length}
                                    onChange={(e) => handleChange('length', e.target.value, item.rowId)}
                                    type="number"
                                    style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border: '1px solid #595959',
                                        background: '#404040'
                                    }}
                                    placeholder='Length (CM)'
                                />
                            </FormControl>
                            <FormControl>
                                {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Width (CM)</FormLabel> : null}
                                <Input
                                    disabled={preview}
                                    value={item.width}
                                    onChange={(e) => handleChange('width', e.target.value, item.rowId)}
                                    type="number"
                                    style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border: '1px solid #595959',
                                        background: '#404040'
                                    }}
                                    placeholder='Width (CM)'
                                />
                            </FormControl>
                            <FormControl>
                                {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Height (CM)</FormLabel> : null}
                                <Input
                                    disabled={preview}
                                    value={item.height}
                                    onChange={(e) => handleChange('height', e.target.value, item.rowId)}
                                    type="number"
                                    style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border: '1px solid #595959',
                                        background: '#404040'
                                    }}
                                    placeholder='Height (CM)'
                                />
                            </FormControl>
                            <FormControl>
                                {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>Volumetric Weight (KG)</FormLabel> : null}
                                <Input
                                    disabled={preview}
                                    value={item.volumetricWeight}
                                    onChange={(e) => handleChange('volumetricWeight', e.target.value, item.rowId)}
                                    type="number"
                                    style={{
                                        outline: 'none !important',
                                        boxShadow: 'none',
                                        border: '1px solid #595959',
                                        background: '#404040'
                                    }}
                                    placeholder='Volumetric Weight (KG)'
                                />
                            </FormControl>
                            <div className="w-6/12">
                                <FormControl>
                                    {key === 0 ? <FormLabel style={{ fontWeight: 'bold' }}>‎</FormLabel> : null}
                                    <div className="flex items-center justify-between">
                                        <Button onClick={() => deleteRow(item.rowId)} colorScheme='red' variant='outline'>
                                            <img src={deleteIcon} alt="delete icon" />
                                        </Button>
                                        <Button onClick={addRow} bg='#29CC79' variant='solid'>
                                            <img src={addIcon} alt="add icon" />
                                        </Button>
                                    </div>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>
                {`
                    ::-webkit-scrollbar {
                        width: 12px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                    }

                    ::-webkit-scrollbar-thumb {
                        background-color: #999;
                        border-radius: 3px;
                    }

                    scrollbar {
                        width: 12px;
                    }

                    scrollbar-thumb {
                        background-color: #999;
                        border-radius: 3px;
                    }

                    FormLabel {
                        font-size: 13px;
                    }
                `}
            </style>
        </div>
    );
};

export default OrderMeasurements;