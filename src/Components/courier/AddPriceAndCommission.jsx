import React, {useState} from 'react';
import Popnotification from "../PopNotification/Popnotification.jsx";
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
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import deleteIcon from "../../assets/static/delete-01.png";
import addIcon from "../../assets/static/Add Box.png";
import {useAuth} from "../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../config.jsx";
import { Tooltip } from '@chakra-ui/react';
import {useTranslation} from "react-i18next";
const AddPriceAndCommission = ({setCommissionForm,tableData, commissionForm, isOpen, onClose, preview, actionType, getData, setFormType}) => {
    const [showpopup, setshowpopup] = useState(false);
    const [formatErrors, setFormatErrors] = useState({});
    const [showpopupstatus, setshowpopupstatus] = useState('success');
    const [showpopupmsg, setshowpopupmsg] = useState('');
    const { user , token } = useAuth();
    const [orderTypeList, setOrderTypeList] = useState(['Italy goods', 'EU-GOODS', 'Bangladeshi goods'])
    const {t} = useTranslation()

    const handleSubmit = async () => {
        try {
            // const newForm = addExceedsLimitToCommissionRow(commissionForm)
            //
            // console.log("kkkkk--------------->", newForm)


            const response = await axios.post(`${config.apiUrl}/api/courierType`, commissionForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);

            setCommissionForm({
                courierTypeName : '',
                commissionRow : [
                    {
                        weight : null,
                        amount : null,
                        agentCommission : null
                    }
                ],
                exceedsLimit : false,
                commissionWhenExceedsLimit : {
                    weight: null,
                    amount: null,
                    agentCommission: null

                }
            })
            setshowpopupmsg('Commission added successfully!');
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

            // const newForm = addExceedsLimitToCommissionRow(commissionForm)
            //
            // console.log("kkkkk--------------->", newForm)

            const response = await axios.put(`${config.apiUrl}/api/courierType/${commissionForm?.id}`, commissionForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);


            setCommissionForm({
                courierTypeName : '',
                commissionRow : [
                    {
                        weight : null,
                        amount : null,
                        agentCommission : null
                    }
                ],
                exceedsLimit : false,
                commissionWhenExceedsLimit : {
                    weight: null,
                    amount: null,
                    agentCommission: null

                }
            })
            setshowpopupmsg('Commission successfully Updated');
            setshowpopupstatus('success');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            onClose();
            await getData()
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg(error.response?.data?.error)
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }



    };


    console.log("test===========>", commissionForm)
    const handleChangeTwo = (field, value) => {
        setCommissionForm(prevState => {
            if (field === 'exceedsLimit') {
                return {
                    ...prevState,
                    [field]: value
                };
            }

            const fieldParts = field.split('.');
            if (fieldParts.length === 2 && fieldParts[0] === 'commissionWhenExceedsLimit') {
                return {
                    ...prevState,
                    commissionWhenExceedsLimit: {
                        ...prevState.commissionWhenExceedsLimit,
                        [fieldParts[1]]: value
                    }
                };
            }

            return {
                ...prevState,
                [field]: value
            };
        });
    };

    const addRow = () => {
        setCommissionForm((prevState) => {
            const newRow = {
                rowId: prevState.commissionRow.length + 1,
                weight: null,
                amount: null,
                agentCommission: null,
                ...(prevState.courierTypeName === 'EU-GOODS' && {
                    length: null,
                    width: null,
                    height: null,
                }),
            };

            return {
                ...prevState,
                commissionRow: [...prevState.commissionRow, newRow],
            };
        });
    };

    const deleteRow = (rowId) => {
        setCommissionForm((prevState) => {
            const updatedRows = [...prevState.commissionRow];
            const rowIndex = updatedRows.findIndex((row) => row.rowId === rowId);

            if (updatedRows.length === 1) {
                updatedRows[0] = {
                    rowId: updatedRows[0].rowId,
                    weight: null,
                    amount: null,
                    agentCommission: null,
                    ...(prevState.courierTypeName === 'EU-GOODS' && {
                        length: null,
                        width: null,
                        height: null,
                    }),
                };
            } else if (rowIndex !== -1) {
                updatedRows.splice(rowIndex, 1);
            }

            if (updatedRows.length === 0) {
                updatedRows.push({
                    rowId: 1,
                    weight: null,
                    amount: null,
                    agentCommission: null,
                    ...(prevState.courierTypeName === 'EU-GOODS' && {
                        length: null,
                        width: null,
                        height: null,
                    }),
                });
            }

            return {
                ...prevState,
                commissionRow: updatedRows
            };
        });
    };

    const handleChange = (field, value, rowId) => {
        setCommissionForm((prevState) => {
            const updatedRows = prevState.commissionRow.map((row) => {
                if (row.rowId === rowId) {
                    return {
                        ...row,
                        [field]: value
                    };
                }
                return row;
            });

            return {
                ...prevState,
                commissionRow: updatedRows
            };
        });
    };

    const validateInput = (name, value, Id) =>{
        const regex = /^(\d+|-?\d+\s*-\s*-?\d+)$/;
        console.log("lweee", value)
        if (value === '') {
            setFormatErrors(prevErrors => ({ ...prevErrors, [Id]: true }))
            handleChange(name, value, Id);
            return;
        }

        if(regex.test(value) === true){
            setFormatErrors(prevErrors => ({ ...prevErrors, [Id]: false }));
            handleChange(name, value, Id);
        }else{
            setFormatErrors(prevErrors => ({ ...prevErrors, [Id]: true }));
            handleChange(name, value, Id);
        }
    }

    // const addExceedsLimitToCommissionRow = (formData) => {
    //     const formDataCopy = JSON.parse(JSON.stringify(formData)); // Deep copy
    //     if (formDataCopy.exceedsLimit && formDataCopy.commissionWhenExceedsLimit) {
    //         const exceedsLimitRow = {
    //             ...formDataCopy.commissionWhenExceedsLimit,
    //             rowId: formDataCopy.commissionRow.length + 1,
    //             isExceedsLimitRow: true
    //         };
    //         formDataCopy.commissionRow.push(exceedsLimitRow);
    //     }
    //     return formDataCopy;
    // };

    return (
        <div>
            {showpopup && <Popnotification msg={showpopupmsg} showpopup={showpopup} status={showpopupstatus} />}
            <Modal isOpen={isOpen} onClose={() => {onClose(); setFormatErrors({});  setCommissionForm({
                courierTypeName : '',
                commissionRow : [
                    {
                        weight : null,
                        amount : null,
                        agentCommission : null
                    }
                ],
                exceedsLimit : false,
                commissionWhenExceedsLimit : {
                    weight: null,
                    amount: null,
                    agentCommission: null

                }
            })}} size="3xl">
                <ModalOverlay />
                <ModalContent bg={global_css.modal_bg} style={{color: 'white'}}>
                    <ModalHeader>Add Price</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} style={{maxHeight: '500px', overflow: 'auto'}}>
                        <FormControl>
                            <FormLabel style={{fontWeight: 'bold', display: "flex", justifyContent: 'flex-start', alignItems: 'center', gap: '6px', fontSize: '12px'}}>{t('orderCourierType')}</FormLabel>
                            <select
                                onChange={(e) => {
                                    handleChangeTwo('courierTypeName', e.target.value);
                                    setFormType(e.target.value)
                                }}
                                value={commissionForm?.courierTypeName}
                                style={{border: '1px solid #595959'}}
                                className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <option value="">{t('select')}</option>
                                {orderTypeList.filter(item =>
                                    !tableData.some(dataItem => dataItem.courierTypeName === item)
                                ).map(filteredItem =>
                                    <option key={filteredItem} value={filteredItem}>{filteredItem}</option>
                                )}
                            </select>
                        </FormControl>

                        {commissionForm?.commissionRow
                            ?.slice(0, commissionForm.exceedsLimit ? -1 : commissionForm.commissionRow.length)
                            .map((item, key) => (
                            <>
                            <div key={key} style={commissionForm?.courierTypeName === 'EU-GOODS' && commissionForm?.commissionRow?.length > 1 && (commissionForm.exceedsLimit? commissionForm?.commissionRow.length - 2 : commissionForm?.commissionRow.length - 1) !== key? {borderBottom : '1px solid white', paddingBottom : '10px'} : null} className={commissionForm?.courierTypeName === 'EU-GOODS'?"flex items-center flex-wrap gap-y-3  justify-between mb-4 mt-3" : "flex items-center gap-2 justify-between mb-4 mt-3"}>
                                <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '300px' : ''}`}}>
                                  <FormLabel style={{fontWeight: 'bold'}}>Weight</FormLabel>
                                  <Tooltip label={`Format : '9' or '9-12'`} isOpen={formatErrors[item?.rowId]?true:false} hasArrow bg="red.600" placement="top">
                                    <Input
                                        disabled={preview}
                                        value={item?.weight}
                                        type="text"
                                        onChange={(e) => {
                                            validateInput('weight', e.target.value, item?.rowId)

                                        }}
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: formatErrors[item?.rowId] ?'1px solid red' : '1px solid #595959',
                                            background: '#404040'
                                        }}
                                        placeholder='9 or 9-10'
                                    />
                                    </Tooltip>

                                </FormControl>

                                <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '200px' : ''}`}}>
                                <FormLabel style={{fontWeight: 'bold'}}>Amount</FormLabel>
                                    <Input
                                        disabled={preview}
                                        value={item?.amount}
                                        type="number"
                                        onChange={(e) => handleChange('amount', e.target.value, item?.rowId)}
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040'
                                        }}
                                        placeholder=''
                                    />
                                </FormControl>


                                <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '200px' : ''}`}}>
                    <FormLabel style={{fontWeight: 'bold'}}>{t('agentCommission')}</FormLabel>
                                    <Input
                                        disabled={preview}
                                        value={item?.agentCommission}
                                        type="number"
                                        onChange={(e) => handleChange('agentCommission', e.target.value, item?.rowId)}
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040'
                                        }}
                                        placeholder=''
                                    />
                                </FormControl>

                                {commissionForm?.courierTypeName === 'EU-GOODS'?


                                    <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '200px' : ''}`}}>
                                    <FormLabel style={{fontWeight: 'bold'}}>Length (CM)</FormLabel>
                                    <Input
                                        disabled={preview}
                                        value={item?.length}
                                        type="number"
                                        onChange={(e) => handleChange('length', e.target.value, item?.rowId)}
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040'
                                        }}
                                        placeholder=''
                                    />
                                </FormControl > : null}
                                {commissionForm?.courierTypeName === 'EU-GOODS'?
                                    <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '190px' : ''}`}}>
                                    <FormLabel style={{fontWeight: 'bold'}}>Width (CM)</FormLabel>
                                    <Input
                                        disabled={preview}
                                        value={item?.width}
                                        type="number"
                                        onChange={(e) => handleChange('width', e.target.value, item?.rowId)}
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040'
                                        }}
                                        placeholder=''
                                    />
                                </FormControl> : null}
                                {commissionForm?.courierTypeName === 'EU-GOODS'?
                                    <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '180px' : ''}`}}>
                                    <FormLabel style={{fontWeight: 'bold'}}>Height (CM)</FormLabel>
                                    <Input
                                        disabled={preview}
                                        value={item?.height}
                                        type="number"
                                        onChange={(e) => handleChange('height', e.target.value, item?.rowId)}
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040'
                                        }}
                                        placeholder=''
                                    />
                                </FormControl> : null}




                                <div style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '120px' : '66%'}`}}>
                                <FormControl >
                                    <FormLabel style={{fontWeight: 'bold'}}>‎ </FormLabel>
                                    <div className="flex items-center justify-between">
                                        <Button onClick={() => deleteRow(item?.rowId)} colorScheme='red' variant='outline'>
                                            <img src={deleteIcon} />
                                        </Button>

                                        <Button onClick={addRow} bg='#29CC79' variant='solid'>
                                            <img src={addIcon} />
                                        </Button>
                                    </div>
                                </FormControl>
                                </div>

                            </div>
                       
                            </>
                        ))}


                        <FormControl style={{marginTop:'5%'}}>

                            <div>
                                <label className="checkbox-container">
                                    <input checked={commissionForm?.exceedsLimit} onChange={(e) => {
                                        if(e.target.checked) {
                                            handleChangeTwo('exceedsLimit', e.target.checked);
                                            addRow();
                                        }else {

                                            handleChangeTwo('exceedsLimit', e.target.checked);
                                            deleteRow(commissionForm?.commissionRow?.length);
                                        }

                                    }} type="checkbox"/>
                                    <span className="checkbox-checkmark"></span>
                                </label>

                                <span style={{marginLeft : '1%'}}>The amount exceeds the specified limit.</span>
                            </div>
                        </FormControl>


                        {commissionForm?.exceedsLimit && commissionForm?.commissionRow?.slice(-1)?.map((item, key) => (
                                <>
                                    <div key={key}  className={commissionForm?.courierTypeName === 'EU-GOODS'?"flex items-center flex-wrap gap-y-3  justify-between mb-4 mt-3" : "flex items-center gap-2 justify-between mb-4 mt-3"}>
                                        <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '300px' : ''}`}}>
                                            <FormLabel style={{fontWeight: 'bold'}}>Weight</FormLabel>
                                         <Tooltip label={`Format : '9' or '9-12'`} isOpen={formatErrors[item?.rowId]?true:false} hasArrow bg="red.600" placement="top" >

                                            <Input
                                                disabled={preview}
                                                value={item?.weight}
                                                type="text"
                                                onChange={(e) => {
                                                    validateInput('weight', e.target.value, item?.rowId)

                                                }}
                                                style={{
                                                    outline: 'none !important',
                                                    boxShadow: 'none',
                                                    border: formatErrors[item?.rowId]?'1px solid red' : '1px solid #595959',
                                                    background: '#404040'
                                                }}
                                                placeholder='9 or 9 - 10'
                                            />
                                        </Tooltip>
                                        </FormControl>

                                        <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '200px' : ''}`}}>
                                            <FormLabel style={{fontWeight: 'bold'}}>Amount</FormLabel>
                                            <Input
                                                disabled={preview}
                                                value={item?.amount}
                                                type="number"
                                                onChange={(e) => handleChange('amount', e.target.value, item?.rowId)}
                                                style={{
                                                    outline: 'none !important',
                                                    boxShadow: 'none',
                                                    border: '1px solid #595959',
                                                    background: '#404040'
                                                }}
                                                placeholder=''
                                            />
                                        </FormControl>


                                        <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '200px' : ''}`}}>
                                            <FormLabel style={{fontWeight: 'bold'}}>Agent Commission</FormLabel>
                                            <Input
                                                disabled={preview}
                                                value={item?.agentCommission}
                                                type="number"
                                                onChange={(e) => handleChange('agentCommission', e.target.value, item?.rowId)}
                                                style={{
                                                    outline: 'none !important',
                                                    boxShadow: 'none',
                                                    border: '1px solid #595959',
                                                    background: '#404040'
                                                }}
                                                placeholder=''
                                            />
                                        </FormControl>

                                        {commissionForm?.courierTypeName === 'EU-GOODS'?


                                            <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '200px' : ''}`}}>
                                                <FormLabel style={{fontWeight: 'bold'}}>Length (CM)</FormLabel>
                                                <Input
                                                    disabled={preview}
                                                    value={item?.length}
                                                    type="number"
                                                    onChange={(e) => handleChange('length', e.target.value, item?.rowId)}
                                                    style={{
                                                        outline: 'none !important',
                                                        boxShadow: 'none',
                                                        border: '1px solid #595959',
                                                        background: '#404040'
                                                    }}
                                                    placeholder=''
                                                />
                                            </FormControl > : null}
                                        {commissionForm?.courierTypeName === 'EU-GOODS'?
                                            <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '190px' : ''}`}}>
                                                <FormLabel style={{fontWeight: 'bold'}}>Width (CM)</FormLabel>
                                                <Input
                                                    disabled={preview}
                                                    value={item?.width}
                                                    type="number"
                                                    onChange={(e) => handleChange('width', e.target.value, item?.rowId)}
                                                    style={{
                                                        outline: 'none !important',
                                                        boxShadow: 'none',
                                                        border: '1px solid #595959',
                                                        background: '#404040'
                                                    }}
                                                    placeholder=''
                                                />
                                            </FormControl> : null}
                                        {commissionForm?.courierTypeName === 'EU-GOODS'?
                                            <FormControl style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '180px' : ''}`}}>
                                                <FormLabel style={{fontWeight: 'bold'}}>Height (CM)</FormLabel>
                                                <Input
                                                    disabled={preview}
                                                    value={item?.height}
                                                    type="number"
                                                    onChange={(e) => handleChange('height', e.target.value, item?.rowId)}
                                                    style={{
                                                        outline: 'none !important',
                                                        boxShadow: 'none',
                                                        border: '1px solid #595959',
                                                        background: '#404040'
                                                    }}
                                                    placeholder=''
                                                />
                                            </FormControl> : null}
                                        <div style={{width : `${commissionForm?.courierTypeName === 'EU-GOODS'? '120px' : '66%'}`}}>
                                            <FormControl >
                                                <FormLabel style={{fontWeight: 'bold'}}>‎ </FormLabel>
                                                <div className="flex items-center justify-between">
                                                    <p>‎ </p>

                                                    <p>‎ </p>
                                                </div>
                                            </FormControl>
                                        </div>

                                    </div>

                                </>
                            ))}

                    </ModalBody>

                    <ModalFooter>
                        {preview ? null : <Button colorScheme='white' variant='outline' onClick={() => {onClose();  setCommissionForm({
                            courierTypeName : '',
                            commissionRow : [
                                {
                                    weight : null,
                                    amount : null,
                                    agentCommission : null
                                }
                            ],
                            exceedsLimit : false,
                            commissionWhenExceedsLimit : {
                                weight: null,
                                amount: null,
                                agentCommission: null

                            }
                        })}}>{t('cancel')}</Button>}
                        {preview ? null : <Button onClick={actionType ? handleUpdate : handleSubmit} style={{background: "#27CF7A", color: 'white'}} ml={3}>
                            {actionType ? 'Update' : 'Save'}
                        </Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <style jsx>
                {`
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
                `}
            </style>
        </div>
    );
};

export default AddPriceAndCommission;
