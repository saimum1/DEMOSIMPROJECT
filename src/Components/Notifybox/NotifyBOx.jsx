// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios'; // Ensure axios is imported
// import { global_css } from '../../GlobalCss/GlobalCSS';
// import audios from '../../assets/static/audioding.wav'; 
// import config from '../../config';
// import { useAuth } from '../../Context/AuthInfo';

// const NotifyBox = ({ activestatus,getNotificationcout }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const audioRef = useRef(null);
//   const prevNotificationsRef = useRef([]);
//   const { user , token } = useAuth();

// const fetchNotificationsFromApi = async () => {
//   // console.log("tokens",token)
//     try {
//       const response = await axios.get(`${config.apiUrl}/api/notification`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const notifications = response.data.notifications || [];
//       // console.log("notification",notifications)
//       const formattedNotifications = notifications.map(notification => ({
//         id: notification.id,
//         message_head:notification.type === 'orderCreated'?notification?.data?.orderByName : notification?.type === 'orderStatusChanged'?notification?.data?.orderStatusChangedByName:notification?.type === 'orderCancelled'?notification?.data?.orderCancelledByName:notification?.type === 'orderApproved'?notification?.data?.orderApprovedByName:'',
//         message: formatMessage(notification), 
//         time: formatTime(notification.createdAt), 
//         isRead: notification.isRead,
//         isSeen: notification.isSeen
//       }));
//       const unreadMessages = formattedNotifications?.filter(notification => !notification?.isRead);
//       getNotificationcout(unreadMessages?.length)

//       return formattedNotifications;
//     } catch (error) {
//       return [];
//     }
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const differenceInSeconds = (now - date) / 1000;
//     if (differenceInSeconds < 4) {
//       return 'Just now';
//     } else if (differenceInSeconds < 3600) {
//       return `${Math.floor(differenceInSeconds / 60)} min ago`;
//     } else if (differenceInSeconds < 86400) {
//       return `${Math.floor(differenceInSeconds / 3600)} hrs ago`;
//     } else {
//       return `${Math.floor(differenceInSeconds / 86400)} days ago`;
//     }
//   };

//   const isSeenActive=()=>{

//     const unseendata=notifications?.filter((n)=>{ if (n.isRead !==true &&  n.isSeen === false){return n.id}})
//     const unseenids=unseendata?.map((n)=> {return n.id})
//     // console.log("geeting seen",unseenids)
//     // console.log(`Marking notification as seen`);
//     const res= axios.put(`${config.apiUrl}/api/notification/seen/bulk`, {
//       notificatoinIds:unseenids
//     }, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
                                        
//   }

//   // useEffect(() => {
//   //   if(user !== null){
//   //   const interval = setInterval(async () => {
//   //     const newNotifications = await fetchNotificationsFromApi();
//   //     console.log('New Notifications:', newNotifications);
//   //     const unreadNotifications = newNotifications.filter(notif => !notif.isSeen && !notif.isRead);
//   //     const prevUnreadNotifications = prevNotificationsRef.current.filter(notif => !notif.isSeen && !notif.isRead);
//   //     if (unreadNotifications.length > prevUnreadNotifications.length) {
//   //       if (audioRef.current) {
//   //         audioRef.current.play();
//   //       }
//   //     }
//   //     setNotifications(newNotifications);
//   //     prevNotificationsRef.current = newNotifications;
//   //   }, 5000); 

//   //   return () => clearInterval(interval);

//   // }else{
//   //   setNotifications([])
//   //   getNotificationcout('')

//   // }
//   // }, [user]);

//   useEffect(() => {
//     if (user !== null) {
//       // Call the API instantly
//       const fetchInitialNotifications = async () => {
//         const newNotifications = await fetchNotificationsFromApi();
//         // console.log('Initial Notifications:', newNotifications);
//         const unreadNotifications = newNotifications.filter(notif => !notif.isSeen && !notif.isRead);
//         const prevUnreadNotifications = prevNotificationsRef.current.filter(notif => !notif.isSeen && !notif.isRead);
//         if (unreadNotifications.length > prevUnreadNotifications.length) {
//           if (audioRef.current) {
//             audioRef.current.play();
//           }
//         }
//         setNotifications(newNotifications);
//         prevNotificationsRef.current = newNotifications;
//       };
  
//       fetchInitialNotifications(); // Call the API immediately
  
