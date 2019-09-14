import React, { Component } from 'react';
import { Table, Badge } from 'react-bootstrap';

// const propsByState = [
//   military: { title: "Military points", min: -9, max: 18, color: "#dc3545" },
//   coin: { title: "Coin points", min: 0, max: 10, color: "yellow" },
//   wonder: { title: "Wonder points", min: 0, max: 25, color: "orange" },
//   civilian: { title: "Civilian points", min: 0, max: 30, color: "#007bff" },
//   commerce: { title: "Commerce points", min: 0, max: 10, color: "#ffc107" },
//   guild: { title: "Guild points", min: 0, max: 20, color: "indigo" },
//   science: { title: "Science points", min: 0, max: 50, color: "#28a745" }
// ];

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
            <td>Sum</td>
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
                  <Badge variant="primary">
                    {Object.values(score.points).reduce((x, y) => x + y, 0)}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
