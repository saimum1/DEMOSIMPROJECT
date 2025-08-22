import React, {useEffect, useState} from 'react';
import {
    Box,
    Flex,
    Input,
    Button,
    Card,
    CardHeader,
    CardBody,
    Text, FormControl,
} from '@chakra-ui/react';
import {Title} from "@tremor/react";
import {useAuth} from "../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../config.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
import toast from "react-hot-toast";
import Nodatafound from "../NoDataFound/Nodatafound.jsx";
import {useTranslation} from "react-i18next";
import telepx from '../../assets/static/Telephone.svg'
const Contactus = () => {
    const {user, token} = useAuth();
    const {t} = useTranslation()
    const [firstForms, setFirstForms] = useState([
        { name: '', description: '', id: '', firstBatch: true }
    ]);

    const [secondForms, setSecondForms] = useState([
        { name: '', description: '', id: '', secondBatch: true }
    ]);

    const [thirdForms, setThirdForms] = useState([
        { name: '', description: '', id: '', thirdBatch: true }
    ]);

    const [lastForms, setLastForms] = useState([
        { name: '', description: '', id: '', lastBatch: true }
    ]);

    const [edit, setEdit] = useState(false);
    const [showpopup, setshowpopup] = useState(false);
    const [formatErrors, setFormatErrors] = useState({});
    const [showpopupstatus, setshowpopupstatus] = useState('success');
    const [showpopupmsg, setshowpopupmsg] = useState('');
    const [nodata, setNodata] = useState(false);
    const addNewField = (formSet, setFormSet, batchName) => {
        const newField = { name: '', description: '', id: '', [`${batchName}Batch`]: true };
        setFormSet([...formSet, newField]);
    };


    const updateField = (index, formSet, setFormSet, field) => {
        const updatedForms = [...formSet];
        updatedForms[index][field] = event.target.value;
        setFormSet(updatedForms);
    };

    const removeField = (index, formSet, setFormSet) => {
        const updatedForms = [...formSet];
        updatedForms.splice(index, 1);
        setFormSet(updatedForms);
    };
const reset = () => {
    setFirstForms([
        { name: '', description: '', id: '', firstBatch: true }
    ])
    setLastForms([
        { name: '', description: '', id: '', lastBatch: true }
    ])
    setThirdForms([
        { name: '', description: '', id: '', thirdBatch: true }
    ])
    setSecondForms([
        { name: '', description: '', id: '', secondBatch: true }
    ])
}
    const handleSubmit = async () => {
        try {
            // Merging all the form data into one array
            const totalInfo = [
                ...firstForms,
                ...secondForms,
                ...thirdForms,
                ...lastForms
            ];

            // Transform the totalInfo array into the required structure
            const contacts = totalInfo.reduce((acc, item) => {
                // Ensure the object has all fields and valid keys
                if (item.name && item.description) {
                    acc.push({
                        ...item, // Spread all fields from the current item
                    });
                } else {
                    console.warn("Invalid item:", item);
                }
                return acc;
            }, []);

            const payload = { contacts };

            // Send the transformed data in the PUT request
            const response = await axios.put(`${config.apiUrl}/api/contact`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Response:", response);
            console.log("Payload:", payload);
            console.log("Original Total Info:", totalInfo);

            setshowpopupmsg("Information saved successfully!");
            setshowpopupstatus("success");
            setshowpopup(true);

            // Hide the popup after 1.5 seconds
            setTimeout(() => {
                setshowpopup(false);
            }, 1500);

            // Fetch updated data after submit
            await getData();
            await setEdit(false);
        } catch (error) {
            console.error("Error:", error);
            setshowpopupmsg(error.response?.data?.error || "An error occurred");
            setshowpopupstatus("fail");
            setshowpopup(true);

            // Hide the popup after 1.5 seconds
            setTimeout(() => {
                setshowpopup(false);
            }, 1500);

            throw error;
        }
    };


    const getData = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/contact`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:====', response);

            const data = response.data.contacts; // Assuming this contains the array of forms
            setNodata(response?.data?.contacts.length <= 0)
            // Separate the forms based on their respective batch flags
            const firstBatchForms = data.filter(item => item?.firstBatch);
            const secondBatchForms = data.filter(item => item?.secondBatch);
            const thirdBatchForms = data.filter(item => item?.thirdBatch);
            const lastBatchForms = data.filter(item => item?.lastBatch);

            // Update state for each batch
            setFirstForms(firstBatchForms);
            setSecondForms(secondBatchForms);
            setThirdForms(thirdBatchForms);
            setLastForms(lastBatchForms);

            setEdit(false);
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg(error.response?.data?.error || 'An error occurred');
            setshowpopupstatus('fail');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false);
            }, 1500);

            throw error;
        }
    };

    useEffect(() => {
        getData()
    }, []);
    const onbuttonclicked=(e)=>{
        console.log("eee",e)
        if(e.clicked === true){
           setEdit(true)
        }
    }

    return (
        <div   style={{ overflow: 'scroll', height: 'calc(100vh - 6.5rem)', width: '100%', background: '#2B2B33',
            color: 'white', borderRadius : '8px'}}>
            {showpopup && <Popnotification msg={showpopupmsg} showpopup={showpopup} status={showpopupstatus} />}
            <div style={{ margin : '2% 3%'}}>
                <div style={user?.actualRole==='ADMIN'?{display : 'flex', justifyContent : 'space-between', alignItems : 'center'} : {display : 'flex', justifyContent : 'flex-start'}}>
                    <Title className="text-3xl text-white px-2 py-5">Contact Information</Title>
                    {user?.actualRole==='ADMIN'?<div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Button style={{color: '#999999'}} onMouseDown={(e) => {
                            e.target.style.backgroundColor = '#999999';
                        }}
                                onMouseUp={(e) => {
                                    e.target.style.backgroundColor = '';
                                }} colorScheme='white' variant='outline' onClick={() => setEdit(false)}>{t('cancel')}</Button>


                        <button
                            style={{
                                backgroundColor: '#1EAB5E',
                                color: 'white',
                                padding: '8px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginLeft : '5%',
                                fontWeight : 'bold'
                            }}
                            onMouseDown={(e) => {
                                e.target.style.backgroundColor = '#27CF7A';
                            }}
                            onMouseUp={(e) => {
                                e.target.style.backgroundColor = '#1EAB5E';
                            }}
                            onClick={() => {
                                if (edit) {
                                    // Save action
                                    handleSubmit();
                                } else {
                                    // Switch to edit mode
                                    setEdit(true);
                                }
                            }}
                        >
                            {edit ? 'Save' : 'Edit'}
                        </button>

                    </div> : null}
                </div>
                <div style={{marginLeft : '0.7%'}}>
                    {firstForms.map((form, index) => (
                        <FormControl
                            style={{
                                display: 'flex',
                                justifyContent: 'start',
                                gap: '10px',
                                width: '70%',
                                alignItems: 'center',
                            }}
                        >
                            {edit ? (
                                <>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => updateField(index, firstForms, setFirstForms, 'name')}
                                        mb={2}
                                        placeholder="Field Name"
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040',
                                            width: '35%',
                                        }}
                                    />
                                    <Input
                                        value={form.description}
                                        onChange={(e) => updateField(index, firstForms, setFirstForms, 'description')}
                                        mb={2}
                                        placeholder="Field Description"
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040',
                                        }}
                                    />
                                </>
                            ) : (
                                // When not in edit mode, use CSS Grid for name and description
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'auto auto', // Columns adjust based on content size
                                        gap: '10px', // Space between the columns
                                        alignItems : 'center'
                                    }}
                                >
  <span
      style={{
          color: 'white',
          fontWeight: 'bold',
          margin: '0.5rem 0',
          justifySelf: 'start', // Align text at the start of the first column
      }}
  >
    {form.name} {form.name ? ' :' : ''}
  </span>
                                    <span
                                        style={{
                                            color: 'white',
                                            justifySelf: 'start', // Align text at the start of the second column
                                        }}
                                    >
    {form.description}
  </span>
                                </div>

                            )}

                            {edit ? (
                                <div className="flex justify-start">
                                    <Button
                                        colorScheme="red"
                                        onClick={() => removeField(index, firstForms, setFirstForms)}
                                        mr={2}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ) : null}
                        </FormControl>
                    ))}

                    {edit ? (
                        <Flex justifyContent="flex-start" mb={4}>
                            <Button colorScheme="green"  onClick={() => addNewField(firstForms, setFirstForms, 'first')}>
                                Add New Field
                            </Button>
                        </Flex>
                    ) : null}

                 <FormControl >
                        <div style={{width:'100%',height:'1px',margin:'2rem 0px',backgroundColor:'#404040'}}></div>
                    </FormControl>

                    {secondForms.map((form, index) => (
                        <FormControl
                            style={{
                                display: 'flex',
                                justifyContent: 'start',
                                gap: '10px',
                                width: '70%',
                                alignItems: 'center'
                            }}>
                            {edit ? (
                                <>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => updateField(index, secondForms, setSecondForms, 'name')}
                                        mb={2}
                                        placeholder="Field Name"
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040',
                                            width: '35%',
                                        }}
                                    />

                                    <Input
                                        value={form.description}
                                        onChange={(e) => updateField(index, secondForms, setSecondForms, 'description')}
                                        mb={2}
                                        placeholder="Field Description"
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040',
                                        }}
                                    />
                                    <Flex justifyContent="flex-end">
                                        <Button
                                            colorScheme="red"
                                            onClick={() => removeField(index, secondForms, setSecondForms)}
                                            mr={2}
                                        >
                                            Remove
                                        </Button>
                                    </Flex>
                                </>
                            ) : (
                                // Non-edit mode: Use CSS Grid for layout
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'auto auto', // Columns adjust based on content size
                                        gap: '10px', // Space between the columns
                                        alignItems: 'center', // Center content vertically
                                    }}
                                >
  <span
      style={{
          color: 'white',
          fontWeight: 'bold',
          margin: '0.5rem 0',
          justifySelf: 'start', // Align text to the start of the first column
      }}
  >
    {form.name}{form.name ? ' :' : ''}
  </span>
                                    <span
                                        style={{
                                            color: 'white',
                                            justifySelf: 'start', // Align text to the start of the second column
                                        }}
                                    >
    {form.description}
  </span>
                                </div>

                            )}
                        </FormControl>
                    ))}

                    {edit ? (
                        <div   className="flex justify-start">
                            <Button colorScheme="green" onClick={() => addNewField(secondForms, setSecondForms, 'second')}>
                                Add New Field
                            </Button>
                        </div>
                    ) : null}

                   <FormControl >
                        <div style={{width:'100%',height:'1px',margin:'2rem 0px',backgroundColor:'#404040'}}></div>
                    </FormControl>
                    {thirdForms.map((form, index) => (
                        <FormControl style={{
                            display: 'flex',
                            justifyContent: 'start',
                            gap: '10px',
                            width: '70%',
                            alignItems: 'center',
                        }}>
                            {edit ? (
                                <>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => updateField(index, thirdForms, setThirdForms, 'name')}
                                        mb={2}
                                        placeholder="Field Name"
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040',
                                            width: '35%',
                                        }}
                                    />

                                    <Input
                                        value={form.description}
                                        onChange={(e) => updateField(index, thirdForms, setThirdForms, 'description')}
                                        mb={2}
                                        placeholder="Field Description"
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040',
                                        }}
                                    />
                                    <Flex justifyContent="flex-end">
                                        <Button
                                            colorScheme="red"
                                            onClick={() => removeField(index, thirdForms, setThirdForms)}
                                            mr={2}
                                        >
                                            Remove
                                        </Button>
                                    </Flex>
                                </>
                            ) : (
                                // Non-edit mode: Use CSS Grid for layout
//                                 <div
//                                     style={{
//                                         display: 'flex',
//                                         // gridTemplateColumns: '1fr 1fr', 
//                                         gap: '10px', 
//                                         alignItems : 'center',
//                                         justifyContent:'flex-start',
//                                         // width:"20rem",
//                                         // backgroundColor:"red"
//                                     }}
//                                 >
//         <span
//             style={{
//                 color: 'white',
//                 fontWeight: 'bold',
//                 margin: '0.5rem 0',
//                 justifySelf: 'start', // Align text to the start of the first column
//             }}
//         >
//           {form.name}{form.name? ' :' : ''}
//         </span>
//                                     {/* <span
//                                         style={{
//                                             color: 'white',
//                                             justifySelf: 'start', // Align text to the start of the second column
//                                         }}
//                                     >
//           {form.description}
//         </span> */}<span
//         style={{
//             width:"100%",
//             color: 'white',
//             justifySelf: 'start', 
//             display:"flex",
//             justifyContent:"flex-start",
//         }}
//     >
//         <span style={{display : 'flex', alignItems : 'center', gap : '7%', justifyContent : 'start'}}>
// {form.description?<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none">
// <path d="M34.14 5.85573C26.3284 -1.95356 13.665 -1.95169 5.85573 5.86003C-1.95356 13.6717 -1.95169 26.335 5.86003 34.1443C13.6717 41.9536 26.335 41.9517 34.1443 34.14C37.8948 30.3884 40.0012 25.3005 40 19.9957C39.9989 14.6918 37.891 9.60558 34.14 5.85573ZM30.2893 27.8598C30.2885 27.8607 30.2876 27.8616 30.2867 27.8625V27.8558L29.2733 28.8624C27.9628 30.1896 26.0541 30.7356 24.24 30.3025C22.4122 29.8132 20.6747 29.0345 19.0933 27.9958C17.6241 27.0568 16.2625 25.9592 15.0333 24.7225C13.9023 23.5997 12.8862 22.3669 12 21.0424C11.0306 19.6173 10.2633 18.0648 9.71995 16.4291C9.09706 14.5075 9.61323 12.399 11.0533 10.9825L12.24 9.79581C12.5699 9.4644 13.106 9.46323 13.4373 9.79315C13.4382 9.79401 13.4391 9.79487 13.44 9.79581L17.1866 13.5425C17.518 13.8724 17.5192 14.4085 17.1892 14.7398C17.1884 14.7407 17.1875 14.7415 17.1866 14.7425L14.9866 16.9425C14.3553 17.5668 14.276 18.559 14.8 19.2758C15.5957 20.3678 16.4762 21.3954 17.4333 22.3492C18.5004 23.4209 19.6605 24.3958 20.9 25.2625C21.6161 25.7621 22.5871 25.6778 23.2066 25.0625L25.3332 22.9025C25.6632 22.5711 26.1992 22.57 26.5306 22.8999C26.5314 22.9007 26.5323 22.9016 26.5332 22.9025L30.2866 26.6625C30.6181 26.9924 30.6192 27.5284 30.2893 27.8598Z" fill="#29CC79"/>
// </svg>:''} <span>{form.description}</span></span>
// </span>
//                                 </div>
<div
    style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }}
>
    {/* Label */}
    <span
        style={{
            color: 'white',
            fontWeight: 'bold',
            margin: '0.5rem 0',
        }}
    >
        {form.name} {form.name ? ':' : ''}
    </span>

    {/* Description with Icon */}
    <span
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'white',
            whiteSpace: 'nowrap', // Prevents breaking
        }}
    >
        {form.description && (
            <img src={telepx}  style={{width:"28px",height:"28px"}} />
          
        )}
        <span>{form.description}</span>
    </span>
</div>

                            )}
                        </FormControl>
                    ))}

                    {edit ? (
                        <div className="flex justify-start">
                            <Button colorScheme="green" onClick={() => addNewField(thirdForms, setThirdForms, 'third')}>
                                Add New Field
                            </Button>
                        </div>
                    ) : null}

                   <FormControl >
                        <div style={{width:'100%',height:'1px',margin:'2rem 0px',backgroundColor:'#404040'}}></div>
                    </FormControl>
                    {lastForms.map((form, index) => (
                        <FormControl style={{
                            display: 'flex',
                            justifyContent: 'start',
                            gap: '10px',
                            width: '70%',
                            alignItems: 'center',
                        }}>
                            {edit ? (
                                <>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => updateField(index, lastForms, setLastForms, 'name')}
                                        mb={2}
                                        placeholder="Field Name"
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040',
                                            width: '35%',
                                        }}
                                    />

                                    <Input
                                        value={form.description}
                                        onChange={(e) => updateField(index, lastForms, setLastForms, 'description')}
                                        mb={2}
                                        placeholder="Field Description"
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border: '1px solid #595959',
                                            background: '#404040',
                                        }}
                                    />

                                </>
                            ) : (
                                // Non-edit mode: Use CSS Grid for layout
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr', // Create two equal columns for name and description
                                        gap: '10px', // Add space between the columns
                                        alignItems : 'center'
                                    }}
                                >
        <span
            style={{
                color: 'white',
                fontWeight: 'bold',
                margin: '0.5rem 0',
                justifySelf: 'start', // Align text to the start of the first column
            }}
        >
          {form.name}{form.name? ' :' : ''}
        </span>
                                    <span
                                        style={{
                                            color: 'white',
                                            justifySelf: 'start', // Align text to the start of the second column
                                        }}
                                    >
                                        <span style={{display : 'flex', alignItems : 'center', gap : '7%', justifyContent : 'start'}}>
          {form.description?<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M34.14 5.85573C26.3284 -1.95356 13.665 -1.95169 5.85573 5.86003C-1.95356 13.6717 -1.95169 26.335 5.86003 34.1443C13.6717 41.9536 26.335 41.9517 34.1443 34.14C37.8948 30.3884 40.0012 25.3005 40 19.9957C39.9989 14.6918 37.891 9.60558 34.14 5.85573ZM30.2893 27.8598C30.2885 27.8607 30.2876 27.8616 30.2867 27.8625V27.8558L29.2733 28.8624C27.9628 30.1896 26.0541 30.7356 24.24 30.3025C22.4122 29.8132 20.6747 29.0345 19.0933 27.9958C17.6241 27.0568 16.2625 25.9592 15.0333 24.7225C13.9023 23.5997 12.8862 22.3669 12 21.0424C11.0306 19.6173 10.2633 18.0648 9.71995 16.4291C9.09706 14.5075 9.61323 12.399 11.0533 10.9825L12.24 9.79581C12.5699 9.4644 13.106 9.46323 13.4373 9.79315C13.4382 9.79401 13.4391 9.79487 13.44 9.79581L17.1866 13.5425C17.518 13.8724 17.5192 14.4085 17.1892 14.7398C17.1884 14.7407 17.1875 14.7415 17.1866 14.7425L14.9866 16.9425C14.3553 17.5668 14.276 18.559 14.8 19.2758C15.5957 20.3678 16.4762 21.3954 17.4333 22.3492C18.5004 23.4209 19.6605 24.3958 20.9 25.2625C21.6161 25.7621 22.5871 25.6778 23.2066 25.0625L25.3332 22.9025C25.6632 22.5711 26.1992 22.57 26.5306 22.8999C26.5314 22.9007 26.5323 22.9016 26.5332 22.9025L30.2866 26.6625C30.6181 26.9924 30.6192 27.5284 30.2893 27.8598Z" fill="#29CC79"/>
</svg>:''} <span>{form.description}</span></span>
        </span>
                                </div>
                            )}
                        </FormControl>
                    ))}



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

export default Contactus;