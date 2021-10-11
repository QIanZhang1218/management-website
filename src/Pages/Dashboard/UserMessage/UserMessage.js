import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {DataGrid,} from "@material-ui/data-grid";
import RefreshIcon from '@material-ui/icons/Refresh';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';
import UserMessageStyle from '../UserMessage/UserMessage.module.css';

const columns = [
    {
        field :'messageId',
        headerName: 'ID',
        type: 'number',
        width: 100,
        align: "center",
    },
    {
        field :'readerName',
        headerName: 'Name',
        width: 150,
        align: "left",
        editable: true,
    },
    {
        field :'readerEmail',
        headerName: 'Email',
        width: 180,
        align: "left",
        editable: true,
    },
    {
        field :'readerMessage',
        headerName: 'Message',
        width: 300,
        align: "center",
    },
    {
        field: 'MessageStatus',
        headerName: 'Status',
        width: 150,
        align: "center",
        renderCell  :(params) => {
            var messageStatus = params.row.messageStatus;
            switch (messageStatus){
                case "10":
                    return <td>Pending</td>
                case "20":
                    return <td>Processing</td>
                case "30":
                    return <td>Processed</td>
                default:
                    return  null
            }
        }
    },
    {
        field: 'action',
        headerName: "Action",
        width: 130,
        align: "center",
        sortable: false,

        renderCell: (params) => {
            const handleProcessing = () => {
                // const res = JSON.stringify(params.row, null, 4);
                axios({
                    url: '/api/AdminManagement/ProcessingUserMessage',
                    method: 'post',
                    headers: {
                        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                    },
                    contentType:'application/json'
                    ,
                    data: params.row
                }).then((res) => {
                    console.log(res);
                    if (res.data.message === "Processing."){
                        alert("Start to process the message");
                        return window.location.href="/Dashboard/UserMessage";
                    }else{
                        alert(res.data.message);
                    }
                })
            };
            const handleFinishClick = () => {
                alert(1);
                axios({
                    url: '/api/AdminManagement/FinishUserMessage',
                    method: 'post',
                    headers: {
                        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                    },
                    contentType:'application/json'
                    ,
                    data: params.row
                }).then((res) => {
                    console.log(res);
                    if (res.data.message === "Finish Processing."){
                        alert("Finish processing message");
                        return window.location.href="/Dashboard/UserMessage";
                    }else{
                        alert(res.data.message);
                    }
                })
            };
            var messageStatus = params.row.messageStatus;
            if (messageStatus == "10"){
                return (
                    <>
                        <button className={UserMessageStyle.processBtn} onClick={handleProcessing}>Process</button>
                        <button className={UserMessageStyle.finishBtn} onClick={handleFinishClick}>Finish</button>
                    </>
                );
            }else if(messageStatus == "20"){
                return (
                    <>
                        <button className={UserMessageStyle.finishBtn} onClick={handleFinishClick}>Finish</button>
                    </>
                );
            }
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

export default function UserMessage() {
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
        axios.get( "/api/AdminManagement/GetUserMessage",).then(response => {
            if(response.data.message === "No records"){
                setRecord(false);
            }
            if(response.data.success){
                setData(response.data.userMessage);
                setLoading(false);
            }
            // else{
            //     history.push("/");
            // }
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
                {/*<div>*/}
                {/*    <button onClick={handleShow} >Add Administrator</button>*/}
                {/*    <button onClick={handleRefresh}><RefreshIcon /></button>*/}
                {/*</div>*/}
                <div style={{ height: 530, width: '100%' }}>
                    <DataGrid
                        getRowId={(r) => r.messageId}
                        rows={data}
                        rwoHeight={20}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
                {/*react bootstrap modal*/}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Administrator</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<AddUserForm handleSubmit={handleSubmit} />*/}
                        {/*<AddAdminForm/>*/}
                    </Modal.Body>
                    {/*<Modal.Footer>*/}
                    {/*    <Button variant="secondary" onClick={handleClose}>*/}
                    {/*        Close*/}
                    {/*    </Button>*/}
                    {/*    /!*<Button variant="primary" type="submit" form="addUserForm">*!/*/}
                    {/*    /!*    Save Changes*!/*/}
                    {/*    /!*</Button>*!/*/}
                    {/*</Modal.Footer>*/}
                </Modal>
            </Container>
        </div>
    );
}
