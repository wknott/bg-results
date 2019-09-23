import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import UserRow from './UserRow';

export default class UsersTable extends Component {
  render() {
    const { users, handleImageChange } = this.props;
    return (
      <Table responsive size="sm" striped bordered hover variant="dark">
        <thead>
          <tr style={{ fontSize: '11px', fontWeight: 400 }}>
            <td width="100px">Image</td>
            <td>Name</td>
            <td>Wins</td>
            <td>Games</td>
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
