
// Italy form data
const formInfoItaly = {
    orderType : 'Italy Goods',
    senderInfo : {
        senderType : 1,
        firstName : "jhon",
        lastName : "Doe",
        documentNo : "wewewee",
        codiceFiscale : 'wewewe',
        phone : '21212121',
        email : 'sdmsldm@lsmdl',
        city : 'dhaka',
        state : 'dhaka',
        postalCode : '2323',
        address : 'wwewewewe',
        uploadedFileNameSender : 'file.jpg',
        uploadedFileUrlSender : 'http//:file.jpg'
    },
    receiverInfo : {
        receiverType : 1,
        firstName : "jhon",
        lastName : "Doe",
        phone : '21212121',
        optionalPhone : '21212121',
        postalCodeCAP : '2323',
        email : 'sdmsldm@lsmdl',
        city : 'dhaka',
        state : 'dhaka',
        country : 'Italy',
        address : 'wwewewewe',
    },

    orderDetails:{
        commissionRow : [{
            productDescription : 'good product',
            weight : 23,
            perKg : 2323,
            charge : 12122,
            total : 232323

        }],
        serviceCharge : 676,
        totalAgentCommision : 2333,
        totalWithHomeDeliveryCharge : 2323,
        totalAmount : 2323
    },

    orderNote : '2wwwwwww233',
    status : 'pending'

}


// Italy form data
const formInfoInternational = {
    orderType : 'International Goods',
    senderInfo : {
        senderType : 1,
        firstName : "jhon",
        lastName : "Doe",
        documentNo : "wewewee",
        codiceFiscale : 'wewewe',
        phone : '21212121',
        email : 'sdmsldm@lsmdl',
        city : 'dhaka',
        state : 'dhaka',
        postalCode : '2323',
        address : 'wwewewewe',
        uploadedFileNameSender : 'file.jpg',
        uploadedFileUrlSender : 'http//:file.jpg'
    },
    receiverInfo : {
        receiverType : 1,
        firstName : "jhon",
        lastName : "Doe",
        phone : '21212121',
        optionalPhone : '21212121',
        postalCodeCAP : '2323',
        email : 'sdmsldm@lsmdl',
        city : 'dhaka',
        state : 'dhaka',
        country : 'Italy',
        address : 'wwewewewe',
    },

    orderMesurments:[{
           boxNo : '23232',
            width : 23,
            height : 2323,
            volumetricWeight : 223

        }],

        orderDetails:{
        commissionRow : [{
            productDescription : 'good product',
            weight : 23,
            perKg : 2323,
            charge : 12122,
            total : 232323

        }],
        serviceCharge : 676,
            totalAgentCommision : 2333,
            deliveryCharge : 2323,
            totalWithHomeDeliveryCharge : 2323
    },

    orderNote : '2wwwwwww233',
    status : 'pending'

}

// Bangladesh form data
const formInfoBangladesh = {
    orderType : 'Bangladesh Goods',
    senderInfo : {
        senderType : 1,
        firstName : "jhon",
        lastName : "Doe",
        documentNo : "wewewee",
        codiceFiscale : 'wewewe',
        phone : '21212121',
        email : 'sdmsldm@lsmdl',
        city : 'dhaka',
        state : 'dhaka',
        postalCode : '2323',
        address : 'wwewewewe',
        uploadedFileNameSender : 'file.jpg',
        uploadedFileUrlSender : 'file.jpg'
    },
    receiverInfo : {
        receiverType : 1,
        firstName : "jhon",
        lastName : "Doe",
        phone : '21212121',
        optionalPhone : '21212121',
        postalCodeCAP : '2323',
        email : 'sdmsldm@lsmdl',
        city : 'dhaka',
        state : 'dhaka',
        country : 'Italy',
        address : 'wwewewewe',
    },

    deliveryDetails:{
       deliveryCondition : 'New home delivery',
       dhakaAddress : 'khwkhe29u',
       deliveryCharge : 2323,
        productDetailsFileName : 'file.jpg',
        productDetailsFileUrl: 'http//:file.jpg'

        },

        orderDetails:{
        commissionRow : [{
            boxNo : '2323',
            type:'wewe',
            productDescription : 'good product',
            weight : 23,
            cusCha : '23wew',
            perKg : 2323,
            charge : 12122,
            gValue : 12122,
            iAmount : 12122,
            total : 232323

        }],
        serviceCharge : 676,
        totalAgentCommision : 2333,
        deliveryCharge : 2323,
        totalWithHomeDeliveryCharge : 2323
    },

    orderNote : '2wwwwwww233',
    status : 'pending'
}








// agent commision starts here

const ItalyCommision = {
    orderType : 'Italy goods',
    commissionRow : [
        {
            weight : 23,
            amount : 2323,
            agentCommission : 22
        }
    ],
    exceedsLimit : false

}


const ItalyCommisionExceeds = {
    orderType : 'Italy goods',
    commissionRow : [
        {
            weight : 23,
            amount : 2323,
            agentCommission : 22
        }
    ],
    exceedsLimit : true,

    weight : 23,
    amount : 2323,
    agentCommission : 22


}


const InternationalCommision = {
    orderType : 'International goods',
    commissionRow : [
        {
            weight : 23,
            amount : 2323,
            agentCommission : 22,
            length : 65,
            width : 776,
            height : 76,
        }
    ],
    exceedsLimit : false

}
const InternationalCommisionExceeds = {
    orderType : 'International goods',
    commissionRow : [
        {
            weight : 23,
            amount : 2323,
            agentCommission : 22,
            length : 65,
            width : 776,
            height : 76,
        }
    ],
    exceedsLimit : true,
    weight : 23,
    amount : 2323,
    agentCommission : 22,
    length : 65,
    width : 776,
    height : 76,

}



const BangladeshCommision = {
    orderType : 'Bangladeshi goods',
    commissionRow : [
        {
            weight : 23,
            amount : 2323,
            agentCommission : 22
        }
    ],
    exceedsLimit : false

}

const BangladeshCommisionExceeds = {
    orderType : 'Bangladeshi goods',
    commissionRow : [
        {
            weight : 23,
            amount : 2323,
            agentCommission : 22
        }
    ],
    exceedsLimit : true,
    weight : 23,
    amount : 2323,
    agentCommission : 22

}