import React, { Component } from "react";
import ProjectItem from "./ProjectItem";

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
    const projects = this.props.projects;
    if (projects.length > 0) {
      return (
        <React.Fragment>
          {Object.keys(projects).map(project => (
            <ProjectItem key={project} info={this.props.projects[project]} />
          ))}
        </React.Fragment>
      );
    } else {
    }
  };

  render() {
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
