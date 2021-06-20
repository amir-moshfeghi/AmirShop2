import React, {useEffect, useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, login, register, updateUserProfile} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";


function ProfileScreen({history}) {
    const userLogin = useSelector(state => state.userLogin)
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile


    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails
    const {userInfo} = userLogin
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch()
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        else {
            if(!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))

            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch,history,userInfo,user,success]);

    const submitHandler=(e)=>{
        e.preventDefault()
        if (password != confirmPassword){
            setMessage('password do not match')

        }
        else {
            dispatch(updateUserProfile({'id':user._id,'name':name,'email':email,'password':password}))
        }

    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
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
                    <Button type='submit' variant='primary'>update</Button>






                </Form>


            </Col>
            <Col md={9}>
                <h2>My Orders</h2>

            </Col>

        </Row>
    );
}

export default ProfileScreen;