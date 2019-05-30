import React, { Component } from "react";

class Project extends Component {
  constructor(props) {
    super();
    this.state = {
      project: props.project
    };
  }

  render() {
    return (
      <div >
         <h1>{this.state.project.name}</h1>
         <p><span>{this.state.project.description}</span></p>
       
      </div>
    );
  }
}

export default Project;
