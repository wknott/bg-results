import React, { Component } from 'react';
import { Table, Image, Button } from 'react-bootstrap';
import addButton from '../add-user-button.png';
import deleteButton from '../delete-user-button.png';
import blueCard from '../blue.svg';
import greenCard from '../green.svg';
import yellowCard from '../yellow.svg';
import guildCard from '../guild.svg';
import wonderImg from '../wonder.svg';
import coinImg from '../coin.svg';
import militaryImg from '../military.svg';
import sigma from '../sigma.png';
import { addGamesAndWinns } from '../logic/game-statistics';

const pointsProps = [
  { title: 'military', img: militaryImg, color: '#F5D0C1' },
  { title: 'coin', img: coinImg, color: '#FEFBD7' },
  { title: 'wonder', img: wonderImg, color: '#E6E7E9' },
  { title: 'blue', img: blueCard, color: '#C7EAFA' },
  { title: 'yellow', img: yellowCard, color: '#FEFBD7' },
  { title: 'guild', img: guildCard, color: '#D0D4EA' },
  { title: 'green', img: greenCard, color: '#D8EAD3' }
];

export default class Table7WondersDuel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      scores: Array.from({ length: 2 }, () => ({
        user: null,
        points: {
          military: null,
          coin: null,
          wonder: null,
          blue: null,
          yellow: null,
          guild: null,
          green: null
        }
      }))
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
  onChangeNumberOfPlayers = length => {
    if (length < 2) length = 2;
    else if (length > 7) length = 7;
    const emptyScores = Array.from({ length }, () => ({
      user: null,
      points: {
        military: null,
        coin: null,
        wonder: null,
        blue: null,
        yellow: null,
        guild: null,
        green: null
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
  onChangePoints = (e, title, index) => {
    const { scores } = this.state;
    const newValue = parseInt(e.target.value, 10) || null;
    const newScores = scores.map((score, i) =>
      i === index
        ? { ...score, points: { ...score.points, [title]: newValue } }
        : score
    );
    this.setState({ scores: newScores });
  };

  isValid() {
    const players = this.state.scores.map(score => score.user);
    return (
      JSON.stringify(players) === JSON.stringify([...new Set(players)]) &&
      this.state.scores.every(score => score.user)
    );
  }
  onSubmit = () => {
    fetch('api/games/')
      .then(response => response.json())
      .then(data => {
        const { scores } = this.state;
        const gameId = data.find(game => game.name === '7 Cudów Świata')._id;

        const newScores = scores.map(({ user, points }) => ({
          user,
          points: Object.values(points).reduce((x, y) => x + y, 0)
        }));
        const result = { game: gameId, scores: newScores };
        fetch('api/results/add', {
          method: 'POST',
          body: JSON.stringify(result),
          headers: { 'Content-Type': 'application/json' }
        }).then(() => {
          this.props.history.push('/');
        });
      });
  };
  render() {
    return (
      <div>
        <Table responsive variant="dark" bordered>
          <thead>
            <tr>
              <td
                onClick={() =>
                  this.onChangeNumberOfPlayers(this.state.scores.length + 1)
                }
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'primary',
                  textAlign: 'center'
                }}
              >
                <Image
                  src={addButton}
                  width="32"
                  height="32"
                  alt=""
                  style={{ margin: 4 }}
                />
              </td>
              {this.state.scores.map((score, index) => (
                <td
                  style={{ backgroundColor: 'white', textAlign: 'center' }}
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
              <td
                onClick={() =>
                  this.onChangeNumberOfPlayers(this.state.scores.length - 1)
                }
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'primary',
                  textAlign: 'center'
                }}
              >
                <Image
                  src={deleteButton}
                  width="32"
                  height="32"
                  alt=""
                  style={{ margin: 4 }}
                />
              </td>
            </tr>
          </thead>
          <tbody>
            {pointsProps.map(({ title, img, color }) => {
              return (
                <tr
                  key={title}
                  style={{ backgroundColor: color, textAlign: 'center' }}
                >
                  <td>
                    <Image src={img} width="40" height="40" alt="" />
                  </td>
                  {this.state.scores.map((score, index) => (
                    <td key={index}>
                      <input
                        style={{
                          backgroundColor: color,
                          textAlign: 'center',
                          borderColor: color
                        }}
                        placeholder=""
                        className="form-control input-focus"
                        value={
                          score.points[title] === null
                            ? ''
                            : score.points[title]
                        }
                        onChange={e => this.onChangePoints(e, title, index)}
                        type="number"
                        min="0"
                        max="100"
                      />
                    </td>
                  ))}
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
              {this.state.scores.map((score, index) => (
                <td
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: '#495057',
                    textAlign: 'center'
                  }}
                >
                  {Object.values(score.points).reduce((x, y) => x + y, 0)}
                </td>
              ))}
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
