import React, {useCallback, useEffect, useState} from 'react';
import bg from "../../assets/static/icons_tower.png"
import {Button, TextInput} from "@tremor/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../Context/AuthInfo.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
import AddOperator from "../InventoryTable/AddOperator.jsx";
import {useTranslation} from "react-i18next";


const Login = () => {
    const [captcha, setCaptcha] = useState(null)
    const [inputValues, setInputValues] = useState({
        password: '',
        email: ''
    });
    const[captchaError, setCaptchaError] = useState(false)
    const[loginError, setLoginError] = useState(false)
    const { login } = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    const { t } = useTranslation();

   const dummyUsers = [
    {
        email: "towhidul015@gmail.com",
        password: "kilobyte",
        name: "Towhidul Islam",
        role: "USER"
    },
    {
        email: "towhidulopu766@gmail.com",
        password: "kilobyte",
        name: "Towhidul Opu",
        role: "AGENT",
        actualRole:"AGENT"
    },
    {
        email: "admin@admin.com",
        password: "admin1234",
        name: "Admin User",
        role: "ADMIN",
        actualRole:"ADMIN"
    }
];
    const from = location.state?.from?.pathname || '/';
    // const hitLogin = async () => {

    //     try {

    //         const response = await axios.post(`${config.apiUrl}/api/auth/login`, inputValues);
    //         console.log('Response:loginInfo', response);
    //         login(response?.data?.user, response?.data?.token);
    //         if(response.statusText==='OK'){

    //                 navigate(from, { replace: true });

    //         }
    //         else{
    //             setLoginError(true)

    //         }

    //     } catch (error) {
    //         console.error('Error++++:', error);
    //         setLoginError(true)

    //         throw error;
    //     }
    // };
const hitLogin = async () => {
    try {
        // Find user in dummyUsers
        const user = dummyUsers.find(
            u => u.email === inputValues.email && u.password === inputValues.password
        );

        if (user) {
            // Simulate successful login response
            const fakeResponse = {
                statusText: "OK",
                data: {
                    user: {
                        email: user.email,
                        name: user.name,
                        role: user.role
                    },
                    token: `fake-jwt-token-${user.email}`
                }
            };

            login(fakeResponse.data.user, fakeResponse.data.token);

            if (fakeResponse.statusText === 'OK') {
                navigate(from, { replace: true });
            } else {
                setLoginError(true);
            }
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        console.error('Error++++:', error);
        setLoginError(true);
        throw error;
    }
};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = value === '' || emailRegex.test(value);

            // Update the style based on the validation result
            e.target.style.border = isValidEmail ? '1px solid #ccc' : '2px solid red';
        }
    };

    // const hill = () =>{
    //     if (captcha){
    //         hitLogin()
    //     }else{
    //         setCaptchaError(true)
    //     }
    // }
    return (
        <div style={{height : 'calc(100vh - 4.5rem)'}}>

            <div  className='bg-[#3A3F44] h-full w-full '>
                <img src={bg} className="h-full w-full" alt=""/>

            </div>
            <div
                className="w-3/12 md:w-6/12 lg:w-4/12 xl:w-3/12"
            style={{height:'auto',display:'flex',justifyContent:'center',alignItems:'center'
            ,position:'absolute',top:'55%' ,left:'50%',transform:"translate(-50%,-45%)",
            backgroundColor:'#303038' ,color:'white',padding:'26px 54px',borderRadius:'16px'}} 
            
            >
                <div style={{backgroundColor:'' ,width:'100%' ,height:'100%',display:'flex' ,justifyContent:'center',
                            alignItems:'center',flexDirection:'column',gap:'1rem' ,fontFamily:'inter'}}>

                    <div className="sm:text-xl md:text-2xl lg:text-2xl" style={{display:'flex',justifyContent:'center',alignItems:'flex-start',backgroundColor:'',flexGrow:1,
                    height:'4rem' ,width:'100%',fontFamily:'inter',color:'rgba(255, 255, 255, 0.75)',marginBottom:'0.5rem'}}>
                        {t('loginto')}
                    </div>

            

                    <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',
                    width:'100%',gap:'11px' }}>
                        <span style={{width:"100%",color:'rgba(255, 255, 255, 0.75)'}}>{t('email')}</span>
                        <input name="email" onChange={handleInputChange} type='mail' style={{height:'48px',backgroundColor:'#444444',padding:'1rem' ,border:'none',borderRadius:'10px',fontFamily:'inter',width:'100%',color:'rgba(255, 255, 255, 0.85)'}} placeholder="xyz123@gmail.com"/>
                    </div>

                    <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',
                    width:'100%',gap:'11px' }}>
                        <span style={{width:"100%",color:'rgba(255, 255, 255, 0.75)'}}>{t('password')}</span>
                        <TextInput name="password" onChange={handleInputChange} type='password' className=" border-none rounded-[10px] bg-[#444444]" style={{height:'48px',fontFamily:'inter',width:'100%',color:'rgba(255, 255, 255, 0.85)'}} placeholder="Type password here"/>
                    </div>


                    <div className="flex justify-between mb-6 w-full text-[13px] ">
                        <div>
                            <label className="checkbox-container">
                                <input type="checkbox"/>
                                <span className="checkbox-checkmark"></span>
                            </label>

                            <span> {t('remember')}</span>
                        </div>
                        <span className="hover:text-red-500 cursor-pointer"><a href={`/forgotpass`}>{t('forgotpass')}</a></span>

                    </div>

                        {/*<div>*/}
                        {/*<ReCAPTCHA*/}
                        {/*    sitekey={import.meta.env.VITE_CAPTCHA_API_KEY}*/}
                        {/*    onChange={setCaptcha}*/}
                        {/*    className="scale-[.95] md:scale-[.95] lg:scale-[0.77] xl:scale-[0.77] 2xl:scale-[.95]"*/}
                        {/*/>*/}
                        {/*    {captchaError && <p className="text-red-600 text-center">Please Fill up Captcha</p>}*/}
                        {/*</div>*/}

                    <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',
                    width:'100%',gap:'11px' }}>
                        <button
                        onMouseDown={(e) => {
                            e.target.style.backgroundColor = '#1EAB5E'; 
                          }}
                          onMouseUp={(e) => {
                            e.target.style.backgroundColor = '#27CF7A'; 
                          }}
                        onClick={() => {
                            hitLogin()
                        }}
                        className="py-4 mb-1 border-none rounded-[8px] bg-[#27CF7A] mt-1 font-inter w-full px-4 font-bold" style={{height:'48px',display:'flex',justifyContent:'center' ,alignItems:'center' ,fontStyle:'normal',fontFamily:'inter',color:'#FFF'}}>{t('signIn')}</button>
                        {loginError && <p className="text-red-600 text-center">Wrong Email or PassWord</p>}
                    </div>




                </div>
            </div>
            <style jsx>
                {
                    `
                    .texthover:hover{
                        color:red;
                    }
                        input[type="checkbox"] {
                            opacity: 0; /* Hide the visually */
                            position: absolute; /* Remove from layout */
                        }
                      .checkbox-container {
                        display: inline-block;
                        position: relative;
                        padding-left: 25px; /* Adjust for checkbox size */
                      }

                      .checkbox-checkmark {
                        position: absolute;
                        top: -14px;
                        left: 0.5px;
                        height: 15px; /* Adjust for checkbox size */
                        width: 15px; /* Adjust for checkbox size */
                        border: 1px solid #ccc; /* Adjust border color */
                        border-radius: 3px;
                      }

                      input[type="checkbox"]:checked + .checkbox-checkmark {
                        background-color: #27CF7A; /* Checked state color */
                      }

                    
                    `
                }
            </style>
        </div>
    );
};

export default Login;