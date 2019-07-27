import React, {Component} from 'react';
import axios from 'axios';

const Result = props => {
  const {games, users, result} = props;
  const game = games.find(game => game._id === result.gameId);
  const score = result.scores.map(score => {
    const user = users.find(user => user._id === score.userId);
    return (user && user.username + ': ' + score.points + ' ' )});
  return (<tr>
    <td>{game && game.name}</td>
    <td>{props.result.date.substring(0,10)}</td>
    <td>{score}
    </td>
  </tr>)
}

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      games: [],
      users: [] };
      
  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/results/')
			.then(response => {
				if (response.data.length > 0) {
					this.setState({ 
						results: response.data })}
      });
    axios.get('http://localhost:5000/games/')
			.then(response => {
				if (response.data.length > 0) {
					this.setState({ 
						games: response.data })}
      });  
    axios.get('http://localhost:5000/users/')
			.then(response => {
				if (response.data.length > 0) {
					this.setState({ 
						users: response.data })}
      });  
      
  };

  resultsList(){
    return this.state.results.map(currentresult => {
      return <Result games={this.state.games} users={this.state.users} result={currentresult} key={currentresult._id}/>;
    })
  }

  render() {
    return (
    <div>
        <h3>Logged Results</h3>
        <table>
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Date</th>
                    <th>Scores</th>
                </tr>
            </thead>
            <tbody>
                {this.resultsList() }
            </tbody>
        </table>
    </div>
    );
  }
}