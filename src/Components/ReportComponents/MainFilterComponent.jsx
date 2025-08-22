import React, {useEffect, useState} from 'react';
import {Title} from "@tremor/react";
import {Button, FormControl, FormLabel, Textarea} from "@chakra-ui/react";
import SenderInformationSave from "../courier/cargoComponents/SenderInformationSave.jsx";
import ReceiverInformation from "../courier/cargoComponents/ReceiverInformation.jsx";
import OrderMeasurements from "../courier/cargoComponents/OrderMeasurements.jsx";
import DeliveryDetails from "../courier/cargoComponents/DeliveryDetails.jsx";
import OrderDetailsBd from "../courier/cargoComponents/OrderDetailsBD.jsx";
import OrderDetails from "../courier/cargoComponents/OrderDetails.jsx";
import {useAuth} from "../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../config.jsx";
import ReportTable from "./ReportTable.jsx";
import { Search, X, } from "lucide-react";
import moment from "moment";
import SalesReportComponent from "./SalesReportComponent.jsx";
import OrderReportComponent from "./OrderReportComponent.jsx";
import StockReportComponent from "./StockReportComponent.jsx";
import CourierReportComponent from "./CourierReportComponent.jsx";
import {useTranslation} from "react-i18next";
const MainFilterComponent = () => {
    const { user, token } = useAuth();
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('success');
    const [showpopoupmsg, setshowpopupmsg] = useState('');
    const [agentList, setAgentList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tableData, setTableData] = useState([]);
    const {t} = useTranslation()
    // Filter agents based on search term
    const filteredAgents = agentList.filter(agent =>
        agent?.user?.uid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (agent) => {
        setSelectedAgent(agent);
        setSearchTerm('');
        setIsOpen(false);
        if (onSelect) onSelect(agent);
    };

    const clearSelection = (e) => {
        e.stopPropagation();
        setSelectedAgent(null);
        setSearchTerm('');
        if (onSelect) onSelect(null);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setSelectedAgent(null);
        setIsOpen(true);
    };

    const GetReportData = async () => {
        try {
            console.log('llll---------', selectedAgent)
            const queryParams = new URLSearchParams({
                entryDateFrom: startDate,
                entryDateTo: endDate,
            });

            if (user.role === 'ADMIN' && selectedAgent?.id) {
                queryParams.append('agentId', selectedAgent.id);
            }

            const url = `${config.apiUrl}/api/report/${searchCategory}?${queryParams.toString()}`;
            const response = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log('Response:-------- reports', response.data.report);
            // const arrayOfObjects = Object.keys(response.data.report).map(key => ({
            //     date: key,
            //     ...response[key],
            // }));
            console.log('Response:-------- reports 111', response.data.report);
            let arrayOfObjects = []
            if(searchCategory === 'stocks'){
                 arrayOfObjects = Object.entries(response.data.report).flatMap(([operatorName, operatorDetails]) =>
                    operatorDetails.stockDetails.map(stock => ({
                        OperatorName: operatorName,
                        SimCardNumber: stock.simCardNumber,
                        Status: stock.status,
                        BuyingPrice: stock.buyingPrice,
                        IsSold: stock.isSold,
                        InStock: operatorDetails.inStock,
                        ActiveSales: operatorDetails.activeSales,
                        TotalStocks: operatorDetails.totalStocks
                    }))
                );
            }else if (searchCategory === 'couriers'){
                arrayOfObjects = response.data.couriers

            }

            else{
                arrayOfObjects = Object.entries(response.data.report).flatMap(([date, operators]) =>
                    Object.entries(operators).map(([operatorName, details]) =>
                        searchCategory === 'sales'
                            ? { date, operatorName, ...details }
                            : {
                                Date: date,
                                OperatorName: operatorName,
                                TotalOrders: details.totalOrders,
                                TotalAmount: details.totalAmount,
                                OrderDetails: details.orderDetails.map(order => ({
                                    OperatorName: order.operator.name,
                                    BuyingPrice: order.buyingPrice,
                                    SimCardNumber: order.simCardNumber
                                }))
                            }
                    )
                );
            }


            console.log('Response:-------- reports', arrayOfObjects);
            setTableData(arrayOfObjects);



        } catch (error) {
            console.error('Error++++:', error);

            throw error;
        }
    };

    const AgeentList = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/agents`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);
            setAgentList(response?.data?.agents)

        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    };

    useEffect(() => {
        AgeentList()
    }, []);
    return (
        <div style={{ overflow: 'scroll', height: 'calc(100vh - 6.5rem)', width: '100%'}}>
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
                <Title className="text-3xl text-white  py-5">{t('reportAndHistory')}</Title>

                <div className="flex items-end gap-5">
                <div className='w-8/12'>
                <div className="flex gap-3 items-center">
                    {user.role === 'ADMIN'?<FormControl className="mb-4">
                    <FormLabel style={{ fontWeight: 'bold' }}>{t('reportType')}</FormLabel>
                    <select
                        style={{ border: '1px solid #595959' }}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        value={searchCategory}
                        className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <option value="">{t('select')}</option>
                        <option value="orders">Order Reports</option>
                        <option value="sales">Sales Reports</option>
                        <option value="stocks">Stock Reports</option>
                        <option value="couriers">Courier Reports</option>




                    </select>
                </FormControl> : null}




                    {user.role === 'ADMIN'?<FormControl className="mb-4 relative">
                        <FormLabel style={{fontWeight : 'bold'}}>{t('agentId')}</FormLabel>

                        <div className="relative">
                            <div
                                className="w-full h-10 bg-[#404040]  rounded-md flex items-center px-4 cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <input
                                    type="text"
                                    value={selectedAgent ? selectedAgent.user.name : searchTerm}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent text-[#9CA3AF] focus:outline-none"
                                    placeholder="Select or type to search..."
                                    onClick={(e) => e.stopPropagation()}
                                />
                                {(selectedAgent || searchTerm) ? (
                                    <X
                                        className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer"
                                        onClick={clearSelection}
                                    />
                                ) : (
                                    <Search className="w-4 h-4 text-gray-400" />
                                )}
                            </div>

                            {isOpen && (
                                <div className="absolute w-full mt-1 z-50 max-h-60 overflow-auto bg-[#404040] rounded-md shadow-lg">
                                    {filteredAgents.length > 0 ? (
                                        filteredAgents.map((agent, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-2 hover:bg-[#545454] cursor-pointer text-[#9CA3AF]"
                                                onClick={() => handleSelect(agent)}
                                            >
                                                {agent?.user?.name} ({agent?.user?.uid})
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-[#9CA3AF]">No results found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </FormControl> : null}
                </div>

                <div className="flex gap-3 items-center">
                    {user.role === 'AGENT'?<FormControl className="mb-4">
                        <FormLabel style={{ fontWeight: 'bold' }}>{t('reportType')}</FormLabel>
                        <select
                            style={{ border: '1px solid #595959' }}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            value={searchCategory}
                            className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <option value="">{t('select')}</option>
                            <option value="sales">Sales Reports</option>
                            <option value="stocks">Stock Reports</option>
                            <option value="couriers">Courier Reports</option>




                        </select>
                    </FormControl> : null}
                    <FormControl className="mb-4"> <FormLabel style={{ fontWeight: 'bold' }}>{t('fromDate')}</FormLabel> <input type="date" onChange={(e) => (setStartDate(new Date(e.target.value).toISOString()))} value={moment(startDate).format('YYYY-MM-DD')} style={{ border: '1px solid #595959' }} className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" /> </FormControl>

                    <FormControl className="mb-4"> <FormLabel style={{ fontWeight: 'bold' }}>{t('toDate')}</FormLabel> <input onChange={(e) => (setEndDate(new Date(e.target.value).toISOString()))} value={moment(endDate).format('YYYY-MM-DD')} type="date" style={{ border: '1px solid #595959' }} className="w-full h-10 cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-2.5 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" /> </FormControl>
                </div>
                </div>
                    <Button onClick={GetReportData} style={{ background: '#27CF7A', color: 'white' , marginBottom : '1%'}}>{t('search')}</Button>
                </div>

            </div>
            <br />
            <div className="w-12/12">
                {tableData.length !== 0?searchCategory==='sales'? <SalesReportComponent tableData={tableData} agent={selectedAgent} startDate={startDate} enddate={endDate} searchCategory={searchCategory}/> :searchCategory==='stocks'?<StockReportComponent tableData={tableData} agent={selectedAgent} startDate={startDate} enddate={endDate} searchCategory={searchCategory}/> :searchCategory === 'couriers'?<CourierReportComponent tableData={tableData} agent={selectedAgent} startDate={startDate} enddate={endDate} searchCategory={searchCategory}/> : <OrderReportComponent tableData={tableData} agent={selectedAgent} startDate={startDate} enddate={endDate} searchCategory={searchCategory}/> : null}
            </div>

            <style jsx>
                {`body::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge */
  body {
    -ms-overflow-style: none;
  }
  
  /* Hide scrollbar for Firefox */
  body {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }

                input[type="checkbox"] {
                  appearance: none;
                  width: 15px;
                  height: 15px;
                  border: 2px solid #ddd;
                  border-radius: 3px;
                  background-color: transparent;
                }

                input[type="checkbox"]:checked {
                  background-color: #4CAF50; /* Green background when checked */
                }

                .checkbox-box {
                  display: none; /* Not needed anymore */
                }

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


                `}
            </style>

        </div>
    );
};

export default MainFilterComponent;