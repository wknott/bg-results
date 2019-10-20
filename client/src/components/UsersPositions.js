import React, { Component } from 'react';
import { addGamesAndWinns } from '../logic/game-statistics';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default class UsersPositions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUsers: []
    };
  }

  componentDidMount() {
    const resultsPromise = fetch('api/results/').then(response =>
      response.json()
    );
    const usersPromise = fetch('api/users/').then(response => response.json());
    Promise.all([resultsPromise, usersPromise]).then(([results, users]) => {
      const newUsers = addGamesAndWinns(results, users);
      this.setState({ users: newUsers.sort((a, b) => b.games - a.games) });
    });
  }
  handleChoice = user => {
    if (this.state.selectedUsers.indexOf(user) === -1) {
      this.setState({
        selectedUsers: [...this.state.selectedUsers, user]
      });
    } else {
      this.setState({
        selectedUsers: this.state.selectedUsers.filter(u => u !== user)
      });
    }
  };
  handleShuffle = () => {
    const newselectedUsers = this.state.selectedUsers;
    shuffleArray(newselectedUsers);
    this.setState({ selectedUsers: newselectedUsers });
  };
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Table responsive size="sm" striped bordered hover variant="dark">
              <tbody>
                {this.state.users.map(user => (
                  <tr
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.handleChoice(user)}
                    key={user._id}
                  >
                    {this.state.selectedUsers.includes(user) === true ? (
                      <td style={{ backgroundColor: '#007bff' }}>
                        {user.username}
                      </td>
                    ) : (
                      <td>{user.username}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col>
            <Button
              size="lg"
              style={{ marginBottom: '1rem' }}
              onClick={this.handleShuffle}
            >
              Shuffle
            </Button>
            {this.state.selectedUsers.map((user, index) => (
              <Row key={index}>
                <Col>
                  <h5 style={{ color: 'white' }}>
                    {index + 1}
                    {'. '}
                    {user.username}
                  </h5>
                </Col>
                {/* <Col><Image className="img-user" src={player.imgUrl}/></Col> */}
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}
