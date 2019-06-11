import React, { Component } from "react";
import Modal from "react-modal";

Modal.setAppElement("#yourAppElement");

class TaskForm extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  taskIdRef = React.createRef();
  taskNameRef = React.createRef();
  taskDescriptionRef = React.createRef();
  taskTotalHoursRef = React.createRef();
  taskDeadLineRef = React.createRef();
  taskPriorityRef = React.createRef();

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleForm = e => {
    e.preventDefault();
    const task = {
      id: 1,
      name: this.taskNameRef.current.value,
      description: this.taskDescriptionRef.current.value,
      total_hours: this.taskTotalHoursRef.current.value,
      priority: this.taskPriorityRef.current.value,
      dead_line: this.taskDeadLineRef.current.value,
      project_id: this.state.project_id
    };

    if (
      task.name === "" ||
      task.description === "" ||
      task.total_hours > 0 ||
      task.priority > 0
    ) {
      this.setState({ error: true });
    } else {
      this.props.saveTask(task);
      //restart Form
      e.currentTarget.reset();
      this.setState({ error: false });
    }
  };

  render() {
    const errors_present = this.state.error;
    return React.Fragment(
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Tasks Form"
      >
        <div className="card nt-5 mb-5 mt-2">
          <form onSubmit={this.handleForm}>
            <input ref={this.taskIdRef} type="hidden" />
            <div className="form-group row">
              <label className="col-sm-5 col-lg-3 col-form-label">
                Task Name
              </label>
              <div className="col-sm-7 col-lg-9">
                <input
                  ref={this.taskNameRef}
                  type="text"
                  className="form-control"
                  placeholder="Task Name"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-5 col-lg-3 col-form-label">
                Description
              </label>
              <div className="col-sm-7 col-lg-9">
                <textarea
                  ref={this.taskDescriptionRef}
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  rows="5"
                />
              </div>
            </div>

            <div className="form-group justify-content-end">
              <div>
                <button type="submit" className="btn btn-success w-15">
                  Save
                </button>
              </div>
            </div>
          </form>
          {errors_present ? (
            <div className="alert alert-danger text-center">
              All fields must be valid
            </div>
          ) : (
            ""
          )}
        </div>
      </Modal>
    );
  }
}

export default TaskForm;
