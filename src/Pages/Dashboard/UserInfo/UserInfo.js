import React, {useCallback, useEffect, useState} from 'react';
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
import {Modal, Button} from 'react-bootstrap';
import UserInfoTable from '../UserInfo/UserInfo.module.css'
import AddUserForm from "./AddUserForm/UserInfoForm";

const columns = [
    {
        field :'readerId',
        headerName: 'Reader ID',
        type: 'number',
        width: 150,
        align: "center",
        editable: true,
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
        field :'readerOnhold',
        headerName: 'On hold',
        type:'number',
        width: 150,
        align: "right",
        editable: true,
    },
    {
        field: 'readerUnpaid',
        headerName: 'Unpaid Fine',
        type: 'number',
        width: 180,
        align: "right",
        editable: true,
    },
    {
        field: 'action',
        headerName: "Action",
        width: 130,
        align: "center",
        sortable: false,

        renderCell: (params) => {
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
                        case 'Unpaid fine exist.':
                            alert("Please log in first.")
                            return window.location.href = "/";
                    }
                })
            };

            return (
                <>
                    <IconButton color="secondary" onClick={onClickEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={onClickDelete}>
                        <DeleteIcon />
                    </IconButton>
                </>
            );
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

export default function UserInfo() {
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
        axios.get( "/api/AdminManagement/GetReaderInfo",).then(response => {
            if(response.data.message === "No records"){
                setRecord(false);
            }
            if(response.data.success){
                setData(response.data.readerList);
                setLoading(false);
            }
            else{
                history.push("SignIn");
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
                    <button className={UserInfoTable.addButton} onClick={handleShow} >Add User</button>
                    <button className={UserInfoTable.addButton} onClick={handleRefresh}><RefreshIcon /></button>
                </div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(r) => r.readerId}
                        rows={data}
                        rwoHeight={20}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
                {/*react bootstrap modal*/}
                <Modal show={show} onHide={handleClose} centered>
                    {/*<Modal.Header closeButton>*/}
                    {/*    <Modal.Title>Modal heading</Modal.Title>*/}
                    {/*</Modal.Header>*/}
                    <Modal.Body>
                        {/*<AddUserForm handleSubmit={handleSubmit} />*/}
                        <AddUserForm/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {/*<Button variant="primary" type="submit" form="addUserForm">*/}
                        {/*    Save Changes*/}
                        {/*</Button>*/}
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}
