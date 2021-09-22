import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {DataGrid,} from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete"
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
        headerName: 'Book ID',
        width: 150,
        type: "number",
        align: "center",
    },
    {
        field :'userId',
        headerName: 'Reader ID',
        width: 150,
        type: "number",
        align: "center",
    },
    {
        field :'borrowDate',
        headerName: 'Borrow Date',
        width: 160,
        align: "center",
        editable: true,
        renderCell: (params) => {
            var returnDate = params.row.borrowDate.substring(0,10);
            return(
                <td>{returnDate}</td>
            );
        }
    },
    {
        field: 'returnDate',
        headerName: 'Return Date',
        width: 160,
        align: "center",
        editable: true,
        renderCell: (params) => {
           var returnDate = params.row.returnDate.substring(0,10);
            return(
                <td>{returnDate}</td>
            );
        }
    },
    {
        field: 'penalty',
        headerName: 'Penalty',
        type: "number",
        width: 130,
        align: "center",
        renderCell:(params) =>{
            console.log(params.row);
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
        field: 'borrowStatus',
        headerName: 'Action',
        width: 120,
        align: "center",
        renderCell:(params) =>{
            var borrowStatus = params.row.borrowStatus;
            switch (borrowStatus) {
                case 10:
                    return(
                        <Button style={{fontSize:"5px",padding:"5px",borderColor:"green",backgroundColor:"green",color:"#ffffff"}} variant="contained"  size="small" >
                            Pick Up
                        </Button>
                    );
                case 20:
                    return (
                        <Button style={{fontSize:"5px",padding:"5px"}} variant="contained" size="small" color="primary">
                            Return Book
                        </Button>
                    );
                case 30:
                    return(
                         <td>Returned</td>
                    );
                case 40:
                    return (
                        <Button style={{fontSize:"5px",padding:"5px"}} variant="contained" color="secondary" size="small">
                            Pay Penalty
                        </Button>
                    )
                default:
                    return (
                        <td>Mull</td>
                    )
            }
        }
    },
    {
        field: 'isPaid',
        headerName: 'Payment',
        width: 140,
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
    {
        field: 'action',
        headerName: "Cancel",
        width: 140,
        align: "center",
        sortable: false,

        renderCell: (params) => {
            console.log(params);
            const onClickDelete = () => {
                // const res = JSON.stringify(params.row, null, 4);
                axios({
                    url: '/api/AdminManagement/DeleteUserInfo',
                    method: 'post',
                    headers: {
                        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                    },
                    contentType:'application/json'
                    ,
                    data: params.row
                }).then((res) => {
                    console.log(res);
                    switch (res.data.message){
                        case 'Exist on hold books.':
                            alert("Please return all borrow books first");
                            return window.location.href="/Dashboard/UserInfo";
                        case 'Unpaid fine exist.':
                            alert("Please pay the fine first");
                            return window.location.href="/Dashboard/UserInfo";
                        case 'Delete Successful.':
                            alert("Delete Successful")
                            return window.location.href="/Dashboard/UserInfo";
                        case 'Have not sign in.':
                            alert("Please log in first.")
                            return window.location.href = "/";
                    }
                })
            };
            const onClickEdit = () => {
                // return alert(JSON.stringify(params.row, null, 4));
                axios({
                    url: '/api/AdminManagement/EditUserInfo',
                    method: 'post',
                    headers: {
                        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                    },
                    contentType:'application/json'
                    ,
                    data: params.row
                }).then((res) => {
                    console.log(res);
                    switch (res.data.message){
                        case 'Edit Successful.':
                            alert("Edit Successful");
                            return window.location.href="/Dashboard/UserInfo";
                        case 'Have not log in.':
                            alert("Please log in first.")
                            return window.location.href = "/";
                        case "Email already exist":
                            alert("Fail to edit.Email already exist")
                            return window.location.href="/Dashboard/UserInfo"

                    }
                })
            };
            var borrowStatus = params.row.borrowStatus;
            if (borrowStatus == 10){
                return(
                    <div>
                        <Button style={{fontSize:"5px",padding:"1px",borderColor:"gray",color:"gray",margin:"1px"}} variant="outlined" color="primary" size="small" onClick={onClickEdit}>
                            Cancel
                        </Button>
                    </div>
                )
            }



            // return (
            //     <>
            //         <Button color="secondary" onClick={onClickEdit}>
            //             <EditIcon />
            //         </Button>
            //         <IconButton color="secondary" onClick={onClickDelete}>
            //             <DeleteIcon />
            //         </IconButton>
            //     </>
            // );
        },
    },
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
                <div style={{ height: 400, width: '100%' }}>
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
