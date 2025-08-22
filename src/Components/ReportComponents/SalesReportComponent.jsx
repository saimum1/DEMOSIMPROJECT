import React, {useState} from 'react';
import LoadingSoS from "../LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
import {Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow} from "@tremor/react";
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import Nodatafound from "../NoDataFound/Nodatafound.jsx";
import moment from "moment";
import { Eye} from "lucide-react";
import {useDisclosure} from "@chakra-ui/react";
import ViewCourier from "../courier/cargoComponents/ViewCourier.jsx";
import ViewSalesReport from "./ViewSalesReport.jsx";


const SalesReportComponent = ({setList,tableData, setTableData,setCourierForm,loader, setLoader,  setNodata, nodata, agent, startDate, enddate, searchCategory}) => {
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [filterOpen, setFilterOpen] = useState(false);
    const { isOpen : isOpenoff, onOpen : onOpenoff , onClose: onCloseoff} = useDisclosure()
    const [view, setView] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);


    return (
        <div   className="border-none h-full w-full">
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            <ViewSalesReport  isOpen={isOpenoff} onClose={onCloseoff} data={tableData} selecteditem={selecteditem} view={view} setView={setView} setselecteditem={setselecteditem} agent={agent} startDate={startDate} endDate={enddate} searchCategory={searchCategory} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            {!nodata?  <Card  className="w-full h-full text-white mb-12" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,  boxShadow : 'none'}}>

                <div className="overflow-x-auto" style={{ overflowX:'auto' }}>
                    <div style={{margin : '1% 0', display : 'flex', justifyContent : 'space-between',alignItems : 'center'}}>
                        <p style={{fontWeight : 'bold', fontSize : '20px', marginLeft : '0.5%'}}>{agent?.user?.name}</p>
                        <span style={{color : 'white',fontWeight : 'bold', padding : '10px 30px', backgroundColor : '#595959', borderRadius : '5px', cursor : 'pointer'}} onClick={onOpenoff}>Export</span>
                    </div>
                    <Table className="mt-4 h-[60vh] w-full">
                        <TableHead>
                            <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                                <TableHeaderCell style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', borderRight: '2px solid #303038' }}>
                                    Date
                                </TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>Operator Name</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>Sales Price</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight: '2px solid #303038' }}>Offer Price</TableHeaderCell>
                                <TableHeaderCell style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>Action</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ minHeight: '200px' }}>
                            {tableData?.map((data, index) => (
                                <React.Fragment key={index}>
                                    {/* Month Header */}
                                    <TableRow
                                        style={{
                                            backgroundColor: 'transparent',
                                            borderBottom: 'none',
                                        }}
                                    >
                                        <TableCell
                                            colSpan={5}
                                            style={{
                                                backgroundColor: 'transparent',
                                                borderBottom: 'none',
                                                padding: '10px 0',
                                            }}
                                        >
                                            <h2 style={{ color: '#12B262', margin: '0px 0px 0px 1%', fontWeight: 'bold' }}>
                                                {moment(data?.date).format('MMMM')}
                                            </h2>
                                        </TableCell>
                                    </TableRow>

                                    {/* Display date once for the first row in the group */}
                                    {data?.saleDetails?.map((table, i) => (
                                        <TableRow
                                            key={i}
                                            className={i === 0 ? "table-row first-row" : "table-row"}
                                        >
                                            {/* Only display the date for the first row */}
                                            {i === 0 && (
                                                <TableCell rowSpan={data?.saleDetails?.length} style={{ verticalAlign: 'top' }}>
                                                    {moment(data?.date).format('YYYY-MM-DD')}
                                                </TableCell>
                                            )}
                                            <TableCell>{table?.saleInfo?.simCard?.operator?.name}</TableCell>
                                            <TableCell>Є{table?.salePrice}</TableCell>
                                            <TableCell>Є{table?.offerPrice}</TableCell>
                                            <TableCell>
                                                <div style={{ display: 'flex', gap: '6%', alignItems: 'center', marginLeft: '8%' }}>
                                                    <Eye style={{cursor : 'pointer'}} onClick={() => {setView(true); setselecteditem(table?.saleInfo?.simCard?.operator?.name);setSelectedDate(data?.date); onOpenoff()}}/>
                                                    <svg style={{cursor : 'pointer'}} onClick={() => {setView(false); setselecteditem(table?.saleInfo?.simCard?.operator?.name);setSelectedDate(data?.date); onOpenoff()}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16" fill="none">
                                                        <path d="M8.08146 10.2908L8.08146 2.26343" stroke="#F5F5F5" strokeLinecap="round" />
                                                        <path d="M10.0254 8.33887L8.08139 10.2909L6.13739 8.33887" stroke="#F5F5F5" strokeLinecap="round" />
                                                        <path
                                                            d="M11.1698 5.4187H11.7918C13.1485 5.4187 14.2478 6.51803 14.2478 7.87537L14.2478 11.1314C14.2478 12.4847 13.1511 13.5814 11.7978 13.5814L4.37114 13.5814C3.01447 13.5814 1.91447 12.4814 1.91447 11.1247L1.91447 7.86803C1.91447 6.51537 3.0118 5.4187 4.36447 5.4187H4.99247"
                                                            stroke="#F5F5F5"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>


                </div>

            </Card>:<Nodatafound btn_text={'No report'}  tittle_head={'No report List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={() => setList(false)}/>}
            <style jsx>
                {
                    `

                      /* Add this to your CSS file */
                      .table-row {
                        border-color: #595959 !important;
                        border-top: none;
                      }

                      .first-row {
                        border-color: #595959 !important;
                        border-top: none;
                      }

              `
                }
            </style>
        </div>
    );
};

export default SalesReportComponent;


