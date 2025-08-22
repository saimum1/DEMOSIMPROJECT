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


const ItemMnpPort = ({oid}) => {

  const[selectedOperator,SetselectedOperator]=useState({})
  const[clicked,setclicked]=useState(false)
  const [selectedFile,setSelectedFile]=useState(null)
  const [selectedFileKey,setselectedFileKey]=useState(null)
  const [selectedFileUrlKey,setselectedFileUrlKey]=useState(null)
  const {t} = useTranslation()
  const [datalist,setdatalist]=useState({

    'top_up':'',
    'old_operator':'',
    'old_iccn':'',
    'old_sim_number':'',
    'old_photo_sim_file':'',
    'old_photo_sim_url':'',
    'taxcodeimage_file':'',
    'taxcodeimage_url':'',
    'mandatory_taxcode_img_file':'',
    'mandatory_taxcode_img_url':'',
    'note':'',
})


const getofferdata=(e)=>{
    console.log("offersde",e)
}


const updateDataList = (key, value) => {
  setdatalist(prevState => ({
      ...prevState,
      [key]: value
  }));

  updateLocalStorageByKey(key, value)
};


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
        console.log('fefefe',filename)
        setSelectedFile(file)
        setselectedFileKey(filekey)
        setselectedFileUrlKey(urlkey)

        setdatalist(prev=>({
          ...prev,
          [filekey]:filename,

        }))
       console.log("file",file)
       updateLocalStorageByKey(filekey, filename)


    }



    const geturl=(e)=>{
      console.log("urlbodycc",e)
      let url=e?.data?.fileUrl
      setdatalist(prev=>({
        ...prev,
        [selectedFileUrlKey]:url

      }))
     updateLocalStorageByKey(selectedFileUrlKey, url) 
}


useEffect(() => {

   let locaStoragedata=JSON.parse(localStorage.getItem('saleId'))
   let actualDatax=locaStoragedata?.filter(n=>n.id === oid)
   let actualData=actualDatax[0]
   console.log("local datauv",actualData)

  
    if(actualData){ 
        setdatalist(prevState => ({
            ...prevState,
            'top_up':actualData?.data.top_up,
            'old_operator':actualData?.data.old_operator,
            'old_iccn':actualData?.data.old_iccn,
            'old_sim_number':actualData?.data.old_sim_number,
            'old_photo_sim_url':actualData?.data?.old_photo_sim_url,
            'old_photo_sim_file':actualData?.data?.old_photo_sim_file,
            'taxcodeimage_url':actualData?.data?.taxcodeimage_url,
            'taxcodeimage_file':actualData?.data?.taxcodeimage_file,
            'mandatory_taxcode_img_url':actualData?.data?.mandatory_taxcode_img_url,
            'mandatory_taxcode_img_file':actualData?.data?.mandatory_taxcode_img_file,
            'note':actualData?.data.note
        }));

        
    }else{
      setdatalist(prevState => ({
        ...prevState,
        'top_up':'',
        'old_operator':'',
        'old_iccn':'',
        'old_sim_number':'',
        'old_photo_sim_url':'',
        'old_photo_sim_file':'', 
        'taxcodeimage_url':'',
        'taxcodeimage_file':'',
        'mandatory_taxcode_img_url':'',
        'mandatory_taxcode_img_file':'',
        'note':''
    }));

    }


}, [])

