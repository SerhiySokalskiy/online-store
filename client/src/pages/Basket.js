import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import axios from 'axios';

const Basket = () => {
    const [basketItems, setBasketItems] = useState([]);

    const fetchBasket = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}api/basket`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const items = response.data?.basket_devices || [];
            setBasketItems(items);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const removeFromBasket = async (basketDeviceId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}api/basket/${basketDeviceId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setBasketItems(prev => prev.filter(item => item.id !== basketDeviceId));
        } catch (error) {
            console.error('Removing error:', error);
        }
    };

    useEffect(() => {
        fetchBasket();
    }, []);

    if (basketItems.length === 0) {
        return (
            <Container className="mt-3">
                <h2>Basket is empty</h2>
            </Container>
        );
    }

    return (
        <Container className="mt-3">
            <h2>My basket</h2>
            <Row>
                {basketItems.map(item => (
                    <Col md={6} key={item.id} className="mb-3">
                        <Card>
                            <Card.Body className="d-flex align-items-center">
                                <Image
                                    src={process.env.REACT_APP_API_URL + item.device.img}
                                    height={100}
                                    width={100}
                                    className="me-3"
                                />
                                <div style={{ flex: 1 }}>
                                    <h5>{item.device.name}</h5>
                                    <div>Price: {item.device.price} $</div>
                                    <div>Rating: {item.device.rating}</div>
                                </div>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => removeFromBasket(item.id)}
                                >
                                    Remove
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Basket;
