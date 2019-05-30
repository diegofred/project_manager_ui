import React, { Component } from "react";
import TasksList from "./TasksList";

class TaskForm extends Component {
  state = { error: false, user_logged: this.props.user_logged,this.props.project_id };

  taskIdRef = React.createRef();
  taskNameRef = React.createRef();
  taskDescriptionRef = React.createRef();
  taskTotalHoursRef = React.createRef();
  taskDeadLineRef = React.createRef();
  taskPriorityRef = React.createRef();

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

    if (task.name === "" || task.description === "" || task.total_hours > 0 || task.priority > 0 ) {
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
    return (
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
            All fields are required
          </div>
        ) : (
          ""
        )}

        <TasksList
          task_id={!this.taskIdRef.value ? null : this.taskIdRef.value}
          user_logged={this.state.user_logged}
        />
      </div>
    );
  }
}

export default TaskForm;
