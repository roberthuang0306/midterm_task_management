import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class EditTask extends Component {
  constructor(...arg) {
    super(...arg);
    this.state = {
      startDate: moment(),
      endDate: moment()
    }
  }



  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} >
        <ModalHeader toggle={this.props.toggle}>New Task</ModalHeader>
        <ModalBody>
          <Label for="taskName">Task Name</Label>
          <Input value={this.props.title} id="taskName" onChange={this.props.onInputChange} />
          <br />
          start
          <br />
          <DatePicker
            onChange={this.props.onStartChange} />
          <br /><br />
          end
            <br />
          <DatePicker
            onChange={this.props.onEndChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.editTask}>Update</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditTask;