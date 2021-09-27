import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {DataGrid,} from "@material-ui/data-grid";
// import EditIcon from "@material-ui/icons/Edit";
// import {IconButton} from "@material-ui/core";
// import DeleteIcon from "@material-ui/icons/Delete"
import RefreshIcon from '@material-ui/icons/Refresh';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';
import UserInfoTable from '../UserInfo/UserInfo.module.css'
import Button from "@material-ui/core/Button";

const columns = [
    {
        field :'recordId',
        headerName: 'Record ID',
        type: 'number',
        width: 150,
        align: "center",
    },
    {
        field :'bookId',
        headerName: 'Book',
        width: 130,
        type: "number",
        align: "center",
    },
    {
        field :'bookName',
        headerName: 'Book Name',
        width: 160,
        align: "center",
    },
    {
        field :'userId',
        headerName: 'Reader',
        width: 130,
        type: "number",
        align: "center",
    },
    {
        field: 'reserveDate',
        headerName: 'Reserve',
        width: 130,
        align: "center",
        renderCell: (params) => {
            var reserveDate = params.row.reserveDate.substring(0,10);
            return(
                <td>{reserveDate}</td>
            );
        }
    },
    {
        field :'borrowDate',
        headerName: 'Start',
        width: 130,
        align: "center",
        renderCell: (params) => {
            var returnDate = params.row.borrowDate.substring(0,10);
            return(
                <td>{returnDate}</td>
            );
        }
    },
    {
        field: 'returnDate',
        headerName: 'End',
        width: 130,
        align: "center",
        renderCell: (params) => {
           var returnDate = params.row.returnDate.substring(0,10);
            return(
                <td>{returnDate}</td>
            );
        }
    },
    {
        field: 'penalty',
        headerName: 'Fine',
        type: "number",
        width: 110,
        align: "center",
        renderCell:(params) =>{
            //console.log(params.row);
            var penaltyValue = params.row.penalty;
            var penaltyState = params.row.penaltyStatus;
            if(penaltyValue > 0 && penaltyState == false){
                return(
                    <td style={{color:"red"}}>{penaltyValue}</td>
                )
            };
        }
    },
    {
        field: 'isPaid',
        headerName: 'Fine Status',
        width: 150,
        align: "center",
        renderCell:(params) =>{
            var paidStatus = params.row.penaltyStatus;
            var penaltyValue = params.row.penalty;
            if(paidStatus == false && penaltyValue >0){
                return(
                    <td>Unpaid</td>
                )
            }else if(paidStatus == false && penaltyValue == 0){
                return(
                    <td>No Penalty</td>
                )
            }else{
                return(
                    <td>Paid</td>
                )
            }
        }
    },
    {
        field: 'borrowStatus',
        headerName: 'Action',
        width: 180,
        align: "center",
        renderCell:(params) =>{
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [showPickup, setShowPickup] = useState(false);
            const handlePickUpClose = () => setShowPickup(false);
            const handlePickUpShow = () => setShowPickup(true);
            //confirm pick up
            const handlePickUp = () =>{
                axios({
                    url: '/api/AdminManagement/PickUpBook',
                    method: 'post',
                    headers: {
                        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                    },
                    contentType:'application/json'
                    ,
                    data: params.row
                }).then((res) => {
                    console.log(res.data.message);
                    alert(res.data.message);
                    return window.location.href = "/Dashboard/BorrowRecords";
                })
            }

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [showCancel, setshowCancel] = useState(false);
            const handleCancelClose = () => setshowCancel(false);
            const handleCancelShow = () => setshowCancel(true);
            //confirm cancel reservation
            const handleCancel = () =>{
                axios({
                    url: '/api/AdminManagement/CancelReservation',
                    method: 'post',
                    headers: {
                        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                    },
                    contentType:'application/json'
                    ,
                    data: params.row
                }).then((res) => {
                    console.log(res.data.message);
                    alert(res.data.message);
                    return window.location.href = "/Dashboard/BorrowRecords";
                })
            }

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [showExtend,setShowExtend] = useState(false);
            const handleExtendClose = () => setShowExtend(false);
            const handleExtendShow = () => setShowExtend(true);
            const handleExtend = () =>{
                axios({
                    url: '/api/BookList/ExtendBorrowTime',
                    method: 'post',
                    headers: {
                        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                    },
                    contentType:'application/json'
                    ,
                    data: params.row
                }).then((res) => {
                    console.log(res.data.message);
                    alert(res.data.message);
                    return window.location.href = "/Dashboard/BorrowRecords";
                })
            }

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [showReturn, setShowReturn] = useState(false);
            const handleReturnClose = () => setShowReturn(false);
            const handleReturnShow = () => setShowReturn(true);
            //confirm pick up
            const handleReturn = () =>{
                axios({
                    url: '/api/AdminManagement/ReturnBorrowBook',
                    method: 'post',
                    headers: {
                        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                    },
                    contentType:'application/json'
                    ,
                    data: params.row
                }).then((res) => {
                    //console.log(res.data.message);
                    alert(res.data.message);
                    return window.location.href = "/Dashboard/BorrowRecords";
                })
            }
            //according to different status display different button
            var borrowStatus = params.row.borrowStatus;
            var penaltyAmount = params.row.penalty;
            switch (borrowStatus) {
                case 10:
                    return(
                        <div>
                            <Button style={{fontSize:"5px",padding:"5px",borderColor:"green",backgroundColor:"green",margin:"1px",color:"#ffffff"}} variant="contained"  size="small" onClick={handlePickUpShow}>
                                Pick Up
                            </Button>
                            <Button style={{fontSize:"5px",padding:"5px",margin:"1px"}} variant="outlined" color="disabled" size="small" onClick={handleCancelShow}>
                                Cancel
                            </Button>
                            {/*Pick up confirm modal*/}
                            <Modal show={showPickup} onHide={handlePickUpClose} style={{top:"100px"}}>
                                <Modal.Body>
                                    Are you sure to pick the book?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="contained" onClick={handlePickUpClose} color="disable">
                                        Close
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handlePickUp}>
                                        Pick Up
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/*cancel reservation modal*/}
                            <Modal show={showCancel} onHide={handleCancelClose} style={{top:"100px"}}>
                                <Modal.Body>
                                    Are you sure to cancel the reservation?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="contained" onClick={handleCancelClose} color="disable">
                                        Close
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    );
                case 20:
                    // overdue book can not be extended
                    if(penaltyAmount > 0){
                        return (
                            <div>
                                <Button style={{fontSize:"5px",padding:"5px",margin:"1px"}} variant="contained" size="small" color="primary" onClick={handleReturnShow}>
                                    Return Book
                                </Button>
                                {/*Return borrow book modal*/}
                                <Modal show={showReturn} onHide={handleReturnClose} style={{top:"100px"}}>
                                    <Modal.Body>
                                        Are you sure to return book?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="contained" onClick={handleReturnClose} color="disable">
                                            Close
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleReturn}>
                                            Return
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        );
                    }
                    return (
                        <div>
                            <Button style={{fontSize:"5px",padding:"5px",margin:"1px"}} variant="contained" size="small" color="primary" onClick={handleReturnShow}>
                                Return Book
                            </Button>
                            <Button style={{fontSize:"5px",padding:"5px"}} variant="outlined" size="small" color="secondary" onClick={handleExtendShow}>
                                Extend
                            </Button>
                            {/*Extend borrow time modal*/}
                            <Modal show={showExtend} onHide={handlePickUpClose} style={{top:"100px"}}>
                                <Modal.Body>
                                    Are you sure to extend the borrow time?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="contained" onClick={handleExtendClose} color="disable">
                                        Close
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleExtend}>
                                        Extend
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/*Return borrow book modal*/}
                            <Modal show={showReturn} onHide={handleReturnClose} style={{top:"100px"}}>
                                <Modal.Body>
                                    Are you sure to return book?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="contained" onClick={handleReturnClose} color="disable">
                                        Close
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleReturn}>
                                        Return
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    );


                case 30:
                    return(
                        <td>Returned</td>
                    );
                case 40:
                    return (
                        <Button style={{fontSize:"5px",padding:"5px",margin:"1px"}} variant="contained" color="secondary" size="small">
                            Pay Penalty
                        </Button>
                    )
                case 99:
                    return(
                        <td>Canceled</td>
                    )
                default:
                    return (
                        <td>Null</td>
                    )
            }
        }
    },
    // {
    //     field: "readerRemark",
    //     headerName: "Remark",
    //     width:140,
    //     editMode:"cell",
    //     editable: true,
    //
    //     renderCell: (params) => {
    //         if (params.row.readerRemark == null){
    //             return(
    //                 <td>Null</td>
    //             );
    //         }
    //     }
    // },
]

