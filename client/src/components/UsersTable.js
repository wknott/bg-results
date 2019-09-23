import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import UserRow from './UserRow';

export default class UsersTable extends Component {
  render() {
    const { users, handleImageChange } = this.props;
    return (
      <Table responsive size="sm" striped bordered hover variant="dark">
        <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>W</td>
            <td>G</td>
            <td>%</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserRow
              handleImageChange={handleImageChange}
              key={index}
              user={user}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}
