import React, { Component } from "react";
import {Link} from  'react-router-dom';

class ProjectItem extends Component {
  render() {
    const { id, name, description } = this.props.info;
    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>
           <Link to={`/projects/${id}`} className="btn btn-primary">Show</Link>
           <Link to={`/projects/${id}/edit`} className="btn btn-primary">Edit</Link>
           <button type="button"  className="btn btn-darger">Delete</button>
        </td>
      </tr>
    );
  }
}
export default ProjectItem;
