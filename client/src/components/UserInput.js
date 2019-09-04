import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
export default class UserInput extends Component {
  render() {
    const { user } = this.props;
    return (
      <tr>
        <td
          style={{ cursor: 'pointer' }}
          onClick={() => this.handleImageChange(user)}
        >
          <Image
            roundedCircle
            className="imgGameList"
            src={
              user.imgUrl ||
              'https://x.boardgamearena.net/data/avatar/0/85/85115/85115684_184.jpg?h=000000'
            }
          />
        </td>
        <td>{user.username}</td>
        <td>{user.wins}</td>
        <td>{user.games}</td>
        <td>{((user.wins / user.games) * 100).toFixed(0)}%</td>
      </tr>
    );
  }
}
