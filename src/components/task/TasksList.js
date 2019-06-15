import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import CommentsTable from "../comment/CommentsTable";
import { getTasksInProject, createTask, destroyTask } from "../api/TasksApi";

class TasksList extends Component {
  state = { project: null, tasks: [] };

  componentDidMount() {
    getTasksInProject(this.props.idProject)
      .then(response => {
        const project = response.data;
        this.setState({ tasks: project.tasks, project: project });
      })
      .catch(error => {
        console.log(error);
      });
  }

  expandComponent = row => {
    return <CommentsTable data={row.comments} />;
  };

  validateTaskName = (value, row) => {
    const response = {
      isValid: true,
      notification: { type: "success", msg: "", title: "" }
    };
    if (!value) {
      response.isValid = false;
      response.notification.type = "error";
      response.notification.msg = "Name must not be empty";
      response.notification.title = "Requested Value";
    } else if (value.length < 5) {
      response.isValid = false;
      response.notification.type = "error";
      response.notification.msg = "Value must have 5+ characters";
      response.notification.title = "Invalid Value";
    }
    return response;
  };

  onAfterInsertRow = row => {
    const formData = {
      name: row.name,
      description: row.description,
      total_hours: row.total_hours,
      priority: row.priority,
      dead_line: row.deadline,
      project_id: this.props.idProject
    };

    createTask(formData)
      .then(response => {
        const task = response.data;
        row.id = task.id;

        this.refs.table.reset();
        //const {tasks} = this.state;
        // tasks.push(task);
        // this.setState({tasks:tasks});
      })
      .catch(error => {
        console.log(error);
      });
  };
  // onAddRow = row => {
  //   console.log("Add Row");
  // };
  onDeleteRow = row => {
    destroyTask(row)
      .then(response => {
        const { tasks } = this.state;

        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].id === Number(row)) {
            tasks.splice(i, 1);
          }
        }
        this.setState({ tasks: tasks });
      })
      .catch(error => {
        alert("An error ocurred");
        this.refs.table.reset();
        console.log(error);
      });
  };
  render() {
    const selectRow = {
      mode: "radio" //radio or checkbox
    };
    const options = {
      expandRowBgColor: "rgb(242, 255, 163)",
      insertText: "Create a new Task",
      //onAddRow: this.onAddRow,
      afterInsertRow: this.onAfterInsertRow, // A hook for after insert rows,
      onDeleteRow: this.onDeleteRow
    };
    return (
      <React.Fragment>
        {this.state.project != null ? (
          <React.Fragment>
            <h1>{this.state.project.name}</h1>
            <p>{this.state.project.description}</p>
          </React.Fragment>
        ) : (
          ""
        )}
        <BootstrapTable
          pagination={true}
          data={this.state.tasks}
          options={options}
          striped
          ref="table"
          insertRow={true}
          selectRow={selectRow}
          deleteRow
          expandableRow={() => {
            return true;
          }}
          expandComponent={this.expandComponent}
          search
        >
          <TableHeaderColumn
            dataField="id"
            isKey
            editable={false}
            autoValue={true}
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="name"
            editable={{ type: "text", validator: this.validateTaskName }}
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="description"
            editable={{ type: "textarea" }}
          >
            Description
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="total_hours"
            editable={{ type: "number" }}
          >
            Total Hours
          </TableHeaderColumn>
          <TableHeaderColumn dataField="priority" editable={{ type: "number" }}>
            Priority
          </TableHeaderColumn>
          <TableHeaderColumn dataField="dead_line" editable={{ type: "date" }}>
            Dead Line
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    );
  }
}

export default TasksList;
