import React from 'react';
import {
    Button,
    FormControl, FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import {CSVLink} from "react-csv";
import {Document, Page, pdf, StyleSheet, Text, View} from "@react-pdf/renderer";
import moment from "moment";

const ViewOrderReport = ({
                             isOpen,
                             onClose,
                             data,
                             view,
                             setView,
                             setselecteditem,
                             searchCategory,
                             agent,
                             startDate,
                             endDate,
                             selecteditem,
                             selectedDate,
                             setSelectedDate
                         }) => {

    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontSize: 12,
            fontFamily: 'Helvetica'
        },
        header: {
            fontSize: 16,
            marginBottom: 10,
            textAlign: 'center',
            fontWeight: 'bold'
        },
        subHeader: {
            fontSize: 12,
            marginBottom: 10,
            textAlign: 'center'
        },
        table: {
            display: 'table',
            width: '100%',
            marginBottom: 10
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            borderBottomStyle: 'solid'
        },
        tableCell: {
            margin: 5,
            padding: 5,
            flex: 1
        }
    });

    // Generate PDF Document
    // Prepare CSV data
    const csvData = data
        ?.filter(item => !selectedDate || item?.date === selectedDate)
        .flatMap(monthData =>
            (monthData?.OrderDetails || []).map(order => ({
                Date: moment(monthData.date).format('YYYY-MM-DD'),
                Month: moment(monthData.date).format('MMMM'),
                OperatorName: order?.OperatorName,
                SIMNumber: order?.simCardNumber || 'N/A',
                TotalAmount: monthData?.TotalAmount
            }))
        ) || [];