//       // Then continue calling the API every 5 seconds
//       const interval = setInterval(async () => {
//         const newNotifications = await fetchNotificationsFromApi();
//         // console.log('New Notifications:', newNotifications);
//         const unreadNotifications = newNotifications.filter(notif => !notif.isSeen && !notif.isRead);
//         const prevUnreadNotifications = prevNotificationsRef.current.filter(notif => !notif.isSeen && !notif.isRead);
//         if (unreadNotifications.length > prevUnreadNotifications.length) {
//           if (audioRef.current) {
//             audioRef.current.play();
//           }
//         }
//         setNotifications(newNotifications);
//         prevNotificationsRef.current = newNotifications;
//       }, 5000);
  
//       return () => clearInterval(interval);
//     } else {
//       setNotifications([]);
//       getNotificationcout('');
//     }
//   }, [user,token]);
  

//   const formatMessage = (notification) => {
//     const { type, data } = notification;
//     const { orderByName } = data;
//     const nameColor = "#FFA526";
//     const actionColor = "#29CC79"; 
//     const cancelColor = "red";
//     let message = "";
//     switch (type) {
//       case "orderCreated":
//         message = (
//           <>
//             <span style={{ color: nameColor }}>{orderByName}</span> sent a new{' '}
//             <span style={{ color: actionColor }}>SIM request</span>
//           </>
//         );
//         break;
//       case "orderStatusChanged":
//         message = (
//           <>
//             <span style={{ color: nameColor ,fontWeight: '700'}}>{data.orderStatusChangedByName}</span> updated your order.
//           </>
//         );
//         break;
//       case "orderCancelled":
//         message = (
//           <>
//             <span style={{ color: nameColor,fontWeight: '700' }}>{data.orderCancelledByName}</span> <span style={{ color: cancelColor }}>cancelled</span> your sim request.
//           </>
//         );
//         break;
//       case "orderApproved":
//         message = (
//           <>
//             <span style={{ color: nameColor ,fontWeight: '700'}}>{data.orderApprovedByName}</span> marked your order is <span style={{color:actionColor}}>Approved</span>.
//           </>
//         );
//         break;

//         case "newSaleRequest":
//         message = (
//           <>
//             <span style={{ color: nameColor ,fontWeight: '700'}}>{data.saleRequestByName}</span> sent a new sim activision request.
//           </>
//         );
//         break;

//         case "editSaleRequest":
//         message = (
//           <>
//             <span style={{ color: nameColor ,fontWeight: '700'}}>{data.saleRequestByName}</span>  modified the details and sent again <span style={{color:actionColor}}>sim activision request</span>
//           </>
//         );
//         break;


//         case "saleRequestStatusChanged":
//         message = (
//           <>
//             <span style={{ color: nameColor ,fontWeight: '700'}}>{data.saleRequestStatusChangedByName}</span> update your sim activion status.
//           </>
//         );
//         break;



//         case "saleRequestRejected":
//         message = (
//           <>
//             <span style={{ color: nameColor ,fontWeight: '700'}}>{data.saleRequestRejectedByName}</span> rejected your sim activison request.
//             please check the rejection details and resubmit.
//           </>
//         );
//         break;

//         case "saleRequestApproved":
//         message = (
//           <>
//             <span style={{ color: nameColor ,fontWeight: '700'}}>{data.saleRequestApprovedByName}</span> marked your activation request is <span style={{color:actionColor}}>Approved</span>
//           </>
//         );
//         break;



//         case "newCourierRequest":
//           message = (
//             <>
//               <span style={{ color: nameColor ,fontWeight: '700'}}>{data.courierRequestByName}</span> sent a <span style={{color:actionColor}}>sim activision request</span>
//             </>
//           );
//           break;


//           case "editCourierRequest":
//             message = (
//               <>
//                 <span style={{ color: nameColor ,fontWeight: '700'}}>{data.courierRequestByName}</span> modified the deal and sent again <span style={{color:actionColor}}>Courier request</span>
//               </>
//             );
//             break;  



//             case "courierRequestStatusChanged":
//             message = (
//               <>
//                 <span style={{ color: nameColor ,fontWeight: '700'}}>{data.courierRequestStatusChangedByName}</span> update your courier request <span style={{color:actionColor}}></span>
//               </>
//             );
//             break;  



//             case "courierRequestRejected":
//             message = (
//               <>
//                 <span style={{ color: nameColor ,fontWeight: '700'}}>{data.courierRequestRejectedByName}</span> has rejected your courier request.Please check the rejection details and submit again. <span style={{color:actionColor}}></span>
//               </>
//             );
//             break;  



