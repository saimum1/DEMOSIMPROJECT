import React from 'react';
import {
    Button,
    FormControl, FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, useColorModeValue
} from "@chakra-ui/react";
import {global_css} from "../../../GlobalCss/GlobalCSS.js"; // Adjust the path as needed
import {Title} from "@tremor/react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, color: '#000000' },
    section: { marginBottom: 10 },
    header: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' },
    label: { color: 'black', fontWeight: 'bold', width: 120 },
    value: { width: 200 },
    row: { flexDirection: 'row', marginBottom: 5 },
    divider: { borderBottomWidth: 1, borderBottomColor: '#404040', marginVertical: 15 },
    tableHeader: { flexDirection: 'row', fontWeight: 'bold', marginBottom: 5 },
    tableRow: { flexDirection: 'row', marginBottom: 5 },
});

// PDF Document Component
// PDF Document Component
const CourierPDF = ({ data, invoice }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Order No.</Text>
            {data?.orderDetails?.commissionRow?.map((item, index) => (
                <Text key={index} style={styles.section}>{item?.productDescription}</Text>
            ))}
            <View style={styles.divider} />

            {/* Sender and Receiver Info */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.header}>Sender Information</Text>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Full Name</Text>
                        <Text style={styles.value}>{data?.senderInfo?.firstName} {data?.senderInfo?.lastName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.value}>{data?.senderInfo?.phone}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{data?.senderInfo?.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>City</Text>
                        <Text style={styles.value}>{data?.senderInfo?.city}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>State</Text>
                        <Text style={styles.value}>{data?.senderInfo?.state}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Postal Code</Text>
                        <Text style={styles.value}>{data?.senderInfo?.postalCode}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Address</Text>
                        <Text style={styles.value}>{data?.senderInfo?.address}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Document No.</Text>
                        <Text style={styles.value}>{data?.senderInfo?.documentNo}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Codice Fiscale</Text>
                        <Text style={styles.value}>{data?.senderInfo?.codiceFiscale}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Upload File</Text>
                        <Text style={styles.value}>{data?.senderInfo?.uploadedFileNameSender}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.header}>Receiver Information</Text>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Full Name</Text>
                        <Text style={styles.value}>{data?.receiverInfo?.firstName} {data?.receiverInfo?.lastName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.value}>{data?.receiverInfo?.phone}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Optional Phone</Text>
                        <Text style={styles.value}>{data?.receiverInfo?.optionalPhone}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>City</Text>
                        <Text style={styles.value}>{data?.receiverInfo?.city}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>State</Text>
                        <Text style={styles.value}>{data?.receiverInfo?.state}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Postal Code</Text>
                        <Text style={styles.value}>{data?.receiverInfo?.postalCodeCAP}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Address</Text>
                        <Text style={styles.value}>{data?.receiverInfo?.address}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Country</Text>
                        <Text style={styles.value}>{data?.receiverInfo?.country}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Product Details Table */}
            <View style={styles.section}>
                <View style={styles.tableHeader}>
                    <Text style={{ width: 200 }}>Product Description</Text>
                    <Text style={{ width: 80 }}>Weight</Text>
                    <Text style={{ width: 80 }}>Per Kg</Text>
                    <Text style={{ width: 80 }}>Charge</Text>
                    <Text style={{ width: 80 }}>Total</Text>
                </View>
                {data?.orderDetails?.commissionRow?.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={{ width: 200 }}>{item?.productDescription}</Text>
                        <Text style={{ width: 80 }}>{item?.weight}</Text>
                        <Text style={{ width: 80 }}>€{item?.perKg}</Text>
                        <Text style={{ width: 80 }}>€{item?.charge}</Text>
                        <Text style={{ width: 80 }}>€{item?.total}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.divider} />

            {/* Charges - Shifted More to the Right */}
            <View style={{ alignItems: 'flex-end', marginRight: -100 }}> {/* Added marginRight to shift it right */}
                <View style={styles.row}>
                    <Text style={styles.label}>Service Charge:</Text>
                    <Text style={styles.value}>€{data?.orderDetails?.serviceCharge}</Text>
                </View>
                {!invoice && (
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Agent Commission:</Text>
                        <Text style={styles.value}>€{data?.orderDetails?.totalAgentCommision}</Text>
                    </View>
                )}
                <View style={styles.row}>
                    <Text style={styles.label}>Delivery Charge:</Text>
                    <Text style={styles.value}>€{data?.orderDetails?.deliveryCharge}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Total with Home Delivery:</Text>
                    <Text style={styles.value}>€{data?.orderDetails?.totalWithHomeDeliveryCharge}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Order Note */}
            <View style={styles.section}>
                <Text style={styles.label}>Order Note</Text>
                <Text>{data?.orderNote}</Text>
            </View>
        </Page>
    </Document>
);

