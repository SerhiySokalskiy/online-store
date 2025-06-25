import React, { useContext } from 'react'
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap'
import { Context } from '../../index.js'

const CreateDevice = ({show, onHide}) => {

  const {device} = useContext(Context);
  const [info, setInfo] = React.useState([]);

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}]);
  }

  return (
    <Modal
        show={show}
        onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Form>
                <Dropdown className='mt-2'>
                  <Dropdown.Toggle>
                    Select type
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {device.types.map(type => { return(
                      <Dropdown.Item key={type.id}>
                        {type.name}
                      </Dropdown.Item>)
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mt-2'>
                  <Dropdown.Toggle>
                    Select brand
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {device.brands.map(brand => { return(
                      <Dropdown.Item key={brand.id}>
                        {brand.name}
                      </Dropdown.Item>)
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control 
                  className='mt-2'
                  placeholder='Enter the device name'
                />
                <Form.Control 
                  className='mt-2'
                  placeholder='Enter the device price'
                  type='number'
                />
                <Form.Control 
                  className='mt-2'
                  placeholder='Enter the device image'
                  type='file'
                />
                <hr />
                <Button variant='outline-dark' onClick={addInfo}>
                  Add a new property
                </Button>
                {
                  info.map(i =>  { return (
                    <Row className='mt-2' key={i.number}>
                      <Col md={4}>
                        <Form.Control 
                          placeholder='Enter the property name'
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Control 
                          placeholder='Enter the property description'
                        />
                      </Col>
                      <Col md={4}>
                        <Button variant='outline-danger' onClick={() => setInfo(info.filter(item => item.number !== i.number))}>
                          Delete property
                        </Button>
                      </Col>
                    </Row>
                  )}
                )
                }
            </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant='outline-danger'>Close</Button>
        <Button onClick={onHide} variant='outline-success'>Add</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateDevice