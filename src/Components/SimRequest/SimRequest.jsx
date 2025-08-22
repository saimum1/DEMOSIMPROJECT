import React, { useState ,useEffect} from 'react';
import SimRequestAgentpage from './SimRequestAgentpage.jsx';
import SimRequestAdminpage from './SimRequestAdminpage.jsx';
import SimrequestAdminReviewpage from './SimrequestAdminReviewpage.jsx';
import SimRequestADminConfirmpage from './SimRequestADminConfirmpage.jsx';
import {useAuth} from "../../Context/AuthInfo.jsx";
import SimRequestOrderInfo from './SimRequestOrderInfo.jsx';

const SimRequest = () => {

    const { user } = useAuth();
console.log("rolex",user.role)
const role =user.role
const [pageview,setpageview]=useState('initial')
const [isPageChanging,setIsPageChanging]=useState(false)
const [orderid,setorderid]=useState()


const actioncall=(e,ordid,data)=>{
  console.log("orderid",ordid)
  setorderid(ordid)

    setIsPageChanging(true);
   
    setTimeout(() => {
        setIsPageChanging(false);
        setpageview(e)
      }, 300);
}



  return (

<>

<div className={`page-transition ${isPageChanging ? 'changing' : ''}`} style={{width:'100%',height:"100%"}}>
{role === 'AGENT'?
            <SimRequestAgentpage/>
            :
            role === 'ADMIN' &&
                pageview === 'initial'?
                  <SimRequestAdminpage  actioncallset={actioncall} orderid={orderid} />
                :
                pageview === 'review'?
                  <SimrequestAdminReviewpage actioncallset={actioncall} orderid={orderid} />
                :
                pageview === 'confirm'?
                  <SimRequestADminConfirmpage actioncallset={actioncall} orderid={orderid}  />
                  :
                  pageview === 'pdf_info'?
                  <SimRequestOrderInfo actioncallset={actioncall} orderid={orderid}  />:''

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

export default SimRequest