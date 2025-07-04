import React, {useState} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createBrand } from '../../http/deviceAPI'

const CreateBrand = ({show, onHide}) => {
  const [value, setValue] = useState('')
    const addBrand = () => {
      createBrand({name:value}).then(data => {setValue('')})
      onHide()
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
              Add a new brand
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Form>
                    <Form.Control 
                        value={value}
                        onChange={e=>setValue(e.target.value)}
                        placeholder={'Enter the brand name'}
                    />
                </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide} variant='outline-danger'>Close</Button>
            <Button onClick={addBrand} variant='outline-success'>Add</Button>
          </Modal.Footer>
        </Modal>
  )
}

export default CreateBrand