// Generate PDF Document
    const generatePDF = async () => {
        const filteredData = data
            ?.filter(item => !selectedDate || item?.date === selectedDate);

        const MyDocument = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={styles.header}>
                        {searchCategory === 'sales' ? 'Sales Reports' :
                            searchCategory === 'orders' ? 'Order Reports' :
                                searchCategory === 'stocks' ? 'Stock Reports' :
                                    'Courier Reports'}
                    </Text>
                    <Text style={styles.subHeader}>
                        {`${agent?.user?.name} - ${moment(startDate).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}`}
                    </Text>

                    {filteredData?.map((monthData, monthIndex) => (
                        <View key={monthIndex}>
                            <Text style={styles.subHeader}>
                                {moment(monthData?.date).format('MMMM')}
                            </Text>
                            <View style={styles.table}>
                                <View style={[styles.tableRow, { backgroundColor: '#f0f0f0' }]}>
                                    <Text style={styles.tableCell}>Date</Text>
                                    <Text style={styles.tableCell}>Operator Name</Text>
                                    <Text style={styles.tableCell}>SIM Number</Text>
                                    <Text style={styles.tableCell}>Total Amount</Text>
                                </View>
                                {monthData?.OrderDetails?.map((order, orderIndex) => (
                                    <View key={orderIndex} style={styles.tableRow}>
                                        <Text style={styles.tableCell}>
                                            {orderIndex === 0 ? moment(monthData?.date).format('YYYY-MM-DD') : ''}
                                        </Text>
                                        <Text style={styles.tableCell}>
                                            {order?.OperatorName}
                                        </Text>
                                        <Text style={styles.tableCell}>
                                            {order?.simCardNumber || 'N/A'}
                                        </Text>
                                        <Text style={styles.tableCell}>
                                            €{monthData?.TotalAmount}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </Page>
            </Document>
        );

        const blob = await pdf(MyDocument).toBlob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${searchCategory}_report_${moment().format('YYYY-MM-DD')}.pdf`;
        link.click();
        onClose();
    };

    const test =() =>{
        setselecteditem(null)
        setSelectedDate(null)

        onClose()
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={test}
            size='xxl'
        >
            <ModalOverlay/>
            <ModalContent bg={global_css.modal_bg} style={{color : 'white', padding : '1%'}} maxW="60%">
                <ModalHeader>
                    {searchCategory === 'sales' ? 'Sales Reports' :
                        searchCategory === 'orders' ? 'Order Reports' :
                            searchCategory === 'stocks' ? 'Stock Reports' :
                                'Courier Reports'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl >
                        <FormLabel style={{fontWeight :'bold',display:"flex",justifyContent:'flex-start',alignItems:'center',gap:'6px',fontSize:'20px'}}>{agent?.user?.name} - {moment(startDate).format('DD/MM/YYYY')} - {moment(endDate).format('DD/MM/YYYY')}</FormLabel>
                    </FormControl>

                    <FormControl >
                        <div style={{width:'100%',height:'1px',margin:'2rem 0px',backgroundColor:'#404040'}}></div>
                    </FormControl>

                    <FormControl >
                        <div style={{width : '100%'}}>
                            <div style={{display:'flex',justifyItems:'center',alignItems:'center',flexDirection:'row',width : '100%', gap:'4rem'}}>
                                <span style={{color:'#29CC79', width : '8rem'}}>Date</span>
                                <span style={{color:'#29CC79', width : '10rem'}}>Operator Name</span>
                                <span style={{color:'#29CC79', width : '10rem'}}>SIM Number</span>
                                <span style={{color:'#29CC79', width : '9rem'}}>Amount</span>
                            </div>
                            <br/>
                            {(selectedDate
                                    ? data?.filter((item) => item?.date === selectedDate)
                                    : data
                            )?.map((monthData, index) => (
                                <div key={index}>
                                    {/* Heading for Month */}
                                    <h2
                                        style={{
                                            color: '#12B262',
                                            margin: '0px 10% 0px 0%',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {moment(monthData?.date).format('MMMM')}
                                    </h2>
                                    {/* Row for Date and Total Amount */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            marginTop: '0.2%',
                                            justifyItems: 'center',
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                            width: '100%',
                                            gap: '4rem',
                                        }}
                                    >
                <span
                    style={{
                        color: 'white',
                        width: '8rem',
                    }}
                >
                    {moment(monthData?.date).format('YYYY-MM-DD')}
                </span>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.5rem',
                                                width: '10rem',
                                            }}
                                        >
                                            {monthData?.OrderDetails?.map((order, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        color: 'white',
                                                    }}
                                                >
                            {order?.OperatorName}
                        </span>
                                            ))}
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.5rem',
                                                width: '10rem',
                                            }}
                                        >
                                            {monthData?.OrderDetails?.map((order, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        color: 'white',
                                                    }}
                                                >
                            {order?.simCardNumber || 'N/A'}
                        </span>
                                            ))}
                                        </div>
                                        <span
                                            style={{
                                                color: 'white',
                                                width: '9rem',
                                            }}
                                        >
                    Є{monthData?.TotalAmount}
                </span>
                                    </div>

                                    <FormControl>
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '1px',
                                                margin: '2rem 0px',
                                                backgroundColor: '#404040',
                                            }}
                                        ></div>
                                    </FormControl>
                                </div>
                            ))}
                        </div>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <div style={{display:'flex', justifyContent: 'flex-end', alignItems:'center', width:'100%'}}>
                        {!view && (
                            <div>
                                <Button
                                    style={{color:'#999999'}}
                                    colorScheme='white'
                                    variant='outline'
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={generatePDF}
                                    style={{background: "#27CF7A", color: 'white', marginRight: '10px'}}
                                    ml={3}
                                >
                                    Download PDF
                                </Button>

                                <CSVLink
                                    data={csvData}
                                    filename={`${searchCategory}_report_${moment().format('YYYY-MM-DD')}.csv`}
                                    style={{
                                        background: "#1EAB5E",
                                        color: 'white',
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        textDecoration: 'none'
                                    }}
                                    onClick={onClose}
                                >
                                    Download CSV
                                </CSVLink>
                            </div>
                        )}
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ViewOrderReport;