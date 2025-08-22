import React, { useState ,useEffect} from 'react';
import BalanceSheet from './BalanceSheet';
import BalancePaymentHistory from './BalancePaymentHistory';
import { useAuth } from '../../Context/AuthInfo';
import BalancePaymentHistoryCouruer from './BalancePaymentHistoryCouruer';


const BalanceSheetRouting = ({payloaddata}) => {

const { user ,valuePass,profileInfo} = useAuth();
console.log("rolex",user.role,payloaddata)
const role =user.role
const [pageview,setpageview]=useState('initial')
const [isPageChanging,setIsPageChanging]=useState(false)
const [orderid,setorderid]=useState()
const [ordtype,setordtype]=useState()


const actioncall=(e,ordid,optype)=>{
  console.log("orderid",ordid)
  setorderid(ordid)
  setordtype(optype)
    setIsPageChanging(true);
   
    setTimeout(() => {
        setIsPageChanging(false);
        setpageview(e)
        valuePass(null)
      }, 300);
}


useEffect(() => {


if(payloaddata){
  actioncall(payloaddata?.pageview,payloaddata?.agentid,payloaddata?.transtype,)



}

}, [payloaddata])


useEffect(() => {
  setordtype('SIM')
}, [])


  return (

<>

<div className={`page-transition ${isPageChanging ? 'changing' : ''}`} style={{width:'100%',height:"100%"}}>
      {role === 'AGENT'?
                ordtype === 'SIM' ?  <BalancePaymentHistory actioncallset={actioncall} agentid={profileInfo?.agentId} optiontype={'SIM'}/>:
                <BalancePaymentHistoryCouruer actioncallset={actioncall} agentid={profileInfo?.agentId} optiontype={'Courier'}/>
                  :
                  role === 'ADMIN' &&
                      pageview === 'initial'?
                        <BalanceSheet  actioncallset={actioncall} agentid={orderid} optiontype={ordtype}/>
                      :
                      pageview === 'payment'?
                        ordtype === 'SIM' ?  <BalancePaymentHistory actioncallset={actioncall} agentid={orderid} optiontype={ordtype}/>:
                        <BalancePaymentHistoryCouruer actioncallset={actioncall} agentid={orderid} optiontype={ordtype}/>
                      :''
      }
</div>
<style jsx>
    {`
   .page-transition {
    opacity: 1;
    transition: opacity 300ms ease-in-out;
  }
  
  .page-transition.changing {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }
    `}
</style>

</> 
  )
}
export default BalanceSheetRouting