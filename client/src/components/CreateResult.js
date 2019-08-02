import React, { Component } from 'react';
import ScoreInput from './ScoreInput';
import { Alert, Form, Spinner, Button } from 'react-bootstrap';

export default class CreateResult extends Component {
  constructor(props) {
    super(props);
    this.onChangeGame = this.onChangeGame.bind(this);
    this.onChangeNumberOfPlayers = this.onChangeNumberOfPlayers.bind(this);
    this.onChangeScores = this.onChangeScores.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      game: null,
      scores: [],
      numberOfPlayers: '',
      games: null,
      users: []
    };
    const {
      location: { state }
    } = props;
    if (state) {
      this.state.game = state.gameId;
      this.state.numberOfPlayers = state.numberOfPlayers;
      this.state.scores = this.initializeScores(state.numberOfPlayers);
    }
  }

  componentDidMount() {
    fetch(' /games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({ games });
      });

    fetch(' /users/')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({
            users: data
          });
        }
      });
  }

  onChangeGame(e) {
    this.setState({ game: e.target.value });
  }

  onChangeScores(e) {
    this.setState({ scores: e.target.value });
  }

  initializeScores(length) {
    const emptyScores = Array.from({ length }, () => ({
      user: null,
      points: 0
    }));
    const scores = this.state.scores.concat(emptyScores).slice(0, length);
    return scores;
  }

  onChangeNumberOfPlayers(e) {
    const numberOfPlayers = e.target.value;
    const game = this.state.games.find(game => game._id === this.state.game);
    const { minPlayers, maxPlayers } = game;
    if (numberOfPlayers > maxPlayers || numberOfPlayers < minPlayers) return;
    const scores = this.initializeScores(numberOfPlayers);
    this.setState({ numberOfPlayers, scores });
  }

  onSubmit(e) {
    e.preventDefault();
    const { game, scores } = this.state;
    const result = { game, scores };
    fetch(' /results/add', {
      method: 'POST',
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      this.props.history.push('/');
    });
  }

  isValid() {
    return this.state.scores.every(
      score => score.user && Number.isInteger(score.points)
    );
  }

  render() {
    const { games, scores } = this.state;
    if (games === null) {
      return <Spinner animation="border" variant="light" />;
    } else if (games.length === 0) {
      return (
        <Alert key="index" variant="primary">
          <Alert.Link href="/game"> Create game </Alert.Link>
          before you add the result!
        </Alert>
      );
    } else {
      const game = games.find(game => game._id === this.state.game);
      return (
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Control
              as="select"
              value={this.state.game || ''}
              onChange={this.onChangeGame}
            >
              <option value="">Select game</option>
              {this.state.games.map(game => (
                <option key={game._id} value={game._id}>
                  {game.name}
                </option>
              ))}
              >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="Number of Players"
              value={this.state.numberOfPlayers}
              onChange={this.onChangeNumberOfPlayers}
              disabled={!game}
              type="number"
              min={game && game.minPlayers}
              max={game && game.maxPlayers}
            />
          </Form.Group>
          <Form.Group>
            <table>
              <thead className="thead-dark" />
              <tbody>
                {scores.map((score, index) => (
                  <ScoreInput
                    key={index}
                    score={score}
                    users={this.state.users}
                    onChange={updatedScore => {
                      const newScores = scores.map(s =>
                        s === score ? updatedScore : s
                      );
                      this.setState({ scores: newScores });
                    }}
                  />
                ))}
              </tbody>
            </table>
          </Form.Group>
          <Button
            type="submit"
            disabled={!game || !this.state.numberOfPlayers || !this.isValid()}
            variant="primary"
          >
            {' '}
            Create Result{' '}
          </Button>
        </Form>
      );
    }
  }
}
