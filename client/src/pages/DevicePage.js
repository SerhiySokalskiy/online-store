import React, { useEffect, useState } from "react";
import {Col, Container, Image, Row, Card, Button} from 'react-bootstrap'
import bigStar from '../assets/BigStar.png'
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import axios from "axios";
import { addRating } from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const [basketDeviceId, setBasketDeviceId] = useState(null);
    const { id } = useParams();
    const [rateValue, setRateValue] = useState(5);

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));

        const checkBasket = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/basket`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });

                const basketItems = response.data?.basket_devices || [];

                const match = basketItems.find(item => item.device?.id === +id);
                if (match) setBasketDeviceId(match.id);
                else setBasketDeviceId(null);
            } catch (error) {
                console.error("Basket check failed:", error);
            }
        };

        checkBasket();
    }, [id]);

    const sendRating = async () => {
        try {
            const data = await addRating(device.id, rateValue);
            alert('Рейтинг додано. Середній рейтинг: ' + data.avgRating);
            setDevice({...device, rating: data.avgRating});
        } catch (error) {
            alert('Помилка рейтингу');
        }
    };

    const addToBasket = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}api/basket/add`,
                { deviceId: device.id },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setBasketDeviceId(response.data.id); 
        } catch (error) {
            alert('Adding error');
        }
    };

    const removeFromBasket = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}api/basket/${basketDeviceId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBasketDeviceId(null);
        } catch (error) {
            alert('Removing error');
        }
    };

    const handleClick = () => {
        if (basketDeviceId) removeFromBasket();
        else addToBasket();
    };

    return (
        <Container>
            <Row className="mt-3">
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <div className="d-flex justify-content-center">
                            <h2>{device.name}</h2>
                        </div>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 240, height: 240,
                                backgroundSize: 'cover',
                                fontSize: 64
                            }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32 }}
                    >
                        <h3>{device.price} $</h3>
                        <Button
                            variant={basketDeviceId ? "outline-danger" : "outline-dark"}
                            onClick={handleClick}
                        >
                            {basketDeviceId ? 'Remove from basket' : 'Add to basket'}
                        </Button>
                        <div className="d-flex flex-column justify-content-center mt-3">
                            <div className="mb-2">
                                <label>Your rating:</label>
                                <select value={rateValue} onChange={e => setRateValue(Number(e.target.value))}>
                                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                            <Button onClick={sendRating} variant="outline-dark" className="ms-2">Send</Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row className="d-flex flex-column m-3">
                <h1>Properties</h1>
                {device.info.map((info, index) => (
                    <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title}: {info.description}
                    </Row>
                ))}
            </Row>
        </Container>
    );
};


export default DevicePage;