import React,{useState,useEffect,useRef} from 'react'
import { global_css } from '../../GlobalCss/GlobalCSS'

const Notifications = ({activestatus}) => {



    const messages=[{
        'message_head':'Zaynab Azzahra ',
        'message':'update your order pending to on Processing order stagers  ',
        'time':'1 minutes ago'
    },{
        'message_head':'Xaltan ',
        'message':'update your order pending to on Processing order stagers  ',
        'time':'June 12, 2020'
    },{
        'message_head':'Ahmed',
        'message':' update your order pending to on Processing order stagers  ',
        'time':'June 9, 2020'
    },{
        'message_head':'Karim',
        'message':' update your order pending to on Processing order stagers  ',
        'time':'June 8, 2020'
    },{
        'message_head':'Palak',
        'message':'   update your order pending to on Processing order stagers update your order pending to on Processing order stagers update your order pending to on Processing order stagers ',
        'time':'June 7, 2020'
    },{
        'message_head':'Hayun',
        'message':' update your order pending to on Processing order stagers  ',
        'time':'June 6, 2020'
    },{
        'message_head':'Rahim',
        'message':' update your order pending to on Processing order stagers update your order pending to on Processing order stagersupdate your order pending to on Processing order stagersupdate your order pending to on Processing order stagersupdate your order pending to on Processing order stagersupdate your order pending to on Processing order stagers ',
        'time':'June 5, 2020'
    },{
        'message_head':'Murad',
        'message':'  update your order pending to on Processing order stagers  ',
        'time':'June 4, 2020'
    },{
        'message_head':'Takla',
        'message':' update your order pending to on Processing order stagers  ',
        'time':'June 3, 2020'
    },{
        'message_head':'Hamid',
        'message':' update your order pending to on Processing order stagers  ',
        'time':'June 2, 2020'
    },{
        'message_head':'Hsnat',
        'message':'   update your order pending to on Processing order stagers  ',
        'time':'May 30, 2020'
    },{

        'message_head':'Hayun',
        'message':' update your order pending to on Processing order stagers  ',
        'time':'May 25, 2020'
    }]




    const [isScrollbarActive, setIsScrollbarActive] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
  
    useEffect(() => {
        if (activestatus) {
            setIsOpen(true);
          } else {
            const timeout = setTimeout(() => {
              setIsOpen(false);
            }, 500); // Match the duration of the close animation
            return () => clearTimeout(timeout);
          }
    }, [activestatus]);
  



  return (
    <div
    className={activestatus === false? 'closebox':'openbox'}
    style={{backgroundColor:'transparent',position:'absolute',top:'8%',right:'14%',display:'flex',justifyContent:'center',alignItems:'center',zIndex:'9999' }}>
    
    {isOpen &&  
        <div
        
        ref={containerRef}
        className={`custom-scrollbar ${isScrollbarActive ? 'scrollbar-active' : ''}`}
        style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',width:'24vw',height:'49vh',
         
            backgroundColor:global_css.primary_card_bg
            ,
            borderRadius:global_css.card_border_radius,border:'1px solid #999',overflowY:'auto',gap:'.4rem',flexDirection:'column',padding:'.5rem',scrollbarWidth:'2px'}}>

           {messages?.map((item)=>{
 
                return(
                <div style={{
                    display: 'flex',
                    width: '100%',
                    backgroundColor: global_css.primary_bg,
                    padding: '.7rem',
                    borderRadius: global_css.card_border_radius,
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        backgroundColor: global_css.primary_card_bg,
                        borderRadius: global_css.card_border_radius,
                        padding: '4px 12px',gap:'1rem'
                    }}>
                        <div className={`custom-scrollbar ${isScrollbarActive ? 'scrollbar-active' : ''}`} style={{
                            color: global_css.primary_txt_color,
                            fontSize: '14px',
                            marginBottom: '8px',
                            fontFamily:'sans-serif'
                        }}>
                            <span style={{fontWeight: '700'}}>{item.message_head}</span>
                            <span> {item.message}</span>
                        </div>
                        <span style={{
                            color: global_css.primary_txt_color,
                            fontSize: '12px'
                        }}>
                            {item.time}
                        </span>
                    </div>
                </div>
    
                )

                

           })}
                
        </div>
    }

        <style>

            {
                `

 
            .openbox {
            width: 25vw;
            transition: height 800ms;
            animation: openbox 800ms forwards;
            }

            @keyframes openbox {
            0% {
                height: 0;
            }
            100% {
                height: 50vh;
            }
            }

            .closebox {
            width: 25vw;
            height: 0;
            transition: height 800ms;
            animation: closebox 800ms forwards;
            }
  
            @keyframes closebox {
            0% {
                height: 50vh;
            }
            100% {
                height: 0;
            }
            }








                /* scrollbar.css */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
  background-color: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.custom-scrollbar.scrollbar-active,
.custom-scrollbar.scrollbar-active::-webkit-scrollbar-thumb {
  scrollbar-color: rgba(255, 255, 255, 0.7) transparent;
}

.custom-scrollbar.scrollbar-active::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.7);
}

.custom-scrollbar.scrollbar-active::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.9);
}
                
                `
            }
        </style>
        
    </div>
  

  )
}

export default Notifications