import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
// import AdminFormTable from './AddAdminForm.module.css'
import {Button, Col, Row} from "react-bootstrap";
import moment from "moment";
export default function AddBorrowRecordsForm() {
    const [userId,setUserId] = useState('');
    const [bookId,setBookId]=useState('');
    const [borrowDate,setBorrowDate]=useState('');
    const reserveDate = moment().format('YYYY-MM-DD');
    function handleSubmit(e) {
        e.preventDefault();
        var para = {
            userId,bookId,borrowDate,reserveDate
        }
        console.log(para);
        // axios({
        //     url:'/api/AdminSignUp/PushAdminSignUp',
        //     method:'post',
        //     headers: {
        //         'deviceCode': 'A95ZEF1-47B5-AC90BF3'
        //     },
        //     contentType:'application/json',
        //     data:para
        // }).then(response => {
        //         alert(response.data.message);
        //         window.location.href="/Dashboard/AdminInfo";
        //     }
        // )
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit} id={"addAdminForm"}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontal BookId">
                    <Form.Label column sm={2}>
                        Book ID
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off"  onInput={ e=>setBookId(e.target.value)} type="bookId"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalUserId">
                    <Form.Label column sm={2}>
                        User ID
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off" onInput={ e=>setUserId(e.target.value)} type="userId" />
                    </Col>
                </Form.Group>

                <Form.Group controlId="formHorizontalBorrowDate">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="borrowDate"
                        placeholder="Date of Birth"
                        onChange={ e=>setBorrowDate(e.target.value)}
                    />
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 12, offset: 4 }}>
                        <Button style={{marginTop:"10px",marginLeft:"20px"}} type="submit">Reserve</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}