import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GamesTable from './GamesTable';
import NewGameForm from './NewGameForm';
import ImageUpdateModal from './ImageUpdateModal';
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
    fetch('api/games/')
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
        <ImageUpdateModal
          show={this.state.show}
          handleClose={this.handleClose}
          onSubmit={this.onSubmitUpdate}
          imgUrl={this.state.imgUrl}
          onChange={this.onChangeImgUrl}
        />
      </Container>
    );
  }
}
