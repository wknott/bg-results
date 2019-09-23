import React, { Component } from 'react';
import ScoreRow from './ScoreRow';
import {
  Alert,
  Form,
  Spinner,
  Button,
  Container,
  Table
} from 'react-bootstrap';
import { addGamesAndWinns } from '../logic/game-statistics';
import NumberOfPlayersButtonGroup from './NumberOfPlayersButtonGroup';
import Table7WondersDuel from './Table7WondersDuel';
import Table7Wonders from './Table7Wonders';
export default class CreateResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: null,
      scores: [],
      games: null,
      users: [],
      loading: false,
      showButtons: false,
      showTable: ''
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
    fetch('api/games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({ games });
      });

    const resultsPromise = fetch('api/results/').then(response =>
      response.json()
    );
    const usersPromise = fetch('api/users/').then(response => response.json());
    Promise.all([resultsPromise, usersPromise]).then(([results, users]) => {
      const newUsers = addGamesAndWinns(results, users);
      this.setState({ users: newUsers.sort((a, b) => b.games - a.games) });
    });
  }

  onChangeGame = e => {
    const gameId = e.target.value;
    if (gameId) {
      const { name, minPlayers, maxPlayers } = this.state.games.find(
        game => game._id === gameId
      );
      if (name === '7 Cudów Świata Pojedynek') {
        this.setState({
          gameId: e.target.value,
          scores: [],
          showTable: 'duel',
          showButtons: false
        });
      } else if (name === '7 Cudów Świata') {
        this.setState({
          gameId: e.target.value,
          scores: [],
          showTable: 'wonders',
          showButtons: false
        });
      } else if (minPlayers !== maxPlayers)
        this.setState({
          gameId: e.target.value,
          showButtons: true,
          showTable: ''
        });
      else {
        this.onChangeNumberOfPlayers(minPlayers);
        this.setState({
          gameId: e.target.value,
          showButtons: false,
          showTable: ''
        });
      }
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
    fetch('api/results/add', {
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
      const game = games.find(game => game._id === this.state.gameId) || {
        name: '',
        minPlayers: 0,
        maxPlayers: 0
      };
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
              <NumberOfPlayersButtonGroup
                game={game}
                onChange={this.onChangeNumberOfPlayers}
                showButtons={this.state.showButtons}
              />
            </Form.Group>
            <Form.Group>
              <Table responsive striped bordered hover variant="dark">
                <thead className="thead-dark" />
                <tbody>
                  {scores.map((score, index) => (
                    <ScoreRow
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
              </Table>
            </Form.Group>
            {this.state.scores.length !== 0 ? (
              <Button
                type="submit"
                disabled={!game || !this.isValid()}
                variant="primary"
              >
                {' '}
                Create Result{' '}
              </Button>
            ) : (
              <></>
            )}
          </Form>
          <div style={{ marginTop: '-2rem' }}>
            {this.state.showTable === 'duel' ? (
              <Table7WondersDuel history={this.props.history} />
            ) : (
              <></>
            )}
            {this.state.showTable === 'wonders' ? (
              <Table7Wonders history={this.props.history} />
            ) : (
              <></>
            )}
          </div>
        </Container>
      );
    }
  }
}
