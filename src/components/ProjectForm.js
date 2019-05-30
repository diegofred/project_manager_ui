import React, { Component } from "react";
import TasksList from "./TasksList";
import $ from "jquery";

class ProjectForm extends Component {

  state = {
      error: false
  };

  projectIdRef = React.createRef();
  projectNameRef = React.createRef();
  projectDescriptionRef = React.createRef();

  componentDidUpdate(){
    $("#area_id").val(this.props.project != null ? this.props.project.description : "");
  }
  handleForm = e => {

    e.preventDefault();

    const project = {
      id: this.projectIdRef.current.value,
      name: this.projectNameRef.current.value,
      description: this.projectDescriptionRef.current.value
    };

    if (project.name === "" || project.description === "") {
      this.setState({ error: true });
    } else {
      //restart Form
      e.currentTarget.reset();
      this.setState({ error: false });
      this.props.saveProject(project);
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
    const select_project = this.props.project;

    return (
      <div className="card nt-5 mb-5 mt-2">
        <form onSubmit={this.handleForm}>
          <input
            ref={this.projectIdRef}
            type="hidden"
            defaultValue={select_project != null ? select_project.id : ""}
          />
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
                defaultValue={select_project != null ? select_project.name : ""}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-5 col-lg-3 col-form-label">
              Description
            </label>
            <div className="col-sm-7 col-lg-9">
              <textarea
                id="area_id"
                ref={this.projectDescriptionRef}
                type="text"
                className="form-control"
                placeholder="Description"
                rows="5"
  
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div>
              <button type="submit" className="btn btn-success w-15">
                Save Project
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
