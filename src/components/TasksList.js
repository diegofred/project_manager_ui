import React, { Component } from "react";
import $ from 'jquery'

class TasksList extends Component {
  
    
  state = {
    project_id: this.props.project_id,tasks:[], user_logged: this.props.user_logged
  };


  componentDidMount() {
    const {project_id,user_logged} = this.state;
    if (user_logged) {
        $.ajax({
          type: "GET",
          url: "http://192.168.0.98:3000/api/v1/tasks/in_projects/"+project_id,
          dataType: "JSON",
          headers: JSON.parse(sessionStorage.getItem("user")),
          async: false
        }).done(data => {
          this.setState({ tasks: data.data });
        });
      } else {
        this.setState({ tasks: [] });
      }
  }

  renderTableData = () => {
    //debugger
   
    if (this.state.tasks.length > 0) {
      return this.state.tasks.map((task, index) => {
        return (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.total_hours}</td>
            <td>{task.priority}</td>
            <td>{task.dead_line}</td>
            <td />
          </tr>
        );
      });
    } else {
    }
  };

  render() {
    return (
      <div className="col-12 col-md-12">
        <h2 className="text-left">Tasks</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Total Hours</th>
              <th scope="col">Priority</th>
              <th scope="col">Dead Line</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default TasksList;
