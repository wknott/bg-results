import React, { Component } from 'react';
import ScoreInput from './ScoreInput';
import {
  Alert,
  Form,
  Spinner,
  Button,
  Container,
  ButtonGroup
} from 'react-bootstrap';
import { addGamesAndWinns } from '../logic/game-statistics';

export default class CreateResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: null,
      scores: [],
      games: null,
      users: [],
      loading: false,
      showButtons: false
    };
    const {
      location: { state }
    } = props;
    if (state) {
      this.state.gameId = state.gameId;
      this.state.scores = this.initializeScores(state.numberOfPlayers);
      this.state.showButtons = true;
    }
  }

  componentDidMount() {
    fetch(' /games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({ games });
      });

    const resultsPromise = fetch('/results/').then(response => response.json());
    const usersPromise = fetch('/users/').then(response => response.json());
    Promise.all([resultsPromise, usersPromise]).then(([results, users]) => {
      const newUsers = addGamesAndWinns(results, users);
      this.setState({ users: newUsers.sort((a, b) => b.games - a.games) });
    });
  }

  onChangeGame = e => {
    const gameId = e.target.value;
    const { minPlayers, maxPlayers } = this.state.games.find(
      game => game._id === gameId
    );
    if (e.target.value.length > 0)
      if (minPlayers !== maxPlayers)
        this.setState({ gameId: e.target.value, showButtons: true });
      else {
        this.onChangeNumberOfPlayers(minPlayers);
        this.setState({ gameId: e.target.value });
      }
  };

  onChangeScores = e => {
    this.setState({ scores: e.target.value });
  };

  onChangeNumberOfPlayers = length => {
    const emptyScores = Array.from({ length }, () => ({
      user: null,
      points: ''
    }));
    const scores = this.state.scores.concat(emptyScores).slice(0, length);
    this.setState({ scores });
  };

  initializeScores = length => {
    const emptyScores = Array.from({ length }, () => ({
      user: null,
      points: ''
    }));
    const scores = this.state.scores.concat(emptyScores).slice(0, length);
    return scores;
  };

  onSubmit = e => {
    e.preventDefault();
    const { gameId, scores } = this.state;
    this.setState({ loading: true });
    const result = { game: gameId, scores };
    console.log(result);
    fetch(' /results/add', {
      method: 'POST',
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      this.setState({ loading: false });
      this.props.history.push('/');
    });
  };

  isValid() {
    const players = this.state.scores.map(score => score.user);
    return (
      JSON.stringify(players) === JSON.stringify([...new Set(players)]) &&
      this.state.scores.every(
        score => score.user && score.points && score.points !== ''
      )
    );
  }

  render() {
    const { games, scores, users } = this.state;
    if (games === null) {
      return <Spinner animation="border" variant="light" />;
    } else if (games.length === 0) {
      return (
        <Container>
          <Alert key="index" variant="primary">
            <Alert.Link href="/game"> Create game </Alert.Link>
            before you add the result!
          </Alert>
        </Container>
      );
    } else {
      const game = games.find(game => game._id === this.state.gameId);
      return (
        <Container>
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Control
                as="select"
                value={this.state.gameId || ''}
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
              {this.state.showButtons ? (
                <div>
                  <h4 className="white-text">Choose number of players:</h4>
                  <ButtonGroup size="lg">
                    {Array.from(
                      {
                        length: game.maxPlayers - game.minPlayers + 1
                      },
                      (_, index) => (
                        <Button
                          key={index}
                          onClick={() =>
                            this.onChangeNumberOfPlayers(
                              game.minPlayers + index
                            )
                          }
                        >
                          {game.minPlayers + index}
                        </Button>
                      )
                    )}
                  </ButtonGroup>
                </div>
              ) : (
                <></>
              )}
            </Form.Group>
            <Form.Group>
              <table>
                <thead className="thead-dark" />
                <tbody>
                  {scores.map((score, index) => (
                    <ScoreInput
                      key={index}
                      score={score}
                      users={users}
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
              className={this.state.scores.length !== 0 ? '' : 'hidden'}
              type="submit"
              disabled={!game || !this.isValid()}
              variant="primary"
            >
              {' '}
              Create Result{' '}
            </Button>
          </Form>
        </Container>
      );
    }
  }
}
