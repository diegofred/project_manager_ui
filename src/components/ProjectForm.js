import React, { Component } from "react";
import TasksList from "./TasksList";
import $ from "jquery";

class ProjectForm extends Component {
  state = { error: false, user_logged: this.props.user_logged, project: this.props.project };

  projectIdRef = React.createRef();
  projectNameRef = React.createRef();
  projectDescriptionRef = React.createRef();

  handleForm = e => {
    e.preventDefault();
    
    const project = {
      id: this.state.project.id,
      name: this.projectNameRef.current.value,
      description: this.projectDescriptionRef.current.value
    };

    if (project.name === "" || project.description === "") {
      this.setState({ error: true });
    } else {
      this.props.saveProject(project);
      //restart Form
      e.currentTarget.reset();
      this.setState({ error: false });
    }
  };

  saveTask = task => {
    $.ajax({
      type: "POST",
      url: "http://192.168.0.98:3000/api/v1/tasks",
      dataType: "application/json",
      headers: JSON.parse(sessionStorage.getItem("user")),
      data: {
        taks: {}
      }
    }).done(data => {
      this.setState({ projects: data.data });
    });

    this.reloadProjects();
  };

  render() {
    const errors_present = this.state.error;
    return (
      <div className="card nt-5 mb-5 mt-2">
        <form onSubmit={this.handleForm}>
          <input ref={this.projectIdRef} type="hidden" />
          <div className="form-group row">
            <label className="col-sm-5 col-lg-3 col-form-label">
              Project Name
            </label>
            <div className="col-sm-7 col-lg-9">
              <input
                ref={this.projectNameRef}
                type="text"
                className="form-control"
                placeholder="Project Name"
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-5 col-lg-3 col-form-label">
              Description
            </label>
            <div className="col-sm-7 col-lg-9">
              <textarea
                ref={this.projectDescriptionRef}
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
          project_id={!this.projectIdRef.value ? null : this.projectIdRef.value}
          user_logged={this.props.user_logged}
        />
      </div>
    );
  }
}

export default ProjectForm;
