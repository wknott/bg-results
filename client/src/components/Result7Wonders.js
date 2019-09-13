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
import LabeledRange from './LabeledRange';
import coinImg from '../coin.png';
import wonderImg from '../wonder.png';
import placeholder from '../placeholder.png';
import museum from '../museum.png';
import sigma from '../sigma.png';
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
  onChangeNameOfWonder = (e, score) => {
    const { scores } = this.state;
    const nameOfWonder = e.target.value;
    const updatedScore = { ...score, nameOfWonder };
    const newScores = scores.map(s => (s === score ? updatedScore : s));
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
        <Row
          style={{
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
          }}
        >
          <Col
            style={{ marginBottom: '0.1rem' }}
            className={this.state.windowState === 'players' ? '' : 'hidden'}
          >
            <h3 style={{ color: '#007bff', textAlign: 'center' }}>Username</h3>
          </Col>
          <Col
            style={{ marginBottom: '0.1rem' }}
            className={this.state.windowState === 'players' ? '' : 'hidden'}
          >
            <h3 style={{ color: '#6c757d', textAlign: 'center' }}>Wonder</h3>
          </Col>
          <Col
            style={{ marginBottom: '0.1rem' }}
            className={this.state.windowState === 'military' ? '' : 'hidden'}
          >
            <h2 style={{ color: '#dc3545', textAlign: 'center' }}>
              Military points
            </h2>
          </Col>
          <Col
            style={{ marginBottom: '0.1rem' }}
            className={this.state.windowState === 'coin' ? '' : 'hidden'}
          >
            <h2 style={{ color: 'yellow', textAlign: 'center' }}>
              Coin points
            </h2>
          </Col>
          <Col
            style={{ marginBottom: '0.1rem' }}
            className={this.state.windowState === 'wonder' ? '' : 'hidden'}
          >
            <h2 style={{ color: 'orange', textAlign: 'center' }}>
              Wonder points
            </h2>
          </Col>
          <Col
            style={{ marginBottom: '0.1rem' }}
            className={this.state.windowState === 'civilian' ? '' : 'hidden'}
          >
            <h2 style={{ color: '#007bff', textAlign: 'center' }}>
              Civilian points
            </h2>
          </Col>
          <Col
            style={{ marginBottom: '0.1rem' }}
            className={this.state.windowState === 'commerce' ? '' : 'hidden'}
          >
            <h4 style={{ color: '#ffc107', textAlign: 'center' }}>
              Commerce points
            </h4>
          </Col>
          <Col
            style={{ marginBottom: '0.1rem' }}
            className={this.state.windowState === 'guild' ? '' : 'hidden'}
          >
            <h2 style={{ color: 'indigo', textAlign: 'center' }}>
              Guild points
            </h2>
          </Col>
          <Col
            style={{ marginBottom: '0.1rem' }}
            className={this.state.windowState === 'science' ? '' : 'hidden'}
          >
            <h2 style={{ color: '#28a745', textAlign: 'center' }}>
              Science points
            </h2>
          </Col>
          <Col
            style={{ marginBottom: '0.1rem' }}
            className={this.state.windowState === 'players' ? 'hidden' : ''}
            xs="3"
          >
            <Image src={sigma} style={{ marginLeft: '3px' }} />
          </Col>
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
                className={this.state.windowState === 'wonder' ? '' : 'hidden'}
              >
                <LabeledRange
                  MIN={0}
                  MAX={25}
                  onChange={value => {
                    const wonderPoints = value[0];
                    const updatedScore = { ...score, wonderPoints };
                    const newScores = this.state.scores.map(s =>
                      s === score ? updatedScore : s
                    );
                    this.setState({ scores: newScores });
                  }}
                />
              </Col>
              <Col
                className={
                  this.state.windowState === 'civilian' ? '' : 'hidden'
                }
              >
                <LabeledRange
                  MIN={0}
                  MAX={30}
                  onChange={value => {
                    const civilianPoints = value[0];
                    const updatedScore = { ...score, civilianPoints };
                    const newScores = this.state.scores.map(s =>
                      s === score ? updatedScore : s
                    );
                    this.setState({ scores: newScores });
                  }}
                />
              </Col>
              <Col
                className={
                  this.state.windowState === 'commerce' ? '' : 'hidden'
                }
              >
                <LabeledRange
                  MIN={0}
                  MAX={10}
                  onChange={value => {
                    const commercePoints = value[0];
                    const updatedScore = { ...score, commercePoints };
                    const newScores = this.state.scores.map(s =>
                      s === score ? updatedScore : s
                    );
                    this.setState({ scores: newScores });
                  }}
                />
              </Col>
              <Col
                className={this.state.windowState === 'guild' ? '' : 'hidden'}
              >
                <LabeledRange
                  MIN={0}
                  MAX={30}
                  onChange={value => {
                    const guildPoints = value[0];
                    const updatedScore = { ...score, guildPoints };
                    const newScores = this.state.scores.map(s =>
                      s === score ? updatedScore : s
                    );
                    this.setState({ scores: newScores });
                  }}
                />
              </Col>
              <Col
                className={this.state.windowState === 'science' ? '' : 'hidden'}
              >
                <LabeledRange
                  MIN={0}
                  MAX={50}
                  onChange={value => {
                    const sciencePoints = value[0];
                    const updatedScore = { ...score, sciencePoints };
                    const newScores = this.state.scores.map(s =>
                      s === score ? updatedScore : s
                    );
                    this.setState({ scores: newScores });
                  }}
                />
              </Col>
              <Col
                xs="3"
                className={this.state.windowState === 'players' ? 'hidden' : ''}
              >
                <h2>
                  <Badge pill variant="primary">
                    {score.militaryPoints +
                      score.commercePoints +
                      score.coinPoints +
                      score.guildPoints +
                      score.civilianPoints +
                      score.sciencePoints +
                      score.wonderPoints}
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
