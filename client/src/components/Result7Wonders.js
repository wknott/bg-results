import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  ButtonGroup,
  Button,
  Spinner,
  Alert,
  Badge
} from 'react-bootstrap';
import coinImg from '../coin.png';
import wonderImg from '../wonder.png';
import placeholder from '../placeholder.png';
import museum from '../museum.png';
import sigma from '../sigma.png';
import Range7Wonders from './Range7Wonders';
export default class Result7Wonders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      windowState: 'players',
      scores: []
    };
  }
  componentDidMount() {
    fetch('/users/')
      .then(response => response.json())
      .then(data => {
        const newUsers = data;
        this.onChangeNumberOfPlayers(2);
        this.setState({ users: newUsers.sort((a, b) => b.games - a.games) });
      });
  }
  onChangeNumberOfPlayers = length => {
    const emptyScores = Array.from({ length }, () => ({
      user: null,
      nameOfWonder: '',
      points: {
        military: 0,
        coin: 0,
        wonder: 0,
        civilian: 0,
        commerce: 0,
        guild: 0,
        science: 0
      }
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
  onChangeNameOfWonder = (e, score) => {
    const { scores } = this.state;
    const nameOfWonder = e.target.value;
    const updatedScore = { ...score, nameOfWonder };
    const newScores = scores.map(s => (s === score ? updatedScore : s));
    this.setState({ scores: newScores });
  };
  onScoresChange = newScores => {
    this.setState({ scores: newScores });
  };
  render() {
    const { users } = this.state;
    if (users === null) {
      return <Spinner animation="border" variant="light" />;
    }
    if (users.length === 0) {
      return (
        <Container>
          <Alert key="index" variant="primary">
            <Alert.Link href="/result">Create User</Alert.Link>
          </Alert>
        </Container>
      );
    }
    const nameOfWonders = [
      'Alexandria',
      'Antiocheia',
      'Atlantis',
      'Babylon',
      'Capua',
      'Caylus',
      'Chichen Itza',
      'Colliture',
      'Ephesos',
      'Giza',
      'Halikarnassos',
      'Helvetia',
      'Kings Landing',
      'Lhasa',
      'Machu Picchu',
      'Olympia',
      'Rhodos',
      'Rlyeh',
      'Roll Through the ages',
      'Tartaros'
    ];
    const ButtonGroup1 = (
      <>
        <Button
          className="without-padding"
          variant="secondary"
          onClick={() => {
            this.setState({ windowState: 'players' });
          }}
        >
          <Image
            src={museum}
            width="32"
            height="32"
            alt=""
            style={{ margin: 4 }}
          />
        </Button>
        <Button
          className="without-padding"
          variant="danger"
          onClick={() => this.setState({ windowState: 'military' })}
        >
          <Image src={placeholder} width="40" height="40" alt="" />
        </Button>
        <Button
          className="without-padding"
          variant="light"
          onClick={() => this.setState({ windowState: 'coin' })}
        >
          <Image src={coinImg} width="40" height="40" alt="C" />
        </Button>
        <Button
          className="without-padding"
          variant="light"
          onClick={() => this.setState({ windowState: 'wonder' })}
        >
          <Image src={wonderImg} width="40" height="40" alt="W" />
        </Button>
      </>
    );

    const ButtonGroup2 = (
      <>
        <Button
          className="without-padding"
          variant="primary"
          onClick={() => this.setState({ windowState: 'civilian' })}
        >
          <Image src={placeholder} width="40" height="40" alt="" />
        </Button>
        <Button
          className="without-padding"
          variant="warning"
          onClick={() => this.setState({ windowState: 'commerce' })}
        >
          <Image src={placeholder} width="40" height="40" alt="" />
        </Button>
        <Button
          className="without-padding purple-button"
          onClick={() => this.setState({ windowState: 'guild' })}
        >
          <Image src={placeholder} width="40" height="40" alt="" />
        </Button>
        <Button
          className="without-padding"
          variant="success"
          onClick={() => this.setState({ windowState: 'science' })}
        >
          <Image src={placeholder} width="40" height="40" alt="" />
        </Button>
      </>
    );

    return (
      <Container>
        <Row>
          <Col className="d-flex flex-column">
            <ButtonGroup size="lg" className="margin-bottom">
              {Array.from(
                {
                  length: 6
                },
                (_, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      this.onChangeNumberOfPlayers(2 + index);
                      this.setState({ windowState: 'players' });
                    }}
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
            <ButtonGroup className="hidden-xs margin-bottom">
              {ButtonGroup1}
              {ButtonGroup2}
            </ButtonGroup>
            <ButtonGroup className="hidden-lg">{ButtonGroup1}</ButtonGroup>
            <ButtonGroup className="hidden-lg margin-bottom">
              {ButtonGroup2}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          {this.state.windowState === 'players' ? (
            <Col
              style={{ marginBottom: '0.1rem' }}
              className={this.state.windowState === 'players' ? 'hidden' : ''}
              xs="3"
            >
              <Image src={sigma} style={{ marginLeft: '3px' }} />
            </Col>
          ) : (
            <Range7Wonders
              type={this.state.windowState}
              scores={this.state.scores}
              onScoresChange={this.onScoresChange}
            />
          )}
        </Row>
        {this.state.scores.map((score, index) => {
          return (
            <Row key={index}>
              <Col
                className={this.state.windowState === 'players' ? '' : 'hidden'}
              >
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
                className={this.state.windowState === 'players' ? '' : 'hidden'}
              >
                <select
                  className="form-control"
                  onChange={e => this.onChangeNameOfWonder(e, score)}
                >
                  <option value="">Name of wonder</option>
                  {nameOfWonders.map(name => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col
                xs="3"
                className={this.state.windowState === 'players' ? 'hidden' : ''}
              >
                <h2>
                  <Badge pill variant="primary">
                    {Object.values(score.points).reduce((x, y) => x + y, 0)}
                  </Badge>
                </h2>
              </Col>
            </Row>
          );
        })}
        <Row>
          <Col>
            <Button onClick={() => console.log(this.state.scores)}>
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
