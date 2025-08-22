import React, {useState} from 'react';
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import {TextInput} from "@tremor/react";
import {Button} from "@chakra-ui/react";
import axios from "axios";
import config from "../../config.jsx";
import {useAuth} from "../../Context/AuthInfo.jsx";
import {useTranslation} from "react-i18next";

const ChangePass = ({setshowpopup, setshowpopupstatus, setshowpopupmsg, setSelectedStage}) => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const { user , token } = useAuth();

    const {t} = useTranslation()
    const handleUpdate = async () => {
        try {

            const k = {
                oldPassword: oldPassword,
                newPassword: confirmPassword
            }
            console.log("booooo------->", k)
            const response = await axios.put(`${config.apiUrl}/api/profileSettings/change-password`, k, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response);



            setshowpopupmsg('Successfully Updated');
            setshowpopupstatus('success');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            await setConfirmPassword('')
            await setOldPassword('')
        } catch (error) {
            console.error('Error++++:', error);
            setshowpopupmsg(error.response?.data?.error)
            setshowpopupstatus('fail')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
            throw error;
        }



    };
    return (
        <div className="w-3/4 mt-12 text-white">

            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',
                width:'100%',gap:'11px', marginBottom:'1.5rem' }}>
                <span style={{width:"100%",color:global_css.primary_txt_color}}>{t('oldPassword')}</span>
                <TextInput type='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className=" border-none rounded-[10px] bg-[#444444]" style={{height:'48px',fontFamily:'inter',width:'100%',color:'rgba(255, 255, 255, 0.85)'}} placeholder="new old here"
                           />

            </div><div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'column',
                width:'100%',gap:'11px', marginBottom:'1.5rem' }}>
                <span style={{width:"100%",color:global_css.primary_txt_color}}>{t('newPassword')}</span>
                <TextInput type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className=" border-none rounded-[10px] bg-[#444444]" style={{height:'48px',fontFamily:'inter',width:'100%',color:'rgba(255, 255, 255, 0.85)'}} placeholder="new password here"
                           />

            </div>


            <div className="flex justify-end">
                <div>
                    <Button onClick={() => setSelectedStage({
                        id : 1,
                        name : t('editProfile')
                    })} colorScheme='white' variant='outline' >{t('close')}</Button>
                    <Button onClick={handleUpdate}   style={{background: "#27CF7A", color: 'white'}} ml={3}>
                        Update
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default ChangePass;