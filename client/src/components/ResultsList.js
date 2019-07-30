import React, {Component} from 'react';
import { Alert, Spinner, Table, Button, Form } from 'react-bootstrap';

const Result = props => {
  const {game,scores} = props.result;
  const score = scores.map(score => {
  return (score.user.username + ': ' + score.points + ' ' )});
  return (<tr>
    <td onClick={props.onClick } style={{ cursor: 'pointer' }}>{game.name}</td>
    <td>{props.result.date.substring(0,10)}</td>
    <td>{score}</td>
  </tr>)
}

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      results: null,
      id: null,
     };
  }
  
  componentDidMount() {
    console.log('przeladowanie');
    fetch('/results/')
      .then(response => response.json())
      .then(data => {
          this.setState({results: data});
      });

    fetch('/games/')
			.then(response => response.json())
			.then(data => {
				const games = data;
				this.setState({games});
      });
    };

  onGame(){
    fetch('/results/')
      .then(response => response.json())
      .then(data => {
          this.setState({results: data});
      });
  }
  
  onChangeId(e){
    fetch('/results/game/' + e)
      .then(response => response.json())
      .then( data => {
          this.setState({results: data});
      });
  }

  resultsList(){
    return this.state.results.slice(0).reverse().map(currentresult => {
      return <Result onClick={() => this.onChangeId(currentresult.game._id)} result={currentresult} key={currentresult._id}/>
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
        
        <Table striped bordered hover variant="dark">
              <thead>
                  <tr>
                      <th onClick={() => this.onGame()} style={{ cursor: 'pointer' }}>Game</th>
                      <th>Date</th>
                      <th>Scores</th>
                  </tr>
              </thead>
              <tbody>
                
                  {this.resultsList()}
              </tbody>
          </Table>
    )}
  }
}