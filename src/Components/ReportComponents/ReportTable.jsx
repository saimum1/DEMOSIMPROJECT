import React, {useState} from 'react';
import AlertBox from "../AlertBox/AlertBox.jsx";
import ViewCourier from "../courier/cargoComponents/ViewCourier.jsx";
import UploadForm from "../courier/UploadForm.jsx";
import LoadingSoS from "../LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
import {
    Card,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    Title
} from "@tremor/react";
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import {SearchIcon} from "@heroicons/react/outline";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import SearchDialouge from "../SearchComponent/SearchDialouge.jsx";
import moment from "moment/moment.js";
import uploimg from "../../assets/static/Upload.svg";
import {convertString} from "../commonFunctions/StringConversion.jsx";
import Dropdown from "../Dropdown/Dropdown.jsx";
import CustomEditors from "../EditFunctionality/CustomEditors.jsx";
import Nodatafound from "../NoDataFound/Nodatafound.jsx";

const ReportTable = ({setList,tableData, setTableData,setCourierForm,loader, setLoader,  setNodata, nodata}) => {
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [filterOpen, setFilterOpen] = useState(false);
    return (
        <div   className="border-none h-full w-full">
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
            {!nodata?  <Card  className="w-full h-full text-white mb-12" style={{borderRadius : global_css.card_border_radius,backgroundColor:global_css.primary_card_bg,  boxShadow : 'none'}}>

                <div className="overflow-x-auto" style={{ overflowX:'auto' }}>
                    <Table className="mt-4 h-[60vh] w-full">
                        <TableHead>
                            <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                                <TableHeaderCell style={{ borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}>
                                    {/*<input checked={isAllSelected} onChange={handleSelectAll} type="checkbox"/>*/}
                                    Date
                                </TableHeaderCell>
                               <TableHeaderCell style={{ borderRight:'2px solid #303038'}}>Operator Name</TableHeaderCell>


                                <TableHeaderCell style={{ borderRight:'2px solid #303038'}}>Sales Price</TableHeaderCell>
                                <TableHeaderCell style={{ borderRight:'2px solid #303038'}}>Offer Price</TableHeaderCell>

                                {/*<TableHeaderCell style={{ borderRight:'2px solid #303038'}}>Status</TableHeaderCell>*/}

                                <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{minHeight : '200px'}}>
                           <TableRow  style={{borderColor:'#595959'}}>



                                    <TableCell>kk</TableCell>
                                    <TableCell>kk</TableCell>

                                    <TableCell>ll</TableCell>
                                    <TableCell>jj</TableCell>
                                    <TableCell>jj</TableCell>








                                </TableRow>

                        </TableBody>
                    </Table>
                </div>

            </Card>:<Nodatafound btn_text={'No report'}  tittle_head={'No report List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'} buttonclicked={() => setList(false)}/>}

        </div>
    );
};

export default ReportTable;