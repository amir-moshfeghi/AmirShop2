import React from 'react';
import {Col, Container,Row} from "react-bootstrap";

function Footer(props) {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-2'>
                        copyright &copy;
                    </Col>
                </Row>
            </Container>

        </footer>
    );
}

export default Footer;