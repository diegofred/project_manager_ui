import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class CommentsTable extends React.Component {
  render() {
    if (this.props.data) {
      return (
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn dataField="id" isKey={true}>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="description">
            description
          </TableHeaderColumn>
          <TableHeaderColumn dataField="updated_at">
            Last update
          </TableHeaderColumn>
        </BootstrapTable>
      );
    } else {
      return <p>?</p>;
    }
  }
}

export default CommentsTable;
