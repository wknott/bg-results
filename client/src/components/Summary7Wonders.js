import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Range7Wonders extends Component {
  render() {
    const { scores, users } = this.props;
    return (
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <td>Name</td>
            <td style={{ backgroundColor: '#dc3545' }}>M</td>
            <td style={{ backgroundColor: 'yellow' }}>C</td>
            <td style={{ backgroundColor: 'orange' }}>W</td>
            <td style={{ backgroundColor: '#007bff' }}>C</td>
            <td style={{ backgroundColor: '#ffc107' }}>C</td>
            <td style={{ backgroundColor: 'indigo' }}>G</td>
            <td style={{ backgroundColor: '#28a745' }}>S</td>
            <td>
              <strong>Σ</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => {
            const user = users.find(user => user._id === score.user) || '';
            return (
              <tr key={index} style={{ color: '#FFF' }}>
                <td>{user.username}</td>
                {Object.values(score.points).map((points, index) => (
                  <td key={index}>{points}</td>
                ))}
                <td>
                  <strong>
                    {' '}
                    {Object.values(score.points).reduce((x, y) => x + y, 0)}
                  </strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
