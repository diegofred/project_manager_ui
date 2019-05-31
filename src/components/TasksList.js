import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import CommentsTable from "./CommentsTable";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.setState({ user_logged: this.props.user_logged });
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

  render() {
    const options = {
      expandRowBgColor: "rgb(242, 255, 163)",
      insertText: "Create a new Task"
    };
    return (
      <BootstrapTable
        pagination={true}
        data={this.props.tasks}
        options={options}
        striped
        insertRow={true}
        expandableRow={() => {
          return true;
        }}
        expandComponent={this.expandComponent}
        search
      >
        <TableHeaderColumn dataField="id" isKey editable={false}>
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
    );
  }
}

export default TasksList;
