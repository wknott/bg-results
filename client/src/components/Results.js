import React, { Component } from 'react';
import { Alert, Spinner, Table, Form, Container, Modal } from 'react-bootstrap';

import { formatDateString, formatDateStringShort } from '../logic/utils';

class Result extends Component {
  render() {
    const { scores } = this.props.result;
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
      <Table hover striped bordered variant="dark" responsive>
        <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Points</td>
          </tr>
        </thead>
        <tbody>{score}</tbody>
      </Table>
    );
  }
}

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.state = {
      games: [],
      results: null,
      result: [],
      id: null,
      show: false
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
  handleClose = () => {
    this.setState({ show: false });
  };
  handleOpen = result => {
    this.setState({ show: true, result });
  };
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
      .map(currentResult => {
        const { game, scores, date } = currentResult;
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
        return (
          <tr
            style={{ cursor: 'pointer' }}
            onClick={() => this.handleOpen(currentResult)}
            key={date}
          >
            <td>{game.name}</td>
            <td className="hidden-lg">{formatDateStringShort(date)}</td>
            <td className="hidden-xs">{formatDateString(date)}</td>
            <td>{winner.join(', ')}</td>
          </tr>
        );
      });
  }

  render() {
    const { result } = this.state;
    if (this.state.results === null) {
      return <Spinner animation="border" variant="light" />;
    }
    if (this.state.results.length === 0) {
      return (
        <Container>
          {gameSelect}
          <Alert key="index" variant="primary">
            <Alert.Link href="/result"> Create result </Alert.Link>of this game!
          </Alert>
        </Container>
      );
    }
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
    return (
      <Container>
        {gameSelect}
        <Table hover striped bordered variant="dark" responsive>
          <thead>
            <tr>
              <th>Game</th>
              <th>Date</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>{this.resultsList()}</tbody>
        </Table>
        <Modal
          className="dark-modal"
          centered
          show={this.state.show !== false}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton className="hidden-xs">
            {result.game ? result.game.name : ''}
            {', '}
            {formatDateString(result.date)}
          </Modal.Header>
          <Modal.Header closeButton className="hidden-lg">
            {result.game ? result.game.name : ''}
            {', '}
            {formatDateStringShort(result.date)}
          </Modal.Header>
          <Modal.Body>
            <Result result={result} />
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}
