import React, { Component } from 'react';
import {
  Button,
  Alert,
  Spinner,
  Table,
  Form,
  Accordion
} from 'react-bootstrap';

const Result = props => {
  const { game, scores } = props.result;
  const sortedScores = scores.slice().sort((a, b) => b.points - a.points);
  const places = [1];
  const winner = [sortedScores[0].user.username];
  for (let i = 1; i < sortedScores.length; i++) {
    if (sortedScores[i].points === sortedScores[i - 1].points) {
      places[i] = places[i - 1];
      if (sortedScores[i].points === sortedScores[0].points)
        winner[i] = sortedScores[i].user.username;
    } else places[i] = i + 1;
  }
  const score = sortedScores.map((score, index) => {
    return (
      <tr key={index}>
        <td>{places[index]}</td>
        <td>{score.user.username}</td>
        <td>{score.points}</td>
      </tr>
    );
  });
  return (
    <tr>
      <td>{game.name}</td>
      <td>{props.result.date.substring(0, 10)}</td>
      <td>
        <Accordion>
          <Accordion.Toggle
            as={Button}
            size="sm"
            block
            variant="primary"
            eventKey="0"
          >
            All scores
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <div>
              <br />
              <Table variant="dark" id="scoreTable">
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td />
                  </tr>
                </thead>
                <tbody>{score}</tbody>
              </Table>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </td>
      <td>{winner.join(', ')}</td>
    </tr>
  );
};

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.state = {
      games: [],
      results: null,
      id: null
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.loadAllResults();
    }
  }

  loadAllResults() {
    fetch('/results/')
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data });
      });
  }

  componentDidMount() {
    this.loadAllResults();

    fetch('/games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({ games });
      });
  }

  onChangeId(e) {
    if (e.target.value.length > 1) {
      this.setState({ id: e.target.value });
      fetch('/results/game/' + e.target.value)
        .then(response => response.json())
        .then(data => {
          this.setState({ results: data });
        });
    } else {
      this.setState({ id: '' });
      fetch('/results/')
        .then(response => response.json())
        .then(data => {
          this.setState({ results: data });
        });
    }
  }

  resultsList() {
    return this.state.results
      .slice(0)
      .reverse()
      .map(currentresult => {
        return <Result result={currentresult} key={currentresult._id} />;
      });
  }

  render() {
    const gameSelect = (
      <Form>
        <Form.Group>
          <Form.Control
            as="select"
            value={this.state.id || ''}
            onChange={this.onChangeId}
          >
            <option value="">All games</option>
            {this.state.games.map(game => (
              <option key={game._id} value={game._id}>
                {game.name}
              </option>
            ))}
            >
          </Form.Control>
        </Form.Group>
      </Form>
    );
    if (this.state.results === null) {
      return <Spinner animation="border" variant="light" />;
    } else if (this.state.results.length === 0) {
      return (
        <div>
          {gameSelect}
          <Alert key="index" variant="primary">
            <Alert.Link href="/result"> Create result </Alert.Link>of this game!
          </Alert>
        </div>
      );
    } else {
      return (
        <div>
          {gameSelect}
          <Table striped bordered variant="dark">
            <thead>
              <tr>
                <th>Game</th>
                <th>Date</th>
                <th>Scores</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>{this.resultsList()}</tbody>
          </Table>
        </div>
      );
    }
  }
}
