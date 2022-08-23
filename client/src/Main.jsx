import { Form, Button, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ADD_NEW_USER } from './redux/types';


export default function Main() {
  const Dispatch = useDispatch();
const [file, setFile]= useState('');
const [inputs, setInputs ] = useState({email: "e@e.ru"});
const config = {     
  headers: { 'content-type': 'multipart/form-data' }//для загрузки изображений
}

const inputHandler = (e)=> {
  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}
const handleFile =(event) => {
  // console.log(event.target.files[0], 'files'); 
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
axios.defaults.withCredentials = true;
axios.post('http://localhost:3001/', data, config).then((res) => Dispatch({
  type: ADD_NEW_USER,
  payload: res.data
}))

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
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  name="password" onChange={inputHandler} placeholder=" ...password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Birth date</Form.Label>
        <Form.Control type="date"  name="birth" onChange={inputHandler} placeholder=" ...11.01.2011" />
      </Form.Group>
      <Form.Group className="mb-3"  controlId="exampleForm.ControlInput1">
        <Form.Label>picture</Form.Label>
        <Form.Control type="file"  name="file" onChange={handleFile} placeholder=" ...picture" />
      </Form.Group>
      
      <div className='registartion_select mb-3'>
      <Form.Label>gender</Form.Label>
      <Form.Select   
            value={inputs.gender}
            name="gender"
            onChange={inputHandler}
            // className="mb-3"
            aria-label="Default select example"
          >
            <option  value="woman">woman</option>
            <option value="man">man</option>
      </Form.Select>
      </div>
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
