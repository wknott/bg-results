import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Result7WondersDuel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }
  componentDidMount() {
    fetch('api/results-7-wonders-duel/')
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data });
      });
  }
  render() {
    if (this.state.results.length > 0) {
      const { scores } = this.state.results[0];
      const sortedScores = scores.slice().sort((a, b) => {
        const B = Object.values(b.points).reduce((x, y) => x + y, 0);
        const A = Object.values(a.points).reduce((x, y) => x + y, 0);
        return B - A;
      });
      const score = sortedScores.map((score, index) => {
        console.log(score.points[0]);
        const newPoints = {
          ...score.points[0],
          _id: 0
        };
        console.log(newPoints);
        const sum = Object.values({
          ...score.points[0],
          _id: 0
        }).reduce((x, y) => x + y, 0);
        return (
          <tr key={index}>
            <td>{score.user.username}</td>
            <td>{sum}</td>
          </tr>
        );
      });
      return (
        <Table hover striped bordered variant="dark" responsive>
          <thead>
            <tr>
              <td>Name</td>
              <td>Points</td>
            </tr>
          </thead>
          <tbody>{score}</tbody>
        </Table>
      );
    }
    return <div></div>;
  }
}
