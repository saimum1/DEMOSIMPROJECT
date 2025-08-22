// import React, { useState ,useEffect } from 'react';
// import { Select, SelectItem } from "@tremor/react";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faAngleUp, faArrowUp, faCaretDown, faCaretUp, faChevronDown, faL} from "@fortawesome/free-solid-svg-icons";
// import usa from '../../assets/static/usa.png'
// import Avatar from "../Avatar.jsx";
// import { data } from 'autoprefixer';
// import italyimagesvg from '../Navbar/Image/IT.svg'
// import usaimagesvg from '../Navbar/Image/US.svg'
// import companylogo from '../../assets/static/companylogo.svg'
// import {useAuth} from "../../Context/AuthInfo.jsx";
// import axios from "axios";
// import config from "../../config.jsx";

// const OperatorDropDown = ({opera_name}) => {
//     const { user , logout} = useAuth();

//   const[selecteddesc,Setselecteddesc]=useState({
//     logoUrl:'',
//     name:''
//   })

//     const getoperators = async (xna) => {
//         console.log("asdasdeee",xna)
//         try {
//             const response = await axios.get(`${config.apiUrl}/api/operator`);
//             console.log('opear:====xxx', response?.data?.operators);
//             let xdata=response?.data?.operators
//             if(xdata?.length >0){
//                 for(const i of xdata){
//                     if(opera_name){
//                         if(i['name'] === opera_name){
//                             selecteddesc.logoUrl = i.logoUrl
//                             selecteddesc.name = i.name
//                         }
//                     }
                   

                  

//                 }
//             }
          
// console.log("seleeed",selecteddesc)
//         } catch (error) {
//             console.error('Error++++:', error);
//             setLoader(false)
//             throw error;
//         }
//     };
//     useEffect(() => {
//         if(opera_name !== ''){
//             getoperators(opera_name)
//         }

//         console.log("operaname",opera_name)
//     }, [opera_name])
    
//     return (

      
//         <div style={{display:"flex",height:"100%" ,
//         width:'100%',justifyContent:'space-between',alignItems:'center' }} >
//   {selecteddesc.name !== ''? 
//              <div   style={{backgroundColor:'#404040',width:'100%',padding:'5px',borderRadius:'5px',gap:'1rem' ,height:'100%', transition: 'all 300ms',display:'flex' ,alignItems:'center' ,justifyContent:'flex-start'}} >
//                  <img src={`${config.apiUrl}/${selecteddesc?.logoUrl && selecteddesc?.logoUrl}`} style={{height:'30px' ,width:'30px'}}/> <span >{selecteddesc?.name && selecteddesc?.name}</span>
    
//        </div> 
//    :'' }
//         </div>
       
//     );
// };

// export default OperatorDropDown







import React, { useState, useEffect } from 'react';
import axios from "axios";
import config from "../../config.jsx";
import { useAuth } from "../../Context/AuthInfo.jsx";

const OperatorDropDown = ({ opera_name }) => {
    const { user, logout ,token} = useAuth();

    // State for selected operator description
    const [selecteddesc, setSelecteddesc] = useState({
        logoUrl: '',
        name: ''
    });

    const getOperators = async (xna) => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Operators:', response?.data?.operators);
            const operators = response?.data?.operators || [];

            // Find the operator with the matching name
            const matchedOperator = operators.find((op) => op.name === opera_name);

            if (matchedOperator) {
                setSelecteddesc({
                    logoUrl: matchedOperator.logoUrl,
                    name: matchedOperator.name
                });
            }
        } catch (error) {
            console.error('Error fetching operators:', error);
        }
    };

    useEffect(() => {
        if (opera_name) {
            getOperators(opera_name);
        }
        console.log("Operator name:", opera_name);
    }, [opera_name]);

    return (
        <div style={{
            display: "flex",
            height: "100%",
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            {selecteddesc.name && (
                <div
                    style={{
                        backgroundColor: '#404040',
                        width: '100%',
                        padding: '5px',
                        borderRadius: '5px',
                        gap: '1rem',
                        height: '100%',
                        transition: 'all 300ms',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}
                >
                    <img
                        src={`${config.apiUrl}${selecteddesc.logoUrl}`}
                        alt="Operator Logo"
                        style={{ height: '30px', width: '30px' }}
                    />
                    <span>{selecteddesc.name}</span>
                </div>
            )}
        </div>
    );
};

export default OperatorDropDown;
