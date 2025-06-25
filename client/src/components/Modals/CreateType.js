import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const CreateType = ({show, onHide}) => {  
  return (
    <Modal
        show={show}
        onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Form>
                <Form.Control 
                    placeholder={'Enter the type name'}
                />
            </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant='outline-danger'>Close</Button>
        <Button onClick={onHide} variant='outline-success'>Add</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType