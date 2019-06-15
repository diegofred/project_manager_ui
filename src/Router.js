import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Projects from "./components/project/Projects";
import { getProjects } from "./components/api/ProjectApi";
import Navigation from "./components/Navigation";
import TaskList from "./components/task/TasksList";

class Router extends Component {
  state = { projects: [] };

  componentDidMount = () => {
    if (sessionStorage.getItem("user")) {
      this.reloadProjects();
    }
  };

  reloadProjects = () => {
    getProjects()
      .then(response => {
        this.setState({ projects: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header title="Projects Management" />

          <Login user_logged={this.user_logged} />
          <Navigation />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Projects projects={this.state.projects} />;
              }}
            />
            <Route
              exact
              path="/projects/:project_id"
              render={props => {
                let id = props.location.pathname.replace("/projects/",'')
                return <TaskList idProject={id} />;
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default Router;
