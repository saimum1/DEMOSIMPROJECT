

const status1=['offerid']

const status2=[  'first_name','last_name','gender','date_birth','tax_code','nationality','email',
                'docNumber','placeOfIssue','docIssueDate','docExpireDate','client_address','location',
                'prov','postalcode','tel']

const status3=[ 'top_up','old_operator','old_iccn','old_sim_number','old_photo_sim_url','old_photo_sim_file',
                'taxcodeimage_file','taxcodeimage_url','mandatory_taxcode_img_file','mandatory_taxcode_img_url','note']

const status4=[ 'file_1_file','file_1_url','file_2_file','file_2_url','file_3_file','file_3_url','file_4_file',
                'file_4_url','file_5_file','file_5_url','file_6_file','file_6_url']


export const resetfnc =(oid,status,settransition)=>{

    let keys =( status === 0?status1:status === 1?status2:status === 2?status3:status === 3?status4:'')
    let locaStoragedata = JSON.parse(localStorage.getItem('saleId'));
    let newData = locaStoragedata.map(item => {
        if (item.id === oid) {
            keys.forEach(key => delete item.data[key]);
        }
        return item;
    });
    localStorage.setItem('saleId', JSON.stringify(newData));
    settransition()
}
