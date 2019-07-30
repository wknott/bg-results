import React, {Component} from 'react';
import { Alert, Spinner, Table } from 'react-bootstrap';

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
      results: null,
      games: [],
      users: [] };
      
  }
  
  componentDidMount() {
    fetch('/results/')
      .then(response => response.json())
      .then(data => {
          this.setState({results: data});
      });
  };

  resultsList(){
    return this.state.results.slice(0).reverse().map(currentresult => {
      return <Result result={currentresult} key={currentresult._id}/>;
    })
  }

  render() {
    if (this.state.results === null) {
      return(
        <Spinner animation="border" variant="light" />
      )
    }
    else if (this.state.results.length === 0){
      return (
        <Alert key='index' variant='primary'>
          <Alert.Link href="/result" > Create result</Alert.Link>
        </Alert> 
      )}
    else {
    return (
    <div>
      <Table striped bordered hover variant="dark">
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
        </Table>
    </div>
    )}
  }
}