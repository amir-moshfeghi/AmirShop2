import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Product from "../components/Product";
import {listProducts} from '../actions/productActions'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen({history}) {
    const productList = useSelector(state => state.productList)
    const {error,loading,products} = productList
    const dispatch = useDispatch()
    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))



    }, [dispatch,keyword]);

    return (
        <div>
            <h1>latest</h1>
            {loading ? <Loader />:error ? <Message variant='danger'>{error} </Message> : (
                <Row>
                    {products.map(product =>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>

            )}

        </div>
    );
}

export default HomeScreen;