import React from "react";

import {
  createProject,
  updateProject
} from "./components/api/ProjectApi";
import Router from "./Router";

class App extends React.Component {
  state = { projects: [], user_logged: false, project: null, tasks: [] };

  saveProject = project => {
    if (project.id == null || project.id === "") {
      createProject({ name: project.name, description: project.description })
        .then(response => {
          this.setState({ project: response.data });
        })
        .catch(error => {
          console.log(error.toString());
        });
    } else {
      //edit an existing project
      updateProject(
        { name: project.name, description: project.description },
        project.id
      )
        .then(response => {
          this.setState({ project: response.data });
        })
        .catch(error => {
          console.log(error.toString());
        });
    }
  };

  newProject = () => {
    this.setState({ project: null });
  };



  // reloadProjectTasks = project => {
  //   $.ajax({
  //     type: "GET",
  //     url: "http://192.168.0.98:3000/api/v1/tasks/in_project/" + project.id,
  //     dataType: "JSON",
  //     headers: JSON.parse(sessionStorage.getItem("user"))
  //   }).done(data => {
  //     this.setState({ project: project, tasks: data });
  //   });
  // };

  handleProjectAction = (project, action) => {
    if (action === "Edit") {
      this.reloadProjectTasks(project);
    } else if (action === "Delete") {
    } else {
    }
  };

  user_logged = user_logged => {
    this.reloadProjects(user_logged);
  };


  render() {
    return <Router />;
  }
}

export default App;
