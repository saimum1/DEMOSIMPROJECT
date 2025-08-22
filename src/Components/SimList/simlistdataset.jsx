export let dataset  = [];


export const addnewsimlist=(d)=>{
        console.log('sadasda',d)
        dataset.push(d)
}


export const removeItem = (itemx) => {
       console.log("sssss",itemx)
        const updatedItems = dataset.filter(item => item.iccid !== itemx.iccid);
    
      
        dataset=updatedItems;
      };

export const updateItem = (updatedItem) => {
        const updatedItems = dataset.map(item => {
          if (item.iccid === updatedItem.iccid) {
            return updatedItem;
          }
          return item;
        });
        dataset = updatedItems;
      };


export const dummySims = [
  {
    id: 1,
    operatorId: 1,
    iccidNumber: "1234567890123456789",
    simCardNumber: "9876543210",
    buyingPrice: 10.99,
    entryDate: "2025-01-15",
    status: "available",
    name: "Operator One"
  },
  {
    id: 2,
    operatorId: 2,
    iccidNumber: "9876543210987654321",
    simCardNumber: "1234567890",
    buyingPrice: 12.99,
    entryDate: "2025-02-20",
    status: "not_available",
    name: "Operator Two"
  }
];      