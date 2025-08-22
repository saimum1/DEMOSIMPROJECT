import React from 'react'  
 
export const processWeekData = (locaStoragedata) => {
    console.log("localdata",locaStoragedata)
                let datalist={
                    "id": null,
                    "firstName": locaStoragedata?.first_name,
                    "lastName": locaStoragedata?.last_name,
                    "gender": null,
                    "dateOfBirth": locaStoragedata?.date_birth,
                    "taxIdCode": locaStoragedata?.tax_code,
                    "nationality": locaStoragedata?.nationality,
                    "email": locaStoragedata?.email,
                    "documentNumber": null,
                    "documentIssueDate": locaStoragedata?.docIssueDate,
                    "documentExpirationDate": locaStoragedata?.docExpireDate,
                    "clientAddress": locaStoragedata?.client_address,
                    "location": locaStoragedata?.location,
                    "postalCode": locaStoragedata?.postalcode,
                    "telephone": locaStoragedata?.tel,
                    "topUp": locaStoragedata?.top_up,
                    "oldOperatorId": null,
                    "oldICCIDNumber": locaStoragedata?.old_iccn,
                    "oldSIMNumber": locaStoragedata?.old_sim_number,
                    "oldSIMFileURL": locaStoragedata?.old_photo_sim_url,
                    "originalAndPhotocopyTaxCodeFileURL": null,
                    "copyOfMandatoryTaxCodeFileURL": null,
                    "oldOperator": {
                        "id": locaStoragedata?.old_operator?.id,
                        "name": locaStoragedata?.old_operator?.name,
                        "logoUrl": locaStoragedata?.old_operator?.logoUrl,
                        "code": locaStoragedata?.old_operator?.code,
                        "status": locaStoragedata?.old_operator?.status,
                        "isDeleted": null,
                        "deletedTime": null,
                        "createdAt": null,
                        "updatedAt": null
                    },
                    "note": locaStoragedata?.note,
                    "documentFileURLs": {
                        "file1": locaStoragedata?.file_1_url,
                        "file2": locaStoragedata?.file_2_url,
                        "file3": locaStoragedata?.file_3_url,
                    },
                    "isDeleted": false,
                    "deletedTime": null,
                    "createdAt": null,
                    "updatedAt": null,
                    "simCard": {
                        "id": null,
                        "iccidNumber": locaStoragedata?.iccid,
                        "simCardNumber": locaStoragedata?.sim_number,
                        "entryDate": null,
                        "buyingPrice": null,
                        "status": null,
                        "agentStatus": null,
                        "rejectionNote": null,
                        "isDeleted": false,
                        "deletedTime": null,
                        "operatorId": null,
                        "operatorName": locaStoragedata?.operator_name,
                        "orderId": null,
                        "agentId": null,
                        "customerId": null,
                        "offerId": locaStoragedata?.offerid,
                        "createdAt": null,
                        "updatedAt": null
                }
    }
    return datalist;
  };











  export default () => {
   return (
       <div>detail</div>
   )
}