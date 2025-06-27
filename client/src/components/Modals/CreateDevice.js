import React, { useContext, useState, useEffect } from 'react'
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap'
import { Context } from '../../index.js'
import { createDevice, fetchBrand, fetchDevice, fetchType } from "../../http/deviceAPI.js";
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({show, onHide}) => {

  const {device} = useContext(Context);
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = React.useState([]);

  useEffect(()=>{
          fetchType().then(data=>device.setTypes(data))
          fetchBrand().then(data=>device.setBrands(data))
      },[])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}]);
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i=> i.number === number ? {...i, [key]: value} : i))
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand?.id || '');
    formData.append('typeId', device.selectedType?.id || '');
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => {
      setName('')
      setPrice(0)
      setFile(null)
      setInfo([])
      device.setSelectedBrand({})
      device.setSelectedType({})
      onHide()
    })
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
                    {device.selectedType.name || 'Select type'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {device.types.map(type => { return(
                      <Dropdown.Item onClick={()=> device.setSelectedType(type)} key={type.id}>
                        {type.name}
                      </Dropdown.Item>)
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mt-2'>
                  <Dropdown.Toggle>
                    {device.selectedBrand.name || 'Select brand'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {device.brands.map(brand => { return(
                      <Dropdown.Item onClick={()=> device.setSelectedBrand(brand)} key={brand.id}>
                        {brand.name}
                      </Dropdown.Item>)
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control 
                  className='mt-2'
                  onChange={e=>setName(e.target.value)}
                  placeholder='Enter the device name'
                  value={name}
                />  
                <Form.Control 
                  className='mt-2'
                  onChange={e=>setPrice(Number(e.target.value))}
                  placeholder='Enter the device price'
                  type='number'
                  value={price}
                />
                <Form.Control 
                  className='mt-2'
                  placeholder='Enter the device image'
                  onChange={selectFile}
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
                          value={i.title}
                          onChange={(e)=> changeInfo('title', e.target.value, i.number)}
                          placeholder='Enter the property name'
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Control 
                          value={i.description}
                          onChange={(e)=> changeInfo('description', e.target.value, i.number)}
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
        <Button onClick={addDevice} variant='outline-success'>Add</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice