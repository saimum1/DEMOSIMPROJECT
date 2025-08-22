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
import {useTranslation} from "react-i18next";

const ItemCustomerInfo = ({oid}) => {
  const {t} = useTranslation()
  const [datalist,setdatalist]=useState({

    'first_name':'',
    'last_name':'',
    'gender':'',
    'date_birth':'',

    'tax_code':'',
    'nationality':'',
    'email':'',
    'docNumber':'',
    
    'placeOfIssue':'',
    'docIssueDate':'',
    'docExpireDate':'',
    'client_address':'', 
    
    'location':'',
    'prov':'',
    'postalcode':'',
    'tel':'',
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
  console.log("helloooo", newDataObj)
  localStorage.setItem('saleId', JSON.stringify(newDataObj));
}

useEffect(() => {

   let locaStoragedata=JSON.parse(localStorage.getItem('saleId'))
   console.log("local datau",locaStoragedata)
   let actualDatax=locaStoragedata?.filter(n=>n.id === oid)
   let actualData=actualDatax[0]

  
    if(actualData){ 
        setdatalist(prevState => ({
            ...prevState,
            first_name:actualData?.data.first_name,
            last_name:actualData?.data.last_name,
            gender:actualData?.data.gender,
            date_birth:actualData?.data.date_birth,
        
            tax_code:actualData?.data.tax_code,
            nationality:actualData?.data.nationality,
            email:actualData?.data.email,
            docNumber:actualData?.data.docNumber,
            
            placeOfIssue:actualData?.data.placeOfIssue,
            docIssueDate:actualData?.data.docIssueDate,
            docExpireDate:actualData?.data.docExpireDate,
            client_address:actualData?.data.client_address, 
            
            location:actualData?.data.location,
            prov:actualData?.data.prov,
            postalcode:actualData?.data.postalcode,
            tel:actualData?.data.tel
        }));

        
    }


}, [])



  return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:"100%"}}>
        {/* {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
        {loader &&  <LoadingSoS  /> }  */}

         
              <div bg={global_css.modal_bg} style={{color : 'white',width:'100%'}}>
                
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1rem'}}>


                    <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>First Name<span style={{color:'red'}}></span></FormLabel>
                            <Input name='f_name' type='text'
                             value={datalist.first_name}
                              onChange={(e) => updateDataList('first_name', e.target.value)}
                       
                              style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040'
                            }}   placeholder='Ex. 1242353455' />
                            
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Last Name<span style={{color:'red'}}>*</span></FormLabel>
                            <Input name='l_name' type='text' 
                            value={datalist.last_name} 
                           
                              onChange={(e) => updateDataList('last_name', e.target.value)}
                      
                            style={{
                                outline: 'none !important',
                                boxShadow: 'none',
                                border : '1px solid #595959',
                                background : '#404040',fontSize:'13px'
                            }}   placeholder='Ex. 1242353455' />
                        </FormControl>
                    </div>


                  <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                          <FormControl>
                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Gender<span style={{color:'red'}}>*</span></FormLabel>
                              <select
                              
                              value={datalist.gender}

                              onChange={(e) => updateDataList('gender', e.target.value)}
                              
                              style={{border : '1px solid #595959',}} className="w-full  cursor-pointer bg-[#404040] hover:bg-[#545454] text-[#9CA3AF]  py-2  px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus-none focus:outline-none" >
                                
                                  <option value="">
                                      select gender
                                  </option>
                                  <option value="male">
                                      Male
                                  </option>
                                  <option value="female">
                                      Female
                                  </option>

                                  <option value="other">
                                      Other
                                  </option>
                              </select>
                              
                          </FormControl>

                          <FormControl>
                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>{t('dateOfBirth')}<span style={{color:'red'}}>*</span></FormLabel>
                              <Input name='date_birth' type='date' 
                              value={datalist.date_birth}  onChange={(e) => updateDataList('date_birth', e.target.value)}
                              style={{
                                  outline: 'none !important',
                                  boxShadow: 'none',
                                  border : '1px solid #595959',
                                  background : '#404040',fontSize:'13px'
                              }}   placeholder='Ex. 1242353455' />
                          </FormControl>
                </div>



                <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                       <FormControl>
                            <FormLabel style={{fontWeight :'bold'}}>Tax ID Code</FormLabel>
                            <Input

                              value={datalist.tax_code}  onChange={(e) => updateDataList('tax_code', e.target.value)}

                                style={{
                                    outline: 'none !important',
                                    boxShadow: 'none',
                                    border : '1px solid #595959',
                                    background : '#404040'
                                }}  placeholder='tax code'/>
                        </FormControl>
                  </div>






                  <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                          <FormControl>
                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Nationality<span style={{color:'red'}}>*</span></FormLabel>
                              <Input name='nationality' type='text'
                               value={datalist.nationality}  onChange={(e) => updateDataList('nationality', e.target.value)}
                                style={{
                                  outline: 'none !important',
                                  boxShadow: 'none',
                                  border : '1px solid #595959',
                                  background : '#404040'
                              }}   placeholder='nationality' />
                              
                          </FormControl>

                          <FormControl>
                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>{t('email')}<span style={{color:'red'}}>*</span></FormLabel>
                              <Input name='email' type='email' 
                              value={datalist.email}  onChange={(e) => updateDataList('email', e.target.value)}
                              style={{
                                  outline: 'none !important',
                                  boxShadow: 'none',
                                  border : '1px solid #595959',
                                  background : '#404040',fontSize:'13px'
                              }}   placeholder='Enter email' />
                          </FormControl>
                          </div>


                          <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                          <FormControl>
                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Document number<span style={{color:'red'}}>*</span></FormLabel>
                              <Input name='docNumber' type='text'
                               value={datalist.docNumber}  onChange={(e) => updateDataList('docNumber', e.target.value)}
                                style={{
                                  outline: 'none !important',
                                  boxShadow: 'none',
                                  border : '1px solid #595959',
                                  background : '#404040'
                              }}   placeholder='Enter Document number' />
                              
                          </FormControl>

                          <FormControl>
                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Place of issue<span style={{color:'red'}}>*</span></FormLabel>
                              <Input name='placeOfIssue' type='text' 
                              value={datalist.placeOfIssue}  onChange={(e) => updateDataList('placeOfIssue', e.target.value)}
                              style={{
                                  outline: 'none !important',
                                  boxShadow: 'none',
                                  border : '1px solid #595959',
                                  background : '#404040',fontSize:'13px'
                              }}   placeholder='Enter place of issue' />
                          </FormControl>
                          </div>





                          <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                          <FormControl>
                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Document issue date<span style={{color:'red'}}>*</span></FormLabel>
                              <Input type='date'
                               value={datalist.docIssueDate}  onChange={(e) => updateDataList('docIssueDate', e.target.value)}
                                style={{
                                  outline: 'none !important',
                                  boxShadow: 'none',
                                  border : '1px solid #595959',
                                  background : '#404040'
                              }}   placeholder='Enter Document number' />
                              
                          </FormControl>

                          <FormControl>
                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Document expiration date<span style={{color:'red'}}>*</span></FormLabel>
                              <Input  type='date' 
                              value={datalist.docExpireDate}  onChange={(e) => updateDataList('docExpireDate', e.target.value)}
                              style={{
                                  outline: 'none !important',
                                  boxShadow: 'none',
                                  border : '1px solid #595959',
                                  background : '#404040',fontSize:'13px'
                              }}   placeholder='Enter place of issue' />
                          </FormControl>
                          </div>

                          <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                                  <FormControl>
                                      <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Client address<span style={{color:'red'}}></span></FormLabel>
                                      <textarea
                                       value={datalist.client_address}  onChange={(e) => updateDataList('client_address', e.target.value)}
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
                  
                                  <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                                          <FormControl>
                                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Location<span style={{color:'red'}}>*</span></FormLabel>
                                              <Input  type='text'
                                               value={datalist.location}  onChange={(e) => updateDataList('location', e.target.value)}
                                                style={{
                                                  outline: 'none !important',
                                                  boxShadow: 'none',
                                                  border : '1px solid #595959',
                                                  background : '#404040'
                                              }}   placeholder='Enter your location' />
                                              
                                          </FormControl>

                                          <FormControl>
                                              <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Prov<span style={{color:'red'}}>*</span></FormLabel>
                                              <Input  type='text' 
                                              value={datalist.prov} onChange={(e) => updateDataList('prov', e.target.value)}
                                              style={{
                                                  outline: 'none !important',
                                                  boxShadow: 'none',
                                                  border : '1px solid #595959',
                                                  background : '#404040',fontSize:'13px'
                                              }}   placeholder='Enter your prov' />
                                          </FormControl>
                                          </div>


                                  <div className="flex items-center gap-1 justify-between" style={{backgroundColor:'',width:'100%'}}>

                                    <FormControl>
                                        <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>Postal Code<span style={{color:'red'}}>*</span></FormLabel>
                                        <Input  type='text'
                                         value={datalist.postalcode}  onChange={(e) => updateDataList('postalcode', e.target.value)}
                                          style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border : '1px solid #595959',
                                            background : '#404040'
                                        }}   placeholder='Enter your postal code' />
                                        
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel style={{fontWeight :'bold',fontSize:'13px'}}>{t('mobile')}<span style={{color:'red'}}>*</span></FormLabel>
                                        <Input type='number' 
                                        value={datalist.tel}  onChange={(e) => updateDataList('tel', e.target.value)}
                                        style={{
                                            outline: 'none !important',
                                            boxShadow: 'none',
                                            border : '1px solid #595959',
                                            background : '#404040',fontSize:'13px'
                                        }}   placeholder='Enter telephone' />
                                    </FormControl>
                                    </div>


                   
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

export default ItemCustomerInfo