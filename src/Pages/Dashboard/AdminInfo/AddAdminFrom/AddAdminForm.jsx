import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
// import AdminFormTable from './AddAdminForm.module.css'
import {Button, Col, Row} from "react-bootstrap";
export default function AddAdminForm() {
    const [name,setName] = useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [gender,setGender] =useState('');
    function handleSubmit(e) {
        e.preventDefault();
        var para = {
            name,email,password,gender
        }
        axios({
            url:'/api/AdminSignUp/PushAdminSignUp',
            method:'post',
            headers: {
                'deviceCode': 'A95ZEF1-47B5-AC90BF3'
            },
            contentType:'application/json',
            data:para
        }).then(response => {
                alert(response.data.message);
                window.location.href="/Dashboard/AdminInfo";
            }
        )
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit} id={"addAdminForm"}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                        Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off"  onInput={ e=>setName(e.target.value)} type="name" placeholder="Name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off" onInput={ e=>setEmail(e.target.value)} type="email" placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off"  onInput={ e=>setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Radios
                        </Form.Label>
                        <Col sm={10} onChange={ e=>setGender(e.target.value)}>
                            <Form.Check
                                value="male"
                                type="radio"
                                label="Male"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                value="female"
                                type="radio"
                                label="Female"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            />
                            <Form.Check
                                value="other"
                                type="radio"
                                label="Other"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                            />
                        </Col>
                    </Form.Group>
                </fieldset>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Sign in</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}