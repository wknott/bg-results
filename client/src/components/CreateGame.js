import React, { Component } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  Image,
  Modal
} from 'react-bootstrap';

export default class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      minPlayers: '',
      maxPlayers: '',
      imgUrl: '',
      games: [],
      show: false,
      game: null
    };
  }

  componentDidMount() {
    fetch(' /games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({ games });
      });
  }

  onChangeName = e => {
    this.setState({ name: e.target.value });
  };

  onChangeMinPlayers = e => {
    this.setState({ minPlayers: e.target.value });
  };

  onChangeMaxPlayers = e => {
    this.setState({ maxPlayers: e.target.value });
  };

  onChangeImgUrl = e => {
    this.setState({ imgUrl: e.target.value });
  };

  handleImageChange = game => {
    this.setState({ show: true, game });
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleOpen = result => {
    this.setState({ show: true, result });
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
    });
    fetch(' /games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({
          name: '',
          minPlayers: '',
          maxPlayers: '',
          imgUrl: '',
          games
        });
      });
  };

  onSubmit = e => {
    e.preventDefault();
    const game = {
      name: this.state.name,
      minPlayers: this.state.minPlayers,
      maxPlayers: this.state.maxPlayers,
      imgUrl: this.state.imgUrl
    };
    fetch('/games/add', {
      method: 'POST',
      body: JSON.stringify(game),
      headers: { 'Content-type': 'application/json' }
    });
    fetch(' /games/')
      .then(response => response.json())
      .then(data => {
        const games = data;
        this.setState({
          name: '',
          minPlayers: '',
          maxPlayers: '',
          imgUrl: '',
          games
        });
      });
  };

  render() {
    const addGame = (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="Name"
            type="text"
            required
            value={this.state.name}
            onChange={this.onChangeName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Min number of players"
            type="number"
            required
            value={this.state.minPlayers}
            onChange={this.onChangeMinPlayers}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Max number of players"
            type="number"
            required
            value={this.state.maxPlayers}
            onChange={this.onChangeMaxPlayers}
          />
        </Form.Group>
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
          Create Game
        </Button>
      </Form>
    );
    if (this.state.games === null || this.state.users === [])
      return <Container>{addGame}</Container>;
    else {
      return (
        <Container>
          <Row>
            <Col>{addGame}</Col>
          </Row>
          <Row>
            <Col md="4">
              <br />{' '}
              <Table responsive size="sm" striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Min</td>
                    <td>Max</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.games
                    .sort((a, b) => b.name - a.name)
                    .map((game, index) => {
                      return (
                        <tr key={index}>
                          <td
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.handleImageChange(game)}
                          >
                            <Image
                              className="imgGameList"
                              src={game.imgUrl}
                              rounded
                            />
                          </td>
                          <td>{game.name}</td>
                          <td>{game.minPlayers}</td>
                          <td>{game.maxPlayers}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
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
