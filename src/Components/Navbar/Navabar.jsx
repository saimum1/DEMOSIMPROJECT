import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import companylogo3 from '../../assets/static/ARSP LOGO...svg';
import settingsicon from '../Navbar/Image/Setting.svg';
import settingsiconblack from '../Navbar/Image/Settingblack.svg';
import notificationiconblack from '../Navbar/Image/NotificationBlack.svg';
import notificationicon from '../Navbar/Image/Notification.svg';
import notificationicongreen from '../Navbar/Image/Notificationgreen.svg';
import italyimagesvg from '../Navbar/Image/IT.svg';
import usaimagesvg from '../Navbar/Image/US.svg';
import propic from '../Navbar/Image/propic.png';
import doorout from '../Navbar/Image/doorout.svg';
import dooroutblack from '../Navbar/Image/dooroutblack.svg';
import { useAuth } from "../../Context/AuthInfo.jsx";  
import NotifyBOx from '../Notifybox/NotifyBOx.jsx';
import config from '../../config.jsx';
import axios from 'axios';
import { global_css } from '../../GlobalCss/GlobalCSS.js';

const Navbar = () => {
    const { user, logout,changeR ,token ,profileInfo} = useAuth();
    const { i18n, t } = useTranslation();
    const [selectedLang, setSelectedLang] = useState({
        lang: 'EN',
        image: usaimagesvg,
        code: 'en'
    });
    const [clicked, setClicked] = useState(false);
    const [notificationActive, setNotificationActive] = useState(false);
    const [notiCount, setNotiCount] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isSpinning, setIsSpinning] = useState(false);

    const languageData = [
        {
            lang: 'EN',
            image: usaimagesvg,
            code: 'en'
        },
        {
            lang: 'IT',
            image: italyimagesvg,
            code: 'it'
        }
    ];

    const UserInfo = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/profileSettings/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:profile', response?.data?.profile);
            // setProfileInfo(response?.data?.profile);
            const res=response?.data?.profile
            if(res.language === 'english'){
                setSelectedLang({
                    lang: 'EN',
                    image: usaimagesvg,
                    code: 'en'
                });

                i18n.changeLanguage('en');

            }else{
                setSelectedLang( {
                    lang: 'IT',
                    image: italyimagesvg,
                    code: 'it'
                });
                i18n.changeLanguage('it');

            }
        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    };

    useEffect(() => {
        // Initialize selected language based on i18n current language
        // const currentLang = languageData.find(lang => lang.code === i18n.language) || languageData[0];
        // setSelectedLang(currentLang);
        UserInfo()
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const showLangOptions = () => {
        setClicked(!clicked);
    };

    const setLang = (langCode) => {
        const newLang = languageData.find(lang => lang.code === langCode);
        if (newLang) {
            setSelectedLang(newLang);
            i18n.changeLanguage(newLang.code);
        }
        setClicked(false);
    };

    const handleNotification = () => {
        setNotificationActive(!notificationActive);
    };

    const handleIconClick = () => {
        setIsSpinning(!isSpinning);
         changeR('Settings')
    };

    return (
        <div style={{
            backgroundColor: isDarkMode ? "#303038" : "white",
            display: "flex",
            height: "4.5rem",
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: "background-color 700ms ease",
            padding:'0 1rem'
        }}>
            <NotifyBOx activestatus={notificationActive} getNotificationcout={setNotiCount} />

            <div style={{flex:4,color:global_css.primary_txt_color, height: "auto", width: '9rem' ,backgroundColor:""}}>
                {/* <img src={'companylogo3'} style={{ width: '100%', height: '100%' }} alt={t('navbar.logo')} /> */}
                <span>XYZ Company</span>
            </div>

          
          
          
          
            <div style={{flex:1,  display: 'flex',width:'100%', alignItems: 'center',justifyContent:'flex-center',gap:'.5rem',backgroundColor:'' }}>
                <div
                        onClick={handleIconClick}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.5s ease',
                            transform: isSpinning ? 'rotate(50deg)' : 'rotate(0deg)',
                            width:'100%',height:'100%'
                        }}
                    >
                        <img
                            src={isDarkMode ? settingsicon : settingsiconblack}
                            alt={t('navbar.settings')}
                            style={{ width: '22px', height: '22px' }}
                        />
                </div>



                {user && (
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        width:'100%',height:'100%',
                        transition: "background-color 700ms ease",
                        marginRight:"1.3rem",

                    }} onClick={handleNotification}>
                        <img
                            src={notificationActive ? notificationicongreen : isDarkMode ? notificationicon : notificationiconblack}
                            style={{ width: '22px', height: '22px' }}
                            alt={t('notifications')}
                        />
                        {notiCount > 0 && (
                            <div style={{
                                position: 'absolute',
                                top: '-11px',
                                right: '-8px',
                                backgroundColor: 'red',
                                color: 'white',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}>
                                {notiCount}
                            </div>
                        )}
                    </div>
                )}



