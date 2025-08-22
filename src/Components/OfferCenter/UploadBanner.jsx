import React, {useEffect, useState} from 'react';
import {Toaster} from "react-hot-toast";
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
import TickForm from "../TickForm/TickForm.jsx";
import uploimg from "../../assets/static/Upload.svg";
import VideoUploader from "../PopNotification/VideoUploader.jsx";
import axios from "axios";
import config from "../../config.jsx";
import { useAuth } from '../../Context/AuthInfo.jsx';

const UploadBanner = ({isOpen, onClose,  getData}) => {
    const { user , token } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileKey, setselectedFileKey] = useState(null);
    const [selectedFileUrlKey, setselectedFileUrlKey] = useState(null);
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('');
    const [showpopoupmsg, setshowpopupmsg] = useState('');
    const [filex, setfilex] = useState(null)

    const [isVisible, setIsVisible] = useState(false); 
    const [bannerImage, setbannerImage] = useState(null); 
    const [bannerImageDate, setbannerImageDate] = useState(null); 
    const [resolution, setResolution] = useState({ width: 0, height: 0 });

    const handleImageUpload = (event) => {
      const file = event
  
      if (file && file.type.startsWith("image")) {
        const reader = new FileReader();
        const img = new Image();
  
        reader.onload = (e) => {
          img.src = e.target.result;
        };
  
        img.onload = () => {
          setResolution({
            width: img.width,
            height: img.height,
          });
        };
  
        reader.readAsDataURL(file);  // Read the file as a data URL for the image element to load
      }
    };

    const closeBanner = () => {
      setIsVisible(false);
    };



    const getBanner = async () => {
        try {
          
            const response = await axios.get(`${config.apiUrl}/api/banner`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:bannerss', response?.data?.createdAt);
            let xc=response?.data?.createdAt
            setbannerImage(response?.data?.imageUrl)
            let timec=timeAgo(xc)
            setbannerImageDate(timec)

           
        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    };


  

    const geturl = (e) => {
        console.log("urlbodybaner", e);
        if(e?.status === 200){
            setTimeout(() => {
                getData(e?.status)
            }, 2000);
        }
    }

    const handleFile = (e, filekey, urlkey) => {
        let file = document.getElementById(e).files[0];
        let filename = file?.name;
        handleImageUpload(file)
        setSelectedFile(file);
        setselectedFileKey(filekey);
        setselectedFileUrlKey(urlkey);
    }

    const handleUpdate = async () => {
        if(selectedFile !== null){
            setfilex(selectedFile)
        }
    };




    const timeAgo = (dateString) => {
        console.log("given date",dateString)
        const date = new Date(dateString);
        const now = new Date();
        
        // If the date is invalid, return a default message
        if (isNaN(date.getTime())) {
          return 'Invalid date';
        }
      
        // Calculate the difference in milliseconds
        const seconds = Math.floor((now - date) / 1000);
        
        // Define intervals for time units
        const intervals = [
          { label: 'year', seconds: 31536000 },
          { label: 'month', seconds: 2592000 },
          { label: 'week', seconds: 604800 },
          { label: 'day', seconds: 86400 },
          { label: 'hour', seconds: 3600 },
          { label: 'minute', seconds: 60 },
          { label: 'second', seconds: 1 },
        ];
      
        // Iterate over the intervals and return the appropriate time ago string
        for (const interval of intervals) {
          const count = Math.floor(seconds / interval.seconds);
          if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
          }
        }
      
        return 'just now'; // For cases like < 1 second
      };
      

      const handlepreview =()=>{
            setIsVisible(!isVisible)
      }

    useEffect(() => {
      setfilex(null)
      setSelectedFile(null)
      getBanner()
      setIsVisible(false)

    }, [isOpen])
    

    return (
        <div>
            <VideoUploader filex={filex} geturl={geturl} bannerStatus={true}/>
            {showpopoup &&  <Popnotification msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color: 'white',marginTop:'15%'}}>
                    <ModalHeader >
                            <div style={{display:'flex',flexDirection:'column',gap:'.8rem'}}>
                              {bannerImageDate &&   <span style={{fontSize:'12px',color:'#999'}}>Last update {bannerImageDate}.<span onClick={()=>handlepreview()} style={{color:'#12B262',cursor:'pointer',}}>Preview</span></span>}
                                <span> Add Banner</span>
                            </div>
                        </ModalHeader>
                    <div style={{height:'1px',backgroundColor:'#404040',width:'90%',alignSelf:'center'}}></div>
                         <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>

                            <div
                            className="banner-container"
                            style={{
                            position: 'fixed',
                            top: '50%',
                            left: '60%',
                            transform: 'translate(-50%, -50%)',
                            width: '728px',
                            height: '300px', // Adjust height as necessary
                            maxWidth: '100%',
                            maxHeight: '100%',
                            backgroundColor: 'white',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            opacity: isVisible ? 1 : 0, // Conditionally set opacity
                            visibility: isVisible ? 'visible' : 'hidden', // Conditionally set visibility
                            transition: 'opacity 0.4s ease-in-out, visibility 0.4s ease-in-out', // Smooth transition for both opacity and visibility
                            zIndex: 9999
                            }}
                            >
                            <div
                            className="banner-content"
                            style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',boxShadow:'2px 2px 30px  #999'
                            }}
                            >
                            {bannerImage && (
                            <img
                            style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover' // Ensures the image covers the entire div without distortion
                            }}
                            className="banner-image"
                            src={`${config.apiUrl}${bannerImage}`}
                            alt="Banner"
                            />
                            )}
                            <button
                            className="close-button"
                            onClick={closeBanner}
                            style={{
                            top: '-10px',
                            position: 'absolute',
                            right: '10px',
                            background: 'none',
                            border: 'none',
                            fontSize: '34px',
                            cursor: 'pointer',
                            color: 'black',
                            outline: 'none',
                            fontWeight: '200'
                            }}
                            >
                            &times;
                            </button>
                            </div>
                            </div>


                            </div>

                    <ModalCloseButton />
                    <ModalBody pb={6} style={{position:'relative'}}>
                      
                        <FormControl mt={4} mb={8}>
                            <FormLabel style={{fontWeight: 'bold'}}>Banner Image</FormLabel>

                            <input type="file" className="hidden" id="labelFile"
                                   onChange={() => handleFile('labelFile', 'labelFileName', 'labelFileUrl')}/>
                            <label style={{border: '1px solid #595959'}} htmlFor={'labelFile'}
                                   className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF] py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <span className="flex items-center justify-between p-0">
                                    <span className="flex items-center gap-1">
                                        <img alt='' src={uploimg} style={{width: '20px', height: '20px'}}/>
                                        {selectedFile?
                                            <span style={{color: global_css.success_text_bg, margin: '0 2px'}}>
                                                {selectedFile?.name?.slice(0, 20)}...
                                            </span> : 'upload file here...'}
                                    </span>
                                    <span className="bg-amber-50 text-black px-2 py-1 mr-[-2%] rounded-[4px] hover:bg-amber-100">
                                    Choose file
                                    </span>
                                </span>
                            </label>

                        </FormControl>
                     {selectedFile &&  <span style={{position:'absolute',marginTop:'1.5rem',fontSize:'12px',color:'#999'}}>Size: {resolution.width} x {resolution.height} px</span> }  

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='white' variant='outline' onClick={onClose}>Close</Button>
                        <Button onClick={handleUpdate} style={{background: selectedFile === null?"#999":global_css.primary_btn, color: 'white'}} ml={3}>
                        Upload
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <style jsx>
                {
                    `
                      .custom-file-upload {
                        padding: 4px 2px;
                        cursor: pointer;
                        font-size: 15px;
                      }

                      .custom-file-upload:active {
                        background-color: white;
                        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
                      }

                      input:focus{
                        outline: none;
                      }
                    `
                }
            </style>
        </div>
    );
};

export default UploadBanner