const useStyles = makeStyles((theme) => ({
    root: {
        width:'100%',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function BorrowRecords() {
    const classes = useStyles();
    let history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [record,setRecord] = useState(true);
    const [data,setData] = useState();
    //react bootstrap modal
    const [show, setShow] = useState(false);
    //close modal
    const handleClose = () => setShow(false);
    //open modal
    const handleShow = () => setShow(true);
    //refresh table component
    const [refresh,setRefresh] = useState(false);
    function handleRefresh(){
        setRefresh(true);
    }

    useEffect(() => {
        refresh && setTimeout(() => setRefresh(false));
        axios.get( "/api/AdminManagement/GetBorrowRecords",).then(response => {
            if(response.data.message === "No records"){
                setRecord(false);
            }
            if(response.data.success){
                setData(response.data.borrowRecords);
                setLoading(false);
            }
            else{
                history.push("/");
            }
        })
    }, [refresh]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if(!record){
        return <div>No relative records</div>;
    }
    return (
        <div>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <div className={UserInfoTable.topBox}>
                    <button className={UserInfoTable.addButton} onClick={handleShow} >Add Records</button>
                    <button className={UserInfoTable.addButton} onClick={handleRefresh}><RefreshIcon /></button>
                </div>
                <div style={{ height: 530, width: '100%' }}>
                    <DataGrid
                        getRowId={(r) => r.recordId}
                        rows={data}
                        rwoHeight={20}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
                {/*react bootstrap modal*/}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<AddUserForm handleSubmit={handleSubmit} />*/}
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
}