const xSetselectedOperator=(e)=>{
    console.log("opeee",e)
    SetselectedOperator(e)
    updateDataList('old_operator',e)
}

  return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:"100%"}}>
        {/* {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
        {loader &&  <LoadingSoS  /> }  */}
            <VideoUploader filex={selectedFile} geturl={geturl}/>

         
              <div bg={global_css.modal_bg} style={{color : 'white',width:'100%'}}>
                
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1rem'}}>


                    <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Top up <span style={{color:'red'}}>*</span></FormLabel>
                            <Input  type='number'
                             value={datalist.top_up}  onChange={(e) => updateDataList('top_up', e.target.value)}
                              style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}   placeholder='€50' />
                            
                        </FormControl>
                    </div>


                  <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                          <FormControl>
                          <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Old Operator<span style={{color:'red'}}>*</span></FormLabel>

                          <OperatorDropDown  setclicked={setclicked} clicked={clicked} selectedOperator={datalist.old_operator} SetselectedOperator={xSetselectedOperator}/>
                              
                          </FormControl>

                       
                </div>






                  <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                          <FormControl>
                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Old ICCID numbers<span style={{color:'red'}}></span></FormLabel>
                              <Input  type='number'
                               value={datalist.old_iccn}  onChange={(e) => updateDataList('old_iccn', e.target.value)}
                                style={{
                                  outline: 'none !important',
                                  boxShadow: 'none',
                                  border : '1px solid #595959',
                                  background : '#404040'
                              }}   placeholder='Enter old ICCID number' />
                              
                          </FormControl>

                          <FormControl>
                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>{t('simNumber')}<span style={{color:'red'}}></span></FormLabel>
                              <Input  type='number' 
                              value={datalist.old_sim_number}  onChange={(e) => updateDataList('old_sim_number', e.target.value)}
                              style={{
                                  outline: 'none !important',
                                  boxShadow: 'none',
                                  border : '1px solid #595959',
                                  background : '#404040',fontSize:'13px'
                              }}   placeholder='Enter old sim number' />
                          </FormControl>
                          </div>


                         

                          <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                          <FormControl mt={4} mb={8}>
                            <FormLabel>Upload the photo of the old SIM:<span style={{color:'red'}}>*</span> </FormLabel>
                                                    
                                                      <input  type="file" id="old_photo_sim" className="hidden" onChange={()=>handleFile('old_photo_sim','old_photo_sim_file','old_photo_sim_url')} />
                                                      <label style={{border : '1px solid #595959'}} htmlFor="old_photo_sim" className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                      <span className="flex items-center justify-between p-0">
                                            <span className="flex items-center gap-1">
                                                   <img src ={uploimg} style={{width:'20px',height:'20px'}}/>
                                                {datalist.old_photo_sim_file ?<span style={{color:global_css.success_text_bg,margin:'0 2px'}}> {datalist?.old_photo_sim_file?.slice(0, 20)} </span>: 'upload file here..'}</span> <span className="bg-amber-50 text-black px-2 py-1 mr-[-3%] rounded-[4px] hover:bg-amber-100">Choose file</span>
                                        </span>
                                                      </label>
                                                  </FormControl>
                          </div>





                          <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                                <FormControl mt={4} mb={8}>
                                  <FormLabel>Upload Original and Photocopy Tax Code: <span style={{color:'red'}}>*</span></FormLabel>
                                                        
                                                            <input  type="file"  id="taxcodeimage" className="hidden" onChange={()=>handleFile('taxcodeimage','taxcodeimage_file','taxcodeimage_url')}  />
                                                            <label style={{border : '1px solid #595959'}} htmlFor="taxcodeimage" className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <span className="flex items-center justify-between p-0">
                                            <span className="flex items-center gap-1">
                                                   <img src ={uploimg} style={{width:'20px',height:'20px'}}/>
                                                {datalist.taxcodeimage_file ? <span style={{color:global_css.success_text_bg,margin:'0 2px'}}>{datalist?.taxcodeimage_file?.slice(0, 20)} </span>: 'upload file here..'}</span> <span className="bg-amber-50 text-black px-2 py-1 mr-[-3%] rounded-[4px] hover:bg-amber-100">{t('chooseFile')}</span>
                                        </span>
                                                            </label>
                                                        </FormControl>
                                </div>



                          <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                            <FormControl mt={4} mb={8}>
                              <FormLabel>No one portability without a copy of the mandatory tax code? <span style={{color:'red'}}>*</span></FormLabel>
                                                        <input  type="file"  id="mandatory_taxcode_img" className="hidden" onChange={()=>handleFile('mandatory_taxcode_img','mandatory_taxcode_img_file','mandatory_taxcode_img_url')}  />
                                                        <label style={{border : '1px solid #595959'}} htmlFor="mandatory_taxcode_img" className="w-full absolute cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-1 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <span className="flex items-center justify-between p-0">
                                        <span className="flex items-center gap-1">
                                              <img src ={uploimg} style={{width:'20px',height:'20px'}}/>
                                            {datalist.mandatory_taxcode_img_file ?<span style={{color:global_css.success_text_bg,margin:'0 2px'}}> {datalist?.mandatory_taxcode_img_file?.slice(0, 30)} </span>: 'upload file here..'}</span> <span className="bg-amber-50 text-black px-2 py-1 mr-[-3%] rounded-[4px] hover:bg-amber-100">Choose file</span>
                                    </span>
                                                        </label>
                                                    </FormControl>
                            </div>


                            <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                            <FormControl>
                                      <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Note<span style={{color:'red'}}>*</span></FormLabel>
                                      <textarea 
                                       value={datalist.note} onChange={(e) => updateDataList('note', e.target.value)}
                                        style={{
                                          outline: 'none !important',
                                          boxShadow: 'none',
                                          border : '1px solid #595959',
                                          background : '#404040',
                                          minHeight:'4rem',
                                          width:'100%',padding:'1rem'
                                      }}   placeholder='Enter full address (ex-RESIDENT IN STREET, NUMBER, HOUSE, INTERNAL)' />
                                      
                                  </FormControl>
                            </div>


                   
                  </div>
                  </div>
                  
       
      

          <style jsx>
              {
                  `
                  
                  .custom-file-upload {
                    padding: 4px 2px;
                    cursor: pointer;
                    //background-color: #f5f5f5;
                    font-size: 15px;
                  }

                  //.custom-file-upload:hover {
                  //  background-color: red;
                  //}

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

export default ItemMnpPort