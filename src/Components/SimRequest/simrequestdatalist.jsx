
import axios from "axios";
import config from "../../config.jsx";
import {useAuth} from "../../Context/AuthInfo.jsx";
import {revertString} from "../commonFunctions/StringConversion.jsx";

export let dataset=[]

const getdata=(da)=>{
  let sds=[]
    for(const i of da){
      let xx={
        'img':'',
        'name':i.operator.name,
        'amount':i.quantity,
        'operator_id':i.operator.id
      }

      sds.push(xx)
    }

    return sds
}
export const getorderlist=async(token)=>{
 console.log('ssssss')
  let xdata=[]
  try {
      // ${config.apiUrl}/${item.logoUrl}
      const response = await axios.get(`${config.apiUrl}/api/order`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      console.log('Response:for get order', response.data.orders);
      for(const i of response?.data?.orders ){

        console.log("jnjnjnjni",i)
          let dx={order_no:i.id,

            details:getdata(i.orderItems),

            order_date:i.updatedAt,
            isdeleted:i.isDeleted,

            status:i.status,
          total_quantity:i.totalQuantity}



          xdata.push(dx)
          console.log("asasaas",dx)
      }
      dataset=(xdata)

      console.log("adadada",dataset)
    
  } catch (error) {
      console.error('Error++++:', error);
      throw error;
  
  }

}


export const reqaddnewsimlist=async (d, token)=>{

    let orderItems={orderItems:[]}
      for(const i of d){

        let x={
          "operatorId": i.operator_id,
          "quantity": parseInt(i.amount)
        }

        orderItems.orderItems.push(x)
      }

      console.log("asdadccc",orderItems)
        const response = await axios.post(`${config.apiUrl}/api/order`,orderItems, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('sadasda',response)
      return response.status
}


// export const reqremoveItem = async(itemx) => {

//   const response = await axios.delete(`${config.apiUrl}/api/order/${itemx.order_no}`);

//    console.log("sssss for delete",response)
//   //  getorderlist()
//   return response.status
//   };

export const reqremoveItem = async (itemx, token) => {
  try {
    const response = await axios.delete(`${config.apiUrl}/api/order/${itemx.order_no}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log("sssss for delete", response);

    if (response.status === 200) {
      await getorderlist();  // Await the getorderlist function to update the dataset
      return response.status;
    } else {
      // Handle error cases appropriately
      return response.status;
    }
  } catch (error) {
    console.error('Error removing item:', error);
    throw error;
  }
};

export const requpdateItem = async(updatedItem, token) => {
console.log("sfsf update",updatedItem)

    let orderItems={orderItems:[]}
    for(const i of updatedItem?.details){

      let x={
        "operatorId": i.operator_id,
        "quantity": parseInt(i.amount)
      }

      orderItems.orderItems.push(x)
    }

    console.log("asdadccc",orderItems)
      const response = await axios.put(`${config.apiUrl}/api/order/${updatedItem.order_no}`,orderItems, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      console.log('sadasda',response)
      return response.status
      // getorderlist()
  };



  export const requpdateItemstatus = async(updatedItem,status, token) => {
      const response = await axios.put(`${config.apiUrl}/api/order/${updatedItem.order_no}/update/status`,{status:`${revertString(status.lang)}`}, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      console.log('staus admin update',response)
      return response.status

  }; 



export const addedsimlistadmin=(data)=>{
  console.log("first")
  dataset=data
}


export const getselectedsimlistdata=()=>{
  return dataset
}