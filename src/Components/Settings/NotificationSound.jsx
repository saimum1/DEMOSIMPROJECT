import React from 'react';
import {FormControl, Switch} from '@chakra-ui/react'
import {useTranslation} from "react-i18next";
const NotificationSound = ({profileInfo, setProfileInfo, handleUpdate}) => {
    const {t} = useTranslation()
    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        const updatedProfileInfo = {
            ...profileInfo,
            [name]: type === 'checkbox' ? checked : value // Generalize for both checkboxes and other inputs
        };

        setProfileInfo(updatedProfileInfo);
        handleUpdate(updatedProfileInfo);
    };

    return (
        <div className="w-3/4 mt-20 text-white flex flex-col items-start ml-20 justify-start">
            <p className=' mb-2 text-[20px] font-bold'>{t('alertsAndNotifications')}</p>
            <FormControl className="flex j gap-2 items-center">
                <Switch name="notificationSound" isChecked={profileInfo?.notificationSound}  onChange={handleChange} sx={{
                    '& .chakra-switch__track[data-checked]': {
                        backgroundColor: '#27CF7A',
                    },
                }} size='lg' />
                <p className="text-[15px]">{t('enableNotificationSound')}</p>
            </FormControl>
        </div>
    );
};

export default NotificationSound;