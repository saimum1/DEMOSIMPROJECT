export const convertString = (str) => {
    if (str === '') return '';
    const words = str.split('_');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const revertString = (str) => {
    if (str === '') return '';
    const words = str.split(' ');
    return words.map(word => word.charAt(0).toLowerCase() + word.slice(1)).join('_');
};




export const NumberSystem = (number) =>{
    if(isNaN(number)){
        return 0
    }else{
        return parseFloat(number).toLocaleString('en-IN', {minimumFractionDigits: 2,maximumFractionDigits: 2})
    }
}