
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../config.jsx";
import { useAuth } from '../../Context/AuthInfo.jsx';

const OperatorDropDownMultiple = ({ SetselectedOperator, selectedOperator, setclicked, clicked }) => {
          const { user , token ,profileInfo} = useAuth();
    
    const [tableData, setTableData] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]); 
    
console.log("asdasd",selectedOperator)
    const showlangoptions = () => {
        setclicked(!clicked);
    };

    const toggleSelection = (item) => {
        setSelectedItems((prev) => {
            const isAlreadySelected = prev.includes(item.name);
            let updatedSelection;

            if (isAlreadySelected) {
                updatedSelection = prev.filter((name) => name !== item.name);
            } else {
                updatedSelection = [...prev, item.name];
            }

            SetselectedOperator(updatedSelection); // Send updated names
            return updatedSelection;
        });
    };

    const GetOperators = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/operator`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTableData(response.data.operators);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if(selectedOperator?.length >0){
            setSelectedItems(selectedOperator)
        }else{
            setSelectedItems([])

        }
        GetOperators();

        
    }, [SetselectedOperator, selectedOperator, setclicked, clicked ]);

    useEffect(() => {
       setclicked(false)
        
    }, []);

    return (
        <div
            style={{
                backgroundColor: "#595959",
                height: "auto",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid var(--Base-Color-White-Dark, #999)",
                marginRight: "3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    backgroundColor: "#404040",
                    height: "2.6rem",
                    width: "100%",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                onClick={() => showlangoptions()}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            width: '100%',
                            overflow: 'auto',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}
                    >
                        {selectedItems?.map((name, i) => (
                            <div
                                key={name}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    backgroundColor: '',
                                }}
                            >
                                <span>{name}</span>
                                <span>
                                    { i !== selectedItems.length - 1 ? ',' : ''}
                                </span>
                            </div>
                        ))}
                    </span>
                </div>
                <div
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faAngleUp}
                        style={{ height: "20px", width: "20px" }}
                        rotation={clicked && 180}
                    />
                </div>
            </div>

            {clicked && (
                <div
                    style={{
                        cursor: "pointer",
                        backgroundColor: "#2B2B33",
                        width: "100%",
                        borderRadius: "6px",
                        border: "1px solid var(--Base-Color-White-Dark, #999)",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        position: "absolute",
                        top: "4.9rem",
                        zIndex: 1,
                        transition: "all 300ms",
                    }}
                >
                    {tableData.map((item) => {
                        const isSelected = selectedItems.includes(item.name);
                        return (
                            <React.Fragment key={item.id}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "100%",
                                        height: "2.6rem",
                                        paddingLeft: "1rem",
                                    }}
                                    onClick={() => toggleSelection(item)}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            flex: "1",
                                            width: "100%",
                                            height: "100%",
                                            gap: "1rem",
                                        }}
                                    >
                                        <img
                                            src={`${config.apiUrl}${item.logoUrl}`}
                                            style={{ width: "25px", height: "25px" }}
                                            alt=""
                                        />
                                        <span>{item.name}</span>
                                        {isSelected && (
                                            <span
                                                style={{
                                                    marginLeft: "auto",
                                                    paddingRight: '13px',
                                                    color: "green",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                    <path d="M1 4.5L3.5 7L9 1" stroke="#29CC79" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div style={{ width: "98%", height: '1px', backgroundColor: '#595959' }}></div>
                            </React.Fragment>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default OperatorDropDownMultiple;
