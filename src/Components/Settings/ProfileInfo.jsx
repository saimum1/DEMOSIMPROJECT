import React, {useRef, useState} from 'react';
import {Button, CircularProgress, FormControl, FormLabel, Input} from "@chakra-ui/react";
import { Upload, X } from 'lucide-react'
import {useAuth} from "../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../config.jsx";
import moment from "moment";
import {useTranslation} from "react-i18next";
import VideoUploader from '../PopNotification/VideoUploader.jsx';
const ProfileInfo = ({profileInfo, setProfileInfo, handleUpdate, setSelectedStage}) => {
    const {t} = useTranslation()
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { user , token,UserInfo } = useAuth();
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [fileUrlx, setfileUrlx] = useState(null);
    const handleChange = (event) => {
        const { name, value } = event.target;


        setProfileInfo(prevState => ({
            ...prevState,
            [name]: name === 'dateOfBirth' ? new Date(value).toISOString() : value
        }));
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("Selected file: ", file);
        if (file && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setSelectedFile(file); // Store the file in state
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a PNG, JPEG, or JPG file.');
            resetFileInput();
        }
    };


    const resetFileInput = () => {
        setProfileInfo(prevState => ({
            ...prevState,
            photoUrl: null,
            photoFilename: null
        }));
        setPreview(null);
        setSelectedFile(null); // Clear the selected file
    };

    const handleUpdatePhoto = async () => {
        console.log("Preview: ", preview);
        console.log("Selected File: ", selectedFile); // Check if file is correctly stored

        if (preview && fileUrlx) {
            if (fileUrlx) {
                const updatedProfileInfo = {
                    ...profileInfo,
                    photoUrl: fileUrlx,
                    photoFilename: selectedFile.name
                };

                setProfileInfo(updatedProfileInfo);
                setPreview(null);
                await handleUpdate(updatedProfileInfo)
            } else {
                alert('Failed to upload the image. Please try again.');
            }
        } else {
            alert('Please select a file to upload.');
        }
    };


    const uploadFile = async (file) => {
        setProgress(0);
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        console.log("testttt2", formData)

        try {
            const response = await axios.post(`${config.apiUrl}/api/minioapi/upload/`, formData, {
               
                onUploadProgress: (progressEvent) => {
                    const progressd = parseInt((progressEvent.loaded / progressEvent.total) * 100);
                    console.log("showing pr", progressd);
                    setProgress(progressd);
                },
               
                // onUploadProgress: (progressEvent) => {
                //     const progressd = parseInt((progressEvent.loaded / progressEvent.total) * 100);
                //     setProgress(progressd);
                // },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
                }
            });

            if (response?.status === 200) {
                setTimeout(() => {
                    setProgress(0);
                }, 1300);

                return response.data.fileUrl; // Assuming the URL is returned in response.data.fileUrl
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            return null;
        } finally {
            setIsUploading(false);
        }
    };


    const geturl=(e)=>{
        setfileUrlx(e?.data?.fileUrl)
}


    return (
        <div className="w-1/2 mt-10 text-white">
            <VideoUploader filex={selectedFile} geturl={geturl}/>

            <div className="pb-4 rounded-lg w-48">
                <h2 className="text-white text-lg font-semibold mb-2">{t('photo')}</h2>
                {preview || profileInfo.photoUrl ? (
                    <div className="flex justify-between items-center mb-2 w-[26rem]">
                        <div>
                            <img
                                src={preview || `${config.apiUrl}${profileInfo.photoUrl}`}
                                alt="Profile"
                                style={{ width: '6rem' }}
                                className="h-28 object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button onClick={resetFileInput} className="text-gray-400 font-bold">
                                Delete
                            </button>
                            {preview ? (
                                <button onClick={handleUpdatePhoto} style={{ color: '#29CC79', fontWeight: 'bold' }}>
                                    Update
                                </button>
                            ) : (
                                <label style={{ color: '#29CC79', fontWeight: 'bold', cursor: 'pointer' }}>
                                    Change
                                    <input
                                        type="file"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }} // Hide the input, display label as button
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                ) : (
                    <label style={{ width: '6rem', border: '1px solid #595959' }} className="flex flex-col items-center justify-center h-28 bg-[#404040] rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // Hide the input, label acts as a button
                        />
                        {isUploading ? (
                            <CircularProgress isIndeterminate color='green.300' />
                        ) : (
                            <>
                                <Upload className="text-white mb-2" size={24} />
                                <span className="text-white">Browse</span>
                            </>
                        )}
                    </label>
                )}
            </div>
            <FormControl className="mb-4">
                <FormLabel style={{fontWeight: 'bold'}}>{t('fullName')}</FormLabel>
                <Input
                    name="name"
                    value={profileInfo.name}
                    onChange={handleChange}
                    style={{
                        outline: 'none !important',
                        boxShadow: 'none',
                        border: '1px solid #595959',
                        background: '#404040'
                    }}
                    placeholder='Enter full name'
                />
            </FormControl>
            <div className="flex gap-2">
                <FormControl className="mb-4">
                    <FormLabel style={{fontWeight: 'bold'}}>{t('mobile')}</FormLabel>
                    <Input
                        name="mobile"
                        value={profileInfo.mobile}
                        onChange={handleChange}
                        style={{
                            outline: 'none !important',
                            boxShadow: 'none',
                            border: '1px solid #595959',
                            background: '#404040'
                        }}
                        placeholder='+60 1112 2254 222'
                    />
                </FormControl>
                <FormControl className="mb-4">
                    <FormLabel style={{fontWeight: 'bold'}}>{t('email')}</FormLabel>
                    <Input
                        name="email"
                        value={profileInfo.email}
                        onChange={handleChange}
                        style={{
                            outline: 'none !important',
                            boxShadow: 'none',
                            border: '1px solid #595959',
                            background: '#404040'
                        }}
                        placeholder='info@gmail.com'
                    />
                </FormControl>
            </div>
            <div className="flex gap-2">
                <FormControl className="mb-4">
                    <FormLabel style={{fontWeight: 'bold'}}>{t('address')}</FormLabel>
                    <Input
                        name="address"
                        value={profileInfo.address}
                        onChange={handleChange}
                        style={{
                            outline: 'none !important',
                            boxShadow: 'none',
                            border: '1px solid #595959',
                            background: '#404040'
                        }}
                        placeholder='Enter your address'
                    />
                </FormControl>
                <FormControl className="mb-4">
                    <FormLabel style={{fontWeight: 'bold'}}>City</FormLabel>
                    <Input
                        name="city"
                        value={profileInfo.city}
                        onChange={handleChange}
                        style={{
                            outline: 'none !important',
                            boxShadow: 'none',
                            border: '1px solid #595959',
                            background: '#404040'
                        }}
                        placeholder='Enter your city'
                    />
                </FormControl>
            </div>
            <FormControl className="mb-4">
                <FormLabel style={{fontWeight: 'bold'}}>{t('dateOfBirth')}</FormLabel>
                <Input
                    name="dateOfBirth"
                    value={moment(profileInfo?.dateOfBirth).format('YYYY-MM-DD') || ''}
                    onChange={handleChange}
                    type="date"
                    style={{
                        outline: 'none !important',
                        boxShadow: 'none',
                        border: '1px solid #595959',
                        background: '#404040',
                        width: '50%'
                    }}
                />
            </FormControl>
            <div className="flex justify-end">
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

export default ProfileInfo;