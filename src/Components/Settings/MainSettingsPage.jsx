import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Card } from '@chakra-ui/react';
import { useAuth } from "../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../config.jsx";

import activexfullgreen from "../../assets/static/activexgreen.svg";
import activexicongreen from "../../assets/static/activex.svg";
import ProfileInfo from "./ProfileInfo.jsx";
import ChangePass from "./ChangePass.jsx";
import NotificationSound from "./NotificationSound.jsx";
import LanguageSettings from "./LanguageSettings.jsx";
import ActivityLog from "./ActivityLog.jsx";
import LoadingSoS from "../LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
import { global_css } from '../../GlobalCss/GlobalCSS.js';

const MainSettingsPage = () => {
    const { t } = useTranslation();

    // Function to generate tab list with current translations
    const getTabList = () => [
        {
            id: 1,
            name: t('editProfile')
        },
        {
            id: 2,
            name: 'Password'
        },
        {
            id: 3,
            name: t('notificationSound')
        },
        {
            id: 4,
            name: t('changeLanguage')
        },
        {
            id: 5,
            name: t('activityLog')
        }
    ];

    const [tabList, setTabList] = useState(getTabList());
    const [selectedStage, setSelectedStage] = useState({
        id: 1,
        name: t('editProfile')
    });

    const { token ,UserInfo:usInf} = useAuth();
    const [profileInfo, setProfileInfo] = useState({
        name: "",
        mobile: "",
        email: "",
        dateOfBirth: null,
        id: null,
        photoUrl: null,
        photoFilename: null,
        notificationSound: false,
        language: "english",
        userId: null,
        createdAt: "",
        updatedAt: ""
    });

    const [loader, setLoader] = useState(false);
    const [showpopoup, setshowpopup] = useState(false);
    const [showpopoupstatus, setshowpopupstatus] = useState('success');
    const [showpopoupmsg, setshowpopupmsg] = useState('');

    // Update translations when language changes
    useEffect(() => {
        const newTabList = getTabList();
        setTabList(newTabList);

        // Update selected stage with new translation while preserving selected ID
        setSelectedStage(prevStage => ({
            id: prevStage.id,
            name: newTabList.find(tab => tab.id === prevStage.id).name
        }));
    }, [t]);

    const UserInfo = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`${config.apiUrl}/api/profileSettings/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfileInfo(response?.data?.profile);
            setLoader(false);
        } catch (error) {
            console.error('Error:', error);
            setLoader(false);
            throw error;
        }
    };

    useEffect(() => {
        UserInfo();
    }, []);

    const handleUpdate = async (data) => {
        try {
            const response = await axios.put(
                `${config.apiUrl}/api/profileSettings/profile`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setshowpopupmsg('Successfully Updated');
            setshowpopupstatus('success');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false);
            }, 1500);

            await UserInfo();
            await usInf(token);
        } catch (error) {
            console.error('Error:', error);
            setshowpopupmsg(error.response?.data?.error);
            setshowpopupstatus('fail');
            setshowpopup(true);

            setTimeout(() => {
                setshowpopup(false);
            }, 1500);

            throw error;
        }
    };

    return (
        <div className="flex justify-center h-full w-full items-start md:items-start bg-[#303038] rounded-[7px]">
            {loader && <LoadingSoS />}
            {showpopoup && <Popnotification msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} />}

            <Card className="bg-[#303038] text-white h-full w-[100%]"
                  style={{
                      borderRadius: global_css.card_border_radius,
                      backgroundColor: global_css.primary_card_bg,
                      boxShadow: 'none',
                      gap: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'auto',
                      padding: '1%'
                  }}>
                <div className="flex justify-center items-start w-10/12 h-full">
                    <div className="flex flex-col items-start justify-between"
                         style={{
                             width: '20%',
                             transition: 'all 900ms',
                             marginTop: '10%'
                         }}>
                        {tabList.map(item => (
                            <div key={item.id}
                                 style={{ transition: '900ms' }}
                                 className="flex items-center justify-center mb-2 gap-3">
                                <img
                                    alt=""
                                    src={selectedStage.id === item.id ? activexfullgreen : activexicongreen}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        transition: 'all 900ms'
                                    }}
                                />
                                <span
                                    onClick={() => setSelectedStage(item)}
                                    style={{
                                        color: selectedStage.id === item.id ? '#29CC79' : 'white',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontStyle: 'normal',
                                        cursor: 'pointer',
                                        fontFamily: 'Inter',
                                        lineHeight: '20px'
                                    }}>
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="w-8/12 flex flex-col items-center justify-center gap-2">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <span style={{
                                color: 'white',
                                textAlign: 'center',
                                fontFamily: 'Inter',
                                fontSize: '26px',
                                fontWeight: 500,
                                fontStyle: 'normal',
                                lineHeight: 'normal'
                            }}>
                                {profileInfo?.name} / {selectedStage.name}
                            </span>
                            <hr style={{
                                backgroundColor: '#404040',
                                height: '1px',
                                width: '500px',
                                border: 'none'
                            }} />
                        </div>

                        {selectedStage?.id === 1 ? (
                            <ProfileInfo
                                profileInfo={profileInfo}
                                setProfileInfo={setProfileInfo}
                                handleUpdate={handleUpdate}
                                setSelectedStage={setSelectedStage}
                            />
                        ) : selectedStage?.id === 2 ? (
                            <ChangePass
                                setshowpopup={setshowpopup}
                                setshowpopupstatus={setshowpopupstatus}
                                setshowpopupmsg={setshowpopupmsg}
                                setSelectedStage={setSelectedStage}
                            />
                        ) : selectedStage?.id === 3 ? (
                            <NotificationSound
                                profileInfo={profileInfo}
                                setProfileInfo={setProfileInfo}
                                handleUpdate={handleUpdate}
                            />
                        ) : selectedStage?.id === 4 ? (
                            <LanguageSettings
                                profileInfo={profileInfo}
                                setProfileInfo={setProfileInfo}
                                handleUpdate={handleUpdate}
                                setSelectedStage={setSelectedStage}
                            />
                        ) : selectedStage?.id === 5 ? (
                            <ActivityLog />
                        ) : null}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default MainSettingsPage;