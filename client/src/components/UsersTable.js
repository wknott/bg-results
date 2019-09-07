import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import UserInput from './UserRow';

export default class UsersTable extends Component {
  render() {
    const { users, handleImageChange } = this.props;
    console.log(users);
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
          {users
            .sort((a, b) => b.games - a.games)
            .map((user, index) => (
              <UserInput
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
