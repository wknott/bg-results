import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
export default class UserRow extends Component {
  render() {
    const { user, handleImageChange } = this.props;
    return (
      <tr>
        <td
          style={{ cursor: 'pointer' }}
          onClick={() => handleImageChange(user)}
        >
          <Image
            roundedCircle
            className="img-user"
            src={
              user.imgUrl ||
              'https://x.boardgamearena.net/data/avatar/0/85/85115/85115684_184.jpg?h=000000'
            }
          />
        </td>
        <td>{user.username}</td>
        <td>{user.wins}</td>
        <td>{user.games}</td>
        <td>
          {user.wins > 0 ? ((user.wins / user.games) * 100).toFixed(0) : 0}%
        </td>
      </tr>
    );
  }
}
