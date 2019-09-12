import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
export default class UsersTable extends Component {
  render() {
    const { game, onChange, showButtons } = this.props;
    return (
      <div className={showButtons ? '' : 'hidden'}>
        <h4 className="white-text">Choose number of players:</h4>
        <ButtonGroup size="lg">
          {Array.from(
            {
              length: game.maxPlayers - game.minPlayers + 1
            },
            (_, index) => (
              <Button
                key={index}
                onClick={() => onChange(game.minPlayers + index)}
              >
                {game.minPlayers + index}
              </Button>
            )
          )}
        </ButtonGroup>
      </div>
    );
  }
}
