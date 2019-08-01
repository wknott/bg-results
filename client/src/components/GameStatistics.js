import React, { Component } from 'react';
import {
  Alert,
  Spinner,
  Card,
  Button,
  CardColumns,
  CardGroup,
  CardDeck
} from 'react-bootstrap';
import CountUp from 'react-countup';

export default class GameStatistics extends Component {
  constructor(props) {
    super(props);
    this.numberOfGames = this.numberOfGames.bind(this);
    this.state = {
      games: null,
      results: [],
      id: null
    };
  }

  componentDidMount() {
    fetch('/games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({ games });
      });
    fetch('/results/')
      .then(response => response.json())
      .then(data => {
        const results = data;
        this.setState({ results });
      });
  }

  numberOfGames(game) {
    let count = 0;
    for (let result of this.state.results)
      if (result.game._id === game._id) count++;
    return count;
  }
  setWinners(result) {
    const { scores } = result;
    const sortedScores = scores.slice().sort((a, b) => b.points - a.points);
    const winner = [sortedScores[0].user.username];
    for (let i = 1; i < sortedScores.length; i++) {
      if (sortedScores[i].points === sortedScores[0].points) {
        winner[i] = sortedScores[i].user.username;
      }
    }
    return winner;
  }
  winnerList(game) {
    const listOfWinners = [{ name: null, numberOfWins: null }];
    for (let result of this.state.results) {
      if (result.game._id === game._id) {
        const winners = this.setWinners(result);
        for (let winner of winners) {
          const indexOfWinner = listOfWinners.findIndex(
            win => win.name === winner
          );
          console.log(indexOfWinner);
          if (indexOfWinner === -1) {
            listOfWinners.push({ name: winner, numberOfWins: 1 });
          } else listOfWinners[indexOfWinner].numberOfWins++;
        }
      }
    }
    return listOfWinners
      .slice()
      .sort((a, b) => b.numberOfWins - a.numberOfWins);
  }

  render() {
    if (this.state.games === null) {
      return <Spinner animation="border" variant="light" />;
    } else if (this.state.games.length === 0) {
      return (
        <div>
          <Alert key="index" variant="primary">
            <Alert.Link href="/result"> Create result </Alert.Link>of this game!
          </Alert>
        </div>
      );
    } else {
      return (
        <div>
          <CardColumns>
            {this.state.games.map(game => {
              return (
                <Card border="primary" bg="dark" text="white" key={game._id}>
                  <Card.Body>
                    <Card.Title as="h3">{game.name}</Card.Title>
                    <Card.Text as="h5">
                      Games Played:{' '}
                      <CountUp end={this.numberOfGames(game)} duration={2} />
                    </Card.Text>
                    <Card.Text as="h6">
                      Winners:
                      {this.winnerList(game).map(winner => {
                        return (
                          <div key={winner.name}>
                            {winner.name} {winner.numberOfWins}
                          </div>
                        );
                      })}
                    </Card.Text>
                    <Button variant="primary">Create results</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </div>
      );
    }
  }
}
