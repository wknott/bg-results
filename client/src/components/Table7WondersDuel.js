import React, { Component } from 'react';
import { Table, Image, Button } from 'react-bootstrap';
import museum from '../museum.png';
import blueCard from '../blue.svg';
import greenCard from '../green.svg';
import yellowCard from '../yellow.svg';
import guildCard from '../guild.svg';
import wonderImg from '../wonder.svg';
import tokenImg from '../token.svg';
import coinImg from '../coin.svg';
import militaryImg from '../military.svg';
import sigma from '../sigma.png';

const pointsProps = [
  { title: 'blue', img: blueCard, color: '#C7EAFA' },
  { title: 'green', img: greenCard, color: '#D8EAD3' },
  { title: 'yellow', img: yellowCard, color: '#FEFBD7' },
  { title: 'guild', img: guildCard, color: '#D0D4EA' },
  { title: 'wonder', img: wonderImg, color: '#E6E7E9' },
  { title: 'token', img: tokenImg, color: '#D8EAD3' },
  { title: 'coin', img: coinImg, color: '#FEFBD7' },
  { title: 'military', img: militaryImg, color: '#F5D0C1' }
];

export default class Table7WondersDuel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      scores: Array.from([1, 1], () => ({
        user: null,
        points: {
          blue: '',
          green: '',
          yellow: '',
          guild: '',
          wonder: '',
          token: '',
          coin: '',
          military: ''
        }
      }))
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
  onChangeUser = (e, score) => {
    const { scores } = this.state;
    const user = e.target.value;
    const updatedScore = { ...score, user };
    const newScores = scores.map(s => (s === score ? updatedScore : s));
    this.setState({ scores: newScores });
  };
  onChangePointsFirst = (e, title) => {
    const { scores } = this.state;
    scores[0].points[title] = parseInt(e.target.value, 10);
    this.setState({ scores });
  };
  onChangePointsSecond = (e, title) => {
    const { scores } = this.state;
    scores[1].points[title] = parseInt(e.target.value, 10);
    this.setState({ scores });
  };
  isValid() {
    const players = this.state.scores.map(score => score.user);
    return (
      JSON.stringify(players) === JSON.stringify([...new Set(players)]) &&
      this.state.scores.every(score => score.user)
    );
  }
  onSubmit = () => {
    fetch('/games/')
      .then(response => response.json())
      .then(data => {
        const { scores } = this.state;
        const gameId = data.find(
          game => game.name === '7 Cudów Świata Pojedynek'
        )._id;

        this.setState({ loading: true });
        const newScores = scores.map(({ user, points }) => ({
          user,
          points: Object.values(points).reduce((x, y) => x + y, 0)
        }));
        const result = { game: gameId, scores: newScores };
        console.log(result);
        fetch(' /results/add', {
          method: 'POST',
          body: JSON.stringify(result),
          headers: { 'Content-Type': 'application/json' }
        }).then(() => {
          this.setState({ loading: false });
          this.props.history.push('/');
        });
      });
  };
  render() {
    return (
      <div>
        <Table variant="dark" bordered>
          <thead>
            <tr>
              <td
                width="20%"
                style={{ backgroundColor: 'black', textAlign: 'center' }}
              >
                <Image
                  src={museum}
                  width="32"
                  height="32"
                  alt=""
                  style={{ margin: 4 }}
                />
              </td>
              {this.state.scores.map((score, index) => (
                <td
                  style={{ backgroundColor: 'white', textAlign: 'center' }}
                  width="30%"
                  key={index}
                >
                  <select
                    className="form-control"
                    onChange={e => this.onChangeUser(e, score)}
                  >
                    <option value="">Player</option>
                    {this.state.users.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {pointsProps.map(({ title, img, color }) => {
              return (
                <tr
                  key={title}
                  style={{ backgroundColor: color, textAlign: 'center' }}
                >
                  <td width="20%">
                    <Image src={img} width="40" height="40" alt="" />
                  </td>
                  <td width="40%">
                    <input
                      style={{
                        backgroundColor: color,
                        textAlign: 'center',
                        borderColor: color
                      }}
                      placeholder=""
                      className="form-control input-focus"
                      value={this.state.scores[0].points[title]}
                      onChange={e => this.onChangePointsFirst(e, title)}
                      type="number"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td width="40%">
                    <input
                      style={{
                        backgroundColor: color,
                        textAlign: 'center',
                        borderColor: color
                      }}
                      placeholder=""
                      className="form-control input-focus"
                      value={this.state.scores[1].points[title]}
                      onChange={e => this.onChangePointsSecond(e, title)}
                      type="number"
                      min="0"
                      max="100"
                    />
                  </td>
                </tr>
              );
            })}
            <tr>
              <td
                width="20%"
                style={{ backgroundColor: 'black', textAlign: 'center' }}
              >
                <Image
                  src={sigma}
                  width="32"
                  height="32"
                  alt=""
                  style={{ margin: 4 }}
                />
              </td>
              <td
                style={{
                  backgroundColor: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: '#495057',
                  textAlign: 'center'
                }}
              >
                {Object.values(this.state.scores[0].points).reduce(
                  (x, y) => x + y,
                  0
                )}
              </td>
              <td
                style={{
                  backgroundColor: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: '#495057',
                  textAlign: 'center'
                }}
              >
                {Object.values(this.state.scores[1].points).reduce(
                  (x, y) => x + y,
                  0
                )}
              </td>
            </tr>
          </tbody>
        </Table>
        <Button disabled={!this.isValid()} onClick={this.onSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}
