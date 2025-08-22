import React from 'react';
import {
    AlertDialog, AlertDialogBody, AlertDialogCloseButton,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import {faCircleCheck, faTrash, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";
const AlertBox = ({isOpen, onOpen, onClose, exFunc, type , deleteId, text, buttonText, seconDbuttonText, cancel}) => {

    const cancelRef = React.useRef()
    const {t} = useTranslation()

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered

            >
                <AlertDialogOverlay  />

                <AlertDialogContent style={{backgroundColor : `${global_css.modal_bg}`, padding : '2% 2%'}}>
                    <AlertDialogHeader className="text-center text-white mb-5">{type === 'success' ? 'Congratulations' : 'Are you sure?'} </AlertDialogHeader>
                    <AlertDialogCloseButton />

                    <AlertDialogBody  style={{backgroundColor : `${global_css.alert_text_bg}`, color : `${type==='warning'?global_css.warning_color : type==='success'? global_css.success_text_bg : global_css.delete_color}`, width : '100%', margin : '0 auto', padding : '5% 10%', borderRadius : '8px', marginBottom : '5%'}} >
                        <p className="font-bold">{type==='warning'?<FontAwesomeIcon icon={faTriangleExclamation}/> : type==='success'? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faTrash} />} {type==='warning'?`${t('warningNote')}` : type==='success'? 'Successful' : `${t('deleteNote')}`}</p>
                        {text? text : ''}
                    </AlertDialogBody>
                    <AlertDialogFooter style={{display : 'flex', justifyContent : 'center', alignItems : 'center', gap : '1%'}}>
                        {seconDbuttonText === ''? null : <Button variant='outline'  style={{border: "1px solid #999999", color: '#999999', marginTop : '-0.1%'}} ref={cancelRef} onClick={onClose}>
                            {seconDbuttonText}
                        </Button>}
                        <Button onClick={() => {type==='warning'? exFunc() : type==='success'? exFunc() : exFunc(deleteId?.id)} } style={{color: 'white', backgroundColor : `${type==='warning'?global_css.warning_color : type==='success'? global_css.success_bg : global_css.delete_color}`}} ml={3}>
                            {buttonText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default AlertBox;