import React, { Component, useState, useEffect } from 'react';
import {
  Button,
  Alert,
  Spinner,
  Table,
  Form,
  Collapse,
  Container
} from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { formatDateString, formatDateStringShort } from '../logic/utils';

const Result = props => {
  const { game, scores } = props.result;
  const showScores = props.showScores;
  const [open, setOpen] = useState(false);
  const sortedScores = scores.slice().sort((a, b) => b.points - a.points);
  useEffect(() => {
    setOpen(showScores);
  }, [showScores]);
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
      <td className="hidden-xs">{formatDateString(props.result.date)}</td>
      <td className="hidden-lg">{formatDateStringShort(props.result.date)}</td>
      <td>
        <>
          <Button
            variant="primary"
            size="sm"
            block
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            {!open ? 'Show ' : 'Hide '} scores
          </Button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <br />
              <Table responsive variant="dark" id="scoreTable">
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
          </Collapse>
        </>
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
      id: null,
      showScores: false
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
        return (
          <Result
            result={currentresult}
            showScores={this.state.showScores}
            key={currentresult._id}
          />
        );
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
        <Container>
          {gameSelect}
          <Alert key="index" variant="primary">
            <Alert.Link href="/result"> Create result </Alert.Link>of this game!
          </Alert>
        </Container>
      );
    } else {
      return (
        <Container>
          {gameSelect}
          <Table striped bordered variant="dark" responsive>
            <thead>
              <tr>
                <th>Game</th>
                <th className="hidden-xs">Date</th>
                <th className="hidden-lg">Date</th>
                <th className="scores">
                  Scores{' '}
                  <span
                    onClick={() =>
                      this.setState({ showScores: !this.state.showScores })
                    }
                    size="sm"
                  >
                    {this.state.showScores === false ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowUp />
                    )}
                  </span>
                </th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>{this.resultsList()}</tbody>
          </Table>
        </Container>
      );
    }
  }
}
