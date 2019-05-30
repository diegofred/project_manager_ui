import React from "react";
import Header from "./components/Header";
import "./App.css";
import Login from "./components/Login";
import Projects from "./components/Projects";
import ProjectForm from "./components/ProjectForm";
import $ from "jquery";

class App extends React.Component {
  state = { projects: [], user_logged: false, project: null };

  saveProject = project => {
    if (project.id == null || project.id === "") {
      //create a new project
      $.ajax({
        type: "POST",
        url: "http://192.168.0.98:3000/api/v1/projects",
        dataType: "application/json",
        headers: JSON.parse(sessionStorage.getItem("user")),
        async: false,
        data: {
          project: { name: project.name, description: project.description }
        }
      }).done(data => {
       
      });
    } else {
      //edit an existing project
      $.ajax({
          type: "PUT",
          url: "http://192.168.0.98:3000/api/v1/projects/"+project.id,
          dataType: "application/json",
          headers: JSON.parse(sessionStorage.getItem("user")),
          async: false,
          data: {
            project: { name: project.name, description: project.description }
          }
        }).done(data => {
          this.reloadProjects(this.state.user_logged);
        });
    }
    this.reloadProjects(this.state.user_logged);
  };

  newProject = () => {
    this.setState({ project: null });
  };

  handleProjectAction = (project, action) => {
    if (action === "Edit") {
      this.setState({ project: project });
    } else if (action === "Delete") {
    } else {
    }
  };

  user_logged = user_logged => {
    this.reloadProjects(user_logged);
  };

  reloadProjects = user_logged => {
    console.log("this.state.user_logged" + this.state.user_logged);
    if (user_logged) {
      $.ajax({
        type: "GET",
        url: "http://192.168.0.98:3000/api/v1/projects",
        dataType: "JSON",
        headers: JSON.parse(sessionStorage.getItem("user")),
        async: false
      }).done(data => {
        this.setState({ projects: data.data, user_logged: user_logged });
      });
    } else {
      this.setState({ projects: [], user_logged: user_logged });
    }
  };

  render() {
    console.log("Call render on API");
    return (
      <div className="container">
        <Header title="Projects Management" />
        <Login user_logged={this.user_logged} />
        <div className="row">
          <div className="col-md-6">
            <h2>Project Form</h2>
            <button onClick={this.newProject} className="btn btn-success">
              {" "}
              New Project
            </button>
            <ProjectForm
              saveProject={this.saveProject}
              user_logged={this.state.user_logged}
              project={this.state.project}
            />
          </div>
          <div className="col-md-6">
            <Projects
              projects={this.state.projects}
              user_logged={this.state.user_logged}
              handleProjectAction={this.handleProjectAction}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
