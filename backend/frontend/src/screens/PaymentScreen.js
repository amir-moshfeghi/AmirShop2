import React, {useEffect, useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/checkoutSteps";
import {savePaymentMethod} from "../actions/cartActions";


function PaymentScreen({history}) {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    if(!shippingAddress.address){
        history.push('/shipping')
    }
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('placeorder')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal or Credit Card' id='paypal' name='paymentMethod' checked onChange={(e)=>setPaymentMethod(e.target.value)}>

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue

                </Button>

            </Form>

        </FormContainer>
    );
}

export default PaymentScreen;