//             case "courierRequestApproved":
//               message = (
//                 <>
//                   <span style={{ color: nameColor ,fontWeight: '700'}}>{data.courierRequestApprovedByName}</span> marked your courier request request is <span style={{color:actionColor}}>Approved</span>
//                 </>
//               );
//               break; 



//               case "uploadLabelRequest":
//                 message = (
//                   <>
//                     <span style={{ color: nameColor ,fontWeight: '700'}}>{data.courierLabelUploadedByName}</span>has added courier label.Please check details. <span style={{color:actionColor}}>Approved</span>
//                   </>
//                 );
//                 break; 



//                 case "newOffer":
//                   message = (
//                     <>
//                       <span style={{ color: nameColor ,fontWeight: '700'}}>You have new offer from {data.operatorName}</span> to offer your favourite buyers <span style={{color:actionColor}}>Approved</span>
//                     </>
//                   );
//                   break; 

//                   // case "newOffer":
//                   //   message = (
//                   //     <>
//                   //       <span style={{ color: nameColor ,fontWeight: '700'}}>You have new offer from {data.operatorName}</span> to offer your favourite buyers <span style={{color:actionColor}}>Approved</span>
//                   //     </>
//                   //   );
//                   //   break;
//                   //

//       default:
//         message = "New notification"; 
//         break;
//     }
//     return message;
//   };

//   const markAsRead = (id) => {
//     // console.log(`Marking notification ${id} as read`);
//     setNotifications(prev =>
//         prev.map(notification => notification.id === id ? { ...notification, isRead: true ,isSeen:true} : notification)
//       );
//    const res= axios.put(`${config.apiUrl}/api/notification/${id}/read`, {}, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//   };

//   useEffect(() => {
//     isSeenActive()
//     if (activestatus) {
//       setIsOpen(true);
//     } else {
//       const timeout = setTimeout(() => {
//         setIsOpen(false);
//       }, 500);
//       return () => clearTimeout(timeout);
//     }
//   }, [activestatus]);

//   return (


//     <div
//       className={activestatus === false ? 'closebox' : 'openbox'}
//       style={{
//         backgroundColor: 'transparent',
//         position: 'absolute',
//         top: '8%',
//         right: '14%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: '9999',
//       }}
//     >
//       {(isOpen && user) && (
//         <div
//           className={`custom-scrollbar`}
//           style={{
//             display: 'flex',
//             justifyContent: 'flex-start',
//             alignItems: 'flex-start',
//             width: '24vw',
//             height: '49vh',
//             backgroundColor: global_css.primary_card_bg,
//             borderRadius: global_css.card_border_radius,
//             border: '1px solid #999',
//             overflowY: 'auto',
//             gap: '.4rem',
//             flexDirection: 'column',
//             padding: '.5rem',scrollbarWidth:'2px'
//           }}
//         >
//           {notifications?.map((item, index) => (
//             <div

            
//               key={index}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#999')}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = item.isRead=== false? '#9999':global_css.primary_bg )}
//               style={{
//                 display: 'flex',
//                 width: '100%',
//                 backgroundColor: item.isRead=== false? '#9999':global_css.primary_bg ,
//                 padding: '.4rem',
//                 borderRadius: global_css.card_border_radius,
//                 transition: 'background-color 0.3s ease',
//               }}
//             >
//               <div
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   width: '100%',
//                   backgroundColor: global_css.primary_card_bg,
//                   borderRadius: global_css.card_border_radius,
//                   padding: '4px 12px',
//                   gap: '1rem',
//                 }}
//               >
//                 <div
//                   className={`custom-scrollbar`}
//                   style={{
//                     color: global_css.primary_txt_color,
//                     fontSize: '14px',
//                     marginBottom: '8px',
//                     fontFamily: 'sans-serif',
//                   }}
//                 >
//                   <span> {item.message}</span>
//                 </div>
//                 <span
//                   style={{
//                     color: global_css.primary_txt_color,
//                     fontSize: '12px',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <span>{item.time}</span>
//                   {item.isRead === false? (
//                     <span
//                       style={{ color: '#29CC79', cursor: 'pointer' }}
//                       onClick={() => markAsRead(item.id)}
//                       onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
//                       onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
//                     >
//                       mark as read
//                     </span>
//                   ):(
//                     <span
//                       style={{ color: '#999',textDecoration:'none' }}
//                     >
//                      ✔✔ marked as read
//                     </span>
//                   )}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <audio ref={audioRef} src={audios} preload="auto" />

