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
import AddAdminForm from "./AddAdminFrom/AddAdminForm";
import UserInfoTable from '../UserInfo/UserInfo.module.css'

const columns = [
    {
        field :'adminId',
        headerName: 'Admin ID',
        type: 'number',
        width: 150,
        align: "center",
    },
    {
        field :'adminName',
        headerName: 'Name',
        width: 150,
        align: "left",
        editable: true,
    },
    {
        field :'adminEmail',
        headerName: 'Email',
        width: 180,
        align: "left",
        editable: true,
    },
    {
        field :'adminPassword',
        headerName: 'Password',
        width: 150,
        align: "right",
        editable: true,
    },
    {
        field: 'adminGender',
        headerName: 'Gender',
        type: 'number',
        width: 180,
        align: "right",
        editable: true,
    },
    {
        field: 'adminRemark',
        headerName: 'Remark',
        width: 180,
        align: "right",
        editable: true,

        rederCell  :(params) => {
            if (params.row.adminRemark == null){
                return(
                    <td>Null</td>
                );
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
            console.log(params);
            const onClickDelete = () => {
                // const res = JSON.stringify(params.row, null, 4);
                axios({
                    url: '/api/AdminManagement/DeleteAdminInfo',
                    method: 'post',
                    headers: {
                        'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                    },
                    contentType:'application/json'
                    ,
                    data: params.row
                }).then((res) => {
                    console.log(res);
                   if (res.data.message === "Delete Successful."){
                       alert(res.data.message);
                       return window.location.href="/Dashboard/AdminInfo";
                   }else if(res.data.message === "Please login first."){
                       alert(res.data.message);
                       return window.location.href="/";
                   }
                })
            };
            const onClickEdit = () => {
                // return alert(JSON.stringify(params.row, null, 4));
                axios({
                    url: '/api/AdminManagement/EditAdminInfo',
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
                            alert(res.data.message);
                            return window.location.href="/Dashboard/AdminInfo";
                        case 'Have not log in.':
                            alert("Please log in first.")
                            return window.location.href = "/";
                        case 'Email already exist':
                            alert(res.data.message);
                            return window.location.href="/Dashboard/AdminInfo";
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

export default function AdminInfo() {
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
        axios.get( "/api/AdminManagement/GetAdminInfo",).then(response => {
            console.log(response);
            if(response.data.message === "No records"){
                setRecord(false);
            }
            if(response.data.success){
                setData(response.data.adminList);
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
                    <button className={UserInfoTable.addButton} onClick={handleShow} >Add Administrator</button>
                    <button className={UserInfoTable.addButton} onClick={handleRefresh}><RefreshIcon /></button>
                </div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(r) => r.adminId}
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
                        <AddAdminForm/>
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
