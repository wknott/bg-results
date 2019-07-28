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
    return this.state.results.slice(0).reverse().map(currentresult => {
      return <Result result={currentresult} key={currentresult._id}/>;
    })
  }

  render() {
    return (
    <div>
        <table className="table table-dark">
            <thead className = "thead-dark">
                <tr>
                    <th>Game</th>
                    <th>Date</th>
                    <th>Scores</th>
                </tr>
            </thead>
            <tbody className = "thead-light">
                {this.resultsList()}
            </tbody>
        </table>
    </div>
    );
  }
}