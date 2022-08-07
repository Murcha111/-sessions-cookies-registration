import { Form, Button, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';


export default function Main() {
const [file, setFile]= useState('');
const [inputs, setInputs ] = useState({email: "e@e.ru"});
const config = {     
  headers: { 'content-type': 'multipart/form-data' }
}

const inputHandler = (e)=> {
  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));//раскоментить
  
}
const handleFile =(event) => {
  console.log(event.target.files[0], 'files');
  setFile(event.target.files[0])
}

const submitHeandler = (e)=> {
  e.preventDefault()
  console.log('inputs.email', inputs.email);//++
const data = new FormData();
data.append('image', file)
data.append("email", inputs.email);
data.append("name", inputs.name);
data.append("password", inputs.password);
data.append("gender", inputs.gender);
data.append("birth", inputs.birth);
axios.post('http://localhost:3001/registration', data, config).then((res) => console.log(res.data, 'res'))

}
  return (
    <div className="registrationForm">
         <Form onSubmit={submitHeandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text"  name="name" onChange={inputHandler} placeholder="например...Вася" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email"  name="email" onChange={inputHandler} placeholder=" ...email" />
      </Form.Group>
      <Form.Select
            value={inputs.gender}
            name="gender"
            onChange={inputHandler}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="woman">woman</option>
            <option value="man">man</option>
      </Form.Select>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  name="password" onChange={inputHandler} placeholder=" ...password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Birth date</Form.Label>
        <Form.Control type="date"  name="birth" onChange={inputHandler} placeholder=" ...11.01.2011" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>add picture</Form.Label>
        <Form.Control type="file"  name="file" onChange={handleFile} placeholder=" ...picture" />
      </Form.Group>
      <button
            type="submit"
          
            className="btn btn-light"
          >
            добавить
          </button>
    </Form>
    </div>
  );
}
