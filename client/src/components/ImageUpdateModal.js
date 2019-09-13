import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
export default class ImageUpdateModal extends Component {
  render() {
    const { show, handleClose, onSubmit, imgUrl, onChange } = this.props;
    return (
      <Modal
        className="dark-modal"
        centered
        show={show !== false}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Add image URL:
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Control
                placeholder="Image URL"
                type="text"
                required
                value={imgUrl}
                onChange={onChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
