import React, {useEffect, useState} from 'react';
import DateFormatter from "./DateFormatter.jsx";
import AvatarSolid from "./AvatarSolid.jsx";
import axios from "axios";
import config from "../../config.jsx";
import LoadingSoS from "../LoadingScreen/LoadingSoS.jsx";
import {useAuth} from "../../Context/AuthInfo.jsx";

const ActivityLog = () => {
    // const activityLog = [
    //     { activityDate : '2024-09-14',
    //         activityDetails : [{
    //         activity : 'login',
    //         email : 'sadasd@sldmsldm',
    //         userName : 'jhon',
    //         dateTime : '2024-09-14 11:49:00'
    //     }]
    //
    // }, { activityDate : '2024-09-13',
    //         activityDetails : [{
    //         activity : 'logout',
    //         email : 'kklk@sldmsldm',
    //         userName : 'kabir',
    //         dateTime : '2024-09-13 11:49:00'
    //     },{
    //         activity : 'logout',
    //         email : 'kklk@sldmsldm',
    //         userName : 'kabir',
    //         dateTime : '2024-09-13 11:49:00'
    //     }]
    //
    // },{ activityDate : '2024-06-20',
    //         activityDetails : [{
    //         activity : 'logout',
    //         email : 'ala@sldmsldm',
    //         userName : 'kabir',
    //         dateTime : '2024-06-20 11:49:00'
    //     }]
    //
    // }
    //
    // ]
    const [activityLog, setActivityLog] = useState([]);
    const [loader, setLoader] = useState(false)
    const { user , token } = useAuth();



    const ActivityLogHere = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`${config.apiUrl}/api/profileSettings/activity-log`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:act', response?.data?.activityLogs);
            const formattedLogs = formatActivityLogs(response?.data?.activityLogs);
            setActivityLog(formattedLogs);
            setLoader(false);
        } catch (error) {
            console.error('Error++++:', error);
            setLoader(false);
            throw error;
        }
    };

    const formatActivityLogs = (logs) => {
        if (!Array.isArray(logs)) {
            console.error("Expected logs to be an array, but got:", typeof logs);
            return [];
        }

        const groupedLogs = {};

        // Group logs by activityDate (extract only the date part)
        logs.forEach(log => {
            const activityDate = log.activityDate.split('T')[0]; // Get the date part of activityDate
            const dateTime = log.activityDate.replace('T', ' ').split('.')[0]; // Format to 'YYYY-MM-DD HH:mm:ss'

            const activityDetail = {
                activity: log.activity,
                email: log.email,
                userName: log.userName,
                dateTime: dateTime
            };

            if (!groupedLogs[activityDate]) {
                groupedLogs[activityDate] = [];
            }

            groupedLogs[activityDate].push(activityDetail);
        });

        // Transform into desired structure
        return Object.keys(groupedLogs).map(activityDate => ({
            activityDate,
            activityDetails: groupedLogs[activityDate]
        }));
    };

    useEffect(() => {
        ActivityLogHere()
    }, []);
    return (
        <div>
            {loader &&  <LoadingSoS  /> }
            <div style={{height : '550px' , overflow : "scroll"}}>
            {activityLog?.map((active, key) => (
                <div key={key} className="w-full mt-20 text-white" >
                    {/* Formatting and displaying the activityDate */}
                    <p className="text-2xl mb-4">
                        <DateFormatter date={active?.activityDate} />
                    </p>

                    {/* Loop through activityDetails for each activityDate */}
                    {active?.activityDetails?.map((act, idx) => (
                        <div key={idx} className="flex items-center gap-3 mb-4">
                            <AvatarSolid color="purple" size="35px" />
                            <p>
                                {act?.email} performed <span style={{color : '#29CC79'}}>{act?.activity}</span> by {act?.userName}
                            </p>
                        </div>
                    ))}

                    {/* Horizontal line separator */}
                    <hr
                        style={{
                            backgroundColor: '#404040',
                            height: '1px',
                            width: '480px',
                            border: 'none',
                        }}
                    />
                </div>
            ))}
            </div>

        </div>
    );
};

export default ActivityLog;