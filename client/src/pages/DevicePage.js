import React from "react";
import {Col, Container, Image, Row, Card, Button} from 'react-bootstrap'
import bigStar from '../assets/BigStar.png'

const DevicePage = () => {
    const device = {id: 1, name: "IPhone 12 pro", price: 25000, rating: 5, img: "https://apple-people.com.ua/content/images/15/422x536l50bc50/apple-iphone-12-pro-128gb-gold-mgmm3-original-30538820118579.png"}
    const description = [
        { id: 1, title: 'RAM', description: '5 GB' },
        { id: 2, title: 'Camera', description: '12 MP' },
        { id: 3, title: 'CPU', description: 'Pentium 3' },
        { id: 4, title: 'Cores', description: '2' },
        { id: 5, title: 'Accumulator', description: '4000 mAh' },
];
    return (
        <Container>
            <Row>
                <Col md={4}>
                <Image width={300} height={300} src={device.img}/>
            </Col>
            <Col md={4}>
                <Row className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-center">
                        <h2>
                            {device.name}
                        </h2>
                    </div>
                    
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{background: `url(${bigStar}) no-repeat center center`, width:240, height:240, backgroundSize: 'cover', fontSize: 64}}
                    >
                        {device.rating}
                    </div>
                </Row>
            </Col>
            <Col md={4}>
                <Card 
                    className="d-flex flex-column align-items-center justify-content-around"
                    style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                >
                    <h3>
                        {device.price} $
                    </h3>
                    <Button variant="outline-dark">
                        Add to basket
                    </Button>
                </Card>
            </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Properties</h1>
                {description.map((info, index)=>{
                    return (<Row key={info.id} style={{background: index%2===0? 'lightgray' : 'transparent', padding:10}}>
                        {info.title}: {info.description}
                    </Row>)
                })}
            </Row>
        </Container>
    )
}

export default DevicePage;