//       <style>
//         {`
//            .openbox {
//             width: 25vw;
//             transition: transform 800ms ease-in-out, opacity 800ms ease-in-out;
//             animation: openbox 800ms forwards;
//           }

//           @keyframes openbox {
//             0% {
//               transform: translateY(-100%);
//               opacity: 0;
//             }
//             100% {
//               transform: translateY(0%);
//               opacity: 1;
//             }
//           }

//           .closebox {
//             width: 25vw;
//             transition: transform 800ms ease-in-out, opacity 800ms ease-in-out;
//             animation: closebox 800ms forwards;
//           }

//           @keyframes closebox {
//             0% {
//               transform: translateY(0%);
//               opacity: 1;
//             }
//             100% {
//               transform: translateY(-100%);
//               opacity: 0;
//             }
//           }

//           .notification-box {
//             width: 24vw;
//             height: 49vh;
//             background-color: ${global_css.primary_card_bg};
//             border-radius: ${global_css.card_border_radius};
//             border: 1px solid #999;
//             padding: 0.5rem;
//             overflow-y: auto;
//             display: flex;
//           }
//         `}
//       </style>
//     </div>



//   );
// };

// export default NotifyBox;

// // import React, { useState, useEffect, useRef } from 'react';
// // import axios from 'axios';
// // import { global_css } from '../../GlobalCss/GlobalCSS';
// // import audios from '../../assets/static/audioding.wav';
// // import config from '../../config';
// // import { useAuth } from '../../Context/AuthInfo';

// // const NotifyBox = ({ activestatus, getNotificationcout }) => {
// //   const [notifications, setNotifications] = useState([]);
// //   const [isOpen, setIsOpen] = useState(false);
// //   const audioRef = useRef(null);
// //   const prevNotificationsRef = useRef([]);
// //   const { user, token } = useAuth();

// //   const fetchNotificationsFromApi = async () => {
// //     try {
// //       const response = await axios.get(`${config.apiUrl}/api/notification`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       const notifications = response.data.notifications || [];
// //       const formattedNotifications = notifications.map(notification => ({
// //         id: notification.id,
// //         message_head: notification.type === 'orderCreated' ? notification?.data?.orderByName
// //           : notification?.type === 'orderStatusChanged' ? notification?.data?.orderStatusChangedByName
// //           : notification?.type === 'orderCancelled' ? notification?.data?.orderCancelledByName
// //           : notification?.type === 'orderApproved' ? notification?.data?.orderApprovedByName : '',
// //         message: formatMessage(notification),
// //         time: formatTime(notification.createdAt),
// //         isRead: notification.isRead,
// //         isSeen: notification.isSeen,
// //       }));

// //       const unreadMessages = formattedNotifications.filter(notification => !notification.isRead);
// //       getNotificationcout(unreadMessages.length);
// //       return formattedNotifications;
// //     } catch (error) {
// //       console.error('Error fetching notifications:', error);
// //       return [];
// //     }
// //   };

// //   const formatTime = (timestamp) => {
// //     const date = new Date(timestamp);
// //     const now = new Date();
// //     const differenceInSeconds = (now - date) / 1000;
// //     if (differenceInSeconds < 4) {
// //       return 'Just now';
// //     } else if (differenceInSeconds < 3600) {
// //       return `${Math.floor(differenceInSeconds / 60)} min ago`;
// //     } else if (differenceInSeconds < 86400) {
// //       return `${Math.floor(differenceInSeconds / 3600)} hrs ago`;
// //     } else {
// //       return `${Math.floor(differenceInSeconds / 86400)} days ago`;
// //     }
// //   };

