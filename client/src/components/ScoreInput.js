import React, { Component } from 'react';
export default class ScoreInput extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePoints = this.onChangePoints.bind(this);
  }

  onChangeUser(e) {
    const { score, onChange } = this.props; 
    const user = e.target.value; 
    onChange({ ...score, user }); 
  }

  onChangePoints(e) {
    const { score, onChange } = this.props; 
    const points = e.target.value; 
    onChange({ ...score, points });
  }

    render() {
      const { score, users } = this.props;
      
      return (
        <tr>
            <td>
                <select className="form-control"
                value={score.user || ''}
                onChange={this.onChangeUser}
                >
                    <option value="">Player</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <input placeholder='Points'
                className="form-control"
                value={score.points || ''}
                onChange={this.onChangePoints}
                type="number"/>
            </td>
        </tr>
      );
    }
}