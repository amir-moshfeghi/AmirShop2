import React, {useEffect, useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Button, Form, Row} from "react-bootstrap";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function RegisterScreen({location,history}) {
    const userRegister = useSelector(state => state.userRegister)
    const {loading,error,userInfo} = userRegister
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch()
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }

    }, [history,userInfo,redirect]);

    const submitHandler=(e)=>{
        e.preventDefault()
        if (password != confirmPassword){
            setMessage('password do not match')

        }
        else {
            dispatch(register(name,email,password))
        }

    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'name'}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='enter name' value={name} onChange={(e)=>setName(e.target.value)}>

                    </Form.Control>


                </Form.Group>
                <Form.Group controlId={'email'}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)}>

                    </Form.Control>


                </Form.Group>
                <Form.Group controlId={'password'}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>setPassword(e.target.value)}>

                    </Form.Control>


                </Form.Group>
                <Form.Group controlId={'passwordConfirm'}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>

                    </Form.Control>


                </Form.Group>
                <Button type='submit' variant='primary'>register</Button>
                <Row className='py-3'>
                    old customer ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Sign in
                </Link>
                </Row>





            </Form>

        </FormContainer>
    );
}

export default RegisterScreen;