import React, {createContext, useReducer, useEffect, useContext, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import config from "../config.jsx";

const AuthContext = createContext();

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const CHANGE_VALUEK = 'CHANGE_VALUEK';
const VALUE_PASS = 'VALUE_PASS';
const reloadData = 'reloadData';

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: {
                    userId: action.payload.userId,
                    email: action.payload.email,
                    role: action.payload.role === 'OPERATOR'? 'ADMIN':action.payload.role,
                    token: action.payload.token,
                    name:action.payload.name,
                    actualRole:action.payload.role
                },
                token: action.payload.token,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
            };
        case CHANGE_VALUEK:
            return {
                ...state,
                valuek: action.payload,
            };
            case VALUE_PASS:
            return {
                ...state,
                valueLo: action.payload,
            };

            case reloadData:
            return {
                ...state,
                dataReload: action.payload,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem('userData')) || null,
        token: localStorage.getItem('accessToken') || null,
        valuek: '',
        valueLo: null,
        dataReload: false,
    });

    const [profile, setProfile] = useState(null)

    console.log('Initial state:', state); // Add this line

    const login = (userData, tokenData) => {
        UserInfo(tokenData)
        dispatch({
            type: LOGIN,
            payload: {
                userId: userData.id,
                email: userData.email,
                role: userData.role,
                name: userData.name,
                token: tokenData,
            },
        });
        localStorage.setItem('accessToken', tokenData);
        localStorage.setItem('userData', JSON.stringify({ userId: userData.id, email: userData.email, role: userData.role }));
        console.log('Login state:', state); // Add this line
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        console.log('Logout state:', state); 
        setProfile(null)
    };

    const checkTokenExpiration = () => {
        const storedToken = localStorage.getItem('accessToken') || null;
        const storedUserData = JSON.parse(localStorage.getItem('userData')) || null;

        if (storedToken && storedUserData) {
            try {
                // UserInfo()
                const decodedToken = jwtDecode(storedToken);
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (
                    decodedToken.exp &&
                    decodedToken.exp > currentTimestamp &&
                    decodedToken.userId &&
                    decodedToken.email &&
                    decodedToken.role
                ) {
                    
                    dispatch({
                        type: LOGIN,
                        payload: {
                            userId: storedUserData.userId,
                            email: storedUserData.email,
                            role: storedUserData.role,
                            name: storedUserData.name,
                            token: storedToken,
                        },
                    });
                } else {
                    setProfile(null)
                    dispatch({ type: LOGOUT });
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                dispatch({ type: LOGOUT });
            }
        }
    };

    useEffect(() => {
        checkTokenExpiration();
        UserInfo(state?.token)
        // Call checkTokenExpiration at regular intervals or on user interaction
    }, []);

    const changeR = (k) => {
        dispatch({ type: CHANGE_VALUEK, payload: k  });

    }

    const changeLoad = (k) => {
        dispatch({ type: reloadData, payload: true  });

    }
    const valuePass = (k) => {
        dispatch({ type: VALUE_PASS, payload: k  });

    }

    const UserInfo = async (token) => {
        try {

            const response = await axios.get(`${config.apiUrl}/api/profileSettings/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:user--->', response?.data?.profile);
            setProfile(response?.data?.profile);

        } catch (error) {
            console.error('Error++++:', error);
            throw error;
        }
    };
    const contextValue = {
        ...state,
        login,
        logout,
        changeR,
        changeLoad,
        UserInfo,
        valuePass,
        valuek: state.valuek || null,
        valueLo: state.valueLo || null,
        dataReload: state.dataReload || false,
        user: state.user || null,
        profileInfo: profile,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    return useContext(AuthContext);
};