import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Projects from "./components/project/Projects";
import TasksList from "./components/task/TasksList";
import {
  getProjects,
  createProject,
  updateProject
} from "./components/api/ProjectApi";

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

  componentDidMount = () => {
    if (sessionStorage.getItem("user")) {
      this.reloadProjects();
    }
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

  reloadProjects = user_logged => {
    if (user_logged) {
      getProjects()
        .then(response => {
          this.setState({ projects: response.data.data });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ projects: [], user_logged: user_logged });
    }
  };

  render() {
 
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

            <TasksList
              tasks={this.state.tasks}
              user_logged={this.state.user_logged}
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
