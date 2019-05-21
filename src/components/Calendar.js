import React, { Component } from 'react';
import BigCalendar from "react-big-calendar";
import AddTask from "./AddTask";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import EditTask from './EditTask';


const localizer = BigCalendar.momentLocalizer(moment);
const axios = require('axios');

class Calendar extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      events: [],
      addModal: false,
      addStart: Date.now,
      addEnd: Date.now,
      addTitle: '',
      editId: '',
      editModal: false,
      editStart: Date.now,
      editEnd: Date.now,
      editTitle: ''
    }
  }

  handleAddChange = (e) => {
    if (e.target.value !== "") {
      const newtask = e.target.value.trim();
      this.setState(() => {
        return {
          addTitle: newtask
        }
      })
    }
  }


  handleAdd = () => {
    if (this.state.addTitle) {
      const newTask = {
        title: this.state.addTitle,
        end: this.state.addEnd,
        start: this.state.addStart
      };
      axios.post('/api/items/', newTask)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
        .then(res => {
          this.setState((prev) => {
            return {
              events: [
                ...prev.events,
                newTask,
              ],
              addModal: !prev.addModal
            }
          })
        })
    }
  }

  handleEdit = () => {
    if (this.state.editTitle) {
      const newEvents = this.state.events;
      newEvents.forEach(e => {
        if (e._id === this.state.editId) {
          e.title = this.state.editTitle;
          e.end = this.state.editEnd;
          e.start = this.state.editStart;
        }
      })

      const newTask = {
        title: this.state.editTitle,
        end: this.state.editEnd,
        start: this.state.editStart
      };
      axios.put('/api/items/' + this.state.editId, newTask)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
        .then(res => {
          this.setState((prev) => {
            return {
              events: newEvents,
              editModal: !prev.editModal
            }
          })
        })
    }

  }

  toggleAdd = () => {
    this.setState((prev) => {
      return {
        addModal: !prev.addModal
      }
    })
  }

  toggleEdit = () => {
    this.setState((prev) => {
      return {
        editModal: !prev.editModal
      }
    })
  }

  handleStartChange = (value) => {
    this.setState(() => {
      return {
        editStart: value
      }
    })
  }

  handleEndChange = (value) => {
    this.setState(() => {
      return {
        editEnd: value
      }
    })
  }


  handleEditChange = (e) => {
    if (e.target.value !== "") {
      const newtask = e.target.value.trim();
      this.setState(() => {
        return {
          editTitle: newtask
        }
      })
    }
  }

  handleSelectEvent = (event) => {
    this.setState(() => {
      return {
        editEnd: event.start,
        editStart: event.end,
        editTitle: event.title,
        editModal: true,
        editId: event._id
      }
    })
  }

  handleSelectSlot = ({ start, end }) => {
    this.setState(() => {
      return {
        addEnd: end,
        addStart: start,
        addModal: true
      }
    })
  }

  componentDidMount() {
    axios.get('/api/items/')
      .then(res => {
        this.setState(() => {
          return {
            events: res.data
          }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="grid-container-row">
        <header className="header">
          <div className="header__left">
            <div className="header__child header__home">Calendar</div>
          </div>
          <div className="header__right">
            <div className="header__child header__search">Search...</div>
            <div className="header__child header__new">New</div>
          </div>
        </header>
        <main className="main" >
          <div style={{ height: 700 }}>
            <BigCalendar
              selectable
              localizer={localizer}
              events={this.state.events}
              startAccessor="start"
              endAccessor="end"
              step={60}
              defaultview="month"
              onSelectEvent={this.handleSelectEvent}
              onSelectSlot={this.handleSelectSlot}
            />
            <AddTask
              modal={this.state.addModal}
              toggle={this.toggleAdd}
              onInputChange={this.handleAddChange}
              addTask={this.handleAdd}
            />
            <EditTask
              modal={this.state.editModal}
              start={this.state.editStart}
              end={this.state.editEnd}
              title={this.state.editTitle}
              toggle={this.toggleEdit}
              onStartChange={this.handleStartChange}
              onEndChange={this.handleEndChange}
              onInputChange={this.handleEditChange}
              editTask={this.handleEdit}
            />
          </div>
        </main>
        <footer className="footer"></footer>
      </div>
    );
  }
}

export default Calendar;