import React, {Component} from 'react';

const Result = props => {
  const {game,scores} = props.result;
  const score = scores.map(score => {
  return (score.user.username + ': ' + score.points + ' ' )});
  return (<tr>
    <td>{game.name}</td>
    <td>{props.result.date.substring(0,10)}</td>
    <td>{score}</td>
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
    fetch('http://localhost:5000/results/')
      .then(response => response.json())
      .then(data => {
        if(data.length > 0) {
          this.setState({results: data});
        }
      });
  };

  resultsList(){
    return this.state.results.map(currentresult => {
      return <Result result={currentresult} key={currentresult._id}/>;
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
                {this.resultsList()}
            </tbody>
        </table>
    </div>
    );
  }
}