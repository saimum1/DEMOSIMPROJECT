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
    Input, background, useDisclosure
} from "@chakra-ui/react";
import {global_css} from "../../../GlobalCss/GlobalCSS.js";
import Popnotification from '../../PopNotification/Popnotification.jsx';
import LoadingSoS from '../../LoadingScreen/LoadingSoS.jsx';
import axios from "axios";
import config from "../../../config.jsx";
import toast from "react-hot-toast";
import moment from "moment";
import activexiconwhite from '../../../assets/static/activexwhite.svg'
import activexicongreen from '../../../assets/static/activex.svg'
import activexfullgreen from '../../../assets/static/activexgreen.svg'
import ItemSimInfo from './SellSimComponents/ItemSimInfo.jsx';
import ItemCustomerInfo from './SellSimComponents/ItemCustomerInfo.jsx';
import ItemMnpPort from './SellSimComponents/ItemMnpPort.jsx';
import ItemUploadDoc from './SellSimComponents/ItemUploadDoc.jsx';
import { resetfnc } from './ResetData.jsx';
import ViewOfferCenter from "../../OfferCenter/ViewOfferCenter.jsx";
import ViewClientInfo from "../ViewClient/ViewClientInfo.jsx";

const SaveSell = ({isOpen,onOpen, onClose ,data}) => {


    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [loader,setloader]=useState(false)
    const [ statusx, setstatusx ] = useState(0)
    const [pageview, setpageview] = useState(true)

    const [isPageChanging, setIsPageChanging] = useState(false)
    const { isOpen : isClientOpen, onOpen: onClientOpen, onClose: onClientClose } = useDisclosure()


console.log("daaaaaaaaaaa", data)

    const sendataback=()=>{
        setstatusx((prev) => (prev === 0 ? prev : prev - 1));
    }
    const sendata=()=>{
        setstatusx((prev) => (prev === 4 ? prev : prev + 1));
        if(statusx === 4){
            openclientview()
        }
    }


    const renderComponent = () => {
        console.log("asfsf",statusx)

       

     
          switch (statusx) {
            
              case 0:
              return <ItemSimInfo oid={data?.id} price={data?.buyingPrice}/>

              case 1:
              return <ItemCustomerInfo oid={data?.id}/>

              case 2:
              return <ItemMnpPort oid={data?.id}/>

              case 3:
              return <ItemUploadDoc oid={data?.id}/>


            default:
              return null;
          }
      
        }

    const openclientview=()=>{
        if (statusx === 4) {
            onClientOpen()
            onClose()
            setpageview(false);
            setIsPageChanging(true);
            setTimeout(() => {
              setIsPageChanging(false);
              setpageview(true);
            }, 200);
          }
        console.log("3434343")
       
    }
        const settransition=()=>{
            setpageview(false)
            setIsPageChanging(true);

            setTimeout(() => {
                setIsPageChanging(false);
                setpageview(true)
              }, 200);
        }


        useEffect(() => {
               
            openclientview()
           
          }, [statusx]);


        // const resetfnc =()=>{
        //     let locaStoragedata = JSON.parse(localStorage.getItem('saleId'));
        //     let newData = locaStoragedata.map(item => {
        //         if (item.id === oid) {
        //             keys.forEach(key => delete item.data[key]);
        //         }
        //         return item;
        //     });
        //     localStorage.setItem('saleId', JSON.stringify(newData));
        // }
 



        const getrecall=()=>{
            settransition()
        }

  
    return (
        <div >
          {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> } 
          {loader &&  <LoadingSoS  /> }
            <ViewClientInfo   isOpen={isClientOpen} onClose={onClientClose} saveOpen={onOpen}  oid={data?.id} setstatusx = {setstatusx} statusx={statusx}/>

            <Modal 
                isOpen={isOpen}
                onClose={onClose}
               

            >
                <ModalOverlay/>
                <ModalContent bg={global_css.modal_bg} style={{color : 'white'}}>
                    <ModalHeader style={{transition:"all 900ms",fontSize:'15px'}}>
                        {statusx === 0?'SIM information':statusx === 1?'Customer information ':statusx === 2?'MNP/PORTABILITY WITH ANOTHER MANAGER':statusx === 3?'Upload document':''}</ModalHeader>
                    <div style={{height:'1.7px',backgroundColor:'#404040',width:'90%',alignSelf:'center'}}></div>
                    <ModalCloseButton />
                    <ModalBody style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:'1rem'}}>
                   
                            <div className="flex  items-center  justify-between" style={{backgroundColor:'',width:'100%',transition:'all 900ms'}}>

                          
                                <div style={{transition:'900ms'}}>
                                    <img src={statusx > 0?activexfullgreen:activexicongreen} style={{width:"55px" ,height:"55px" ,transition:'all 900ms'}}/>
                                </div>
                            
                                <div style={{height:'1.7px',backgroundColor: statusx > 0?'#29CC79':'#404040' ,width:'100%',alignSelf:'center',transition:'all 900ms'}}></div>
                                
                                
                                <div style={{transition:'900ms'}}>
                                    <img src={statusx === 0?activexiconwhite:
                                    statusx === 1? activexicongreen:status >1? activexfullgreen:activexfullgreen} style={{width:"55px" ,height:"55px",transition:'all 900ms'}}/>
                                </div>
                            
                                <div style={{height:'2px',backgroundColor:statusx === 0? '#404040':statusx === 1?   '#404040':'#29CC79',width:'100%',alignSelf:'center',transition:'all 900ms'}}></div>

                                <div style={{transition:'900ms'}}>
                                <img src={statusx === 0?activexiconwhite:
                                    statusx === 1? activexiconwhite:statusx === 2? activexicongreen:status >2? activexfullgreen:activexfullgreen} style={{width:"55px" ,height:"55px",transition:'all 900ms'}}/>

                                </div>
                            
                                <div style={{height:'2px',backgroundColor:statusx === 0? '#404040':statusx === 1?   '#404040':statusx === 2?   '#404040':'#29CC79',width:'100%',alignSelf:'center',transition:'all 900ms'}}></div>

                                <div style={{transition:'900ms'}}>
                                <img src={statusx === 0?activexiconwhite:
                                    statusx === 1? activexiconwhite:statusx === 2? activexiconwhite:statusx === 3? activexicongreen:status >3? activexfullgreen:activexfullgreen} style={{width:"55px" ,height:"55px",transition:'all 900ms'}}/>

                                </div>

                            </div>


                            <div className="flex  items-center " style={{backgroundColor:'',width:'100%',transition:'all 900ms'}}>

                            <div style={{minHeight:'16rem',height:'auto',maxHeight:'20rem',overflowY:'auto',width:'100%',backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'flex-start',transition:'all 300ms'}} >
                                    <div className={`page-transition ${isPageChanging ? 'changing' : ''}`} id='showcomp' style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center' ,transition:'all 300ms',borderRadius:global_css.card_border_radius}}>
                                        { pageview && renderComponent()}
                                    </div>



                                </div>

                            </div>


                    </ModalBody>

                    <ModalFooter style={{display:'flex',gap:'1rem',justifyContent:'space-between',width:'100%',backgroundColor:'',marginTop:'1rem'}}>
                        
                    <Button colorScheme='white' variant='outline' onClick={()=>resetfnc(data?.id,statusx,settransition)} style={{fontSize:'80%'}}>reset</Button>

                        <div  style={{display:'flex',gap:'1rem',justifyContent:'flex-end',width:'100%',backgroundColor:''}}>
                        <Button style={{fontSize:'80%'}} colorScheme='white' variant='outline'
                         onClick={()=>{sendataback();settransition();} }
                         >Back</Button>
                        <Button
                        
                        onClick={()=>{
                            {
                                sendata();
                                settransition();
                            }} }
                        
                        style={{background : "#27CF7A", color: 'white',width:'40%',fontSize:'80%'}} >
                            {statusx === 3?'Preview & Submit' : 'Save next'}
                        </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>

         
            </Modal>

            <style jsx>
    {`
   .page-transition {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
  }
  
  .page-transition.changing {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }





    `}
</style>
        </div>
    );
};

export default SaveSell