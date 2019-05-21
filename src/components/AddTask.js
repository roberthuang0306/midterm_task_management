import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

class AddTask extends Component {
  render(){
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} >
        <ModalHeader toggle={this.props.toggle}>New Task</ModalHeader>
        <ModalBody>
          <Input placeholder="New Task" onChange={this.props.onInputChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.addTask}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddTask;