import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
// import AdminFormTable from './AddAdminForm.module.css'
import {Button, Col, Row} from "react-bootstrap";
import {Checkbox,MenuItem, ListItemText,OutlinedInput, Select} from "@material-ui/core";
const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const classifications = [
    'History',
    'Education',
    'Music',
    'Medicine',
    'Agriculture',
];
export default function AddAdminForm() {
    const [BookName,setBookName] = useState('');
    const [bookClass, setBookClass] = useState([]);
    const [BookAuthor,setBookAuthor] = useState('');
    const [BookPages,setBookPages] = useState('');
    const [BookAbstract,setBookAbstract] =useState('');
    const [BookAmount,setBookAmount] = useState('');
    const [BookCurrentAmount,setBookCurrentAmount] = useState('');
    const [BookPublishInfo,setBookPublishInfo] = useState('');
    const [BookPublishDate,setBookPublishDate] = useState('');
    const [BookLanguage,setBookLanguage] = useState('');
    const [BookLocation,setBookLocation] = useState('');
    const [BookContent,setBookContent] = useState('');
    const [BookSummary,setBookSummary] = useState('');
    const [BookImg,setBookImg] = useState('');
    const [BookRemark,setBookRemark] = useState('');

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setBookClass(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    function handleSubmit(e) {
        e.preventDefault();
        var BookClass = bookClass.toString();
        var para = {
            BookName,BookClass,BookAuthor,BookPages,BookAbstract,BookContent,BookSummary,BookAmount,BookCurrentAmount,BookPublishInfo,BookPublishDate,BookLanguage,BookLocation,BookImg,BookRemark
        }
        console.log(para);
        axios({
            url:'/api/AdminManagement/AddNewBook',
            method:'post',
            headers: {
                'deviceCode': 'A95ZEF1-47B5-AC90BF3'
            },
            contentType:'application/json',
            data:para
        }).then(response => {
                alert(response.data.message);
                window.location.href="/Dashboard/BookInfo";
            }
        )
    }

    return (
        <Container>
            <Form style={{height:'500px',overflow:'scroll'}} onSubmit={handleSubmit} id={"addBookForm"}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                        BookName
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off"  onInput={ e=>setBookName(e.target.value)} type="bookName" placeholder="BookName" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalClass">
                    <Form.Label column sm={2} id="bookClass-select-label">Subject</Form.Label>
                    <Col sm={10}>
                        <Select
                            style={{height:'40px'}}
                            labelId="bookClass-select-label"
                            id="bookClass-select"
                            multiple
                            displayEmpty
                            value={bookClass}
                            input={<OutlinedInput label="Tag" />}
                            label="Please Select"
                            onChange={handleChange}
                            type="BookClass"
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>Please Select</em>;
                                }

                                return selected.join(', ');
                            }}
                            MenuProps={MenuProps}
                        >
                            {classifications.map((classifications) => (
                                <MenuItem key={classifications} value={classifications}>
                                    <Checkbox checked={bookClass.indexOf(classifications) > -1} />
                                    <ListItemText primary={classifications} />
                                </MenuItem>
                            ))}
                        </Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalAuthor">
                    <Form.Label column sm={2}>
                        Author
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off" onInput={ e=>setBookAuthor(e.target.value)} type="BookAuthor" placeholder="Author" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPages">
                    <Form.Label column sm={2}>
                        Pages
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off"  onInput={ e=>setBookPages(e.target.value)} type="BookPages" placeholder="Pages" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalAbstract">
                    <Form.Label column sm={2}>
                        Abstract
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" autoComplete="off"  onInput={ e=>setBookAbstract(e.target.value)} type="BookAbstract" placeholder="Book Abstract" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalContent">
                    <Form.Label column sm={2}>
                        Content
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" autoComplete="off"  onInput={ e=>setBookContent(e.target.value)} type="BookContent" placeholder="Book Content" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalSummary">
                    <Form.Label column sm={2}>
                        Summary
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" autoComplete="off"  onInput={ e=>setBookSummary(e.target.value)} type="BookSummary" placeholder="Book Summary" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalAmount">
                    <Form.Label column sm={2}>
                        Total Amount
                    </Form.Label>
                    <Col md>
                        <Form.Control autoComplete="off"  onInput={ e=>setBookAmount(e.target.value)} type="BookAmount" placeholder="Total" />
                    </Col>
                    <Form.Label column sm={2}>
                        Available
                    </Form.Label>
                    <Col md>
                        <Form.Control autoComplete="off"  onInput={ e=>setBookCurrentAmount(e.target.value)} type="BookCurrentAmount"  placeholder="Available" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPubInfo">
                    <Form.Label column sm={2}>
                        Publication Info
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off"  onInput={ e=>setBookPublishInfo(e.target.value)} type="BookPublishInfo" placeholder="Publication Information" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPubYear">
                    <Form.Label column sm={2}>
                        Publication Year
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off"  onInput={ e=>setBookPublishDate(e.target.value)} type="BookPublishDate" placeholder="Publication Year" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalLanguage">
                    <Form.Label column sm={2}>
                        Language
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off"  onInput={ e=>setBookLanguage(e.target.value)} type="BookLanguage" placeholder="Book Language" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalLocation">
                    <Form.Label column sm={2}>
                        Location
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off"  onInput={ e=>setBookLocation(e.target.value)} type="BookLocation" placeholder="Book Location" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalImg">
                    <Form.Label column sm={2}>
                        Image
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control autoComplete="off" type="BookImg" onInput={ e=>setBookImg(e.target.value)}  placeholder="Book Image Url" />
                        {/*<Form.Control autoComplete="off"  onInput={ e=>setBookImg(e.target.files[0])} type="file" />*/}
                    </Col>]
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalRemark">
                    <Form.Label column sm={2}>
                        Remark
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" autoComplete="off"  onInput={ e=>setBookRemark(e.target.value)} type="BookRemark" placeholder="Book Summary" />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Add Book</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}