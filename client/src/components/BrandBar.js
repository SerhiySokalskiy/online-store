import { observer } from "mobx-react-lite";
import React from "react";
import {Context} from '../index.js';
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(
    () => {
        const {device} = React.useContext(Context)
        return (
            <Row className="d-flex">
                {
                    device.brands.map(brand => {
                        return (<Card 
                        key = {brand.id}
                        className={"p-3"}
                        style={{ width: "fit-content"}}
                        >
                            {brand.name}
                        </Card>)
                    })
                }
            </Row>
        )
    }
)

export default BrandBar;