import React, { Component } from "react";

class Projects extends Component {


  handleDelete = e => {
    e.preventDefault();
    this.props.handleProjectAction(null, "Delete");
  };

  handleEdit = e => {
    e.preventDefault();
    const selected_project = JSON.parse(
      e.target.parentElement.parentElement.getAttribute("data")
    );
    this.props.handleProjectAction(selected_project, "Edit");
  };

  renderTableData = () => {
    if (this.props.projects.length > 0) {
      return this.props.projects.map((project, index) => {
        return (
          <tr data={JSON.stringify(project)} key={project.id}>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>
              <button
                onClick={this.handleEdit}
                type="button"
                className="btn btn-primary"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                onClick={this.handleDelete}
                type="button"
                className="btn btn-warning"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    } else {
      
    }
  };

  render() {
    console.log("Call render on projects");
    return (
      <div className="col-12 col-md-8">
        <h2 className="text-center">Projects</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default Projects;
