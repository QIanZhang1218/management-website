import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import AddUserInfo from './AddUserInfo.module.css';
import axios from "axios";
export default function AddUserForm() {
    const [name,setName] = useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    function handleSubmit(e) {
        e.preventDefault();
        var para = {
            name,email,password
        }
        console.log(para);
        axios({
            url:'/api/SignUp/PushSignUps',
            method:'post',
            headers: {
                'deviceCode': 'A95ZEF1-47B5-AC90BF3'
            },
            contentType:'application/json',
            data:para
        }).then(response => {
               alert(response.data.message);
               // window.location.href="/Dashboard/UserInfo";
            }
        )
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit} id={"addUserForm"}>
                <Form.Group controlId="form.Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onInput={ e=>setName(e.target.value)} type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="form.Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onInput={ e=>setEmail(e.target.value)} type="email" placeholder="name@example.com" />
                    </Form.Group>
                <Form.Group controlId="form.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onInput={ e => setPassword(e.target.value)} type="password" />
                </Form.Group>
                <div className={AddUserInfo.btnBox}>
                    <input className={AddUserInfo.submitBtn} type={"submit"} value={"Submit"}/>
                </div>
            </Form>
        </Container>
        );
}