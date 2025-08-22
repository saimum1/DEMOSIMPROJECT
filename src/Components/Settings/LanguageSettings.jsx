import React, {useState} from 'react';
import {Button, FormControl, FormLabel, Switch} from "@chakra-ui/react";
import { ChevronDown } from 'lucide-react';
import {useTranslation} from "react-i18next";

const LanguageSettings = ({profileInfo, setProfileInfo, handleUpdate, setSelectedStage}) => {
    const languages = [
        { code: 'english', name: 'ENGLISH', flag: '🇺🇸' },
        { code: 'italian', name: 'Italian', flag: '🇮🇹' },

        // Add more languages as needed
    ];
    const {t} = useTranslation()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(profileInfo?.language? languages.find(lang => lang.code === profileInfo?.language) : languages[0]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectLanguage = (language) => {
        setSelectedLanguage(language);

        const updatedProfileInfo = {
            ...profileInfo,
            language : language?.code
        };

        setProfileInfo(updatedProfileInfo);
        setIsOpen(false);
    };
    return (
        <div className="relative w-1/2 mt-20 mr-44">
            <button
                onClick={toggleDropdown}
                style={{border: '1px solid #595959'}}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-white bg-[#404040] rounded-md focus:outline-none"
            >
        <span className="flex items-center">
          <span className="mr-2 text-lg">{selectedLanguage?.flag}</span>
            {selectedLanguage?.name}
        </span>
                <ChevronDown size={20} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div style={{border: '1px solid #595959'}} className="absolute z-10 w-full mt-1 bg-[#404040] rounded-md shadow-lg">
                    {languages?.map((language) => (
                        <button
                            key={language?.code}
                            onClick={() => selectLanguage(language)}
                            style={{border: '1px solid #595959'}}
                            className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#737070] focus:outline-none"
                        >
                            <span className="mr-2 text-lg">{language?.flag}</span>
                            {language?.name}
                        </button>
                    ))}
                </div>
            )}
            <div className="flex justify-end text-white mt-14">
                <div>
                    <Button onClick={() => setSelectedStage({
                        id : 1,
                        name : t('editProfile')
                    })} colorScheme='white' variant='outline'>{t('close')}</Button>
                    <Button onClick={() =>handleUpdate(profileInfo)} style={{background: "#27CF7A", color: 'white'}} ml={3}>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSettings;