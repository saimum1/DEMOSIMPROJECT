import React, {useEffect, useState} from 'react';
import {Button} from "@chakra-ui/react";
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
import {useAuth} from "../../Context/AuthInfo.jsx";
import {useTranslation} from "react-i18next";
const SearchDialouge = ({ setSearchValue, setFilterOpen ,setTableData, type }) => {
    const { t } = useTranslation();
    const options = type === 'sim' || type === 'operator'? [
        {id : 'available', value : 'Available'}, {id : 'not_available', value : 'Not Available'}
    ] : type === 'sales'? [{id : 'pending', value : 'Pending'}, {id : 'rejected', value : 'Rejected'}, {id : 'processing', value : 'Processing'}, {id : 'ready_to_use', value : 'Ready To Use'}] : type==='simA'?[
        {id : 'assigned', value : 'Assigned'}
    ]:type === 'courier'?[
        {id : 'pending', value : 'Pending'}, {id : 'processing', value : 'Processing'}, {id : 'cancelled', value : 'Cancelled'},{id : 'approved', value : 'Approved'}
    ] : [
        {id : 'active', value : 'Active'}, {id : 'inactive', value : 'Inactive'}, {id : 'upcoming', value : 'Upcoming'}
    ]
    const [selectedOption, setSelectedOption] = useState( '');
    const [fromDate, setFromDate] = useState( '');
    const [toDate, setToDate] = useState( '');
    const [selectedId, setSelectedId] = useState('');
    const [ OperatorData, setOperatorData ] = useState([])
    const { user , token } = useAuth();


    const handleReset = () => {
        handleSearch()
        setSelectedOption('');
        setSearchValue('');
        setFilterOpen(false);

    };

    useEffect(() => {
        GetOperators()

    }, [])


    const GetOperators = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);
            setOperatorData(response.data.operators)
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }
    };
    const handleSearch = async () => {
        try {

            console.log("kkkkkk", selectedOption, selectedId)
            const response = await axios.get(`${config.apiUrl}/api/${type==='simA'? 'sim' : type}?status=${selectedOption}&operatorId=${selectedId}&entryDateFrom=${fromDate}&entryDateTo=${toDate}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }});

            console.log("checkkk search ====", type, response.data)
            if(type==='operator'){
                setTableData(response.data?.operators)
            }else if(type === 'offer'){
                setTableData(response.data?.offers)
            }else if(type === 'sales'){
                setTableData(response.data?.sales)
            }else if(type === 'simA'){
                setTableData(response.data?.SIMCards.filter(item => item.status === 'assigned' && item.customerId === null))
            }else if(type === 'courier'){
                setTableData(response.data?.couriers)
            }

            else{
                setTableData(response.data?.SIMCards)

            }

            console.log('Search clicked with:', selectedOption);
            setFilterOpen(false);
        } catch (error) {
            console.error('Error++++:', error);
            toast.error(error)
            throw error;
        }

    };


    const handleFromDateChange = (e) => {
        const date = new Date(e.target.value);
        const formattedDate = date.toISOString();
        setFromDate(formattedDate);
    };

    const handleToDateChange = (e) => {
        const date = new Date(e.target.value);
        const formattedDate = date.toISOString();
        setToDate(formattedDate);
    }

    return (
        <div
            style={{
                position: 'absolute',
                display: 'flex',
                    top: '110%',
                right:'0%',
            }}
            className="filter-container"
        >
            <div
                style={{
                    // position: 'absolute',
                    // left: "-15px",
                    backgroundColor: '#2B2B33',
                    border: '1px solid #999999',
                    borderRadius : '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    width: `${type==='courier'? '28.5rem' : '22.5rem'}`,
                    padding: '15px',
                    zIndex: 20,
                }}
                className="dropdown"
            >
                <div style={{display : 'flex', alignItems : 'center',gap : '5%', justifyContent : 'space-between', marginBottom : '5%'}}>
                <label htmlFor="status">{t('status')}</label>
                <select value={selectedOption}  name="status" onChange={(e) => setSelectedOption(e.target.value)} style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <option value=''>
                        {t('selectStatus')}
                    </option>
                    {options.map(item => <option value={item.id}>{item.value}</option>)}
                </select>
                </div>
                {type === 'sim' ||type === 'simA' ||type === 'sales' || type === 'offer'?<div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between',gap : '5%',}}>
                    <label htmlFor="operatorId">{t('operators')}</label>
                    <select value={selectedId}  name="status" onChange={(e) => setSelectedId(e.target.value)} style={{border : '1px solid #595959'}} className="w-full cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <option value="">
                            {t('selectOperator')}
                        </option>
                        {OperatorData?.map((data, index) => <option value={data.id}>
                            {data.name}
                        </option>)}
                    </select>
                </div> : type ==='courier'?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent : 'space-between'}}>
                        <label htmlFor="entryDate">Entry Date</label>
                        <input
                            type="date"
                            id="entryDate"
                            placeholder="From"
                            style={{
                                border: '1px solid #595959',
                                backgroundColor: '#404040',
                                color: '#9CA3AF',
                                padding: '0.625rem 1rem',
                                borderRadius: '0.375rem',
                                boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
                                transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                            }}
                            onChange={(e) =>handleFromDateChange(e)}
                            onFocus={(e) => e.target.style.backgroundColor = '#545454'}
                            onBlur={(e) => e.target.style.backgroundColor = '#404040'}
                        />
                        <input
                            type="date"
                            placeholder="To"
                            style={{
                                border: '1px solid #595959',
                                backgroundColor: '#404040',
                                color: '#9CA3AF',
                                padding: '0.625rem 1rem',
                                borderRadius: '0.375rem',
                                boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
                                transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                            }}
                            onChange={(e) => handleToDateChange(e)}
                            onFocus={(e) => e.target.style.backgroundColor = '#545454'}
                            onBlur={(e) => e.target.style.backgroundColor = '#404040'}
                        />
                    </div>

                    :null}
            <div className="flex justify-end items-center gap-3 mt-5">
                <Button onClick={handleReset}  variant='outline'  style={{border: "1px solid #999999", color: '#999999', marginTop : '-0.1%'}} ml={3}>
                    Reset
                </Button>

                <button onClick={()=>handleSearch()} className="py-2 px-1 bg-[#27CF7A] text-white font-bold  rounded-[4px] w-[5rem]">{t('search')}</button>
            </div>
            </div>
        </div>
    );
};

export default SearchDialouge;