import React, {useEffect,useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title/Title';
import axios from "axios";
import {useHistory} from "react-router-dom";

const columns = [
    {
        id: 'recordId',
        label: 'Record ID',
        minWidth: 150,
    },
    { id: 'bookId', label: 'Boook ID', minWidth: 150},
    { id: 'bookName', label: 'Boook Name', minWidth: 170 },
    { id: 'userId', label: 'User ID', minWidth: 150 },
    {
        id: 'borrowDate',
        label: 'Start',
        minWidth: 150,
        format: (value) => value.substring(0, 10),
    },
    {
        id: 'returnDate',
        label: 'Expect Return',
        minWidth: 150,
        format:(value) => value.substring(0, 10),
    },
    {
        id: 'actualReturnDate',
        label: 'Return date',
        minWidth: 150,
        format:(value) => value.substring(0, 10),
    },
    {
        id: "penalty",
        label:"Penalty",
        minWidth: 150
    }
];

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Reservations() {
    let history = useHistory();
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [record,setRecord] = useState(true);
    const [data,setData] = React.useState();
    useEffect(() => {
        axios.get( "/api/AdminManagement/GetUnpaidPenaltyDetails",).then(response => {
            console.log(response.data);
            if(response.data.message === "No records"){
                setRecord(false);
                setLoading(false);
            }
            else if(response.data.message == "Get Records"){
                setData(response.data.bookList);
                setLoading(false);
            }else{
                history.push("/");
            }
        })
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(record);
    if(!record){
        return <div>No relative records</div>;
    }
    return (
        <React.Fragment>
            <div style={{marginTop:"70px",padding:"10px"}}>
                <Title>Unpaid Penalty Details</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((data) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={data.code}>
                                    {columns.map((column) => {
                                        const value = data[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {/*{column.format && typeof value === 'number' ? column.format(value) : value}*/}
                                                {column.format  ? column.format(value) : value}
                                            </TableCell>

                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {/*<div className={classes.seeMore}>*/}
            {/*    <Link color="primary" href="/Dashboard/BorrowRecords" >*/}
            {/*        See more reservations*/}
            {/*    </Link>*/}
            {/*</div>*/}
        </React.Fragment>
    );
}