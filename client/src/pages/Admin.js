import React, {useState} from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/Modals/CreateBrand";
import CreateType from "../components/Modals/CreateType";
import CreateDevice from "../components/Modals/CreateDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    return (
        <Container className="d-flex flex-column">
            <Button variant="outline-dark"  className="mt-4 p-2" onClick={()=> setBrandVisible(true)}>
                Add a new brand
            </Button>
            <Button variant="outline-dark" className="mt-4 p-2" onClick={()=> setTypeVisible(true)}>
                Add a new type
            </Button>
            <Button variant="outline-dark" className="mt-4 p-2" onClick={()=> setDeviceVisible(true)}>
                Add a new device
            </Button>
            <CreateType show = {typeVisible} onHide={()=>{setTypeVisible(false)}}/>
            <CreateBrand show = {brandVisible} onHide={()=>{setBrandVisible(false)}}/>
            <CreateDevice show = {deviceVisible} onHide={()=>{setDeviceVisible(false)}}/>
        </Container>
    )
}

export default Admin;