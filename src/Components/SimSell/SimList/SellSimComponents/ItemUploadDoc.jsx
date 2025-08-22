import React, {useState,useEffect} from 'react';
import {
    chakra,
    FormControl,
    FormLabel, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Input, background
} from "@chakra-ui/react";
import {global_css} from "../../../../GlobalCss/GlobalCSS.js";
import Popnotification from '../../../PopNotification/Popnotification.jsx';
import LoadingSoS from '../../../LoadingScreen/LoadingSoS.jsx';
import axios from "axios";
import config from "../../../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment";
import uploimg from '../../../../assets/static/Upload.svg'
import OperatorDropDown from '../../../CustomDropDown/OperatorDropDown.jsx';
import VideoUploader from '../../../PopNotification/VideoUploader.jsx';
import {useTranslation} from "react-i18next";


const ItemUploadDoc = ({oid}) => {

  const [selectedFile,setSelectedFile]=useState(null)
  const [selectedFileKey,setselectedFileKey]=useState(null)
  const [selectedFileUrlKey,setselectedFileUrlKey]=useState(null)
  const fileKeys = [
    'file_1', 'file_2', 'file_3', 'file_4', 'file_5', 'file_6'
  ];
  const {t} = useTranslation()
  const [datalist,setdatalist]=useState({
    'file_1_file':'',
    'file_1_url':'',
    'file_2_file':'',
    'file_2_url':'',
    'file_3_file':'',
    'file_3_url':'',
    'file_4_file':'',
    'file_4_url':'',
    'file_5_file':'',
    'file_5_url':'',
    'file_6_file':'',
    'file_6_url':'',
})



const updateLocalStorageByKey = (key, value) => {
  let locaStoragedata=JSON.parse(localStorage.getItem('saleId'))
  let actualDatax=locaStoragedata?.filter(n=>n.id === oid)
  let newDataObj = actualDatax.map(item => {
          item.data[key] = value;
      return item;
  });
  localStorage.setItem('saleId', JSON.stringify(newDataObj));
}



 const handleFile = (e,filekey,urlkey) => {

        let file =document.getElementById(e).files[0]
        let filename=file?.name
        setSelectedFile(file)
        setselectedFileKey(filekey)
        setselectedFileUrlKey(urlkey)

        setdatalist(prev=>({
            ...prev,
            [filekey]:filename,
  
          }))
         console.log("file",filename)
         updateLocalStorageByKey(filekey, filename)



    }


    const geturl=(e)=>{
            console.log("urlbody",e) 
            let url=e?.data?.fileUrl
            setdatalist(prev=>({
              ...prev,
              [selectedFileUrlKey]:url
    
            }))
           updateLocalStorageByKey(selectedFileUrlKey, url) 
    }

useEffect(() => {
   let locaStoragedata=JSON.parse(localStorage.getItem('saleId'))
   console.log("local datauxx",locaStoragedata)
   let actualDatax=locaStoragedata?.filter(n=>n.id === oid)
   let actualData=actualDatax[0]
    if(actualData){ 
        setdatalist(prevState => ({
            ...prevState,
            'file_1_url':actualData?.data.file_1_url,
            'file_1_file':actualData?.data.file_1_file,
            'file_2_url':actualData?.data.file_2_url,
            'file_2_file':actualData?.data.file_2_file,
            'file_3_url':actualData?.data.file_3_url,
            'file_3_file':actualData?.data.file_3_file,
            'file_4_url':actualData?.data.file_4_url,
            'file_4_file':actualData?.data.file_4_file,
            'file_5_url':actualData?.data.file_5_url,
            'file_5_file':actualData?.data.file_5_file,
            'file_6_url':actualData?.data.file_6_url,
            'file_6_file':actualData?.data.file_6_file
        }));
    }
}, [oid])





  return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:"100%"}}>
        {/* {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
        {loader &&  <LoadingSoS  /> }  */}
                
            <VideoUploader filex={selectedFile} geturl={geturl}/>
         
              <div bg={global_css.modal_bg} style={{color : 'white',width:'100%'}}>
                
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1rem'}}>


                    <div className="flex flex-col items-start gap-1 justify-start" style={{backgroundColor:'',width:'100%',fontSize:"13px"}}>
                              <span>1. The maximum file size is 2 MB.</span>
                              <span>2. Only upload PNG, JPEG, PDF files.</span>
                    </div>

                                        {fileKeys.map((fileKey, index) => (
                                                <div key={index} className="flex items-center gap-1 justify-between" style={{ backgroundColor: '', width: '100%' }}>
                                                    <FormControl mt={4} mb={8}>
                                                        <input type="file" id={fileKey} className="hidden" onChange={() => handleFile(fileKey, `${fileKey}_file`, `${fileKey}_url`)} />
                                                        <label style={{ border: '1px solid #595959' }} htmlFor={fileKey} className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                            <span className="flex items-center justify-between p-0">
                                                                <span className="flex items-center gap-1">
                                                                    <img src={uploimg} style={{ width: '20px', height: '20px' }} />
                                                                  {  datalist[`${fileKey}_file`] ? <span style={{color:global_css.success_text_bg,margin:'0 2px'}}>{datalist[`${fileKey}_file`]?.slice(0, 20)}... </span> : 'upload file here...'}
                                                                </span>
                                                                <span className="bg-amber-50 text-black px-2 py-1 mr-[-3%] rounded-[4px] hover:bg-amber-100">{t('chooseFile')}</span>
                                                            </span>
                                                        </label>
                                                    </FormControl>
                                                </div>
                                        ))}
                   
                  </div>
                  </div>
                  
       
      

          <style jsx>
              {
                  ``
              }
          </style>
      </div>
  );
};

export default ItemUploadDoc