// //   const formatMessage = (notification) => {
// //     const { type, data } = notification;
// //     const { orderByName } = data;
// //     const nameColor = "#FFA526";
// //     const actionColor = "#29CC79"; 
// //     const cancelColor = "red";
// //     let message = "";
// //     switch (type) {
// //       case "orderCreated":
// //         message = (
// //           <>
// //             <span style={{ color: nameColor }}>{orderByName}</span> sent a new{' '}
// //             <span style={{ color: actionColor }}>SIM request</span>
// //           </>
// //         );
// //         break;
// //       case "orderStatusChanged":
// //         message = (
// //           <>
// //             <span style={{ color: nameColor, fontWeight: '700' }}>{data.orderStatusChangedByName}</span> updated your order
// //           </>
// //         );
// //         break;
// //       case "orderCancelled":
// //         message = (
// //           <>
// //             <span style={{ color: nameColor, fontWeight: '700' }}>{data.orderCancelledByName}</span> <span style={{ color: cancelColor }}>canceled</span> your order
// //           </>
// //         );
// //         break;
// //       case "orderApproved":
// //         message = (
// //           <>
// //             <span style={{ color: nameColor, fontWeight: '700' }}>{data.orderApprovedByName}</span> approved your order
// //           </>
// //         );
// //         break;
// //       default:
// //         message = "New notification";
// //         break;
// //     }
// //     return message;
// //   };

// //   const markAsRead = (id) => {
// //     setNotifications(prev =>
// //       prev.map(notification => notification.id === id ? { ...notification, isRead: true, isSeen: true } : notification)
// //     );
// //     axios.put(`${config.apiUrl}/api/notification/${id}/read`, {}, {
// //       headers: { Authorization: `Bearer ${token}` }
// //     });
// //   };

// //   const isSeenActive = () => {
// //     const unseendata = notifications?.filter(n => n.isRead !== true && n.isSeen === false);
// //     const unseenids = unseendata?.map(n => n.id);
// //     axios.put(`${config.apiUrl}/api/notification/seen/bulk`, {
// //       notificatoinIds: unseenids
// //     }, {
// //       headers: { Authorization: `Bearer ${token}` }
// //     });
// //   };

// //   useEffect(() => {
// //     const interval = setInterval(async () => {
// //       const newNotifications = await fetchNotificationsFromApi();
// //       const unreadNotifications = newNotifications.filter(notif => !notif.isSeen && !notif.isRead);
// //       const prevUnreadNotifications = prevNotificationsRef.current.filter(notif => !notif.isSeen && !notif.isRead);
// //       if (unreadNotifications.length > prevUnreadNotifications.length) {
// //         if (audioRef.current) {
// //           audioRef.current.play();
// //         }
// //       }
// //       setNotifications(newNotifications);
// //       prevNotificationsRef.current = newNotifications;
// //     }, 5000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   useEffect(() => {
// //     isSeenActive();
// //     if (activestatus) {
// //       setIsOpen(true);
// //     } else {
// //       const timeout = setTimeout(() => setIsOpen(false), 500);
// //       return () => clearTimeout(timeout);
// //     }
// //   }, [activestatus]);

// //   return (
// //     <div
// //       className={activestatus === false ? 'closebox' : 'openbox'}
// //       style={{
// //         backgroundColor: 'transparent',
// //         position: 'absolute',
// //         top: '8%',
// //         right: '14%',
// //         zIndex: '9999',
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //       }}
// //     >
// //       {(isOpen && user) && (
// //         <div
// //           className="notification-box custom-scrollbar"
// //           style={{
// //             display: 'flex',
// //             flexDirection: 'column',
// //             width: '24vw',
// //             height: '49vh',
// //             backgroundColor: global_css.primary_card_bg,
// //             borderRadius: global_css.card_border_radius,
// //             border: '1px solid #999',
// //             overflowY: 'auto',
// //             gap: '.4rem',
// //             padding: '.5rem',
// //           }}
// //         >
// //           {notifications?.map((item, index) => (
// //             // <div
// //             //   key={index}
// //             //   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#999')}
// //             //   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = item.isRead === false ? '#9999' : global_css.primary_bg)}
// //             //   style={{
// //             //     display: 'flex',
// //             //     width: '100%',
// //             //     backgroundColor: item.isRead === false ? '#9999' : global_css.primary_bg,
// //             //     padding: '.7rem',
// //             //     borderRadius: global_css.card_border_radius,
// //             //     transition: 'background-color 0.3s ease',
// //             //   }}
// //             // >
// //             //   <div
// //             //     style={{
// //             //       display: 'flex',
// //             //       flexDirection: 'column',
// //             //       justifyContent: 'space-between',
// //             //       width: '100%',
// //             //       padding: '4px 12px',
// //             //       gap: '1rem',
// //             //     }}
// //             //   >
// //             //     <div
// //             //       style={{
// //             //         color: global_css.primary_txt_color,
// //             //         fontSize: '14px',
// //             //         marginBottom: '8px',
// //             //         fontFamily: 'sans-serif',
// //             //       }}
// //             //     >
// //             //       {item.message}
// //             //     </div>
// //             //     <div
// //             //       style={{
// //             //         color: global_css.primary_txt_color,
// //             //         fontSize: '12px',
// //             //         display: 'flex',
// //             //         justifyContent: 'space-between',
// //             //         alignItems: 'center',
// //             //       }}
// //             //     >
// //             //       <span>{item.time}</span>
// //             //       {item.isRead === false ? (
// //             //         <span
// //             //           style={{ color: '#29CC79', cursor: 'pointer' }}
// //             //           onClick={() => markAsRead(item.id)}
// //             //           onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
// //             //           onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
// //             //         >
// //             //           mark as read
// //             //         </span>
// //             //       ) : (
// //             //         <span style={{ color: '#999' }}>✔✔ marked as read</span>
// //             //       )}
// //             //     </div>
// //             //   </div>
// //             // </div>

