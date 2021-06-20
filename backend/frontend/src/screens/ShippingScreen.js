import React, {useEffect, useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Button, Form, Row} from "react-bootstrap";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {saveShippingAddress} from "../actions/cartActions";
import CheckoutSteps from "../components/checkoutSteps";


function ShippingScreen({history}) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'address'}>
                    <Form.Label>address</Form.Label>
                    <Form.Control type='text' placeholder='enter address' value={address ? address : ''} onChange={(e)=>setAddress(e.target.value)}>

                    </Form.Control>


                </Form.Group>
                <Form.Group controlId={'city'}>
                    <Form.Label>city</Form.Label>
                    <Form.Control type='text' placeholder='enter city' value={city ? city : ''} onChange={(e)=>setCity(e.target.value)}>

                    </Form.Control>


                </Form.Group>
                <Form.Group controlId={'postalCode'}>
                    <Form.Label>postalCode</Form.Label>
                    <Form.Control type='text' placeholder='enter postalCode' value={postalCode ? postalCode : ''} onChange={(e)=>setPostalCode(e.target.value)}>

                    </Form.Control>


                </Form.Group>
                <Form.Group controlId={'country'}>
                    <Form.Label>country</Form.Label>
                    <Form.Control type='text' placeholder='enter country' value={country ? country : ''} onChange={(e)=>setCountry(e.target.value)}>

                    </Form.Control>


                </Form.Group>
                <Button type='submit' variant='primary'>
                    continue
                </Button>


            </Form>

        </FormContainer>
    );
}

export default ShippingScreen;