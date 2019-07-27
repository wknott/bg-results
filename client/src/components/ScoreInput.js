import React, { Component } from 'react';
// jesteś tu? tak tak
//xd
// będą zaraz ^^ 
export default class ScoreInput extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangePoints = this.onChangePoints.bind(this);
  }

  onChangeUserId(e) {
    const { score, onChange } = this.props; //to dostajemy
    const userId = e.target.value; // nowa wartosc
    onChange({ ...score, userId }); // wywołujemy onChange które dostalismy z score, ale zaktulizowanym userId 
    // onchagne z obslugi komponentu tak? nom to co tam wcześniej pisalismy okok
  }

  onChangePoints(e) {
    const { score, onChange } = this.props; //to dostajemy
    const points = e.target.value; // nowa wartosc
    onChange({ ...score, points });
    // to samo okej
    // a jeszcze users trzeba przekazać
  }

    render() {
      const { score, users } = this.props;
      
      return (
        <tr>
            <td>
                <select value={score.userId || ''}
                onChange={this.onChangeUserId}
                >
                    <option value=""></option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <input value={score.points || ''}
                onChange={this.onChangePoints}
                type="number"/>
            </td>
        </tr>
      );
    }
}