{user && (
                <div style={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: 'auto', 
                backgroundColor: '',
                height: "40px",
                gap: '12px',marginRight:'8px'
                }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    width: 'auto',
                    height: '100%',
                    transition: "background-color 700ms ease",

                }}>
                    <span style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    width: 'auto',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    whiteSpace: 'nowrap' ,
                    transition: "background-color 700ms ease",
                    color:isDarkMode?  'rgba(255, 255, 255, 0.85)':'black',

                    }}>
                    {profileInfo?.name}
                    </span>
                    <span style={{
                    fontSize: '14px',
                    color:isDarkMode?  '#999':'black',
                    width: 'auto',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    whiteSpace: 'nowrap' ,
                     transition: "background-color 700ms ease",

                    }}>
                    {user?.actualRole}
                    </span>
                </div>
                
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: '1',
                    width: 'auto',
                    height: '100%'
                }}>
                    <div style={{
                    width: '33px',
                    height: '33px',
                    borderRadius: '50%',
                    // border: `1px solid ${isDarkMode?'whitesmoke':'#999'}`,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: "background-color 700ms ease",
                    boxShadow: `0px 0px 7px  ${isDarkMode?'whitesmoke':'#999'}`
                    }}>

                    <img
                        src={profileInfo?.photoUrl ? `${config.apiUrl}${profileInfo.photoUrl}` : propic}
                        style={{ width: '100%', height: '100%' }}
                        alt="Profile"
                        />

                    </div> 
                </div>
                </div>)}


             

            <div
            className="boxround"
            style={{
                backgroundColor: "var(--Dark-Grey, #444)",
                height: "auto",
                width: "8.5rem",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                position: "relative", 
                transition: "all 300ms ease-in-out", 
            }}
            >
            <div
                style={{
                backgroundColor: `${isDarkMode ? 'var(--Dark-Grey, #444)' : '#7F8C8D'}`,
                height: "2.3rem",
                width: "8.5rem",
                borderTopRightRadius: "4px",
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: clicked ? "" : "4px",
                borderBottomRightRadius: clicked ? "" : "4px",
                padding: "8px 16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "all 300ms ease-in-out", 
                }}
            >
                <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: "1",
                    width: "100%",
                    height: "100%",
                }}
                >
                <img
                    src={selectedLang.image}
                    style={{ width: "48px", height: "25px" }}
                    alt=""
                />
                </div>
                <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: "1",
                    width: "100%",
                    height: "100%",
                    color: "rgba(255, 255, 255, 0.85)",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    lineHeight: "15px",
                    fontSize: "16px",
                }}
                >
                {selectedLang.lang}
                </div>
                <div
                style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: "1",
                    width: "100%",
                    height: "100%",
                }}
                onClick={() => showLangOptions()}
                >
                <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{
                    color: "#2AEA87",
                    height: "25px",
                    width: "25px",
                    transition: "transform 300ms ease-in-out", // Smooth caret rotation
                    transform: clicked ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                />
                </div>
            </div>
                <div
                style={{
                    pointerEvents: clicked ? "auto" : "none",
                    cursor: "pointer",
                    backgroundColor: `${isDarkMode ? 'var(--Dark-Grey, #444)' : '#7F8C8D'}`,
                    width: "8.5rem",
                    borderBottomRightRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    height: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "absolute",
                    top: "110%", 
                    left: "0",
                    zIndex: 1,
                    transition: "opacity 300ms ease-in-out, transform 300ms ease-in-out", // Smooth dropdown reveal
                    opacity: clicked ? 1 : 0,
                    transform: clicked ? "translateY(0)" : "translateY(-10px)",
                }}
                >
                {languageData
                    .filter((item) => item.lang !== selectedLang.lang)
                    .map((item, index, array) => (
                    <div
                        key={item.code}
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "2.3rem",
                        borderBottomLeftRadius:
                            index === array.length - 1 ? "4px" : "",
                        borderBottomRightRadius:
                            index === array.length - 1 ? "4px" : "",
                        borderBottom:
                            index === array.length - 1 ? "" : "2px solid #303038",
                        transition: "background-color 300ms ease-in-out", // Smooth hover effect
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#555")
                        }
                        onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                            "var(--Dark-Grey, #444)")
                        }
                        onClick={() => setLang(item.code)}
                    >
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: "1",
                            width: "100%",
                            height: "100%",
                        }}
                        >
                        <img
                            src={item.image}
                            style={{ width: "48px", height: "25px" }}
                            alt=""
                        />
                        </div>
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: "1",
                            width: "100%",
                            height: "100%",
                            color: "rgba(255, 255, 255, 0.85)",
                            fontFamily: "Inter",
                            fontWeight: "500",
                            lineHeight: "15px",
                            fontSize: "16px",
                        }}
                        >
                        {item.lang}
                        </div>
                    </div>
                    ))}
                </div>

            </div>






                <div className='boxround' style={{backgroundColor:`${isDarkMode? 'var(--Dark-Gery, #444)' : '#7F8C8D'}`
                        ,height:"2.3rem",width:'100%' ,
                        padding:'8px 12px',display:"flex",justifyContent:'center',alignItems:'center'}}>
                    <svg
                        style={{
                            transition: "opacity 400ms ease, transform 700ms ease",
                            transform: isDarkMode ? "rotate(120deg)" : "rotate(0deg)",
                            cursor: "pointer"
                        }}
                        onClick={toggleTheme}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke={isDarkMode ? "white" : "black"}
                        className="w-5 h-5"
                    >
                        {isDarkMode ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636M12 7a5 5 0 100 10 5 5 0 000-10z"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.354 15.354A9 9 0 1110.646 5.646 7 7 0 0020.354 15.354z"
                            />
                        )}
                    </svg>
                </div>



                {user && 
                <div
                title='log out'
                onClick={logout}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            width:'100%',height:'100%'
                        }}
                    >
                        <img
                            src={isDarkMode ? doorout : dooroutblack}
                            alt='logout'
                            style={{ width: '4.5rem', height: '100%' }} 
                        />
                    </div>
                }
                


            </div>

            <style>
                {`
                
                .boxround{
                 border-top-right-radius: 4px;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;

                }
                `}
            </style>
        </div>
    );
};

export default Navbar;