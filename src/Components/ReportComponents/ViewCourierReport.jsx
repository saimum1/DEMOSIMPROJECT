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
import moment from "moment/moment.js";
import {Document, Page, pdf, StyleSheet, Text, View} from "@react-pdf/renderer";

const ViewCourierReport = ({
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
    const csvData = (selecteditem
            ? data?.filter((item) => item?.id === selecteditem)
            : data
    )?.map(item => ({
        "Order ID": item?.orderId,
        "Date and Time": moment(item?.createdAt).format('YYYY-MM-DD [at] HH:mm:ss'),
        "Customer Name": `${item?.receiverInfo?.firstName} ${item?.receiverInfo?.lastName}`,
        "Total": `€${item?.orderDetails?.totalWithHomeDeliveryCharge}`,
        "Agent Commission": `€${item?.orderDetails?.totalAgentCommision}`
    })) || [];

    const generatePDF = async () => {
        const filteredData = selecteditem
            ? data?.filter((item) => item?.id === selecteditem)
            : data;

        const MyDocument = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={styles.header}>
                        {searchCategory === 'stocks' ? 'Stock Reports' : 'Reports'}
                    </Text>
                    <Text style={styles.subHeader}>
                        {`${agent?.user?.name} - ${moment(startDate).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}`}
                    </Text>

                    <View style={styles.table}>
                        <View style={[styles.tableRow, { backgroundColor: '#f0f0f0' }]}>
                            <Text style={styles.tableCell}>Order ID</Text>
                            <Text style={styles.tableCell}>Date and Time</Text>
                            <Text style={styles.tableCell}>Customer Name</Text>
                            <Text style={styles.tableCell}>Total</Text>
                            <Text style={styles.tableCell}>Agent comm.</Text>
                        </View>
                        {filteredData?.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>
                                    #{item?.orderId}
                                </Text>
                                <Text style={styles.tableCell}>
                                    {moment(item?.createdAt).format('YYYY-MM-DD [at] HH:mm:ss')}
                                </Text>
                                <Text style={styles.tableCell}>
                                    {item?.receiverInfo?.firstName} {item?.receiverInfo?.lastName}
                                </Text>
                                <Text style={styles.tableCell}>
                                    €{item?.orderDetails?.totalWithHomeDeliveryCharge}
                                </Text>
                                <Text style={styles.tableCell}>
                                    €{item?.orderDetails?.totalAgentCommision}
                                </Text>
                            </View>
                        ))}
                    </View>
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

        onClose()
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={test}
            size='xxl'
        >
            <ModalOverlay/>
            <ModalContent bg={global_css.modal_bg} style={{color : 'white', padding : '1%'}} maxW="70%">
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

                    <FormControl>
                        <div style={{width : '100%'}}>

                            <div style={{display:'flex',justifyItems:'center',alignItems:'center',flexDirection:'row',width : '100%', gap:'10rem'}}>

                                        <span style={{color:'#29CC79', width : '22rem'}}>
                                            Order Number
                                        </span>
                                <span style={{color:'#29CC79', width : '28rem'}}>
                                            Date and Time
                                        </span>

                                <span style={{color:'#29CC79', width : '16rem'}}>
                                            Customer
                                        </span>

                                <span style={{color:'#29CC79', width : '5rem'}}>
                                            Total
                                        </span>

                                <span style={{color:'#29CC79', width : '20rem'}}>
                                            Agent comm.
                                        </span>

                            </div>
                            <br/>
                            {
                                (selecteditem ?
                                        data?.filter((item) => item?.id === selecteditem) : data
                                )?.map((item) => (
                                    <div
                                        style={{
                                            display: 'flex',
                                            marginTop: '0.2%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            width: '100%',
                                            gap: '10rem',  // Adjusted gap for better layout
                                        }}
                                        key={item?.id}  // Added key prop for better performance in lists
                                    >
      <span style={{ color: 'white', width: '22rem' }}>
         #{item?.orderId}
      </span>

                                        <span style={{ color: 'white', width: '28rem' }}>
        {moment(item?.createdAt).format('YYYY-MM-DD [at] HH:mm:ss')}
      </span>

                                        <span style={{ color: 'white', width: '16rem' }}>
        {item?.receiverInfo?.firstName} {item?.receiverInfo?.lastName}
      </span>

                                        <span style={{ color: 'white', width: '5rem' }}>
        €{item?.orderDetails?.totalWithHomeDeliveryCharge}
      </span>

                                        <span style={{ color: 'white', width: '20rem' }}>
        €{item?.orderDetails?.totalAgentCommision}
      </span>
                                    </div>
                                ))
                            }



                        </div>
                    </FormControl>
                    <FormControl >
                        <div style={{width:'100%',height:'1px',margin:'2rem 0px',backgroundColor:'#404040'}}></div>
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

export default ViewCourierReport;