const ViewCourier = ({isOpen, onClose, data, setList, setCourierForm, view, setView, invoice}) => {
    const SaveOperator = () => {
        onClose(); // Close the modal after triggering the download
    };

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={global_css.modal_bg} style={{color: 'white', padding: '1%'}} maxW="60%">
                    <ModalHeader>Order No.</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            {data?.orderDetails?.commissionRow?.map(item => (
                                <FormLabel
                                    key={item?.productDescription}
                                    style={{
                                        fontWeight: 'bold',
                                        display: "flex",
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '12px'
                                    }}
                                >
                                    {item?.productDescription}
                                </FormLabel>
                            ))}
                        </FormControl>

                        <FormControl>
                            <div style={{width: '100%', height: '1px', margin: '2rem 0px', backgroundColor: '#404040'}}></div>
                        </FormControl>

                        <FormControl>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                <div style={{display: 'flex', justifyItems: 'center', alignItems: 'flex-start', flexDirection: 'column', gap: '1rem'}}>
                                    <Title className="text-2xl">Sender Information</Title>
                                    <FormControl>
                                        <div style={{width: '100%', height: '1px', marginBottom: '5%', backgroundColor: '#404040'}}></div>
                                    </FormControl>
                                </div>
                                <div style={{display: 'flex', justifyItems: 'center', alignItems: 'flex-start', marginRight: '12%', flexDirection: 'column', gap: '1rem'}}>
                                    <Title className="text-2xl">Receiver Information</Title>
                                    <FormControl>
                                        <div style={{width: '100%', height: '1px', marginBottom: '5%', backgroundColor: '#404040'}}></div>
                                    </FormControl>
                                </div>
                            </div>
                        </FormControl>

                        <FormControl>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                <div style={{display: 'flex', justifyItems: 'center', alignItems: 'flex-start', flexDirection: 'column', gap: '1rem'}}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Full Name</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.senderInfo?.firstName} {data?.senderInfo?.lastName}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Phone</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.senderInfo?.phone}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Email</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.senderInfo?.email}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>City</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.senderInfo?.city}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>State</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.senderInfo?.state}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Postal Code</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.senderInfo?.postalCode}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Address</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.senderInfo?.address}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Document No.</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.senderInfo?.documentNo}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Codice Fiscale</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.senderInfo?.codiceFiscale}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Upload file</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.senderInfo?.uploadedFileNameSender}</span>
                                    </div>
                                </div>

                                <div style={{display: 'flex', justifyItems: 'center', alignItems: 'flex-start', flexDirection: 'column', gap: '1rem'}}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Full Name</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.receiverInfo?.firstName} {data?.receiverInfo?.lastName}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Phone</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.receiverInfo?.phone}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Optional Phone</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.receiverInfo?.optionalPhone}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>City</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.receiverInfo?.city}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>State</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.receiverInfo?.state}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Postal Code</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.receiverInfo?.postalCodeCAP}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Address</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.receiverInfo?.address}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Country</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>{data?.receiverInfo?.country}</span>
                                    </div>
                                </div>
                            </div>
                        </FormControl>

                        <FormControl>
                            <div style={{width: '100%', height: '1px', margin: '2rem 0px', backgroundColor: '#404040'}}></div>
                        </FormControl>

                        <FormControl>
                            <div style={{width: '100%'}}>
                                <div style={{display: 'flex', justifyItems: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', gap: '10rem'}}>
                                    <span style={{color: '#29CC79', width: '9rem'}}>Product description</span>
                                    <span style={{color: '#29CC79', width: '2rem'}}>Weight</span>
                                    <span style={{color: '#29CC79', width: '4rem'}}>Per Kg</span>
                                    <span style={{color: '#29CC79', width: '2rem'}}>Charge</span>
                                    <span style={{color: '#29CC79', width: '2rem'}}>Total</span>
                                </div>
                                <br />
                                {data?.orderDetails?.commissionRow?.map(item => (
                                    <div key={item?.productDescription} style={{display: 'flex', marginTop: '0.2%', justifyItems: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', gap: '10rem'}}>
                                        <span style={{color: 'white', width: '9rem'}}>{item?.productDescription}</span>
                                        <span style={{color: 'white', width: '2rem'}}>{item?.weight}</span>
                                        <span style={{color: 'white', width: '4rem'}}>€{item?.perKg}</span>
                                        <span style={{color: 'white', width: '2rem'}}>€{item?.charge}</span>
                                        <span style={{color: 'white', width: '2rem'}}>€{item?.total}</span>
                                    </div>
                                ))}
                            </div>
                        </FormControl>

                        <FormControl>
                            <div style={{width: '100%', height: '1px', margin: '2rem 0px', backgroundColor: '#404040'}}></div>
                        </FormControl>

                        <FormControl>
                            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%'}}>
                                <div style={{display: 'flex', justifyItems: 'flex-end', alignItems: 'flex-end', flexDirection: 'column', gap: '1rem', marginRight: '-4.2%'}}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '10rem'}}>Service Charge:</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>€{data?.orderDetails?.serviceCharge}</span>
                                    </div>
                                    {invoice ? null : (
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                            <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '12rem'}}>Total Agent Commission:</span>
                                            <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>€{data?.orderDetails?.totalAgentCommision}</span>
                                        </div>
                                    )}
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '10rem'}}>Delivery Charge:</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>€{data?.orderDetails?.deliveryCharge}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '16rem'}}>Total with home delivery charge:</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '10rem'}}>€{data?.orderDetails?.totalWithHomeDeliveryCharge}</span>
                                    </div>
                                </div>
                            </div>
                        </FormControl>

                        <FormControl>
                            <div style={{width: '100%', height: '1px', margin: '2rem 0px', backgroundColor: '#404040'}}></div>
                        </FormControl>

                        <FormControl>
                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <div style={{display: 'flex', justifyItems: 'center', alignItems: 'flex-start', flexDirection: 'column', gap: '1rem'}}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '1rem', flexDirection: 'column'}}>
                                        <span style={{color: '#29CC79', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '9rem'}}>Order Note</span>
                                        <span style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>{data?.orderNote}</span>
                                    </div>
                                </div>
                            </div>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <div style={{display: 'flex', justifyContent: `${view ? 'flex-end' : 'space-between'}`, alignItems: 'center', width: '100%'}}>
                            {view ? null : (
                                <Button
                                    variant="outline"
                                    colorScheme={useColorModeValue("green", "green")}
                                    _hover={{bg: "#27CF7A", color: "white"}}
                                    _active={{bg: "#27CF7A", color: "white"}}
                                    onClick={() => {
                                        onClose();
                                        setCourierForm(data);
                                        setList(false);
                                    }}
                                >
                                    Edit
                                </Button>
                            )}
                            <div>
                                <Button
                                    style={{color: '#999999'}}
                                    onMouseDown={(e) => e.target.style.backgroundColor = '#999999'}
                                    onMouseUp={(e) => e.target.style.backgroundColor = ''}
                                    colorScheme='white'
                                    variant='outline'
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <PDFDownloadLink
                                    document={<CourierPDF data={data} invoice={invoice} />}
                                    fileName={`Order_${data?.orderDetails?.orderNo || 'Details'}.pdf`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    {({ loading }) => (
                                        <Button
                                            onMouseDown={(e) => e.target.style.backgroundColor = '#1EAB5E'}
                                            onMouseUp={(e) => e.target.style.backgroundColor = '#27CF7A'}
                                            onClick={SaveOperator}
                                            style={{background: "#27CF7A", color: 'white'}}
                                            ml={3}
                                            disabled={loading}
                                        >
                                            {loading ? 'Generating PDF...' : 'Download PDF'}
                                        </Button>
                                    )}
                                </PDFDownloadLink>
                            </div>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <style jsx>{`
                .custom-file-upload {
                    padding: 4px 2px;
                    cursor: pointer;
                    font-size: 15px;
                }
                .custom-file-upload:active {
                    background-color: white;
                    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
                }
                input:focus {
                    outline: none;
                }
            `}</style>
        </div>
    );
};

export default ViewCourier;