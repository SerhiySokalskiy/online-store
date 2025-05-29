import React from "react";
import {observer} from "mobx-react-lite"
import {Context} from "../index.js"
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
    const {device} = React.useContext(Context)
    return (
        <div>
            <ListGroup>
                {device.types.map( (type) => {
                    return (<ListGroup.Item 
                        active={ type.id === device.selectedType.id }
                        onClick={()=>{device.setSelectedType(type)}}
                        key={type.id}
                        >
                        {type.name}
                    </ListGroup.Item>)
                })}
            </ListGroup>
        </div>
    )
})

export default TypeBar;