import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Spinner,
  Alert
} from 'react-bootstrap';
import LabeledRange from './LabeledRange';
export default class Result7Wonders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      windowState: null,
      scores: []
    };
  }
  componentDidMount() {
    fetch('/users/')
      .then(response => response.json())
      .then(data => {
        const newUsers = data;
        this.setState({ users: newUsers.sort((a, b) => b.games - a.games) });
      });
  }
  onChangeNumberOfPlayers = length => {
    const emptyScores = Array.from({ length }, () => ({
      user: null,
      wonder: '',
      militaryPoints: 0,
      coinPoints: 0,
      wonderPoints: 0,
      civilianPoints: 0,
      commercePoints: 0,
      guildPoints: 0,
      sciencePoints: 0
    }));
    const scores = this.state.scores.concat(emptyScores).slice(0, length);
    this.setState({ scores });
  };
  onChangeUser = (e, score) => {
    const { scores } = this.state;
    const user = e.target.value;
    const updatedScore = { ...score, user };
    const newScores = scores.map(s => (s === score ? updatedScore : s));
    this.setState({ scores: newScores });
  };
  render() {
    const { users } = this.state;
    if (users === null) {
      return <Spinner animation="border" variant="light" />;
    } else if (users.length === 0) {
      return (
        <Container>
          <Alert key="index" variant="primary">
            <Alert.Link href="/result">Create User</Alert.Link>
          </Alert>
        </Container>
      );
    } else {
      return (
        <Container>
          <Row>
            <Col className="d-flex flex-column">
              <ButtonGroup size="lg">
                {Array.from(
                  {
                    length: 6
                  },
                  (_, index) => (
                    <Button
                      key={index}
                      onClick={() => this.onChangeNumberOfPlayers(2 + index)}
                    >
                      {2 + index}
                    </Button>
                  )
                )}
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column">
              <ButtonGroup>
                <Button
                  variant="danger"
                  onClick={() => this.setState({ windowState: 'military' })}
                >
                  {' '}
                  M{' '}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ windowState: 'coin' })}
                >
                  {' '}
                  C{' '}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ windowState: 'wonder' })}
                >
                  {' '}
                  W{' '}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => this.setState({ windowState: 'civilian' })}
                >
                  {' '}
                  C{' '}
                </Button>
                <Button
                  variant="warning"
                  onClick={() => this.setState({ windowState: 'commerce' })}
                >
                  {' '}
                  C{' '}
                </Button>
                <Button
                  className="purple-button"
                  onClick={() => this.setState({ windowState: 'guild' })}
                >
                  {' '}
                  G{' '}
                </Button>
                <Button
                  variant="success"
                  onClick={() => this.setState({ windowState: 'science' })}
                >
                  {' '}
                  S{' '}
                </Button>
                <Button onClick={() => this.setState({ windowState: 'sum' })}>
                  {' '}
                  S{' '}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          {this.state.scores.map((score, index) => {
            return (
              <Row key={index}>
                <Col xs={6}>
                  <select
                    className="form-control"
                    onChange={e => this.onChangeUser(e, score)}
                  >
                    <option value="">Player</option>
                    {users.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col
                  className={
                    this.state.windowState === 'military' ? '' : 'hidden'
                  }
                >
                  <LabeledRange
                    MIN={-9}
                    MAX={18}
                    onChange={value => {
                      const militaryPoints = value[0];
                      const updatedScore = { ...score, militaryPoints };
                      const newScores = this.state.scores.map(s =>
                        s === score ? updatedScore : s
                      );
                      this.setState({ scores: newScores });
                    }}
                  />
                </Col>
                <Col
                  className={this.state.windowState === 'coin' ? '' : 'hidden'}
                >
                  <LabeledRange
                    MIN={0}
                    MAX={30}
                    onChange={value => {
                      const coinPoints = value[0];
                      const updatedScore = { ...score, coinPoints };
                      const newScores = this.state.scores.map(s =>
                        s === score ? updatedScore : s
                      );
                      this.setState({ scores: newScores });
                    }}
                  />
                </Col>
                <Col
                  className={this.state.windowState === 'score' ? '' : 'hidden'}
                >
                  {score.militaryPoints + score.coinPoints}
                </Col>
              </Row>
            );
          })}
        </Container>
      );
    }
  }
}