// //             <div

            
// //             key={index}
// //             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#999')}
// //             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = item.isRead=== false? '#9999':global_css.primary_bg )}
// //             style={{
// //               display: 'flex',
// //               width: '100%',
// //               backgroundColor: item.isRead=== false? '#9999':global_css.primary_bg ,
// //               padding: '.7rem',
// //               borderRadius: global_css.card_border_radius,
// //               transition: 'background-color 0.3s ease',
// //             }}
// //           >
// //             <div
// //               style={{
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 justifyContent: 'space-between',
// //                 width: '100%',
// //                 backgroundColor: global_css.primary_card_bg,
// //                 borderRadius: global_css.card_border_radius,
// //                 padding: '4px 12px',
// //                 gap: '1rem',
// //               }}
// //             >
// //               <div
// //                 className={`custom-scrollbar`}
// //                 style={{
// //                   color: global_css.primary_txt_color,
// //                   fontSize: '14px',
// //                   marginBottom: '8px',
// //                   fontFamily: 'sans-serif',
// //                 }}
// //               >
// //                 <span> {item.message}</span>
// //               </div>
// //               <span
// //                 style={{
// //                   color: global_css.primary_txt_color,
// //                   fontSize: '12px',
// //                   display: 'flex',
// //                   justifyContent: 'space-between',
// //                   alignItems: 'center',
// //                 }}
// //               >
// //                 <span>{item.time}</span>
// //                 {item.isRead === false? (
// //                   <span
// //                     style={{ color: '#29CC79', cursor: 'pointer' }}
// //                     onClick={() => markAsRead(item.id)}
// //                     onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
// //                     onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
// //                   >
// //                     mark as read
// //                   </span>
// //                 ):(
// //                   <span
// //                     style={{ color: '#999' }}
// //                   >
// //                    ✔✔ marked as read
// //                   </span>
// //                 )}
// //               </span>
// //             </div>
// //           </div>
// //           ))}
// //         </div>
// //       )}

// //       <audio ref={audioRef} src={audios} preload="auto" />

// //       <style>
// //         {`
// //           .openbox {
// //             width: 25vw;
// //             transition: transform 800ms ease-in-out, opacity 800ms ease-in-out;
// //             animation: openbox 800ms forwards;
// //           }

// //           @keyframes openbox {
// //             0% {
// //               transform: translateY(-100%);
// //               opacity: 0;
// //             }
// //             100% {
// //               transform: translateY(0%);
// //               opacity: 1;
// //             }
// //           }

// //           .closebox {
// //             width: 25vw;
// //             transition: transform 800ms ease-in-out, opacity 800ms ease-in-out;
// //             animation: closebox 800ms forwards;
// //           }

// //           @keyframes closebox {
// //             0% {
// //               transform: translateY(0%);
// //               opacity: 1;
// //             }
// //             100% {
// //               transform: translateY(-100%);
// //               opacity: 0;
// //             }
// //           }

// //           .notification-box {
// //             width: 24vw;
// //             height: 49vh;
// //             background-color: ${global_css.primary_card_bg};
// //             border-radius: ${global_css.card_border_radius};
// //             border: 1px solid #999;
// //             padding: 0.5rem;
// //             overflow-y: auto;
// //             display: flex;
// //           }
// //         `}
// //       </style>
// //     </div>
// //   );
// // };

// // export default NotifyBox;


import React from 'react'

const NotifyBOx = () => {
  return (
    <div>
      
    </div>
  )
}

export default NotifyBOx
