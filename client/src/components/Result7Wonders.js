import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  ButtonGroup,
  Button,
  Spinner,
  Alert
} from 'react-bootstrap';
import LabeledRange from './LabeledRange';
import coinImg from '../coin.png';
import wonderImg from '../wonder.png';
import placeholder from '../placeholder.png';
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
                      className="raise"
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
                  <Image src={placeholder} width="20" height="20" alt="" />
                </Button>
                <Button
                  variant="light"
                  onClick={() => this.setState({ windowState: 'coin' })}
                >
                  <Image src={coinImg} width="20" height="20" alt="C" />
                </Button>
                <Button
                  variant="light"
                  onClick={() => this.setState({ windowState: 'wonder' })}
                >
                  <Image src={wonderImg} width="20" height="20" alt="W" />
                </Button>
                <Button
                  variant="primary"
                  onClick={() => this.setState({ windowState: 'civilian' })}
                >
                  <Image src={placeholder} width="20" height="20" alt="" />
                </Button>
                <Button
                  variant="warning"
                  onClick={() => this.setState({ windowState: 'commerce' })}
                >
                  <Image src={placeholder} width="20" height="20" alt="" />
                </Button>
                <Button
                  className="purple-button"
                  onClick={() => this.setState({ windowState: 'guild' })}
                >
                  <Image src={placeholder} width="20" height="20" alt="" />
                </Button>
                <Button
                  variant="success"
                  onClick={() => this.setState({ windowState: 'science' })}
                >
                  <Image src={placeholder} width="20" height="20" alt="" />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ windowState: 'sum' })}
                >
                  Σ
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
