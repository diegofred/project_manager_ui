import React from "react";
import Header from "./components/Header";
import "./App.css";
import Login from "./components/Login";
import Projects from "./components/Projects";
import ProjectForm from "./components/ProjectForm";
import $ from "jquery";

class App extends React.Component {
  state = { projects: [], user_logged: false , project: null};

  saveProject = project => {
    $.ajax({
      type: "POST",
      url: "http://192.168.0.98:3000/api/v1/projects",
      dataType: "application/json",
      headers: JSON.parse(sessionStorage.getItem("user")),
      data: {
        project: { name: project.name, description: project.description }
      }
    }).done(data => {
      this.setState({ projects: data.data });
    });

    this.reloadProjects();
  };

  handleProjectAction = (project, action) => {
    if (action === "Edit") {
      this.setState({project:project});
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
    //  this.projectListRef.current.resetState(this.state.projects);
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
