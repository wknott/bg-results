import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Spinner,
  Card,
  Button,
  CardColumns,
  Table,
  ButtonGroup,
  Container,
  Col,
  Row,
  Image
} from 'react-bootstrap';
import CountUp from 'react-countup';
import '../App.css';
import gameIcon from '../favicon.png';

import { numberOfGames, winnerList } from '../logic/game-statistics';

export default class GameStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: null,
      results: [],
      id: null,
      showButtons: false
    };
  }

  componentDidMount() {
    fetch('api/games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({ games });
      });
    fetch('api/results/')
      .then(response => response.json())
      .then(data => {
        const results = data;
        this.setState({ results });
      });
  }

  setNumberOfGames() {
    this.setState({
      games: this.state.games.map(game => {
        game.numberOfGames = numberOfGames(game, this.state.results);
        return game;
      })
    });
  }
  render() {
    if (this.state.games === null) {
      return <Spinner animation="border" variant="light" />;
    }
    if (this.state.games.length === 0) {
      return (
        <Container>
          <Alert key="index" variant="primary">
            <Alert.Link href="/result"> Create result </Alert.Link>of this game!
          </Alert>
        </Container>
      );
    }
    return (
      <Container>
        <CardColumns>
          {this.state.games
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(game => {
              return (
                <Card border="primary" bg="dark" text="white" key={game._id}>
                  <Card.Body>
                    <Container>
                      <Row>
                        <Col className="game-col">
                          <Image
                            className="img-game-statistics"
                            src={game.imgUrl || gameIcon}
                          />
                        </Col>
                        <Col className="game-col">
                          <h4>{game.name}</h4>
                          <Card.Text>
                            Games Played:{' '}
                            <CountUp
                              end={numberOfGames(game, this.state.results)}
                              duration={5}
                            />
                          </Card.Text>
                        </Col>
                      </Row>
                    </Container>

                    <Table
                      size="sm"
                      responsive
                      hover
                      striped
                      bordered
                      variant="dark"
                    >
                      <thead>
                        <tr style={{ fontSize: '11px', fontWeight: 400 }}>
                          <td>Name</td>
                          <td>Wins</td>
                          <td>Games</td>
                          <td>%</td>
                          <td>Points</td>
                        </tr>
                      </thead>
                      <tbody>
                        {winnerList(game, this.state.results).map(winner => {
                          return (
                            <tr key={winner.name}>
                              <td>{winner.name}</td>
                              <td>{winner.numberOfWins}</td>
                              <td>{winner.numberOfGames}</td>
                              <td>
                                {Math.round(
                                  (winner.numberOfWins / winner.numberOfGames) *
                                    100
                                )}
                                %
                              </td>
                              <td>
                                {(winner.points / winner.numberOfGames).toFixed(
                                  1
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    <div className="d-flex flex-column">
                      <Button
                        onClick={() =>
                          this.setState({
                            showButtons:
                              this.state.showButtons === game._id
                                ? null
                                : game._id
                          })
                        }
                        variant="primary"
                      >
                        Create result
                      </Button>
                      {this.state.showButtons === game._id && (
                        <>
                          <strong>Choose number of players:</strong>
                          <ButtonGroup size="lg">
                            {Array.from(
                              {
                                length: game.maxPlayers - game.minPlayers + 1
                              },
                              (_, index) => (
                                <Button
                                  key={index}
                                  as={Link}
                                  to={{
                                    pathname: '/result',
                                    state: {
                                      gameId: game._id,
                                      numberOfPlayers: game.minPlayers + index
                                    }
                                  }}
                                >
                                  {game.minPlayers + index}
                                </Button>
                              )
                            )}
                          </ButtonGroup>
                        </>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
        </CardColumns>
      </Container>
    );
  }
}
