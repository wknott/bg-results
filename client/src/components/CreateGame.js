import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import GamesTable from './GamesTable';
import NewGameForm from './NewGameForm';
export default class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
      games: [],
      show: false,
      game: null
    };
  }

  loadGames() {
    fetch('/games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({ games });
      });
  }
  componentDidMount() {
    this.loadGames();
  }

  onChangeImgUrl = e => {
    this.setState({ imgUrl: e.target.value });
  };

  handleImageChange = game => {
    this.setState({ show: true, game });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  onSubmitUpdate = e => {
    e.preventDefault();
    const game = {
      name: this.state.game.name,
      minPlayers: this.state.game.minPlayers,
      maxPlayers: this.state.game.maxPlayers,
      imgUrl: this.state.imgUrl
    };
    fetch(`/games/update/${this.state.game._id}`, {
      method: 'POST',
      body: JSON.stringify(game),
      headers: { 'Content-type': 'application/json' }
    }).then(() => {
      this.loadGames();
      this.setState({
        imgUrl: '',
        show: false
      });
    });
  };

  render() {
    const { games } = this.state;
    if (this.state.games === null || this.state.users === [])
      return (
        <Container>
          <Row>
            <Col>
              <NewGameForm onCreated={this.loadGames} />
            </Col>
          </Row>
        </Container>
      );
    else {
      return (
        <Container>
          <Row style={{ marginBottom: '1rem' }}>
            <Col>
              <NewGameForm onCreated={this.loadGames} />
            </Col>
          </Row>
          <Row className="hidden-lg">
            <Col>
              <GamesTable
                handleImageChange={this.handleImageChange}
                games={games.sort((a, b) => b.name - a.name)}
              />
            </Col>
          </Row>
          <Row className="hidden-xs">
            <Col>
              <GamesTable
                handleImageChange={this.handleImageChange}
                games={games
                  .filter((game, index) => index < this.state.games.length / 2)
                  .sort((a, b) => b.name - a.name)}
              />
            </Col>
            <Col>
              <GamesTable
                handleImageChange={this.handleImageChange}
                games={games
                  .filter((game, index) => index >= this.state.games.length / 2)
                  .sort((a, b) => b.name - a.name)}
              />
            </Col>
          </Row>
          <Modal
            className="dark-modal"
            centered
            show={this.state.show !== false}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              Add Game image URL:
              <Form onSubmit={this.onSubmitUpdate}>
                <Form.Group>
                  <Form.Control
                    placeholder="Game image URL"
                    type="text"
                    required
                    value={this.state.imgUrl}
                    onChange={this.onChangeImgUrl}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update Game
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      );
    }
  }
}
