import React, { Component } from 'react';
import { Table, Image } from 'react-bootstrap';
import gameIcon from '../favicon.png';

export default class GamesTable extends Component {
  render() {
    const { games, handleImageChange } = this.props;
    return (
      <Table responsive size="sm" striped bordered hover variant="dark">
        <thead>
          <tr style={{ fontSize: '11px', fontWeight: 400 }}>
            <td width="100px">Image</td>
            <td>Name</td>
            <td>Min</td>
            <td>Max</td>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => {
            return (
              <tr key={index}>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleImageChange(game)}
                >
                  <Image className="img-game" src={game.imgUrl || gameIcon} />
                </td>
                <td>{game.name}</td>
                <td>{game.minPlayers}</td>
                <td>{game.maxPlayers}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
